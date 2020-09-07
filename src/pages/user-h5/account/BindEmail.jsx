import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { message } from 'antd';
import { Input, Button, Header } from '../../../components';
import connect from '../../../store/connect';
import net from '../../../net';

class AccountPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            newCaptcha: '',
            newError: '',
            loading: false,
            imageCaptcha: '',
        };

        this.changeState = this.changeState.bind(this);
        this.modify = this.modify.bind(this);
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }

    modify() {
        if (this.state.loading) return;

        const {
            email, emailError,
            newCaptcha, newError,
        } = this.state;

        if (!email || !newCaptcha || emailError || newError) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }

        this.setState({ loading: true });
        net.postBindKyc2Email({
            email,
            emailCaptcha: newCaptcha,
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                message.success(intl.get('ACCOUNT_36'));
                this.props.getUserInfo();
                this.props.history.goBack();
            }
        });
    }

    render() {
        const {
            email, newCaptcha, loading, imageCaptcha,
        } = this.state;

        return (
            <div className="bg-h5 account-h5">
                <Header
                    left={this.props.history.goBack}
                    title={intl.get('ACCOUNT_5')}
                />

                <div className="form">
                    <Input
                        label={intl.get('ACCOUNT_37')}
                        placeholder={intl.get('ACCOUNT_38')}
                        type="email"
                        onChange={v => this.changeState('email', v)}
                        onError={v => this.changeState('emailError', v)}
                        value={email}
                        error={this.state.emailError}
                        h5
                    />

                    <Input.ImgCode
                        label={intl.get('AUTH_IMG_CODE')}
                        value={imageCaptcha}
                        placeholder={intl.get('AUTH_IMG_CODE_PLACEHOLDER')}
                        imgURL='/public/ImageCode.php'
                        onChange = {(val) => {this.changeState('imageCaptcha', val)}}
                    />

                    <Input.Captcha
                        value={newCaptcha}
                        placeholder={intl.get('ACCOUNT_40')}
                        label={intl.get('ACCOUNT_39')}
                        email={email}
                        imageCaptcha={imageCaptcha}
                        path="access"
                        onChange={v => this.changeState('newCaptcha', v)}
                        onError={v => this.changeState('newError', v)}
                        error={this.state.newError}
                        h5
                    />

                    <div className="mt-20">
                        <Button loading={loading} type="mobile" onClick={this.modify}>
                            {intl.get('ACCOUNT_27')}
                        </Button>
                    </div>

                    <div className="bottom">
                        {intl.get('ACCOUNT_35')}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountPhone);
