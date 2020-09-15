import React, { Component } from "react";
import moment from 'moment';
import Table from '../table';
import styles from '../table.module.less';
import intl from 'react-intl-universal';

import net from '../../../net';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: '',
            orders: []
        }
    }

    componentDidMount() {
        this.getMyOrderList();
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
                th: intl.get('USER_11'),
                style: {width: "210px"},
                td: 'relatedName',
            },
            {
                th: intl.get('USER_12'),
                style: {width: "230px"},
                td: 'pid',
            },
            {
                th: intl.get('USER_13'),
                style: {width: "180px"},
                td: 'createTime',
                render: (v) => v
            },
            {
                th: intl.get('USER_14'),
                td: 'price',
                render: (v, row) => `${v} ${row.asset === 'UNKNOWN' ? 'USDT' : row.asset}/${row.unit}`,
            },
            {
                th: intl.get('USER_15'),
                textAlign: "center",
                td: 'quantity',
                render: (v,row) => `${parseFloat(v)} ${row.unit}`,
            },
            {
                th: intl.get('USER_16'),
                textAlign: "center",
                td: 'paymentQuantity',
                render: (v, row) => `${parseFloat(v)} ${row.asset === 'UNKNOWN' ? 'USDT' : row.asset}`,
            },
            {
                th: intl.get('USER_17'),
                textAlign: "center",
                td: 'asset',
                render: (v) => v === 'UNKNOWN' ? 'USDT' : v,
            },
            {
                th: intl.get('USER_18'),
                textAlign: "center",
                td: 'status',
                render: (v) => {
                    if (String(v) === '0') {
                        return (<span style={{ color: '#E49C3A' }}>{status[v]}</span>)
                    } else {
                        return (<span style={{ color: '#24375E' }}>{status[v]}</span>)
                    }
                }
            },
            {
                th: intl.get('USER_19'),
                style: {width: "90px"},
                textAlign: "center",
                render: (key, row) => {
                    if (String(row.status) === '0') {
                        return (
                            /*<a
                                onClick={() => this.props.history.push(`/rate_second_step/${row.id}`)}
                                style={{ display: 'inline-block', color: '#E49C3A', lineHeight: '.2rem', padding: '0 .18rem', borderRadius: '.1rem', border: '1px solid #E49C3A' }}
                            >{intl.get('USER_20')}</a>*/
                            <a
                                onClick={() => this.props.history.push(`/orderPay?stepIndex=1&orderId=${row.id}`)}
                                className={styles.handleBtn}
                            >{intl.get('USER_20')}</a>
                        )
                    } else {
                        return (
                            <a
                                onClick={() => this.props.history.push(`/rate`)}
                                className={styles.handleBtn}
                            >{intl.get('USER_123')}</a>
                        )
                    }
                }
            }
        ];

        return (
            <div className="order">
                <div className="order-filter">
                    <label>{intl.get('USER_21')}：</label>
                    <ul>
                        {this.renderLi('', intl.get('USER_22'))}
                        {this.renderLi('0', intl.get('USER_23'))}
                        {this.renderLi('1', intl.get('USER_24'))}
                        {this.renderLi('2', intl.get('USER_25'))}
                        {/*{this.renderLi('3', intl.get('USER_26'))}*/}
                    </ul>
                </div>
                <Table {...this.props} data={orders} columns={columns} />
            </div>
        )
    }
}
