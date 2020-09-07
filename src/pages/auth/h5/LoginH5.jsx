import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { Link } from 'react-router-dom';
import { Input, Button, Header } from '../../../components';

class Login extends Component {
    render() {
        const {
            loading, account, accountError,
            password, passwordError,
            login, changeState,
        } = this.props;

        return (
            <div className="auth-h5">
                <Header
                    title={intl.get('AUTH_LOGIN')}
                    left={this.props.history.goBack}
                    right={(
                        <span onClick={() => this.props.history.push('/register')}>
                            {intl.get('AUTH_REGISTER')}
                        </span>
                    )}
                />

                <div className="login-back">
                    <div className="form">
                        <div className="title">
                            {intl.get('AUTH_WELCOME_LOGIN')}
                        </div>
                        <div>
                            <Input
                                label={intl.get('AUTH_ACCOUNT')}
                                value={account}
                                type="account"
                                placeholder={intl.get('AUTH_DO_ACCOUNT')}
                                onChange={v => changeState('account', v)}
                                onError={v => changeState('accountError', v)}
                                error={accountError}
                                h5
                            />
                            <Input.Password
                                label={intl.get('AUTH_LOGIN_PASSWORD')}
                                value={password}
                                placeholder={intl.get('AUTH_DO_PASSWORD')}
                                onChange={v => changeState('password', v)}
                                onError={v => changeState('passwordError', v)}
                                error={passwordError}
                                h5
                            />
                        </div>
                        <div className="flex-column-end mt-20">
                            <div className="mb-10 flex-row-end">
                                <div className="primary-font-color">
                                    {intl.get('AUTH_FORGET')}
                                </div>
                                <Link to="/reset" className="ml-5">
                                    {intl.get('AUTH_RESET')}
                                </Link>
                            </div>
                            <Button
                                loading={loading}
                                type="mobile"
                                onClick={login}
                                h5
                            >
                                {intl.get('AUTH_LOGIN')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
