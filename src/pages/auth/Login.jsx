import React, { Component } from 'react';
import intl from 'react-intl-universal';
import md5 from 'md5';
import { message } from 'antd';
import net from '../../net';
import connect from '../../store/connect';
import LoginWeb from './web/LoginWeb';
import LoginH5 from './h5/LoginH5';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            accountError: '',
            password: '',
            passwordError: '',
            loading: false,
        };

        this.login = this.login.bind(this);
        this.checkError = this.checkError.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    login() {
        if (this.checkError()) {
            message.info(intl.get('AUTH_CHECK_INPUT'));
            return;
        }

        const {
            account, password,
        } = this.state;

        this.setState({ loading: true });
        net.postLogin({
            account: account,
            password: md5(password),
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                this.props.history.replace('/home');
                this.props.getUserInfo();
                this.props.setLogin(true);
            }
        });
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }

    checkError() {
        const {
            account, accountError, password, passwordError,
        } = this.state;

        return (!account || !password || accountError || passwordError);
    }

    render() {
        const { h5 } = this.props;

        return h5 ? (
            <LoginH5
                login={this.login}
                changeState={this.changeState}
                checkError={this.checkError}
                {...this.state}
                history={this.props.history}
            />
        ) : (
            <LoginWeb
                login={this.login}
                changeState={this.changeState}
                checkError={this.checkError}
                {...this.state}
            />
        );
    }
}

export default connect(Login);
