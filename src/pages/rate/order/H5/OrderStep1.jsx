import React, { Component } from "react";
import connect from "../../../../store/connect";
import net from '../../../../net';
import './index.less';
import { Button, ChooseInput, MenuItem } from '../../../../components';
import { reg } from '../../../../util';
import { message, Popover, Checkbox } from 'antd';
import { Toast } from 'antd-mobile';
import { Back, Progress } from '../../component';
import Header from '../../../header';
import Footer from '../../../footer';
import intl from 'react-intl-universal';



const pre = 'rate-h5';
const icons = {
    BTC: require('../../../../images/rate/btc-0.png'),
    BTC1: require('../../../../images/rate/btc-1.png'),
    ETH: require('../../../../images/rate/eth-0.png'),
    ETH1: require('../../../../images/rate/eth-1.png'),
    USDT: require('../../../../images/rate/usdt-0.png'),
    USDT1: require('../../../../images/rate/usdt-1.png'),
    FILP: require('../../../../images/rate/fil-0.png'),
    FILP1: require('../../../../images/rate/fil-1.png'),
}

class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            amount: '',
            price: 0,
            step: [1,0,0,0],
            sec: [1,0,0,],
            asset: 'BTC',
            read: false,
            serviceChargeRate: 0,
            support: [],
            price_list: [ 1 ],
            choose_index: 0,
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let amount = this.props.match.params.amount;
        this.getGoodDetail(id);
        // this.getRatePrice();
        this.setState({ id: id, amount: Number(amount) })
    }

    getGoodDetail(id){
        net.getGoodDetail(id).then(res => {
            if(res.ret === 200){
                this.setState(res.data)
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

    checkInput(e){
        let val = e.target.value;
        if(reg.regInt(val)){
            this.setState({ amount: val});
        }
    }

    extarClick(type){
        if(type === 'add'){
            this.setState({ amount: this.state.amount + 1})
        } else {
            if((this.state.amount - 1) >= this.state.minLimit){
                this.setState({ amount: this.state.amount - 1})
            } else {
                Toast.fail(intl.get('RATE_1',{limit: this.state.minLimit}), 2, ()=>{}, false);
                // message.info(`购买数量不能小于${this.state.minLimit}TB`, 1 , () =>{})
            }
        }
    }

    choosePay(index){
        let sec = [0,0,0,0], asset = this.state.asset;
        sec[index] = 1;
        asset = this.state.support[index];
        this.setState({ sec: sec, asset: asset, choose_index: index})
    }

    confrimData(){
        if(!this.state.read){
            Toast.info(intl.get('RATE_8'), 2, ()=>{}, false);
            return;
        }
        if(this.state.amount < this.state.minLimit){
            Toast.fail(intl.get('RATE_1',{limit: this.state.minLimit}), 2, ()=>{}, false);
            return;
        }
        let data = {
            id: this.state.id,
            asset: this.state.asset,
            quantity: this.state.amount
        }
        
        net.postOrder(data).then(res =>{
            if(res.ret === 200){
                let id = res.data;
                this.props.history.push(`/rate_second_step/${id}`);
            }
        })
    }


    renderPay(){
        const sec = this.state.sec;
        return(
            <div className={'flex-row'} style={{flexWrap: 'wrap'}}>
                {
                    this.state.support.map((item,index) => {
                        return (
                        <div className={sec[index] ? 'rateStep-pay-sec' : 'rateStep-pay'} onClick={() => {this.choosePay(index)}} key={index}>
                            <img src={sec[index] ? icons[item] : icons[item + '1']} alt="" className={'rateStep-img'}/>
                            <span>{item}</span>
                        </div>
                        )
                    })
                }
            </div>
        )
    }

    renderText(title,content,image,input){
        return(
            <div className={'flex-row-between mb-6'}>
                <div className={'flex-row'} style={{alignItems: 'center'}}>
                    <div className={'p2'}>{title}</div>
                    {
                        image ?
                        <img src={require('../../../../images/rate/info.png')} alt="" className={'info'} onClick={() => message.info(intl.get('RATE_14'), 1)}/>
                        : null
                    }
                </div>
                {
                    input ?
                    <ChooseInput
                        value={this.state.amount}
                        height={'7vw'}
                        width={'37vw'}
                        onChange={(e) => {this.checkInput(e)}}
                        onAdd={()=>{ this.extarClick('add') }}
                        onSub={()=>{ this.extarClick('sub') }}
                     />
                    :
                    <div className={'p3'}>{content}</div>
                }
            </div>
        )
    }
 
    render() {
        const login = this.props.redux.login;
        return (
            <div className={`${pre}`}>
                <Header 
                    left={() => this.props.history.go(-1)}
                    title={intl.get('RATE_35')}
                    /> 
                <div className={'bg'}></div>
                <div className={'step-content'}>
                    <Progress step={this.state.step}/>
                    <div className={'p1'}>{intl.get('RATE_10')}</div>
                    {this.renderText(intl.get('RATE_11'),this.state.name,false,false)}
                    {this.renderText(intl.get('RATE_15'),this.state.price,false,false)}
                    {this.renderText(intl.get('RATE_12'),'',false,true)}
                    {this.renderText(intl.get('RATE_16'),this.state.contractDuration + intl.get('RATE_23'),false,false)}
                    {this.renderText(intl.get('RATE_13'),(this.state.serviceChargeRate * 100).toFixed(2) + '%',true,false)}
                    {this.renderText(intl.get('RATE_17'),'$' + (this.state.amount * this.state.price).toFixed(4),false,false)}
                    <div className={'p1'} style={{marginTop: 0, marginBottom: '2vw'}}>{intl.get('RATE_18')}</div>
                    {this.renderPay()}
                    <div className={'p1'}>{intl.get('RATE_19')}</div>
                    <div className={'p4'}>{((this.state.amount * this.state.price) / this.state.price_list[this.state.choose_index]).toFixed(6)} {this.state.asset}</div>
                    <div className={'flex-row-end'}>
                        <Button type="h5" onClick={() => this.confrimData()}>{intl.get('RATE_20')}</Button>
                    </div>
                    <div className={'flex-row-end'} style={{alignItems: 'center', marginTop: '2vw'}}>
                        <Checkbox onChange={(e) => this.setState({ read: e.target.checked })} />
                        <span className={'p5'}>{intl.get('RATE_21')} <a href={`#/article/service`} target="_blank" className={'p6'}>{intl.get('RATE_22')}</a></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(Index)
