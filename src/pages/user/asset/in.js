/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Select, Icon, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QrCode from 'qrcode.react';
import intl from 'react-intl-universal';

import net from '../../../net';
import Title from "../account/components/Title";

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

        let coins = this.props.coins;

        // delete coins.FIL;

        this.setState({ coins: coins });
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
        let keys = [];
        for (let variable in coins) {
            if (coins[variable].deposit === 1) {
                keys.push(coins[variable]);
            }
        }

        return (
            <div className="ope">
                <Title onClick={this.props.history.goBack}>{intl.get('USER_29')}</Title>
                <Row gutter={30}>
                    <div style={{ width: "50%" }}>
                        <div className="form">
                            <label>{intl.get('USER_31')}</label>
                            <Select value={coin} onChange={(coin) => this.setState({ coin, base: coins[coin] }, () => this.getAddress())} style={{ flex: 1 }}>
                                {keys.map((item) => (
                                    <Option value={item.asset} key={item.asset}>{item.asset + (item.type ? '（' + item.type + '）' : '')}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_68')}</label>
                            <p style={{ margin: 0, color: '#24375E', fontSize: '.14rem', display: 'flex', alignItems: 'center' }}>
                                <span style={{ maxWidth: '438px', overflow: "hidden", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{this.state.address}</span>
                                <CopyToClipboard text={this.state.address} onCopy={() => message.info(intl.get('USER_69'))}>
                                    <Icon type="copy" style={{ marginLeft: '.1rem', color: '#959FA9', fontSize: '.14rem' }} />
                                </CopyToClipboard>
                            </p>
                        </div>
                        {/* <div className="form">
                            <label>{intl.get('USER_70')}</label>
                            <Input disabled style={{ flex: 1, textAlign: 'right' }} value={`${base.minFee} ${coin}`} />
                        </div> */}
                        <div className="form" style={{ alignItems: 'flex-start' }}>
                            <label>{intl.get('USER_71')}</label>
                            <QrCode value={this.state.address || 'loading'} />
                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div className="warning">
                            <p>{intl.get('USER_64')}：</p>
                            <p>
                                <span>{intl.get('USER_72', { key1: coin })}</span>
                                <span>{intl.get('USER_73', { key1: parseFloat(base.minDeposit), key2: coin })}</span>
                                {/* <span>{intl.get('USER_74')}：{base.minFee} {coin}</span> */}
                                <span style={{ marginTop: "20px" }}>{intl.get('USER_75')}</span>
                            </p>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}
