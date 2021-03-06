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
            oldGa: '',
            oldGaError: '',
        };

        this.onChange = this.onChange.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.bind = this.bind.bind(this);
        this.checkOld = this.checkOld.bind(this);
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    onChange(v) {
        this.setState({ phone: v.target.value });
    }

    changeState(key, v) {
        this.setState({ [key]: v });
    }

    next() {
        const { step } = this.state;
        if (step < 2) {
            this.setState(pre => ({ step: pre.step + 1 }));
        }
    }

    last() {
        if (this.state.step > 0) {
            this.setState(pre => ({ step: pre.step - 1 }));
        }
    }

    checkOld() {
        if (this.state.loading) return;

        const {
            oldGa, oldGaError,
        } = this.state;

        if (!oldGa || oldGaError) {
            message.error(intl.get('ACCOUNT_18'));
            return;
        }

        this.setState({ loading: true });
        net.getCheckOldGa({
            captcha: this.state.oldGa,
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                this.setState({ step: 1, gaSecret: res.data });
            }
        });
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
                <div className="mb-20" style={{ fontSize: "16px", color: "#86929D" }}>{intl.get('ACCOUNT_145')}</div>
                <div className="flex-column-center">
                    <div className="form">
                        <Input
                            value={this.state.oldGa}
                            label={intl.get('ACCOUNT_59')}
                            placeholder={intl.get('ACCOUNT_60')}
                            maxlength={6}
                            onChange={v => this.changeState('oldGa', v)}
                            onError={v => this.changeState('oldGaError', v)}
                            error={this.state.oldGaError}
                            type="ga"
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderStep3() {
        const { gaSecret } = this.state;

        return (
            <div>
                <div className="mb-20" style={{ fontSize: "16px", color: "#86929D", marginBottom: "40px" }}>{intl.get('ACCOUNT_52')}</div>
                <div className="flex-column-center">


                    {/*<div className="mb-20 ft-11">{intl.get('ACCOUNT_53')}</div>*/}

                    <div className="mb-20">
                        <QRCode size={83} value={gaSecret.url || ''} />
                    </div>
                </div>
                <div className="ft-11 light-font-color" style={{ margin: "60px auto 80px", fontSize: "16px", color: "#86929d" }}>
                    3、{intl.get('ACCOUNT_54')}

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
                <div className="mb-20" style={{ fontSize: "16px", color: "#86929D" }}>{intl.get('ACCOUNT_58')}</div>
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
            case 1:
                return this.renderStep3();
            case 2:
                return this.renderStep4();
            default:
                return null;
        }
    }

    renderButton() {
        switch (this.state.step) {
            case 0:
                return (
                    <Button loading={this.state.loading} onClick={this.checkOld} type="block" style={{ width: "320px", height: "48px" }}>
                        {intl.get('ACCOUNT_68')}
                    </Button>
                );
            case 1:
                return (
                    <Button onClick={this.next} style={{ width: "320px", height: "48px" }}>{intl.get('ACCOUNT_68')}</Button>
                );
            case 2:
                return (
                    <Button loading={this.state.loading} onClick={this.bind} style={{ width: "320px", height: "48px" }}>
                        {intl.get('ACCOUNT_146')}
                    </Button>
                );
            default:
                return null;
        }
    }

    render() {
        const { step } = this.state;

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>{intl.get('ACCOUNT_143')}</Title>

                <div className="step">
                    <div className="flex-column-center" style={{ width: '100%' }}>
                        <div className="info mb-25">
                            {intl.get('ACCOUNT_61')}
                            <br />
                            {intl.get('ACCOUNT_62')}
                        </div>

                        <Steps current={this.state.step} size="small">
                            <Step title={intl.get('ACCOUNT_144')} />
                            <Step title={intl.get('ACCOUNT_65')} />
                            <Step title={intl.get('ACCOUNT_66')} />
                        </Steps>

                        <div className="mt-40" style={{ width: "100%" }}>
                            {this.renderStep()}
                        </div>
                    </div>

                    <div className="flex-row-between">
                        {
                            step ? (<Button onClick={this.last} type="plant" style={{ width: "320px", height: "48px", marginRight: "64px" }}>{intl.get('ACCOUNT_67')}</Button>) : null
                        }
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(AccountGa);
