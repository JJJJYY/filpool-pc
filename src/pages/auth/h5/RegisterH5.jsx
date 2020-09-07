import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { Input, Button, Header } from '../../../components';
import agree from '../../../images/auth/agree.png';
import unagree from '../../../images/auth/u-agree.png';

class Register extends Component {
    render() {
        const {
            loading, code, phone, areaCode,
            phoneError, password, passwordError,
            confirmPwd, confirmPwdError, inviteCode,
            changeState, isAgree, register,
        } = this.props;

        return (
            <div className="auth-h5">
                <Header
                    title={intl.get('AUTH_REGISTER')}
                    left={this.props.history.goBack}
                    right={(
                        <span onClick={() => this.props.history.push('/login')}>
                            {intl.get('AUTH_LOGIN')}
                        </span>
                    )}
                />

                <div className="register-back">
                    <div className="form">
                        <div className="title">{intl.get('AUTH_WELCOME_REGISTER')}</div>
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
                                label={intl.get('AUTH_PHONE_CAPTCHA')}
                                placeholder={intl.get('AUTH_DO_PHONE_CAPTCHA')}
                                phone={phone}
                                areaCode={areaCode}
                                path="access"
                                onChange={v => changeState('code', v)}
                                onError={v => changeState('codeError', v)}
                                h5
                            />

                            <Input.Password
                                label={intl.get('AUTH_PASSWORD')}
                                value={password}
                                placeholder={intl.get('AUTH_DO_SET_PASSWORD')}
                                onChange={v => changeState('password', v)}
                                onError={v => changeState('passwordError', v)}
                                error={passwordError}
                                info
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

                            <Input
                                label={intl.get('AUTH_INVITE_CODE')}
                                value={inviteCode}
                                placeholder={intl.get('AUTH_DO_INVITE_CODE')}
                                type="inviteCode"
                                maxlength={10}
                                onChange={v => changeState('inviteCode', v)}
                                h5
                            />
                        </div>
                        <div className="mt-20">
                            <div className="flex-row-start mb-10">
                                <img
                                    src={isAgree ? agree : unagree}
                                    alt=""
                                    style={{ height: '3.73vw', width: '3.73vw', marginLeft: '1.47vw' }}
                                    onClick={() => changeState('isAgree', !isAgree)}
                                />
                                <div className="primary-font-color ml-10">
                                    {intl.get('AUTH_AGREED')}
                                </div>
                                <div className="primary-color">
                                    {intl.get('AUTH_USER_SERVICE')}
                                </div>
                            </div>

                            <Button
                                loading={loading}
                                type="mobile"
                                onClick={register}
                            >
                                {intl.get('AUTH_REGISTER_NOW')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
