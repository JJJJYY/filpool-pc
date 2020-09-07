import React, { Component } from 'react';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Header } from '../../../components';

import net from '../../../net';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            orders: [],
        };
    }

    componentDidMount() {
        this.getMyOrderList();
    }

    getMyOrderList() {
        net.getMyOrderList().then((res) => {
            if (res.ret == 200) {
                this.setState({ orders: res.data });
            }
        })
    }

    renderLi(key, value) {
        return (
            <a
                onClick={() => this.setState({ status: key })}
                className={this.state.status === key ? 'active' : ''}
            >
                {value}
            </a>
        );
    }

    render() {
        const orders = this.state.orders.filter((item) => {
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
        };

        const columns = [
            {
                th: intl.get('USER_11'),
                td: 'relatedName',
            },
            {
                th: intl.get('USER_12'),
                td: 'pid',
            },
            {
                th: intl.get('USER_13'),
                td: 'createTime',
                render: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                th: intl.get('USER_14'),
                td: 'price',
                render: (v, row) => `${parseFloat(v)} ${row.asset} / ${row.unit}`,
            },
            {
                th: intl.get('USER_15'),
                td: 'quantity',
                render: (v, row) => `${parseFloat(v)} ${row.unit}`,
            },
            {
                th: intl.get('USER_16'),
                td: 'paymentQuantity',
                render: (v, row) => `${parseFloat(v)} ${row.asset}`,
            },
            {
                th: intl.get('USER_17'),
                td: 'asset',
            },
            {
                th: intl.get('USER_18'),
                td: 'status',
                render: (v) => {
                    if (String(v) === '0') {
                        return (<span style={{ color: '#E49C3A' }}>{status[v]}</span>);
                    }
                    return (<span style={{ color: '#24375E' }}>{status[v]}</span>);
                },
            },
            {
                th: '',
                render: (key, row) => {
                    if (String(row.status) === '0') {
                        return (
                            <a
                                onClick={() => this.props.history.push(`/rate_second_step/${row.id}`)}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', color: '#fff', height: '6.6vw', padding: '0 9vw', borderRadius: '3.3vw', background: 'linear-gradient(9deg,rgba(241,135,41,1),rgba(253,181,82,1))',
                                }}
                            >
                                {intl.get('USER_20')}
                            </a>
                        );
                    }
                },
            },
        ];

        return (
            <div className="bg-h5">
                <Header
                    title={intl.get('USER_101')}
                    left={this.props.history.goBack}
                />
                <div className="ope-h5">
                    <div className="ope-h5-tabs" style={{ marginBottom: '7vw' }}>
                        {this.renderLi('', intl.get('USER_22'))}
                        {this.renderLi('0', intl.get('USER_23'))}
                        {this.renderLi('1', intl.get('USER_24'))}
                        {this.renderLi('2', intl.get('USER_25'))}
                        {this.renderLi('3', intl.get('USER_26'))}
                    </div>
                    {orders.length > 0 ? orders.map((obj, i) => (
                        <ul key={String(i)} className="list-h5" style={{ padding: '2vw 4vw 0' }}>
                            {columns.map((item, i1) => (item.th || (!item.th && String(obj.status) === '0')) && (
                                <li key={String(i1)}>
                                    <span>{item.th}</span>
                                    <span>{item.render ? item.render(obj[item.td], obj) : obj[item.td]}</span>
                                </li>
                            ))}
                        </ul>
                    )) : (
                        <p style={{
                            color: '#C0C9D2', fontSize: '4vw', textAlign: 'center', padding: '1vw 0 10vw',
                        }}
                        >
                            {intl.get('USER_102')}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
