import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import styles from './index.module.less';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button } from '../../../components';
import agree from '../../../images/auth/agree.png';
import unagree from '../../../images/auth/u-agree.png';
import Footer from '../../footer';

class Register extends Component {
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
        this.props.changeRegistType(index);
    }
    render() {
        const {
            loading, code, phone, areaCode,
            phoneError, password, passwordError,
            confirmPwd, confirmPwdError, inviteCode,
            changeState, isAgree, register,email,imageCaptcha,payPwd
        } = this.props;
        const { tabIndex } = this.state;

        return (
            <div className="auth-wrap">
                <div className="auth">
                    <div className={["auth-content register-back", styles.authContent].join(" ")}>
                        <div className="regist-form-container">
                            <div className="form" style={{ padding: '0 123px',width: '50%' }}>
                                <div className={[styles.registTab].join(" ")}>
                                    <span className={[styles.typeLabel, tabIndex === 0?styles.active:""].join(" ")}
                                          onClick={() => {this.changeRegistType(0)}}>
                                        {intl.get('AUTH_REGIST_PHONE')}
                                    </span>
                                        <span className={[styles.typeLabel, tabIndex === 1?styles.active:""].join(" ")}
                                              onClick={() => {this.changeRegistType(1)}}>
                                        {intl.get('AUTH_REGIST_EMAIL')}
                                    </span>
                                </div>
                                {/*<div className="title">{intl.get('AUTH_WELCOME_REGISTER')}</div>*/}
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
                                        label={tabIndex === 0?intl.get('AUTH_PHONE_CAPTCHA'):intl.get('AUTH_EMAIL_CODE')}
                                        placeholder={tabIndex === 0?intl.get('AUTH_DO_PHONE_CAPTCHA'):intl.get('AUTH_EMAIL_CODE_PLACEHOLDER')}
                                        phone={tabIndex === 0?phone:null}
                                        email={tabIndex === 1?email:null}
                                        areaCode={areaCode}
                                        imageCaptcha={imageCaptcha}
                                        path="access"
                                        onChange={v => changeState('code', v)}
                                        purpose={1}
                                        onError={v => changeState('codeError', v)}
                                    />

                                    <Input.Password
                                        label={intl.get('AUTH_PASSWORD')}
                                        value={password}
                                        placeholder={intl.get('AUTH_DO_SET_PASSWORD')}
                                        onChange={v => changeState('password', v)}
                                        onError={v => changeState('passwordError', v)}
                                        error={passwordError}
                                        info
                                    />

                                    <Input.Password
                                        label={intl.get('AUTH_PAY_PASSWORD')}
                                        value={payPwd}
                                        placeholder={intl.get('AUTH_PAY_PASSWORD_PLACEHOLDER')}
                                        onChange={v => changeState('payPwd', v)}
                                    />

                                    <Input
                                        label={intl.get('AUTH_INVITE_CODE')}
                                        value={inviteCode}
                                        placeholder={intl.get('AUTH_DO_INVITE_CODE')}
                                        type="inviteCode"
                                        maxlength={10}
                                        onChange={v => changeState('inviteCode', v)}
                                    />
                                </div>
                                <div>
                                    <div className="flex-row-start mb-10" style={{marginBottom: '0.39rem'}}>
                                        <img
                                            src={isAgree ? agree : unagree}
                                            alt=""
                                            style={{ height: '0.14rem', width: '0.14rem', marginLeft: '0.21rem' }}
                                            onClick={() => changeState('isAgree', !isAgree)}
                                        />
                                        <div className="primary-font-color ml-10">
                                            {intl.get('AUTH_AGREED')}
                                        </div>
                                        <div className="primary-color">
                                            <Link to={{pathname: `/common/airticle/1`}}>
                                                {intl.get('AUTH_USER_SERVICE')}
                                            </Link>
                                        </div>
                                    </div>

                                    <Button
                                        loading={loading}
                                        type="block"
                                        style={{height: "0.4rem"}}
                                        onClick={register}
                                    >
                                        {intl.get('AUTH_REGISTER_NOW')}
                                    </Button>
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

export default withRouter(Register);
