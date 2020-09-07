/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Select, Icon, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QrCode from 'qrcode.react';
import intl from 'react-intl-universal';

import net from '../../../net';

const { Option } = Select;

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: this.props.coins,
            coin: this.props.coin,
            base: { ...this.props.coins[this.props.coin] },
            address: ''
        }
    }

    componentDidMount() {
        this.getAddress();
    }

    getAddress() {
        const { base } = this.state;
        net.getAssetAddress({
            asset: base.asset, 
            blockChain: base.blockChain,
        }).then(res => {
            if (res.ret == 200) {
                this.setState({ address: res.data.address });
            }
        })
    }

    render() {
        const { coins, coin, base } = this.state;
        return (
            <div className="ope-content-h5">
                <Row gutter={16}>
                    <Col span={24}>
                        <div className="form">
                            <label>{intl.get('USER_31')}</label>
                            <Select value={coin} onChange={(coin) => this.setState({ coin, base: coins[coin] }, () => this.getAddress())} style={{ flex: 1 }}>
                                {Object.keys(coins).map((item) => (
                                    <Option value={item} key={item}>{item}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_68')}</label>
                            <p style={{ flex: 1, margin: 0, color: '#24375E', fontSize: '3.5vw', display: 'flex', alignItems: 'center', wordBreak: 'break-all' }}>
                                {this.state.address}
                                <CopyToClipboard text={this.state.address} onCopy={() => message.info('已复制')}>
                                    <Icon type="copy" style={{ marginLeft: '.1rem', color: '#959FA9', fontSize: '.14rem' }} />
                                </CopyToClipboard>
                            </p>
                        </div>
                        {/* <div className="form">
                            <label>{intl.get('USER_70')}</label>
                            <Input disabled style={{ width: '100%', textAlign: 'right' }} value={`${base.minFee} ${coin}`} />
                        </div> */}
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label>{intl.get('USER_71')}</label>
                            <QrCode value={this.state.address || 'loading'} />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="warning">
                            <p>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_72', { key1: coin })}</span>
                                <span>{intl.get('USER_73', { key1: parseFloat(base.minDeposit), key2: coin })}</span>
                                {/* <span>{intl.get('USER_74')}：{base.minFee} {coin}</span> */}
                                <span>{intl.get('USER_75')}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
