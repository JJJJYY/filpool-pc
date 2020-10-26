/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Row, Col, Select, Icon } from 'antd';
import moment from 'moment';
import Table from '../table';
import intl from 'react-intl-universal';

import net from '../../../net';
import Title from "../account/components/Title";

const { Option } = Select;

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: {},
            coin: '',
            type: 'in',
            pipeline: []
        }
    }

    componentDidMount() {
        net.getAssetMy().then(res => {
            if (res.ret == 200) {
                const coins = {};
                res.data.map(item => {
                    coins[item.asset] = item;
                });
                this.setState({ coins, coin: Object.keys(coins)[0] || '' }, () => this.getPipeline());
            }
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    getPipeline() {
        net.getAssetPipeline(this.state.coin).then(res => {
            if (res.responseCode == '00') {
                this.setState({ pipeline: res.data });
            }
        }).catch(console.log);
    }

    get renderCoin() {
        const { coins, coin } = this.state;
        return (
            <div className="form">
                <label>{intl.get('USER_31')}</label>
                <Select value={coin} onChange={(coin) => this.setState({ coin }, () => this.getPipeline())} style={{ flex: 1 }}>
                    {Object.keys(coins).map((item) => (
                        <Option value={item} key={item}>{item}</Option>
                    ))}
                </Select>
            </div>
        )
    }

    get renderType() {
        return (
            <div className="form">
                <label>{intl.get('USER_32')}</label>
                <Select value={this.state.type} onChange={(type) => this.setState({ type })} style={{ flex: 1 }}>
                    <Option value="in">{intl.get('USER_29')}</Option>
                    <Option value="out">{intl.get('USER_30')}</Option>
                    <Option value="trans">{intl.get('USER_33')}</Option>
                    <Option value="exchange">{intl.get('USER_36')}</Option>
                    <Option value="reward">{'奖励赠送'}</Option>
                </Select>
            </div>
        )
    }

    render() {
        const { coin } = this.state;
        const base = { ...this.state.coins[coin] };
        const pipeline = this.state.pipeline.filter(item => {
            switch (this.state.type) {
                case 'in':
                    return String(item.type) === '3';
                case 'out':
                    return String(item.type) === '4' || String(item.type) === '5';
                case 'trans':
                    return String(item.type) === '8' || String(item.type) === '9';
                case 'exchange':
                    return String(item.type) === '1';
                case 'reward':
                    return String(item.type) === '17' || String(item.type) === '18' || String(item.type) === '19';
                default:
                    return true;
            }
        });

        const status = {
            0: intl.get('USER_34'),
            1: intl.get('USER_35'),
            2: intl.get('USER_119')
        }

        const types = {
            1: intl.get('USER_36'),
            3: intl.get('USER_37'),
            4: intl.get('USER_38'),
            5: intl.get('USER_39'),
            8: intl.get('USER_40'),
            9: intl.get('USER_41'),
            10: intl.get('USER_42'),
            11: intl.get('USER_43'),
            12: intl.get('USER_44'),
            13: intl.get('USER_45'),
            14: intl.get('USER_46'),
            15: intl.get('USER_47'),
            16: "兑换",
            17: "购买奖励",
            18: "邀请奖励",
            19: "注册奖励",
        }

        const columns = [
            {
                th: intl.get('USER_32'),
                td: 'type',
                render: (v) => types[v]
            },
            {
                th: intl.get('USER_113'),
                td: 'quantity',
                render: (v, row) => `${v || '0'} ${row.asset}`
            },
            {
                th: intl.get('USER_49'),
                td: 'createTime',
                render: (v) => moment(v).format('YYYY-MM-DD')
            },
            {
                th: intl.get('USER_48'),
                td: 'serviceCharge',
                render: (v) => v || '-'
            },
            {
                th: intl.get('USER_50'),
                td: 'hash',
                render: (v) => v || '-'
            },
            {
                th: intl.get('USER_51'),
                td: 'status',
                render: (v) => status[v]
            }
        ];
        return (
            <div className="ope">
                <Title onClick={this.props.history.goBack}>{intl.get('USER_52')}</Title>
                <Row gutter={30}>
                    <Col span={12}>
                        {this.renderCoin}
                    </Col>
                    <Col span={12}>
                        {this.renderType}
                    </Col>
                    <Col span={12} className="ope-details">
                        <div className="form">
                            <label>{intl.get('USER_53')}</label>
                            <span>{(base.available || 0) + (base.frozen || 0)}</span>
                            <a onClick={() => this.props.history.push(`/user/asset/ope?type=in&coin=${this.state.coin}`)}>{intl.get('USER_37')}</a>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_54')}</label>
                            <span>{base.available || 0}</span>
                            <a onClick={() => this.props.history.push(`/user/asset/ope?type=out&coin=${this.state.coin}`)}>{intl.get('USER_38')}</a>
                        </div>
                        <div className="form">
                            <label>{intl.get('USER_55')}</label>
                            <span>{base.frozen || 0}</span>
                            <a onClick={() => this.props.history.push(`/user/asset/ope?type=out&coin=${this.state.coin}&extra=trans`)}>{intl.get('USER_33')}</a>
                        </div>
                    </Col>
                </Row>
                <Table {...this.props} data={pipeline} columns={columns} />
            </div>
        )
    }

}
