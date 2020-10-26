import React, { Component } from 'react';
import intl from 'react-intl-universal';
import styles from './orderPay.module.less';
import Input from '@/components/input/index';
import { reg } from "@/util";
import { Checkbox, message } from "antd";
import net from "@/net";

export default class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailInfo: props.detailInfo,
            amount: props.amount,
            minLimit: props.detailInfo.minLimit || 8,
            read: false,
            support: [],
            price_list: [1]
        };
    }

    checkInput(e) {
        let val = e.target.value;
        if (reg.regInt(Number(val))) {
            this.setState({ amount: Number(val) });
        }
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.amount !== nextProps.amount) {
            this.setState({
                amount: nextProps.amount
            })
        }
        if (this.state.detailInfo && this.state.detailInfo.id !== nextProps.detailInfo.id) {
            this.setState({
                detailInfo: nextProps.detailInfo,
                minLimit: nextProps.detailInfo.minLimit
            });
        }
    }


    extarClick(type) {
        if (type === 'add') {
            this.setState({ amount: this.state.amount + 1 })
        } else {
            if ((this.state.amount - 1) >= this.state.minLimit) {
                this.setState({ amount: this.state.amount - 1 })
            } else {
                message.info(intl.get('RATE_1', { limit: this.state.minLimit }), 1, () => { })
            }
        }
    }

    /*确认订单*/
    nextStep() {
        if (!this.state.read) {
            message.info(intl.get("AUTH_AGREE_SELECT"));
            return;
        }
        net.postOrder({
            asset: "USDT",
            id: this.state.detailInfo.id,
            quantity: this.state.amount
        }).then((res) => {
            if (res.ret == 200) {
                this.props.onChange(res.data);
            }
        });

    }

    render() {
        let detailInfo = this.props.detailInfo || {};
        return (
            <div style={{ marginBottom: "130px" }}>
                <div style={{ marginTop: "60px", position: "relative" }}>
                    <div>
                        <span className={styles.fieldLabel}>{intl.get('RATE_98')}:</span>
                        <span className={styles.fieldValue}>{detailInfo.name}</span>
                    </div>
                    <div>
                        <span className={styles.fieldLabel}>{intl.get('RATE_16')}:</span>
                        <span className={styles.fieldValue}>{detailInfo.contractDuration} {intl.get('RATE_23')}</span>
                    </div>
                    <div>
                        <span className={styles.fieldLabel}>{intl.get('RATE_13')}:</span>
                        <span className={styles.fieldValue}>{detailInfo.serviceChargeRate * 100}%</span>
                    </div>
                    <div>
                        <span className={styles.fieldLabel}>{intl.get('RATE_49')}:</span>
                        <span className={styles.fieldValue}>{detailInfo.settlementPeriod}</span>
                    </div>
                    <div>
                        <span className={styles.fieldLabel}>{intl.get('RATE_15')}:</span>
                        <span className={styles.fieldValue}>{parseFloat(detailInfo.price)} USDT</span>
                    </div>
                    <div className={`flex-row-start`}>
                        <span className={styles.fieldLabel}>{intl.get('RATE_12')}:</span>
                        <Input.Number value={this.state.amount}
                            onChange={(e) => { this.checkInput(e) }}
                            onAdd={() => { this.extarClick('add') }}
                            onSub={() => { this.extarClick('sub') }}
                        />
                        <span style={{ fontSize: "18px", color: "#86929D", marginLeft: "16px" }}>{detailInfo.unit}</span>
                    </div>
                    <div className={`${styles.submitBox} flex-row-between`}>
                        <div className={`${styles.left}`}>
                            <span className={`${styles.totalLabel}`}>{intl.get("RATE_17")}:</span>
                            <span className={`${styles.total}`}>{detailInfo.price * this.state.amount} USDT</span>
                        </div>
                        <button className={styles.submitBtn} onClick={() => { this.nextStep() }}>{intl.get("RATE_3")}</button>
                    </div>
                </div>
                <div className={'mt-15'} style={{ margin: '38px 0 80px 72px', position: "absolute", bottom: "-130px" }}>
                    <Checkbox onChange={(e) => this.setState({ read: e.target.checked })} />
                    <span className={'rateStep-p3 ml-10 mt-3'}>{intl.get('RATE_21')} <a href={'#/article/service'} target="_blank" className={'rateStep-p4'}>{intl.get('RATE_22')}</a></span>
                </div>
            </div>
        )
    }
};