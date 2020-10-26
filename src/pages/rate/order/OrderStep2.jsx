import React, { Component } from "react";
import connect from "../../../store/connect";
import net from '../../../net';
import './index.less';
import { Button, } from '../../../components';
import { message } from 'antd';
import { Back, Progress, CancelModal, PayModal, } from '../component';
import md5 from 'md5';
import moment from 'moment';
import Footer from '../../footer';
import intl from 'react-intl-universal';

const pre = 'rate';

// 0=未付款，1=已付款，2=已取消，3=已超时

const images = {
    success: require('../../../images/rate/ok.png'),
    cancel: require('../../../images/rate/cancel.png'),
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
                    message.info(intl.get('RATE_24'), 1, () => { });
                    this.setState({ payVisible: false, status: 1, step: [1, 1, 1, 1] })
                } else {
                    message.info(intl.get('RATE_25'), 1, () => { });
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

    render() {
        const status_text = {
            1: intl.get('RATE_24'),
            2: intl.get('RATE_25'),
            3: intl.get('RATE_26'),
        }
        return (
            <div className={`${pre}`}>
                <div className={'bg'}></div>
                <div className={'content'}>
                    <div className={'rateStep'}>
                        <Back text={intl.get('RATE_29')} onClick={() => { this.props.history.push('/rate') }} />
                        <div className={'mt-40'}>
                            <Progress step={this.state.step} />
                        </div>
                        <div className={'flex-row-center mt-30'}>
                            {this.state.status === 0 ? this.renderCount() : this.renderItem(this.state.status, status_text[this.state.status])}
                        </div>
                        <div className={'rateStep-p1 mt-30'}>{intl.get('RATE_10')}</div>
                        <div className={'flex-row mt-30'} style={{ alignItems: 'center' }}>
                            <div style={{ width: '47%' }}>
                                <div className={'flex-row-between'}>
                                    <p className={'rateStep-p3'}>{intl.get('RATE_11')}</p>
                                    <p className={'rateStep-p2'}>{this.state.name}</p>
                                </div>
                                <div className={'flex-row-between mt-25'}>
                                    <p className={'rateStep-p3'}>{intl.get('RATE_30')}</p>
                                    <p className={'rateStep-p2'}>{this.state.id}</p>
                                </div>
                                <div className={'flex-row-between mt-25'}>
                                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_12')}</p>
                                    </div>
                                    <p className={'rateStep-p2'}>{this.state.quantity}{this.state.unit}</p>
                                </div>
                            </div>
                            <div className={'rateStep-line'}></div>
                            <div style={{ width: '47%' }}>
                                <div className={'flex-row-between'}>
                                    <p className={'rateStep-p3'}>{intl.get('RATE_31')}</p>
                                    <p className={'rateStep-p2'}>{moment(this.state.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>
                                <div className={'flex-row-between mt-25'}>
                                    <p className={'rateStep-p3'}>{intl.get('RATE_18')}</p>
                                    <p className={'rateStep-p2'}>{this.state.asset}</p>
                                </div>
                                <div className={'flex-row-between mt-25'}>
                                    <p className={'rateStep-p3'}>{intl.get('RATE_16')}</p>
                                    <p className={'rateStep-p2'}>{this.state.initDays}{intl.get('RATE_23')}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'rateStep-p1 mt-30'}>{intl.get('RATE_19')}</div>
                        <div className={'flex-row-between'}>
                            <p className={'rateStep-p5'}>{(this.state.paymentQuantity).toFixed(6)} <span style={{ fontSize: '.14rem' }}>{this.state.asset}</span></p>
                            {
                                this.state.status === 0 ?
                                    <div className={'flex-row'}>
                                        <div className={'rateStep-cancel-btn'} onClick={() => this.setState({ cacelVisible: true })}>{intl.get('RATE_32')}</div>
                                        <Button onClick={() => this.setState({ payVisible: true, step: [1, 1, 1, 0] })} small={true}>{intl.get('RATE_33')}</Button>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
                <Footer />
                <PayModal
                    payVisible={this.state.payVisible}
                    value={this.state.payPwd}
                    onCancel={() => { this.setState({ payVisible: false, step: [1, 1, 0, 0] }) }}
                    onConfirm={() => { this.postOrder(1) }}
                    onChange={(e) => { this.checkPayInput(e) }} />
                <CancelModal
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
