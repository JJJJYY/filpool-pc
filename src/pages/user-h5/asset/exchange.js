/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Icon, Input, message } from 'antd';
import md5 from 'md5';
import intl from 'react-intl-universal';

import net from '../../../net';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            phoneCaptcha: '',
            payPwd: '',
            rate: 0
        }
    }

    componentDidMount() {

        net.getDistributionRate().then(res => {
            if (res.responseCode === '00') {
                this.setState({ rate: res.content.value1 });
            }
        }).catch(console.log);

    }

    submit() {

        let { amount, payPwd } = this.state;

        if (!amount || !payPwd) {
            return message.error(intl.get('USER_114'));
        }
        net.postDistribution({
            count: amount,
            payPwd: md5(payPwd)
        }).then(res => {
            if (res.responseCode === '00') {
                message.success(intl.get('USER_56'));
                this.props.history.go(-1);
            } else {
                message.error(intl.get(res.responseCode));
            }
        }).catch(console.log);

    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        const base = { ...this.props.coins[this.props.coin] };
        return (
            <div className="ope-content-h5">
                <Row gutter={16}>
                    <Col span={24}>
                        <div className="form">
                            <label>{intl.get('USER_28')}</label>
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                <Input disabled defaultValue="FILP" style={{ flex: 1, textAlign: 'center' }} />
                                <Icon type="caret-right" style={{ margin: '0 .1rem', color: '#C0C9D2' }} />
                                <Input disabled defaultValue={intl.get('USER_58')} style={{ flex: 1, textAlign: 'center' }} />
                            </div>
                        </div>
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label style={{ lineHeight: '32px' }}>{intl.get('USER_59')}(FILP)</label>
                            <div style={{ flex: 1 }}>
                                <Input value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                                <p style={{ margin: 0, paddingTop: '.06rem', display: 'flex', justifyContent: 'space-between', color: '#959FA9', fontSize: '.11rem' }}>
                                    <span>{intl.get('USER_94')}：{base.available || 0} FILP</span>
                                    <a onClick={() => this.setState({ amount: String(base.available || 0) })}>{intl.get('USER_95')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_62')}(GB)</label>
                            <Input disabled style={{ textAlign: 'right', flex: 1 }} value={String((Number(this.state.amount) * Number(this.state.rate) || 0))} />
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_63')}</label>
                            <Input style={{ flex: 1 }} type="password" value={this.state.payPwd} onChange={(e) => this.setState({ payPwd: e.target.value })} />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="warning">
                            <p>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_65')}</span>
                                <span>{intl.get('USER_66')}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={24}>
                        <p className="submit"><a onClick={() => this.submit()}>{intl.get('USER_100')}</a></p>
                    </Col>
                </Row>
            </div>
        )
    }
}
