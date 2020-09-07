import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { Input, Button, Header } from '../../../components';

class ResetH5 extends Component {
    render() {
        const {
            loading, phone, areaCode, code,
            phoneError, codeError, password,
            changeState, passwordError, confirmPwd,
            confirmPwdError, reset,
        } = this.props;

        return (
            <div className="auth-h5">
                <Header
                    title={intl.get('AUTH_FORGET_PASS')}
                    left={this.props.history.goBack}
                    right={(
                        <span onClick={() => this.props.history.push('/login')}>
                            {intl.get('AUTH_LOGIN')}
                        </span>
                    )}
                />

                <div className="login-back">
                    <div className="form">
                        <div className="title">{intl.get('AUTH_PASS_RESET')}</div>
                        <div>
                            <Input.Phone
                                label={intl.get('AUTH_PHONE')}
                                value={phone}
                                areaCode={areaCode}
                                placeholder={intl.get('AUTH_DO_PHONE')}
                                onChange={v => changeState('phone', v)}
                                onError={v => changeState('phoneError', v)}
                                setArea={v => changeState('areaCode', v)}
                                error={phoneError}
                                h5
                            />

                            <Input.Captcha
                                value={code}
                                placeholder={intl.get('AUTH_DO_PHONE_CAPTCHA')}
                                label={intl.get('AUTH_PHONE_CAPTCHA')}
                                phone={phone}
                                areaCode={areaCode}
                                path="access"
                                onChange={v => changeState('code', v)}
                                onError={v => changeState('codeError', v)}
                                error={codeError}
                                h5
                            />

                            <Input.Password
                                label={intl.get('AUTH_RESET_PASS')}
                                value={password}
                                placeholder={intl.get('AUTH_DO_SET_PASSWORD')}
                                onChange={v => changeState('password', v)}
                                onError={v => changeState('passwordError', v)}
                                error={passwordError}
                                h5
                            />

                            <Input.Password
                                label={intl.get('AUTH_CONFIRM_PASSWORD')}
                                value={confirmPwd}
                                placeholder={intl.get('AUTH_DO_CONFIRM_PASSWORD')}
                                onChange={v => changeState('confirmPwd', v)}
                                error={confirmPwdError}
                                h5
                            />
                        </div>
                        <div className="mt-20">
                            <Button
                                loading={loading}
                                type="mobile"
                                onClick={reset}
                            >
                                {intl.get('AUTH_DO_RESET')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetH5;
