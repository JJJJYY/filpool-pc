import React, { Component } from 'react';
import intl from 'react-intl-universal';
import md5 from 'md5';
import { message } from 'antd';
import net from '../../net';
import connect from '../../store/connect';
import ResetWeb from './web/ResetWeb';
import ResetH5 from './h5/ResetH5';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            phoneError: '',
            code: '',
            codeError: '',
            password: '',
            passwordError: '',
            confirmPwd: '',
            confirmPwdError: '',
            areaCode: '86',
            loading: false,
            email: '',
            resetType: 0,
            imageCaptcha: ""
        };

        this.reset = this.reset.bind(this);
        this.checkError = this.checkError.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    reset() {
        if (this.checkError()) {
            message.info(intl.get('AUTH_CHECK_INPUT'));
            return;
        }

        const {
            phone, password, code, areaCode,resetType,email
        } = this.state;

        this.setState({ loading: true });
        let reqObj = {};
        if (resetType === 0) {
            reqObj = {account: phone};
        } else {
            reqObj = {account: email};
        }
        net.postReset({
            ...reqObj,
            password: md5(password),
            code: code
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                this.props.history.push('/login');
            }
        });
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

    checkError() {
        const {
            phone, phoneError, code, codeError,
            password, passwordError, confirmPwd, confirmPwdError,resetType,email
        } = this.state;

        let amount = "";
        if (resetType === 0) {
            amount = phone;
        } else {
            amount = email;
        }
        /*return (!phone || !code || !password || !confirmPwd || phoneError || codeError || passwordError || confirmPwdError);*/
        return (!amount || !code || !password || !confirmPwd || phoneError || codeError || passwordError || confirmPwdError);
    }

    changeResetType (type) {
        this.setState({
            resetType: type
        });
    }

    render() {
        return this.props.h5 ? (
            <ResetH5
                reset={this.reset}
                changeState={this.changeState}
                checkError={this.checkError}
                {...this.state}
                history={this.props.history}
            />
        ) : (
            <ResetWeb
                reset={this.reset}
                changeState={this.changeState}
                changeResetType={(v) => {this.changeResetType(v)} }
                checkError={this.checkError}
                {...this.state}
            />
        );
    }
}

export default connect(Login);
