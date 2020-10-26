import React, { Component } from "react";
import connect from "../../../../store/connect";
import net from '../../../../net';
import './index.less';
import { Button, } from '../../../../components';
import { Progress, CancelModal, PayModal, } from '../../component';
import md5 from 'md5';
import moment from 'moment';
import Header from '../../../header';
import Footer from '../../../footer';
import { Toast } from 'antd-mobile';
import intl from 'react-intl-universal';

const pre = 'rate-h5';



// 0=未付款，1=已付款，2=已取消，3=已超时

const images = {
    success: require('../../../../images/rate/ok.png'),
    cancel: require('../../../../images/rate/cancel.png'),
}

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: [1, 1, 0, 0],
            cacelVisible: false,
            payVisible: false,
            loginVisible: true,
            payPwd: '',
            account: '',
            password: '',
            id: '',
            createTime: 0,
            status: 0,
            countDown: 0,
            price_list: [1],
            choose_index: 0,
            paymentQuantity: 0,
            unit: '',
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.getOrderDetail(id);
        this.setState({ id: id });
        // this.getRatePrice();
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    getOrderDetail(id) {
        net.getOrderDetail(id).then(res => {
            if (res.ret === 200) {
                this.setState(res.data, () => this.checkCountDown(res.data.status, res.data.createTime))
            }
        })
    }

    // getRatePrice(){
    //     net.getRatePrice().then(res => {
    //         if(res.responseCode === '00'){
    //             let data = res.content;
    //             let support = [];
    //             let price_list = [];
    //             for(let item of data){
    //                 if(item.purchaseFlag){
    //                     support.push(item.asset)
    //                     price_list.push(item.price)
    //                 }
    //             }
    //             this.setState({ support: support, price_list: price_list })
    //         } else {
    //             console.log(`%c ${intl.get(res.responseMsg)}`,'color: red');
    //         }
    //     })
    // }

    postOrder(index) {

        let data = {
            id: this.state.id,
            operation: index,
        }

        if (index === 1) { data.payPwd = md5(this.state.payPwd); }

        net.postConfirmOrder(data).then(res => {
            if (res.ret === 200) {
                if (index === 1) {
                    Toast.success(intl.get('RATE_24'), 2, () => { }, false);
                    this.setState({ payVisible: false, status: 1, step: [1, 1, 1, 1] })
                } else {
                    Toast.fail(intl.get('RATE_25'), 2, () => { }, false);
                    this.setState({ cacelVisible: false, status: 2, step: [1, 1, 0, 0] })
                }
            }
        })
    }

    checkPayInput(val) {
        this.setState({ payPwd: val });
    }

    checkCountDown(status, time) {
        if (status === 1) { this.setState({ step: [1, 1, 1, 1] }); return }
        if (status !== 0) return;
        if (this.orderCount) return;
        let limit = new Date(time);
        limit.setMinutes(limit.getMinutes() + 15);
        let now = new Date().valueOf();
        let left = limit.valueOf() - now;
        this.state.countDown = parseInt(left / 1000);
        this.orderCount = setInterval(() => {
            let leftTime = this.state.countDown - 1;
            this.setState({ countDown: leftTime })
            if (leftTime === 0) {
                clearInterval(this.orderCount);
                this.orderCount = null;
                this.setState({ status: 3 })
                // this.getOrderDetail(this.state.id);
            }
        }, 1000)
    }

    formatTime(mss) {
        let minutes = Math.floor(mss / 60) % 60;
        let seconds = mss % 60;
        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return minutes + 'm ' + seconds + 's'
    }

    renderCount() {
        return (
            <div className={'rateStep-orange'}>
                <p className={'rateStep-orange-p1'}>{intl.get('RATE_27')} {this.state.countDown === 0 ? '14m 59s' : this.formatTime(this.state.countDown)}</p>
                <p className={'rateStep-orange-p2'}>{intl.get('RATE_28')}</p>
            </div>
        )
    }

    renderItem(status, content) {
        console.log('status = ', status)
        if (status === 1) {
            return (
                <div className={'rateStep-orange flex-row-center'}>
                    <img src={images.success} alt="" className={'rateStep-orange-img'} />
                    <p className={'rateStep-orange-p1'}>{content}</p>
                </div>


            )
        }
        return (
            <div className={'rateStep-grey flex-row-center'}>
                <img src={images.cancel} alt="" className={'rateStep-orange-img'} />
                <p className={'rateStep-grey-p1'}>{content}</p>
            </div>
        )
    }

    renderText(title, content) {
        return (
            <div className={'flex-row-between mb-6'}>
                <div className={'flex-row'} style={{ alignItems: 'center' }}>
                    <div className={'p2'}>{title}</div>
                </div>
                <div className={'p3'}>{content}</div>
            </div>
        )
    }

    render() {
        const status_text = {
            1: intl.get('RATE_24'),
            2: intl.get('RATE_25'),
            3: intl.get('RATE_26'),
        }
        return (
            <div className={`${pre}`}>
                <Header
                    left={() => this.props.history.go(-1)}
                    title={intl.get('RATE_35')}
                />
                <div className={'bg'}></div>
                <div className={'step-content'}>
                    <Progress step={this.state.step} />
                    <div className={'flex-row-center'}>
                        {this.state.status === 0 ? this.renderCount() : this.renderItem(this.state.status, status_text[this.state.status])}
                    </div>
                    <div className={'p1'}>{intl.get('RATE_10')}</div>
                    {this.renderText(intl.get('RATE_11'), this.state.relatedName)}
                    {this.renderText(intl.get('RATE_31'), moment(this.state.createTime).format('YYYY-MM-DD HH:mm:ss'))}
                    {this.renderText(intl.get('RATE_12'), parseFloat(this.state.quantity) + this.state.unit)}
                    {this.renderText(intl.get('RATE_18'), this.state.asset)}
                    {this.renderText(intl.get('RATE_19'), '$' + (this.state.quantity * this.state.price).toFixed(4))}
                    {this.renderText(intl.get('RATE_16'), this.state.initDays + intl.get('RATE_23'))}

                    <div className={'p1'} style={{ marginTop: '6vw', marginBottom: '2vw' }}>{intl.get('RATE_19')}</div>
                    <div className={'p4'}>{(this.state.paymentQuantity).toFixed(6)} {this.state.asset}</div>
                    {
                        this.state.status === 0 ?
                            <div className={'flex-row-end'} style={{ marginTop: '3vw' }}>
                                <div className={'cancel-btn'} onClick={() => this.setState({ cacelVisible: true })}>{intl.get('RATE_32')}</div>
                                <Button type="h5" onClick={() => this.setState({ payVisible: true, step: [1, 1, 1, 0] })}>{intl.get('RATE_33')}</Button>
                            </div>
                            : null
                    }

                </div>
                <PayModal
                    payVisible={this.state.payVisible}
                    value={this.state.payPwd}
                    className={'mobile-modal'}
                    onCancel={() => { this.setState({ payVisible: false, step: [1, 1, 0, 0] }) }}
                    onConfirm={() => { this.postOrder(1) }}
                    onChange={(e) => { this.checkPayInput(e) }} />
                <CancelModal
                    className={'mobile-modal'}
                    cacelVisible={this.state.cacelVisible}
                    content={intl.get('RATE_34')}
                    onConfirm={() => { this.postOrder(2) }}
                    onCancel={() => this.setState({ cacelVisible: false })}
                />
            </div>
        );
    }
}

export default connect(Index)
