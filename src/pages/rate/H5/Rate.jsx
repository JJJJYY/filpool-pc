import React, { Component } from "react";
import connect from "../../../store/connect";
import net from '../../../net';
import './index.less';
import { message } from 'antd';
import Header from '../../header';
import Cell from '../component/shopCell';
import Footer from '../../footer';
import intl from 'react-intl-universal';

const pre = 'rate-h5';

class RateH5 extends Component {

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
        this.refreshData = setInterval(() => this.getGoodList(), 15000);
    }


    render() {
        const { login, userInfo } = this.props.redux;
        let currentLocale = localStorage.getItem('lang') || 'zh';

        return (
            <div className={`${pre}`}>
                <Header
                    logo={true}
                    left={() => this.props.history.push('home')}
                    right={() => { if (login) { } else { this.props.history.push('login') } }}
                    rightText={login ? userInfo.nickname : intl.get('RATE_7')}
                />
                <div className={'bg'}></div>
                <div className={'content'} style={{ minHeight: '60vh' }}>
                    {
                        this.state.data.map((item, index) => {
                            return (<Cell
                                key={index}
                                type={2}
                                weightAsset={item.weightAsset}
                                serviceChargeRate={item.serviceChargeRate}
                                contractDuration={item.contractDuration}
                                contractName={item.contractName}
                                highlight={currentLocale === 'en' ? item.enHighlight : item.highlight}
                                name={currentLocale === 'en' ? item.enName : item.name}
                                price={item.price}
                                quantity={item.quantity ? item.quantity : 1}
                                remainingQuantity={item.remainingQuantity}
                                slogan={currentLocale === 'en' ? item.enSlogan : item.slogan}
                                tag={currentLocale === 'en' ? item.enTag : item.tag}
                                status={item.status}
                                originalPrice={item.originalPrice}
                                settlementPeriod={item.settlementPeriod}
                                support={this.state.support}
                                amount={item.minLimit}
                                unit={item.unit}
                                onClick={(amount) => { if (item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, () => { }) } else { this.props.history.push(`/rate_detail/${item.id}/${amount}`) } }}
                            />)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default connect(RateH5)
