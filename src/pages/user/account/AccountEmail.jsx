import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { message } from 'antd';
import Title from './components/Title';
import { Input, Button } from '../../../components';
import connect from '../../../store/connect';
import net from '../../../net';

class AccountEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            oldEmailCaptcha: '',
            oldError: '',
            newEmailCaptcha: '',
            newError: '',
            imageCaptcha: '',
        };

        this.changeState = this.changeState.bind(this);
        this.modify = this.modify.bind(this);
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }

    modify() {
        const {
            email, emailError,
            oldEmailCaptcha, oldError,
            newEmailCaptcha, newError,
        } = this.state;

        if (!email || !oldEmailCaptcha || !newEmailCaptcha || emailError || oldError || newError) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }
        net.postSettingKyc1Email({
            email, oldEmailCaptcha,
            emailCaptcha: newEmailCaptcha
        }).then((res) => {
            if (res.ret === 200) {
                message.success(intl.get('ACCOUNT_19'));
                this.props.getUserInfo();
                this.props.history.goBack();
            }
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        const {
            email, oldEmailCaptcha, newEmailCaptcha, imageCaptcha,
        } = this.state;

        const { userInfo } = this.props.redux;

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>{intl.get('ACCOUNT_6')}</Title>

                <div className="form">

                    <Input.ImgCode
                        label={intl.get('AUTH_IMG_CODE')}
                        value={imageCaptcha}
                        placeholder={intl.get('AUTH_IMG_CODE_PLACEHOLDER')}
                        imgURL='/public/ImageCode.php'
                        onChange={(val) => { this.changeState('imageCaptcha', val) }}
                    />

                    <Input.Captcha
                        value={oldEmailCaptcha}
                        /*label={intl.get('ACCOUNT_29', {email: userInfo.email})}
                        placeholder={intl.get('ACCOUNT_30')}*/
                        label={userInfo.defaultAccount === 0 ? intl.get('ACCOUNT_159', { phone: userInfo.phone }) : intl.get('ACCOUNT_160', { email: userInfo.email })}
                        placeholder={userInfo.defaultAccount === 0 ? intl.get('AUTH_DO_PHONE_CAPTCHA') : intl.get('AUTH_EMAIL_CODE_PLACEHOLDER')}
                        path="/setting/kyc2/modify_email"
                        purpose={2}
                        imageCaptcha={imageCaptcha}
                        pathType={userInfo.defaultAccount === 0 ? "phone" : "email"}
                        onChange={v => this.changeState('oldEmailCaptcha', v)}
                        onError={v => this.changeState('oldError', v)}
                        error={this.state.oldError}
                    />

                    <Input
                        label={intl.get('ACCOUNT_31')}
                        placeholder={intl.get('ACCOUNT_32')}
                        type="email"
                        onChange={v => this.changeState('email', v)}
                        onError={v => this.changeState('emailError', v)}
                        error={this.state.emailError}
                    />

                    <Input.Captcha
                        value={newEmailCaptcha}
                        placeholder={intl.get('ACCOUNT_33')}
                        label={intl.get('ACCOUNT_34')}
                        email={email}
                        imageCaptcha={imageCaptcha}
                        path="access"
                        purpose={1}
                        onChange={v => this.changeState('newEmailCaptcha', v)}
                        onError={v => this.changeState('newError', v)}
                        error={this.state.newError}
                    />

                    <div className="mt-20">
                        <Button type="block" onClick={this.modify}>{intl.get('ACCOUNT_27')}</Button>
                    </div>

                    <div className="mt-15 sub-font-color ft-11 ft-c">
                        {intl.get('ACCOUNT_35')}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountEmail);
