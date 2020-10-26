import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { message } from 'antd';
import Title from './components/Title';
import { Input, Button } from '../../../components';
import connect from '../../../store/connect';
import net from '../../../net';

class AccountPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            phoneError: '',
            oldPhoneCaptcha: '',
            oldError: '',
            newPhoneCaptcha: '',
            newError: '',
            areaCode: '86',
            imageCaptcha: '',
        };

        this.changeState = this.changeState.bind(this);
        this.modify = this.modify.bind(this);
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    modify() {
        const {
            phone, phoneError,
            oldPhoneCaptcha, oldError,
            newPhoneCaptcha, newError,
            areaCode,
        } = this.state;

        if (!phone || !oldPhoneCaptcha || !newPhoneCaptcha || phoneError || oldError || newError) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }

        net.postSettingKyc1Phone({
            phone, oldPhoneCaptcha, newPhoneCaptcha, areaCode,
        }).then((res) => {
            if (res.ret === 200) {
                message.success(intl.get('ACCOUNT_19'));
                this.props.getUserInfo();
                this.props.history.goBack();
            }
        });
    }

    render() {
        const {
            phone, oldPhoneCaptcha, newPhoneCaptcha,
            areaCode, imageCaptcha,
        } = this.state;

        const { userInfo } = this.props.redux;

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>{intl.get('ACCOUNT_20')}</Title>

                <div className="form">

                    <Input.ImgCode
                        label={intl.get('AUTH_IMG_CODE')}
                        value={imageCaptcha}
                        placeholder={intl.get('AUTH_IMG_CODE_PLACEHOLDER')}
                        imgURL='/public/ImageCode.php'
                        onChange={(val) => { this.changeState('imageCaptcha', val) }}
                    />

                    <Input.Captcha
                        value={oldPhoneCaptcha}
                        /*label={intl.get('ACCOUNT_21', { phone: userInfo.phone })}
                        placeholder={intl.get('ACCOUNT_22')}*/
                        label={userInfo.defaultAccount === 0 ? intl.get('ACCOUNT_159', { phone: userInfo.phone }) : intl.get('ACCOUNT_160', { email: userInfo.email })}
                        placeholder={userInfo.defaultAccount === 0 ? intl.get('AUTH_DO_PHONE_CAPTCHA') : intl.get('AUTH_EMAIL_CODE_PLACEHOLDER')}
                        purpose={2}
                        imageCaptcha={imageCaptcha}
                        pathType={userInfo.defaultAccount === 0 ? "phone" : "email"}
                        onChange={v => this.changeState('oldPhoneCaptcha', v)}
                        onError={v => this.changeState('oldError', v)}
                        error={this.state.oldError}
                    />

                    <Input.Phone
                        label={intl.get('ACCOUNT_23')}
                        placeholder={intl.get('ACCOUNT_24')}
                        value={phone}
                        areaCode={areaCode}
                        onChange={v => this.changeState('phone', v)}
                        onError={v => this.changeState('phoneError', v)}
                        setArea={v => this.changeState('areaCode', v)}
                        error={this.state.phoneError}
                    />

                    <Input.Captcha
                        value={newPhoneCaptcha}
                        label={intl.get('ACCOUNT_25')}
                        placeholder={intl.get('ACCOUNT_26')}
                        phone={phone}
                        areaCode={areaCode}
                        imageCaptcha={imageCaptcha}
                        path='access'
                        purpose={1}
                        onChange={v => this.changeState('newPhoneCaptcha', v)}
                        onError={v => this.changeState('newError', v)}
                        error={this.state.newError}
                    />

                    <div className="mt-20">
                        <Button type="block" onClick={this.modify}>{intl.get('ACCOUNT_27')}</Button>
                    </div>

                    <div className="mt-15 sub-font-color ft-11 ft-c">
                        {intl.get('ACCOUNT_28')}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountPhone);
