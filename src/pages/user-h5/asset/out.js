/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Select, Icon, Input, message } from 'antd';
import md5 from 'md5';
import intl from 'react-intl-universal';

import net from '../../../net';

const { Option } = Select;

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: this.props.coins,
            coin: this.props.coin,
            type: this.props.extra || 'withdraw',
            phone: '',
            amount: '',
            phoneCaptcha: '',
            payPwd: '',
            num: 60,
            imageCaptcha: '',
            imgURL: '/public/ImageCode.php',
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    get renderType() {
        return (
            <div className="form">
                <label>{intl.get('USER_76')}</label>
                <Select value={this.state.type} onChange={(type) => this.setState({ type })} style={{ flex: 1 }}>
                    <Option value="withdraw">{intl.get('USER_30')}</Option>
                    <Option value="trans">{intl.get('USER_33')}</Option>
                </Select>
            </div>
        )
    }

    get renderCoin() {
        const { coins, coin } = this.state;
        return (
            <div className="form">
                <label>{intl.get('USER_31')}</label>
                <Select value={coin} onChange={(coin) => this.setState({ coin })} style={{ flex: 1 }}>
                    {Object.keys(coins).map((item) => (
                        <Option value={item} key={item}>{item}</Option>
                    ))}
                </Select>
            </div>
        )
    }

    // 发送验证码
    sendCap() {
        // 转账 -> /asset/internal_transfer
        // 提币 -> /asset/withdrawal
        net.postSend({
            type: 'phone',
        }).then(res => {
            if (res.ret === 200) {
                this.timer = setInterval(() => {
                    if (this.state.num < 1) {
                        this.timer && clearInterval(this.timer);
                        this.setState({ num: 60 });
                    } else {
                        this.setState({ num: this.state.num - 1 });
                    }
                }, 1000);
            }
        })
    }

    // 提现
    withdraw() {
        const { coin, address, amount, phoneCaptcha, gaCaptcha, payPwd, validByPhone } = this.state;
        if (!address || !amount || !phoneCaptcha || !gaCaptcha || !payPwd) {
            return message.error(intl.get('USER_114'));
        }
        const base = { ...this.props.coins[coin] };
        net.postAssetWithdrawal({
            assetId: base.id,
            address,
            amount,
            payPwd: md5(payPwd),
            captcha: phoneCaptcha,
            gaCaptcha,
            type: validByPhone?'phone':'email',
        }).then(res => {
            if (res.responseCode === '00') {
                message.success(intl.get('USER_77'));
                this.props.history.go(-1);
            } else {
                message.error(intl.get(res.responseCode));
            }
        }).catch(console.log);
    }

    // 转账
    trans() {
        const { coin, phone, amount, phoneCaptcha, payPwd, validByPhone } = this.state;
        if (!phone || !amount || !phoneCaptcha || !payPwd) {
            return message.error(intl.get('USER_114'));
        }
        const base = { ...this.props.coins[coin] };
        net.postAssetTransfer({
            account:phone,
            assetId: base.id,
            amount,
            payPwd: md5(payPwd),
            captcha: phoneCaptcha,
            type: validByPhone?'phone':'email',
        }).then(res => {
            if (res.ret === 200) {
                message.success(intl.get('USER_78'));
                this.props.history.go(-1);
            } 
        })
    }

    changeCode () {
        this.setState({
            imgURL: `${this.state.imgURL}?v=${Math.random()}`
        })
    }

    get getCap() {
        return (
            <div>
                <div className="form input-group">
                    <label>{intl.get('AUTH_IMG_CODE')}</label>
                    <div style={{ flex: 1 }}>
                        <Input
                            value={this.state.imageCaptcha}
                            type="text"
                            onChange = {(e) => {this.setState({ imageCaptcha : e.target.value })}}
                            maxLength={6}
                        />
                        <img src={this.state.imgURL} style={{height: "40px",marginLeft: "10px", cursor: "pointer"}} onClick={() => {this.changeCode()}} alt="" />
                    </div>
                </div>
                <div className="form input-group">
                    <label>{intl.get('USER_79')}</label>
                    <div style={{ flex: 1 }}>
                        <Input value={this.state.phoneCaptcha} onChange={(e) => this.setState({ phoneCaptcha: e.target.value })} />
                        {this.state.num === 60 ? (
                            <a onClick={() => this.sendCap()}>{intl.get('USER_80')}</a>
                        ) : (
                                <a style={{ background: '#D6D9DC', whiteSpace: 'nowrap' }}>{`${this.state.num}s ${intl.get('USER_103')}`}</a>
                            )}
                    </div>
                </div>
            </div>
        )
    }

    get renderWithdraw() {
        const { coin } = this.state;
        const base = { ...this.props.coins[coin] };
        return (
            <div className="ope-content-h5">
                <Row gutter={16}>
                    <Col span={24}>
                        {this.renderType}
                        {this.renderCoin}
                        <div className="form">
                            <label>{intl.get('USER_81')}</label>
                            <Input style={{ flex: 1 }} value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                        </div>
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label style={{ lineHeight: '32px' }}>{intl.get('USER_82')}</label>
                            <div style={{ flex: 1 }}>
                                <Input style={{ flex: 1 }} value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                                <p style={{ margin: 0, paddingTop: '.06rem', display: 'flex', justifyContent: 'space-between', color: '#959FA9', fontSize: '.11rem' }}>
                                    <span>{intl.get('USER_83')}：{base.available || 0} {coin}</span>
                                    <a onClick={() => this.setState({ amount: String(base.available || 0) })}>{intl.get('USER_84')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_63')}</label>
                            <Input style={{ flex: 1 }} type="password" value={this.state.payPwd} onChange={(e) => this.setState({ payPwd: e.target.value })} />
                        </div>
                        {this.getCap}
                    </Col>
                    <Col span={24}>
                        <div className="form">
                            <label>{intl.get('ACCOUNT_59')}</label>
                            <Input style={{ flex: 1 }} value={this.state.gaCaptcha} onChange={(e) => this.setState({ gaCaptcha: e.target.value })} />
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_86')}</label>
                            <Input disabled value={`${base.minFee} ${coin}`} style={{ textAlign: 'right', flex: 1 }} />
                        </div>
                        <div className="warning">
                            <p>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_87')}</span>
                                <span>{intl.get('USER_88')}</span>
                                <span>{intl.get('USER_89')}：{base.minDeposit || 0} {coin}</span>
                                <span>{intl.get('USER_48')}：{base.minFee || 0} {coin}</span>
                                <span>{intl.get('USER_90')}</span>
                                <span>{intl.get('USER_91')}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={24}>
                        <p className="submit"><a onClick={() => this.withdraw()}>{intl.get('USER_30')}</a></p>
                    </Col>
                </Row>
            </div>
        )
    }

    get renderTrans() {
        const { coin } = this.state;
        const base = { ...this.props.coins[coin] };
        return (
            <div className="ope-content-h5">
                <Row gutter={16}>
                    <Col span={24}>
                        {this.renderType}
                        {this.renderCoin}
                        <div className="form">
                            <label>{intl.get('USER_92')}</label>
                            <Input style={{ flex: 1 }} value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                        </div>
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label style={{ lineHeight: '32px' }}>{intl.get('USER_93')}</label>
                            <div style={{ flex: 1 }}>
                                <Input value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                                <p style={{ margin: 0, paddingTop: '.06rem', display: 'flex', justifyContent: 'space-between', color: '#959FA9', fontSize: '.11rem' }}>
                                    <span>{intl.get('USER_121')}：{base.available || 0} {coin}</span>
                                    <a onClick={() => this.setState({ amount: String(base.available || 0) })}>{intl.get('USER_120')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_63')}</label>
                            <Input style={{ flex: 1 }} type="password" value={this.state.payPwd} onChange={(e) => this.setState({ payPwd: e.target.value })} />
                        </div>
                        {this.getCap}
                    </Col>
                    <Col span={24}>
                        <div className="warning">
                            <p>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_97')}</span>
                                <span>{intl.get('USER_98')}：{base.minInternalTransfer || 0} {coin}</span>
                                <span>{intl.get('USER_99')}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={24}>
                        <p className="submit"><a onClick={() => this.trans()}>{intl.get('USER_100')}</a></p>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        if (this.state.type === 'withdraw') {
            return this.renderWithdraw;
        }
        return this.renderTrans;
    }
}
