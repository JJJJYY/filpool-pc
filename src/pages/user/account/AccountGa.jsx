import React, { Component } from 'react';
import intl from 'react-intl-universal';
import {
    Steps, Radio, message, Popover, Icon,
} from 'antd';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Input } from '../../../components';
import Title from './components/Title';
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
            loading: false,
            gaSecret: {},
        };

        this.onChange = this.onChange.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.bind = this.bind.bind(this);
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
            if (step === 0) this.getGa();
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
            <div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D"}}>{intl.get('ACCOUNT_154')}</div>
                <div className="flex-row-center" style={{fontSize: "18px", justifyContent: "space-evenly", margin: "80px auto"}}>
                    <div style={{textAlign: "center"}}>
                        {/*<Radio.Group onChange={this.onChange} value={this.state.phone}>
                            <Radio value={0}>{intl.get('ACCOUNT_43')}</Radio>
                            <Radio value={1}>{intl.get('ACCOUNT_44')}</Radio>
                        </Radio.Group>*/}
                        <QRCode size={83} value={appStore} />
                        <p style={{marginTop: "32px"}}>{intl.get('ACCOUNT_43')}</p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        {/*<Radio.Group onChange={this.onChange} value={this.state.phone}>
                            <Radio value={0}>{intl.get('ACCOUNT_43')}</Radio>
                            <Radio value={1}>{intl.get('ACCOUNT_44')}</Radio>
                        </Radio.Group>*/}
                        <QRCode size={83} value={googlePlay} />
                        <p style={{marginTop: "32px"}}>{intl.get('ACCOUNT_44')}</p>
                    </div>
                </div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D", marginBottom: "80px"}}>{intl.get('ACCOUNT_155')}</div>
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
            <div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D", marginBottom: "40px"}}>{intl.get('ACCOUNT_52')}</div>
                <div className="flex-column-center">
                    <div className="mb-20">{intl.get('ACCOUNT_51')}</div>
                    <div className="mb-20 ft-11">{text.b}</div>
                    <div className="mb-20">
                        <QRCode size={83} value={url} />
                    </div>
                </div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D", marginBottom: "40px"}}>{intl.get('ACCOUNT_52')}</div>
            </div>
        );
    }

    renderStep3() {
        const { gaSecret } = this.state;

        return (
            <div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D", marginBottom: "40px"}}>{intl.get('ACCOUNT_52')}</div>
                <div className="flex-column-center">
                    {/*<div className="mb-20">{intl.get('ACCOUNT_52')}</div>

                    <div className="mb-20 ft-11">{intl.get('ACCOUNT_53')}</div>*/}

                    <div className="mb-20">
                        <QRCode size={83} value={gaSecret.url || ''} />
                    </div>
                </div>
                <div className="ft-11 light-font-color" style={{margin: "60px auto 80px", fontSize: "16px", color: "#86929d"}}>
                    2、{intl.get('ACCOUNT_54')}
                    {/*<br />*/}
                    <Popover content={(
                        <div className="sub-font-color ft-11" style={{ padding: '.2rem .1rem' }}>
                            <div>{intl.get('ACCOUNT_56')}</div>
                            <CopyToClipboard text={gaSecret.secret} onCopy={() => message.info(intl.get('ACCOUNT_57'))}>
                                <div className="mt-10">
                                    {gaSecret.secret}
                                    {' '}
                                    <Icon type="copy" />
                                </div>
                            </CopyToClipboard>
                        </div>
                    )}
                    >
                        {intl.getHTML('ACCOUNT_55')}
                    </Popover>
                </div>
            </div>
        );
    }

    renderStep4() {
        return (
            <div>
                <div className="mb-20" style={{fontSize: "16px", color: "#86929D"}}>{intl.get('ACCOUNT_58')}</div>
                <div className="flex-column-center">
                    <div className="form">
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
                    </div>
                </div>
            </div>
        );
    }

    renderStep() {
        switch (this.state.step) {
        case 0:
            return this.renderStep1();
        /*case 1:
            return this.renderStep2();*/
        case 1:
            return this.renderStep3();
        case 2:
            return this.renderStep4();
        default:
            return null;
        }
    }

    render() {
        const { step } = this.state;

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>{intl.get('ACCOUNT_14')}</Title>

                <div className="step">
                    <div className="flex-column-center" style={{ width: '100%' }}>
                        <div className="info mb-25">
                            {intl.get('ACCOUNT_61')}
                            <br />
                            {intl.get('ACCOUNT_62')}
                        </div>

                        <div style={{width: "100%", paddingRight: "8%"}}>
                            <Steps current={this.state.step} size="small">
                                <Step title={intl.get('ACCOUNT_63')} />
                                {/*<Step title={intl.get('ACCOUNT_64')} />*/}
                                <Step title={intl.get('ACCOUNT_65')} />
                                <Step title={intl.get('ACCOUNT_66')} />
                            </Steps>
                        </div>

                        <div className="mt-40" style={{ width: '100%' }}>
                            {this.renderStep()}
                        </div>
                    </div>

                    <div className="flex-row-between">
                        {
                            step ? (<Button onClick={this.last} type="plant" style={{width: "320px", height: "48px", marginRight: "64px"}}>{intl.get('ACCOUNT_67')}</Button>) : null
                        }
                        {
                            step === 2 ? (
                                <Button loading={this.state.loading} onClick={this.bind} type={step ? '' : 'block'} style={{width: "320px", height: "48px"}}>
                                    {intl.get('ACCOUNT_69')}
                                </Button>
                            ) : (
                                <Button onClick={this.next} type={step ? '' : 'block'} style={{width: "320px", height: "48px"}}>{intl.get('ACCOUNT_68')}</Button>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountGa);
