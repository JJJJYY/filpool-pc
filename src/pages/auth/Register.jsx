import React, { Component } from 'react';
import intl from 'react-intl-universal';
import md5 from 'md5';
import { message } from 'antd';
import net from '../../net';
import connect from '../../store/connect';
import RegisterWeb from './web/RegisterWeb';
import RegisterH5 from './h5/RegisterH5';

function cans() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var txt = "https://new.filpool.io";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "filpool";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);

    var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    var bin = atob(b64);
    var crc = bin2hex(bin.slice(-16, -12));
    //var crc = bin.slice(-16,-12);
    return crc;
}

function bin2hex(str) {
    var result = "";
    for (let i = 0; i < str.length; i++) {
        result += int16_to_hex(str.charCodeAt(i));
    }
    return result;
}

function int16_to_hex(i) {
    var result = i.toString(16);
    var j = 0;
    while (j + result.length < 4) {
        result = "0" + result;
        j++;
    }
    return result;
}

function getQueryVariable(variable) {
    let query = window.location.href;
    let vars = query.split("?");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return ("");
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            email: '',
            phoneError: '',
            code: '',
            codeError: '',
            password: '',
            passwordError: '',
            confirmPwd: '',
            confirmPwdError: '',
            inviteCode: this.props.match.params.code || '',
            isAgree: false,
            areaCode: '86',
            loading: false,
            imageCaptcha: "",
            payPwd: "",
            registType: 0
        };

        this.register = this.register.bind(this);
        this.checkError = this.checkError.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        // net.postDownload({
        //     channel: getQueryVariable("channel"),
        //     uuid : cans()
        // }).then(res => {

        // }).catch(console.log);
    }

    changeState(key, v) {
        this.setState({ [key]: v }, this.comparePass);
    }

    comparePass() {
        const { confirmPwd, password } = this.state;

        if (confirmPwd && confirmPwd !== password) {
            this.setState({ confirmPwdError: intl.get('AUTH_PASSWORD_DIFF') });
        } else this.setState({ confirmPwdError: '' });
    }

    register() {
        if (this.checkError()) {
            message.info(intl.get('AUTH_CHECK_INPUT'));
            return;
        }

        const obj = JSON.parse(localStorage.getItem('param') || '{}');

        const {
            password, areaCode, code, inviteCode, phone, payPwd, email, registType
        } = this.state;

        this.setState({ loading: true });

        let reqObj = {};
        if (registType === 0) {
            reqObj = { areaCode: areaCode, account: phone, type: "phone" };
        } else {
            reqObj = { account: email, type: "email" };
        }
        net.postRegisterStep2({
            ...reqObj,
            password: md5(password),
            invitationCode: inviteCode,
            code: code,
            channel: obj.channel,
            payPwd: md5(payPwd),
            channel: getQueryVariable("channel"),
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                net.postLogin({
                    account: registType === 0 ? phone : email,
                    password: md5(password),
                }).then((res2) => {
                    if (res2.ret === 200) {
                        this.props.history.replace('/');
                        this.props.setLogin(true);
                        sessionStorage.setItem("login", true);
                        this.props.getUserInfo();
                    }
                });
            }
        });
    }

    checkError() {
        const {
            phone, phoneError, code, codeError,
            password, passwordError, confirmPwd, confirmPwdError,
            isAgree, email, registType, inviteCode
        } = this.state;

        let amount = "";
        if (registType === 0) {
            amount = phone;
        } else {
            amount = email;
        }

        if (!amount || !code || !password) return true;

        if ((registType === 0 && phoneError) || codeError || passwordError) return true;

        return !isAgree;
    }

    changeRegistType(type) {
        this.setState({
            registType: type
        });
    }

    render() {
        return this.props.h5 ? (
            <RegisterH5
                register={this.register}
                changeState={this.changeState}
                checkError={this.checkError}
                {...this.state}
                inviteCode={this.props.match.params.code}
            />
        ) : (
                <RegisterWeb
                    register={this.register}
                    changeRegistType={(v) => { this.changeRegistType(v) }}
                    changeState={this.changeState}
                    checkError={this.checkError}
                    history={this.props.history}
                    {...this.state}
                />
            );
    }
}

export default connect(Register);
