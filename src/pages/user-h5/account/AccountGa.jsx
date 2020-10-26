import React, { Component } from 'react';
import { Radio, message, Icon } from 'antd';
import { Steps } from 'antd-mobile';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import intl from 'react-intl-universal';
import { Button, Input, Header } from '../../../components';
import net from '../../../net';
import connect from '../../../store/connect';
import { appStore, googlePlay } from '../../../config';

const { Step } = Steps;

class AccountGa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            phone: 0,
            gaCaptcha: '',
            gaCaptchaError: '',
            emailCaptcha: '',
            emailCaptchaError: '',
            loading: false,
            gaSecret: {},
        };

        this.onChange = this.onChange.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.bind = this.bind.bind(this);
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    onChange(v) {
        this.setState({ phone: v.target.value });
    }

    getGa() {
        net.getGaSecret().then((res) => {
            if (res.ret === 200) {
                this.setState({ gaSecret: res.data });
            }
        });
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }

    next() {
        const { step } = this.state;
        if (step < 3) {
            this.setState(pre => ({ step: pre.step + 1 }));
            if (step === 1) this.getGa();
        }
    }

    last() {
        if (this.state.step > 0) {
            this.setState(pre => ({ step: pre.step - 1 }));
        }
    }

    bind() {
        if (this.state.loading) return;

        const {
            gaCaptcha, gaCaptchaError,
        } = this.state;

        if (!gaCaptcha || gaCaptchaError) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }

        this.setState({ loading: true });
        net.postBindGa({
            captcha: this.state.gaCaptcha,
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                message.success(intl.get('ACCOUNT_36'));
                this.props.getUserInfo();
                this.props.history.goBack();
            }
        });
    }

    renderStep1() {
        return (
            <div className="flex-column-start">
                <div className="mb-20">{intl.get('ACCOUNT_42')}</div>
                <Radio.Group onChange={this.onChange} value={this.state.phone}>
                    <Radio value={0}>{intl.get('ACCOUNT_43')}</Radio>
                    <Radio value={1}>{intl.get('ACCOUNT_44')}</Radio>
                </Radio.Group>
            </div>
        );
    }

    renderStep2() {
        const text = {};
        let url = '';

        if (this.state.phone) {
            text.b = intl.get('ACCOUNT_45');
            text.c = intl.get('ACCOUNT_47');
            text.d = intl.get('ACCOUNT_49');
            url = googlePlay;
        } else {
            text.b = intl.get('ACCOUNT_46');
            text.c = intl.get('ACCOUNT_48');
            text.d = intl.get('ACCOUNT_50');
            url = appStore;
        }

        return (
            <div className="flex-column-center">
                <div className="mb-20">{intl.get('ACCOUNT_51')}</div>

                <div className="mb-20 ft-11">{text.b}</div>

                <div className="mb-20">
                    <QRCode size={83} value={url} />
                </div>

                <div className="ft-11 light-font-color ft-c">
                    {text.c}
                    <br />
                    {text.d}
                </div>
            </div>
        );
    }

    renderStep3() {
        const { gaSecret } = this.state;

        return (
            <div className="flex-column-center">
                <div className="mb-20">{intl.get('ACCOUNT_52')}</div>

                <div className="mb-20 ft-11">{intl.get('ACCOUNT_53')}</div>

                <div className="mb-20">
                    <QRCode size={83} value={gaSecret.url || ''} />
                </div>

                <div className="ft-11 light-font-color ft-c">
                    {intl.get('ACCOUNT_54')}
                    <br />
                    {intl.getHTML('ACCOUNT_55')}
                </div>

                <CopyToClipboard text={gaSecret.secret} onCopy={() => message.info('已复制')}>
                    <div className="mt-10">
                        {intl.get('ACCOUNT_56')}
                        {': '}
                        {gaSecret.secret}
                        <Icon type="copy" className="ml-10" />
                    </div>
                </CopyToClipboard>
            </div>
        );
    }

    renderStep4() {
        return (
            <div>
                <div className="mb-20">{intl.get('ACCOUNT_58')}</div>

                <Input
                    value={this.state.gaCaptcha}
                    label={intl.get('ACCOUNT_59')}
                    placeholder={intl.get('ACCOUNT_60')}
                    maxlength={6}
                    onChange={v => this.changeState('gaCaptcha', v)}
                    onError={v => this.changeState('gaCaptchaError', v)}
                    error={this.state.gaCaptchaError}
                    type="ga"
                    h5
                />
            </div>
        );
    }

    renderStep() {
        switch (this.state.step) {
            case 0:
                return this.renderStep1();
            case 1:
                return this.renderStep2();
            case 2:
                return this.renderStep3();
            case 3:
                return this.renderStep4();
            default:
                return null;
        }
    }

    render() {
        const { step } = this.state;

        return (
            <div className="bg-h5 account-h5">
                <Header
                    left={this.props.history.goBack}
                    title="谷歌验证"
                />

                <div className="form step">
                    <div className="info mb-25">
                        {intl.get('ACCOUNT_61')}
                        <br />
                        {intl.get('ACCOUNT_62')}
                    </div>

                    <div>
                        <Steps
                            current={this.state.step}
                            size="small"
                            direction="horizontal"
                        >
                            <Step title={intl.get('ACCOUNT_63')} />
                            <Step title={intl.get('ACCOUNT_64')} />
                            <Step title={intl.get('ACCOUNT_65')} />
                            <Step title={intl.get('ACCOUNT_66')} />
                        </Steps>
                    </div>

                    <div className="mt-40">
                        {this.renderStep()}
                    </div>

                    <div className="flex-row-between mt-40">
                        {
                            step ? (<Button onClick={this.last} type="mobile-plant" style={{ marginRight: '4vw' }}>{intl.get('ACCOUNT_67')}</Button>) : null
                        }
                        {
                            step === 3 ? (
                                <Button loading={this.state.loading} onClick={this.bind} type="mobile">
                                    {intl.get('ACCOUNT_69')}
                                </Button>
                            ) : (
                                    <Button onClick={this.next} type="mobile">{intl.get('ACCOUNT_68')}</Button>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountGa);
