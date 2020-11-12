import React, { Component } from "react";
import moment from 'moment';
import styles from '../table.module.less';
import intl from 'react-intl-universal';
import parseFloatData from '@/util/parseFloatData'
import net from '../../../net';
import { Tabs, Table } from 'antd';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: '',
            orders: [],
            thisOrders: [],
        }
    }

    componentDidMount() {
        this.getMyOrderList();
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    getMyOrderList() {
        net.getMyOrderList().then(res => {
            if (res.ret == 200) {
                this.setState({ orders: res.data instanceof Array ? res.data : [] });
            }
        })
    }

    renderLi(key, value) {
        return (
            <li
                onClick={() => this.setState({ status: key })}
                className={this.state.status === key ? 'active' : ''}>{value}</li>
        )
    }


    // 类型
    dataType() {
        return [
            { status: 0, name: '排队中' },
            { status: 1, name: '加速中' },
            { status: 2, name: '已加速' },
        ]
    }
    callback = (key) => {
        net.getFlashSaleOrderList({
            page: 1,
            count: 1000
        }).then(res => {
            this.setState({ thisOrders: res.data.list instanceof Array ? res.data.list : [] });
        })
    }

    render() {
        const orders = this.state.orders.filter(item => {
            switch (this.state.status) {
                case '0':
                    return String(item.status) === '0';
                case '1':
                    return String(item.status) === '1';
                case '2':
                    return String(item.status) === '2';
                case '3':
                    return String(item.status) === '3';
                default:
                    return true;
            }
        });
        const status = {
            0: intl.get('USER_7'),
            1: intl.get('USER_8'),
            2: intl.get('USER_9'),
            3: intl.get('USER_10'),
        }

        const columns = [
            {
                title: intl.get('USER_11'),
                dataIndex: 'relatedName',
            },
            {
                title: intl.get('USER_12'),
                dataIndex: 'pid',
            },
            {
                title: intl.get('USER_13'),
                dataIndex: 'createTime',
                render: (v) => v
            },
            {
                title: intl.get('USER_14'),
                dataIndex: 'price',
                render: (v, row) => `${parseFloatData(v)} ${row.asset === 'UNKNOWN' ? 'USDT' : row.asset}/${row.unit}`,
            },
            {
                title: intl.get('USER_15'),
                dataIndex: 'quantity',
                render: (v, row) => `${parseFloatData(v)} ${row.unit}`,
            },
            {
                title: intl.get('USER_16'),
                dataIndex: 'paymentQuantity',
                render: (v, row) => `${parseFloatData(v)} ${row.asset === 'UNKNOWN' ? 'USDT' : row.asset}`,
            },
            {
                title: intl.get('USER_17'),
                dataIndex: 'asset',
                render: (v) => v === 'UNKNOWN' ? 'USDT' : v,
            },
            {
                title: intl.get('USER_18'),
                dataIndex: 'status',
                render: (v) => {
                    if (String(v) === '0') {
                        return (<span style={{ color: '#E49C3A' }}>{status[v]}</span>)
                    } else {
                        return (<span style={{ color: '#24375E' }}>{status[v]}</span>)
                    }
                }
            },
        ];

        const thisClumns = [
            {
                title: '排队等待人数',
                align: "center",
                dataIndex: 'wait_num',
            },
            {
                title: '已经填充的算力',
                align: "center",
                dataIndex: 'fill_power',
                render: (v, row) => `${parseFloatData(v)}`,
            },
            {
                title: intl.get('USER_12'),
                style: { width: "300px" },
                dataIndex: 'pid',
            },
            {
                title: intl.get('USER_13'),
                dataIndex: 'create_time',
                render: (v) => v
            },
            {
                title: intl.get('USER_14'),
                dataIndex: 'price',
                render: (v, row) => `${parseFloatData(v)} ${row.pay_coin}/TB`,
            },
            {
                title: intl.get('USER_15'),
                dataIndex: 'power',
                render: (v, row) => `${parseFloatData(v)}TB`,
            },
            {
                title: intl.get('USER_16'),
                dataIndex: 'pay_coin_amount',
                render: (v, row) => `${parseFloatData(v)} ${row.pay_coin}`,
            },
            {
                title: intl.get('USER_17'),
                dataIndex: 'pay_coin',
                render: (v) => v === 'FIL' ? v : 'USDT',
            },
            {
                title: intl.get('USER_18'),
                fixed: 'right',
                dataIndex: 'status',
                render: (v) => this.dataType().map(val => {
                    if (val.status === v) {
                        return val.name
                    }
                })
            },
        ]

        return (
            < div className="order" >
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <Tabs.TabPane tab="算力订单" key="1">
                        <div className="order-filter">
                            <label>{intl.get('USER_21')}：</label>
                            <ul>
                                {this.renderLi('', intl.get('USER_22'))}
                                {this.renderLi('0', intl.get('USER_23'))}
                                {this.renderLi('1', intl.get('USER_24'))}
                                {this.renderLi('2', intl.get('USER_25'))}
                            </ul>
                        </div >
                        <Table dataSource={orders} columns={columns} rowKey={(record) => record.id} />
                    </Tabs.TabPane >
                    <Tabs.TabPane tab="算力加速订单" key="2">
                        <Table dataSource={this.state.thisOrders} rowKey={(record) => record.id} columns={thisClumns} />
                    </Tabs.TabPane>
                </Tabs >
            </div >
        )
    }
}
