import React, { Component } from 'react';
import intl from 'react-intl-universal';
import '../account/index.less';
import styles from '../index.module.less';
import moment from 'moment';
import net from '../../../net';
import Table from '../table';
import connect from '@/store/connect';

class Rate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myWeight: {},
            weights: [],
            details: [],
            tab: 0,
        };
        this.typeAry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    componentDidMount() {
        net.getMyWeight({
            type: 0,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState({
                    myWeight: res.data
                });
            }
        });

        net.getMyWeightApp().then((res) => {
            if (res.ret === 200) {
                this.setState({
                    weights: res.data
                });
            }
        });
    }

    renderDetail() {
        if (this.state.details.length === 0) {
            return;
        }
        let type = this.state.details[0].type;
        let columns = [];
        switch (type) {
            case 1:
            case 7:
                columns = this.getTable1();
                break;
            case 8:
                columns = this.getTable4();
                break;
            default:
                columns = this.getTable3();
        }

        return (<Table columns={columns} data={this.state.details} />);
    }

    getTable1() {
        return [
            {
                th: intl.get('ACCOUNT_90'),
                style: {
                    width: '208px'
                },
                td: 'relatedName',
            },
            {
                th: intl.get('RATE_15'),
                td: 'price',
                render: (text, obj) => text ? `${parseFloat(text)} ${obj.asset}/${obj.unit}` : '',
            },
            {
                th: intl.get('RATE_109'),
                td: 'quantity',
                style: {
                    width: "120px"
                },
                render: (text, obj) => text ? `${parseFloat(text)} ${obj.unit}` : '',
            },
            {
                th: intl.get('USER_16'),
                td: 'paymentQuantity',
                render: (text, obj) => text ? `${parseFloat(text)} ${obj.asset}` : '',
            },
            {
                th: intl.get('RATE_110'),
                td: 'createTime',
                style: {
                    width: '188px'
                },
                render: text => text,
            },
            {
                th: intl.get('USER_32'),
                td: 'type',
                render: (text, obj) => `${intl.get("ACCOUNT_RATE_" + text)} ${obj.serviceChargeRate == 0.2 ? 'N' : 'B'}`,
            },
            // {
            //     th: intl.get('RATE_111'),
            //     td: 'remark',
            //     style: {
            //         width: "150px"
            //     },
            //     render: text => text?text:intl.get("ACCOUNT_164")
            // }
        ];
    }
    getTable3() {
        return [
            {
                th: intl.get('RATE_109'),
                td: 'quantity',
                render: (text, obj) => text ? `${parseFloat(text)} ${obj.unit}` : '',
            },
            {
                th: intl.get('RATE_110'),
                td: 'createTime',
                render: text => text,
            },
            {
                th: intl.get('USER_32'),
                td: 'type',
                render: text => `${intl.get("ACCOUNT_RATE_" + text)}`,
            },
            // {
            //     th: intl.get('RATE_111'),
            //     td: 'remark',
            //     style: {
            //         width: "150px"
            //     },
            //     render: text => text?text:intl.get("ACCOUNT_164")
            // }
        ];
    }
    getTable4() {
        return [
            {
                th: intl.get('ACCOUNT_90'),
                td: 'relatedName',
                style: {
                    width: "284px"
                }
            },
            {
                th: intl.get('ACCOUNT_163'),
                td: 'nickname'
            },
            {
                th: intl.get('RATE_109'),
                td: 'quantity',
                style: {
                    width: "120px"
                },
                render: (text, obj) => text ? `${parseFloat(text)} ${obj.unit}` : '',
            },
            {
                th: intl.get('RATE_110'),
                td: 'createTime',
                style: {
                    width: "220px"
                },
                render: text => text,
            },
            {
                th: intl.get('USER_32'),
                td: 'type',
                style: {
                    width: "140px"
                },
                render: text => `${this.typeAry.includes(text) ? intl.get("ACCOUNT_RATE_" + text) : intl.get("ACCOUNT_RATE_9")}`,
            },
            // {
            //     th: intl.get('RATE_111'),
            //     td: 'remark',
            //     style: {
            //         width: "150px"
            //     },
            //     render: text => text?text:intl.get("ACCOUNT_164")
            // }
        ];
    }
    /*获取详情*/
    getDetailList(item) {
        net.getMyWeight({
            type: item.type,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState({
                    details: res.data.details,
                    tab: 2
                });
            }
        });
    }

    render() {
        const { tab, myWeight, details, weights } = this.state;
        return (
            <div className="account">
                <div className="item" style={{ marginBottom: '.1rem' }}>
                    <div>{intl.get('ACCOUNT_1')}</div>
                    <div>
                        {myWeight.totalWeight}
                        {' '}
                        TB
                    </div>
                </div>

                <div className="order" style={{ padding: 0 }}>
                    <div className="order-filter">
                        <ul style={{ padding: 0 }}>
                            <li
                                className={tab === 0 ? 'active' : ''}
                                onClick={() => this.setState({ tab: 0 })}
                            >
                                {intl.get('RATE_103')}
                            </li>
                            <li
                                className={tab === 1 ? 'active' : ''}
                                onClick={() => this.setState({ tab: 1 })}
                            >
                                {intl.get('ACCOUNT_99')}
                            </li>
                        </ul>
                    </div>
                    {/*{tab === 0 && this.renderDetail()}*/}
                    {tab === 0 && (
                        <table className={styles.mTable}>
                            <tbody>
                                {
                                    weights.map((item, index) => {
                                        return (
                                            <tr className={styles.tr}>
                                                <td className={styles.td}>{this.typeAry.includes(item.type) ? intl.get(`ACCOUNT_RATE_${item.type}`) : intl.get("ACCOUNT_RATE_9")}</td>
                                                <td className={styles.td}>{parseFloat(item.quantity)} {item.unit}</td>
                                                <td className={styles.td}>
                                                    <button className={styles.handleBtn} onClick={() => { this.getDetailList(item) }}>{intl.get("RATE_108")}</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                    {tab === 1 && (
                        <div className="sub-font-color ft-16 ft-c mt-50" style={{ lineHeight: '0.2rem' }}>
                            <div style={{ display: 'inline-block', textAlign: 'left' }}>
                                {intl.get('ACCOUNT_101')}
                                <br />
                                {intl.get('ACCOUNT_102')}
                                <br />
                                {intl.get('ACCOUNT_103')}
                            </div>
                        </div>
                    )}
                    {tab === 2 && (
                        this.renderDetail()
                    )}
                </div>
            </div>
        );
    }
}

export default connect(Rate);
