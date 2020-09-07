import React, { Component } from 'react';
import intl from 'react-intl-universal';
import md5 from 'md5';
import { message } from 'antd';
import Title from '../components/Title';
import { Input, Button } from '../../../../components';
import connect from '../../../../store/connect';
import net from '../../../../net';

class AccountPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPass: '',
            oldError: '',
            newPass: '',
            newError: '',
            confirmPass: '',
            confirmError: '',
            captcha: '',
            captchaError: '',
            loading: false,
            imageCaptcha: '',
        };

        this.modify = this.modify.bind(this);
        this.comparePass = this.comparePass.bind(this);
    }

    changeState(key, v) {
        this.setState({ [key]: v }, this.comparePass);
    }

    comparePass() {
        const { confirmPass, newPass } = this.state;

        if (confirmPass && confirmPass !== newPass) {
            this.setState({ confirmError: intl.get('ACCOUNT_73') });
        } else this.setState({ confirmError: '' });
    }

    modify() {
        if (this.state.loading) return;

        if (this.check()) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }

        this.setState({ loading: true });
        const { userInfo } = this.props.redux;
        const { type } = this.props;
        const post = type ? net.postSettingPayPwd : net.postSettingPassword;
        post({
            code: this.state.captcha,
            [type ? 'payPwd' : 'password']: md5(this.state.newPass),
            gaCaptcha: this.state.gaCaptcha,
            oldPassword: md5(this.state.oldPass),
            /*phone: userInfo.phone,
            email: userInfo.email*/
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                message.success(intl.get('ACCOUNT_19'));
                this.props.getUserInfo();
                this.props.history.goBack();
            }
        });
    }

    check() {
        const {
            oldPass, oldError, newPass, newError,
            confirmPass, confirmError, captcha, captchaError,
            gaCaptcha, gaCaptchaError,
        } = this.state;

        if (this.props.type) {
            if (!gaCaptcha || gaCaptchaError) return true;
        }
        if (!this.props.type) {
            if (!oldPass || oldError) return true;
        }
        return !newPass || newError || !confirmPass || confirmError || !captcha || captchaError;
    }

    render() {
        const {
            oldPass, oldError, newPass,
            confirmPass, confirmError,
            captcha, captchaError,
            loading, imageCaptcha,
        } = this.state;
        const { userInfo } = this.props.redux;
        const { type } = this.props;

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>
                    {this.props.title}
                </Title>

                <div className="form">
                    {
                        type ? null : (
                            <Input.Password
                                value={oldPass}
                                onChange={v => this.changeState('oldPass', v)}
                                onError={v => this.changeState('oldError', v)}
                                placeholder={intl.get(type ? 'ACCOUNT_74' : 'ACCOUNT_75')}
                                label={intl.get(type ? 'ACCOUNT_76' : 'ACCOUNT_77')}
                                error={oldError}
                            />
                        )
                    }

                    <Input.Password
                        value={newPass}
                        onChange={v => this.changeState('newPass', v)}
                        onError={v => this.changeState('newError', v)}
                        placeholder={intl.get(type ? 'ACCOUNT_78' : 'ACCOUNT_79')}
                        label={intl.get(type ? 'ACCOUNT_80' : 'ACCOUNT_81')}
                        info
                    />

                    <Input.Password
                        value={confirmPass}
                        onChange={v => this.changeState('confirmPass', v)}
                        placeholder={intl.get(type ? 'ACCOUNT_82' : 'ACCOUNT_83')}
                        label={intl.get('ACCOUNT_84')}
                        error={confirmError}
                    />

                    <Input.ImgCode
                        label={intl.get('AUTH_IMG_CODE')}
                        value={imageCaptcha}
                        placeholder={intl.get('AUTH_IMG_CODE_PLACEHOLDER')}
                        imgURL='/public/ImageCode.php'
                        onChange = {(val) => {this.changeState('imageCaptcha', val)}}
                    />

                    <Input.Captcha
                        value={captcha}
                        /*label={intl.get('ACCOUNT_85', { phone: userInfo.phone })}
                        placeholder={intl.get('ACCOUNT_86')}*/
                        label={userInfo.defaultAccount === 0?intl.get('AUTH_PHONE_CAPTCHA'):intl.get('AUTH_EMAIL_CODE')}
                        placeholder={userInfo.defaultAccount === 0?intl.get('AUTH_DO_PHONE_CAPTCHA'):intl.get('AUTH_EMAIL_CODE_PLACEHOLDER')}
                        pathType={userInfo.defaultAccount === 0?"phone":"email"}
                        path={type ? '/setting/modify/pay_pwd' : '/setting/modify/password'}
                        imageCaptcha={imageCaptcha}
                        onChange={v => this.changeState('captcha', v)}
                        onError={v => this.changeState('captchaError', v)}
                        error={captchaError}
                    />

                    {
                        type ? (
                            <Input
                                value={this.state.gaCaptcha}
                                label={intl.get('ACCOUNT_59')}
                                placeholder={intl.get('ACCOUNT_60')}
                                maxlength={6}
                                onChange={v => this.changeState('gaCaptcha', v)}
                                onError={v => this.changeState('gaCaptchaError', v)}
                                error={this.state.gaCaptchaError}
                                type="ga"
                            />
                        ) : null
                    }

                    <div className="mt-20">
                        <Button loading={loading} type="block" onClick={this.modify}>
                            {intl.get('ACCOUNT_27')}
                        </Button>
                    </div>

                    <div className="mt-15 sub-font-color ft-11 ft-c">
                        {intl.get(type ? 'ACCOUNT_134' : 'ACCOUNT_87')}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountPassword);
