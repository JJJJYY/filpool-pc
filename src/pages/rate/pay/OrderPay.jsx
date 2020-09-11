import React,{ Component } from 'react';
import intl from 'react-intl-universal';
import styles from './orderPay.module.less';
import { Back, ProgressNew } from '../component';
import Foot from '@/pages/footer/index';
import {Checkbox} from "antd";
import { getSearchParams } from '@/util/utilTools';
import connect from '@/store/connect';

import Step1 from './Step1.jsx';
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import net from "@/net";

class OrderPay extends Component{
    constructor(props) {
        super(props);
        let routeData = getSearchParams(props.location.search);
        if (!props.redux.login) {
            window.location.href = `/#/login`;
        }
        this.state = {
            id: "",
            amount: 8,
            stepIndex: routeData.stepIndex || 0,
            step: [
                {label: intl.get("RATE_44")},
                {label: intl.get("RATE_95")},
                {label: intl.get("RATE_96")}
            ],
            detailInfo: {},
            orderId: routeData.orderId || ""
        }
    }

    componentDidMount(){
        document.documentElement.scrollTop = 0;
        let routeData = getSearchParams(this.props.location.search);
        let id = routeData.id;
        let amount = routeData.amount;
        if (id) {
            this.getGoodDetail(id);
        }
        // this.getRatePrice();
        this.setState({ id: id, amount: Number(amount)})
    }

    getGoodDetail(id){
        net.getGoodDetail(id).then(res => {
            if(res.ret === 200){
                this.setState({
                    detailInfo: res.data
                })
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
    //            /* console.log(`%c ${intl.get(res.responseMsg)}`,'color: red!');*/
    //         }
    //     })
    // }

    setStep (data) {
        this.setState(data);
    }

    confirmPay (orderId) {
        this.setState({
            stepIndex: 1,
            orderId: orderId
        });
    }


    getStepComponent (index, data) {
        let stepIndex = Number(index);
        switch (stepIndex) {
            case 0:
                return <Step1 detailInfo={this.state.detailInfo} amount={this.state.amount} onChange={(orderId) => {this.confirmPay(orderId)}} />;
            case 1:
                return <Step2 orderId={this.state.orderId} setStep={(data) => {this.setStep(data)} } />;
            case 2:
                return <Step3  setStep={(data) => {this.setStep(data)} } />;
            default:
                return <Step1 />;
        }
    }

    render () {
        return (
            <div className={styles.container}>
                <div className={`${styles.content}`}>
                    <div className={styles.group}>
                        <div className={`${styles.header} flex-row-start`}>
                            <a className={styles.backBox} onClick={() => {this.props.history.push('/rate')}}>
                                <span className={`iconfont ${styles.icon}`}>&#xe679;</span>
                                <span>{intl.get("RATE_9")}</span>
                            </a>
                            <span>{intl.get("RATE_97")}</span>
                        </div>
                        <ProgressNew step={this.state.step} activeIndex={this.state.stepIndex}></ProgressNew>
                        {
                            this.getStepComponent(this.state.stepIndex)
                        }
                    </div>
                    <img src={require('@/images/home/home_picture_1.png')} className={styles.bgImg} style={{left: "-158px", top: "-40px"}} alt=""/>
                    <img src={require('@/images/home/home_picture_2.png')} className={styles.bgImg} style={{right: "-180px", top: "240px"}} alt=""/>
                </div>
                <Foot />
            </div>
        )
    }
}

export default connect(OrderPay)