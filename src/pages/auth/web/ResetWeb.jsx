import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import styles  from './index.module.less';
import { Input, Button } from '../../../components';
import Footer from '../../footer';

class ResetWeb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    changeRegistType (index) {
        this.setState({
            tabIndex: index
        });
        this.props.changeResetType(index);
    }

    render() {
        const {
            loading, phone, areaCode, code,
            phoneError, codeError, password,
            changeState, passwordError, confirmPwd,
            confirmPwdError, reset, email,imageCaptcha
        } = this.props;

        let { tabIndex } = this.state;

        return (
            <div className="auth-wrap">
                <div className="auth">
                    <div className={["auth-content register-back", styles.authContent].join(" ")}>
                        <div className="form" style={{ padding: '0 123px' }}>
                            <div className="title" style={{marginBottom: '0.27rem'}}>{intl.get('AUTH_PASS_RESET')}</div>
                            <div className={`${styles.registTab}`}>
                                    <span className={[styles.typeLabel, tabIndex === 0?styles.active:""].join(" ")}
                                          onClick={() => {this.changeRegistType(0)}}>
                                        {intl.get('AUTH_EMAIL_PHONE')}
                                    </span>
                                <span className={[styles.typeLabel, tabIndex === 1?styles.active:""].join(" ")}
                                      onClick={() => {this.changeRegistType(1)}}>
                                        {intl.get('AUTH_EMAIL_EMAIL')}
                                    </span>
                            </div>
                            <div>
                                {
                                    tabIndex === 0?(
                                        <Input.Phone
                                            label={intl.get('AUTH_PHONE')}
                                            value={phone}
                                            areaCode={areaCode}
                                            placeholder={intl.get('AUTH_DO_PHONE')}
                                            onChange={v => changeState('phone', v)}
                                            onError={v => changeState('phoneError', v)}
                                            setArea={v => changeState('areaCode', v)}
                                            error={phoneError}
                                        />
                                    ):(
                                        <Input
                                            label={intl.get('AUTH_EMAIL')}
                                            value={email}
                                            placeholder={intl.get('AUTH_EMAIL_PLACEHODLER')}
                                            onChange={v => changeState('email', v)}
                                        />
                                    )
                                }
                                <div>
                                    <Input.ImgCode
                                        label={intl.get('AUTH_IMG_CODE')}
                                        value={imageCaptcha}
                                        placeholder={intl.get('AUTH_IMG_CODE_PLACEHOLDER')}
                                        imgURL='/public/ImageCode.php'
                                        onChange = {(val) => {changeState('imageCaptcha', val)}}
                                    />
                                </div>
                                <Input.Captcha
                                    value={code}
                                    placeholder={intl.get('AUTH_DO_PHONE_CAPTCHA')}
                                    label={intl.get('AUTH_PHONE_CAPTCHA')}
                                    phone={tabIndex === 0?phone:null}
                                    email={tabIndex === 1?email:null}
                                    imageCaptcha={imageCaptcha}
                                    areaCode={areaCode}
                                    path="access"
                                    onChange={v => changeState('code', v)}
                                    onError={v => changeState('codeError', v)}
                                    purpose={2}
                                    error={codeError}
                                />

                                <Input.Password
                                    label={intl.get('AUTH_RESET_PASS')}
                                    value={password}
                                    placeholder={intl.get('AUTH_DO_SET_PASSWORD')}
                                    onChange={v => changeState('password', v)}
                                    onError={v => changeState('passwordError', v)}
                                    error={passwordError}
                                    info
                                />

                                <Input.Password
                                    label={intl.get('AUTH_CONFIRM_PASSWORD')}
                                    value={confirmPwd}
                                    placeholder={intl.get('AUTH_DO_CONFIRM_PASSWORD')}
                                    onChange={v => changeState('confirmPwd', v)}
                                    error={confirmPwdError}
                                />
                            </div>
                            <div className="mt-20">
                                <Button
                                    loading={loading}
                                    type="block"
                                    onClick={reset}
                                >
                                    {intl.get('AUTH_DO_RESET')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default ResetWeb;
