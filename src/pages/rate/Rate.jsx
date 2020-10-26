import React, { Component } from "react";
import connect from "../../store/connect";
import net from '../../net';
import './index.less';
import Cell from './component/shopCell';
import { message } from 'antd';
import Footer from '../footer';
import intl from 'react-intl-universal';
import LazyLoad from 'react-lazyload';

const pre = 'rate';

class Rate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            support: [],
        }
    }

    componentDidMount() {
        this.getGoodList();
        this.setRefresh();
        // this.getRatePrice();
    }

    componentWillUnmount() {
        if (this.refreshData) {
            clearInterval(this.refreshData);
            this.refreshData = null;
        }
        this.setState = (state, callback) => {
            return;
        };
    }

    // getRatePrice(){
    //     net.getRatePrice().then(res => {
    //         if(res.responseCode === '00'){
    //             let data = res.content;
    //             let support = [];
    //             for(let item of data){
    //                 if(item.purchaseFlag){
    //                     support.push(item.asset)
    //                 }
    //             }
    //             this.setState({ support: support })
    //         } else {
    //             console.log(`%c ${intl.get(res.responseMsg)}`,'color: red');
    //         }
    //     })
    // }

    getGoodList() {
        net.getGoodList().then(res => {
            if (res.ret === 200) {
                if (res.data.length === 1) {
                    this.props.history.push(`/rate_detail/${res.data[0].id}/${res.data[0].minLimit}`)
                }
                this.setState({ data: res.data })
            }
        })
    }

    setRefresh() {
        if (this.refreshData) return;
        /*this.refreshData = setInterval(() => this.getGoodList(), 15000);*/
    }


    render() {
        let currentLocale = localStorage.getItem('lang') || 'zh';
        return (
            <div className={`${pre}`}>
                {/*<div className={'bg'}></div>*/}
                <div className={'content'}>
                    <div style={{ width: "1200px", position: "relative", margin: "auto" }}>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/count_picture_1.png')} style={{ position: "absolute", right: "-150px", top: "100px" }} alt="" />
                        </LazyLoad>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/count_picture_2.png')} style={{ position: "absolute", left: "-156px", top: "540px" }} alt="" />
                        </LazyLoad>
                    </div>
                    {
                        this.state.data.map((item, index) => {
                            return (<Cell
                                key={index}
                                type={0}
                                weightAsset={item.weightAsset}
                                serviceChargeRate={item.serviceChargeRate}
                                contractDuration={item.contractDuration}
                                contractName={item.contractName}
                                highlight={currentLocale === 'en' ? item.enHighlight : item.highlight}
                                name={currentLocale === 'en' ? item.enName : item.name}
                                price={item.price}
                                quantity={item.quantity}
                                remainingQuantity={item.remainingQuantity}
                                slogan={currentLocale === 'en' ? item.enSlogan : item.slogan}
                                tag={currentLocale === 'en' ? item.enTag : item.tag}
                                status={item.status}
                                originalPrice={item.originalPrice}
                                settlementPeriod={item.settlementPeriod}
                                support={this.state.support}
                                amount={item.minLimit}
                                unit={item.unit}
                                locale={currentLocale}
                                checkDetail={(amount) => { if (item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, () => { }) } else { this.props.history.push(`/rate_detail/${item.id}/${amount}`) } }}
                                onClick={(amount) => { if (item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, () => { }) } else { this.props.history.push(`/orderPay?id=${item.id}&amount=${amount}`) } }}
                            />)
                        })
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(Rate)
