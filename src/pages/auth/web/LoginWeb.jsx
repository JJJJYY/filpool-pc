import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import styles  from './index.module.less';
import { Link } from 'react-router-dom';
import { Input, Button } from '../../../components';
import Footer from '../../footer';

class Login extends Component {
    render() {
        const {
            loading, account, accountError,
            password, passwordError,
            login, changeState,
        } = this.props;

        return (
            <div className="auth-wrap">
                <div className="auth">
                    <div className={`auth-content login-back ${styles.authContent}`} style={{height: "730px"}}>
                        <div className="form">
                            <div className="title" style={{textAlign: "center"}}>
                                {intl.get('AUTH_WELCOME_LOGIN')}
                            </div>
                            <div>
                                <Input
                                    label={intl.get('AUTH_ACCOUNT')}
                                    value={account}
                                    type="account"
                                    placeholder={intl.get('AUTH_DO_ACCOUNT')}
                                    icon={{text: "&#xe6cc;", color: "#E49C3A"}}
                                    onChange={v => changeState('account', v)}
                                    onError={v => changeState('accountError', v)}
                                    error={accountError}
                                />
                                <Input.Password
                                    label={intl.get('AUTH_LOGIN_PASSWORD')}
                                    value={password}
                                    placeholder={intl.get('AUTH_DO_PASSWORD')}
                                    icon={{text: "&#xe6c5;", color: "#E49C3A"}}
                                    onChange={v => changeState('password', v)}
                                    onError={v => changeState('passwordError', v)}
                                    error={passwordError}
                                />
                            </div>
                            <div className="flex-column-end mt-20" style={{paddingLeft: "50px"}}>
                                <Button
                                    loading={loading}
                                    type="block"
                                    onClick={login}
                                    style={{height: "0.4rem"}}
                                >
                                    {intl.get('AUTH_LOGIN')}
                                </Button>

                                <div className={["mt-20 flex-row-between", styles.paddingBox].join(" ")} style={{width: "100%"}}>
                                    {/*<div className={styles.hoverText}>
                                        {intl.get('AUTH_FORGET')}
                                    </div>*/}
                                    <Link to="/register" className={styles.hoverText}>
                                        {intl.get('AUTH_REGIST_ACCOUNT')}
                                    </Link>
                                    <Link to="/reset" className={styles.hoverText}>
                                        {intl.get('AUTH_RESET')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Login;
