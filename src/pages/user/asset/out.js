/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Select, Icon, Input, message, Modal } from 'antd';
import md5 from 'md5';
import intl from 'react-intl-universal';
import connect from '@/store/connect';
import net from '../../../net';
import { reg } from "../../../util";
import inputUtil from "../../../components/input/inputUtil";
import Title from "../account/components/Title";
import { LOGIN } from "@/store/actionsTypes";
import parseFloatData from '@/util/parseFloatData'
const { Option } = Select;

class Index extends Component {

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
            validByPhone: props.redux.userInfo.defaultAccount === 0,
            imageCaptcha: '',
            imgURL: '/public/ImageCode.php',
        }
    }

    componentDidMount() {

        let coins = this.props.coins;

        // delete coins.FIL;

        this.setState({ coins });
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    get renderHeader() {
        return (
            <Title onClick={this.props.history.goBack}>{this.state.type === 'withdraw' ? intl.get('USER_30') : intl.get('USER_33')}</Title>
        )
    }

    get renderType() {
        return (
            <div className="form">
                <label>{intl.get('USER_76')}</label>
                <Select value={this.state.type} onChange={(type) => this.setState({ type })} style={{ flex: 1, height: "40px" }} size="large">
                    <Option value="withdraw">{intl.get('USER_30')}</Option>
                    <Option value="trans">{intl.get('USER_33')}</Option>
                </Select>
            </div>
        )
    }

    get renderCoin() {
        const { coins, coin } = this.state;
        let keys = [];
        for (let variable in coins) {
            if (coins[variable].withdraw === 1) {
                keys.push(coins[variable]);
            }
        }
        return (
            <div className="form">
                <label>{intl.get('USER_31')}</label>
                <Select value={coin} onChange={(coin) => this.setState({ coin })} style={{ flex: 1 }} size="large">
                    {keys.map((item) => (
                        <Option value={item.asset} key={item.asset}>{item.asset + (item.type ? '（' + item.type + '）' : '')}</Option>
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
            type: this.state.validByPhone ? 'phone' : 'email',
            imageCaptcha: this.state.imageCaptcha,
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

        const base = { ...this.props.coins[coin] };

        if (!amount || amount < 0) {
            return message.error("提币数量需要大于0");
        }

        if (amount > (base.available)) {
            return message.error("余额不足");
        }

        if (amount < parseFloat(base.minWithdraw)) {
            return message.error("不能小于最小提币数量");
        }

        if (!phoneCaptcha) {
            return message.error("验证码不能为空");
        }

        if (!payPwd) {
            return message.error("支付密码不能为空");
        }

        if (!address) {
            return message.error("支付密码不能为空");
        }


        if (!address || !amount || !phoneCaptcha || !gaCaptcha || !payPwd) {
            return message.error(intl.get('USER_114'));
        }
        if (parseInt(amount) >= parseInt(base.maxWithdraw)) {
            const that = this.props;
            Modal.confirm({
                content: '为确保资金安全，请联系客服核查！',
                onOk() {
                    net.postAssetWithdrawal({
                        assetId: base.id,
                        address,
                        amount,
                        payPwd: md5(payPwd),
                        captcha: phoneCaptcha,
                        gaCaptcha,
                        type: validByPhone ? 'phone' : 'email',
                    }).then(res => {
                        if (res.ret === 200) {
                            message.success(intl.get('USER_77'));
                            that.history.go(-1);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            net.postAssetWithdrawal({
                assetId: base.id,
                address,
                amount,
                payPwd: md5(payPwd),
                captcha: phoneCaptcha,
                gaCaptcha,
                type: validByPhone ? 'phone' : 'email',
            }).then(res => {
                if (res.ret === 200) {
                    message.success(intl.get('USER_77'));
                    this.props.history.go(-1);
                }
            })
        }
    }

    // 转账
    trans() {
        const { coin, phone, amount, phoneCaptcha, payPwd, validByPhone } = this.state;

        const base2 = { ...this.props.coins[coin] };

        if (!amount || amount < 0) {
            return message.error("提币数量需要大于0");
        }

        if (amount < parseFloat(base2.minWithdraw)) {
            return message.error("不能小于最小提币数量");
        }

        if (amount > (base2.available)) {
            return message.error("余额不足");
        }

        /*if(!inputUtil.phoneCheck(phone))
        {
            return message.error("手机号码格式错误");
        }*/

        if (!phone) {
            return message.error("请输入收账人手机号或邮箱");
        }

        if (!phoneCaptcha) {
            return message.error("验证码不能为空");
        }

        if (!payPwd) {
            return message.error("支付密码不能为空");
        }

        if (!phone || !amount || !phoneCaptcha || !payPwd) {
            return message.error(intl.get('USER_114'));
        }
        net.postAssetTransfer({
            account: phone,
            assetId: base2.id,
            amount,
            payPwd: md5(payPwd),
            captcha: phoneCaptcha,
            type: validByPhone ? 'phone' : 'email',
        }).then(res => {
            if (res.ret === 200) {
                message.success(intl.get('USER_78'));
                this.props.history.go(-1);
            }
        })
    }

    toggleValidType() {
        this.setState((preState) => {
            return {
                validByPhone: !preState.validByPhone
            }
        });
    }

    changeCode() {
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
                            onChange={(e) => { this.setState({ imageCaptcha: e.target.value }) }}
                            maxLength={6}
                        />
                        <img src={this.state.imgURL} style={{ height: "40px", marginLeft: "10px", cursor: "pointer" }} onClick={() => { this.changeCode() }} alt="" />
                    </div>
                </div>
                <div className="form input-group">
                    <label>{this.state.validByPhone ? intl.get('USER_79') : intl.get("ACCOUNT_39")}</label>
                    <div style={{ flex: 1 }}>
                        <Input value={this.state.phoneCaptcha}
                            pathType={this.state.validByPhone ? "phone" : "email"}
                            onChange={(e) => this.setState({ phoneCaptcha: e.target.value })} />
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
            <div className="ope">
                {this.renderHeader}
                <Row gutter={30}>
                    <div style={{ width: "50%" }}>
                        {this.renderType}
                        {this.renderCoin}
                        <div className="form">
                            <label>{intl.get('USER_81')}</label>
                            <Input style={{ flex: 1 }} value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                        </div>
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label style={{ lineHeight: '32px' }}>{intl.get('USER_82')}</label>
                            <div style={{ flex: 1 }}>
                                <Input style={{ flex: 1 }} value={this.state.amount} onChange={(e) => {
                                    let val = e.target.value;
                                    if (reg.regFloat(Number(val))) {
                                        this.setState({ amount: e.target.value })
                                    }
                                }} autoComplete="new-password" />
                                <p style={{ margin: 0, paddingTop: '.06rem', display: 'flex', justifyContent: 'space-between', color: '#959FA9', fontSize: '.11rem' }}>
                                    <span>{intl.get('USER_83')}：{parseFloatData(base.available) || 0} {coin}</span>
                                    <a onClick={() => this.setState({ amount: String(base.available || 0) })}>{intl.get('USER_84')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_85')}</label>
                            <Input style={{ flex: 1 }} type="password" autoComplete="new-password" value={this.state.payPwd} onChange={(e) => this.setState({ payPwd: e.target.value })} />
                        </div>
                        {this.getCap}
                    </div>
                    <div style={{ width: "50%" }}>
                        <div className="form">
                            <label>{intl.get('ACCOUNT_59')}</label>
                            <Input style={{ flex: 1 }} value={this.state.gaCaptcha} onChange={(e) => this.setState({ gaCaptcha: e.target.value })} />
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_86')}</label>
                            <Input disabled value={`${parseFloat(base.minFee)} ${coin}`} style={{ flex: 1, textAlign: 'right' }} />
                        </div>
                        <div style={{ textAlign: "center", color: "#E49C3A", marginTop: "20px" }}>
                            <button style={{ backgroundColor: "transparent" }} onClick={() => this.toggleValidType()}>{this.state.validByPhone ? intl.get("USER_140") : intl.get("USER_141")}</button>
                        </div>
                        <Col span={24}>
                            <p className="submit"><a onClick={() => this.withdraw()}>{intl.get('USER_30')}</a></p>
                        </Col>
                        <div className="warning" style={{ marginLeft: '18px' }}>
                            <p style={{ color: "#575C62" }}>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_87')}</span>
                                <span style={{ marginTop: "30px" }}>{intl.get('USER_88')}</span>
                                <span style={{ marginTop: "30px" }}>{intl.get('USER_89')}：{parseFloat(base.minWithdraw) || 0} {coin}</span>
                                <span>{intl.get('USER_48')}：{parseFloat(base.minFee) || 0} {coin}</span>
                                <span>{intl.get('USER_90')}</span>
                                <span>{intl.get('USER_91')}</span>
                            </p>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }

    get renderTrans() {
        const { coin } = this.state;
        const base = { ...this.props.coins[coin] };
        return (
            <div className="ope">
                {this.renderHeader}
                <Row gutter={30}>
                    <div style={{ width: "50%" }}>
                        {this.renderType}
                        {this.renderCoin}
                        <div className="form">
                            <label>{intl.get('USER_92')}</label>
                            <Input style={{ flex: 1 }} value={this.state.phone} placeholder={"请输入转账人手机号或邮箱"} onChange={(e) => this.setState({ phone: e.target.value })} />
                        </div>
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label style={{ lineHeight: '32px' }}>{intl.get('USER_93')}</label>
                            <div style={{ flex: 1 }}>
                                <Input style={{ flex: 1 }} value={this.state.amount} placeholder={"请输入转账数量"} onChange={(e) => {
                                    let val = e.target.value;
                                    if (reg.regFloat(Number(val))) {
                                        this.setState({ amount: e.target.value })
                                    }
                                }} />
                                <p style={{ margin: 0, paddingTop: '.06rem', display: 'flex', justifyContent: 'space-between', color: '#959FA9', fontSize: '.11rem' }}>
                                    <span>{intl.get('USER_121')}：{parseFloatData(base.available) || 0} {coin}</span>
                                    <a onClick={() => this.setState({ amount: String(base.available || 0) })}>{intl.get('USER_120')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_96')}</label>
                            <Input style={{ flex: 1 }} type="password" value={this.state.payPwd} onChange={(e) => this.setState({ payPwd: e.target.value })} />
                        </div>
                        {this.getCap}
                    </div>
                    <div style={{ width: "50%", textAlign: "center", color: "#E49C3A", marginTop: "20px" }}>
                        <button style={{ backgroundColor: "transparent" }} onClick={() => this.toggleValidType()}>{this.state.validByPhone ? "切换邮箱验证" : "切换手机验证"}</button>
                    </div>
                    <Col span={24}>
                        <p className="submit" style={{ width: "50%" }}><a onClick={() => this.trans()}>{intl.get('USER_100')}</a></p>
                    </Col>
                    <div style={{ width: "50%" }}>
                        <div className="warning" style={{ marginLeft: '18px' }}>
                            <p className="title">{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_97')}</span>
                                <span>{intl.get('USER_98')}：{parseFloat(base.minWithdraw) || 0} {coin}</span>
                                <span>{intl.get('USER_99')}</span>
                            </p>
                        </div>
                    </div>
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

export default connect(Index)