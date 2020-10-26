import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { message } from 'antd';
import { Input, Button, Header } from '../../../components';
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
            <div className="bg-h5 account-h5">
                <Header
                    left={this.props.history.goBack}
                    title={intl.get('ACCOUNT_6')}
                />

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
                        label={intl.get('ACCOUNT_29', { email: userInfo.email })}
                        placeholder={intl.get('ACCOUNT_30')}
                        path="/setting/kyc2/modify_email"
                        pathType="email"
                        imageCaptcha={imageCaptcha}
                        onChange={v => this.changeState('oldEmailCaptcha', v)}
                        onError={v => this.changeState('oldError', v)}
                        error={this.state.oldError}
                        h5
                    />

                    <Input
                        label={intl.get('ACCOUNT_31')}
                        placeholder={intl.get('ACCOUNT_32')}
                        type="email"
                        onChange={v => this.changeState('email', v)}
                        onError={v => this.changeState('emailError', v)}
                        error={this.state.emailError}
                        h5
                    />

                    <Input.Captcha
                        value={newEmailCaptcha}
                        placeholder={intl.get('ACCOUNT_33')}
                        label={intl.get('ACCOUNT_34')}
                        email={email}
                        imageCaptcha={imageCaptcha}
                        path="access"
                        onChange={v => this.changeState('newEmailCaptcha', v)}
                        onError={v => this.changeState('newError', v)}
                        error={this.state.newError}
                        h5
                    />

                    <div className="mt-20">
                        <Button type="mobile" onClick={this.modify}>{intl.get('ACCOUNT_27')}</Button>
                    </div>

                    <div className="bottom">
                        {intl.get('ACCOUNT_35')}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountEmail);
