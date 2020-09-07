import React, { Component } from "react";
import connect from "../../../store/connect";
import net from '../../../net';
import './index.less';
import { Button, ChooseInput, MenuItem } from '../../../components';
import { reg } from '../../../util';
import { message, Popover, Checkbox } from 'antd';
import { Back, Progress } from '../component';
import Footer from '../../footer';
import intl from 'react-intl-universal';

/**
 * 缺协议跳转链接
 * author by jacky
 */

const pre = 'rate';
const icons = {
    BTC: require('../../../images/rate/btc-0.png'),
    BTC1: require('../../../images/rate/btc-1.png'),
    ETH: require('../../../images/rate/eth-0.png'),
    ETH1: require('../../../images/rate/eth-1.png'),
    USDT: require('../../../images/rate/usdt-0.png'),
    USDT1: require('../../../images/rate/usdt-1.png'),
    FILP: require('../../../images/rate/fil-0.png'),
    FILP1: require('../../../images/rate/fil-1.png'),
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
            unit: '',
        }
    }

    componentDidMount(){
        document.documentElement.scrollTop = 0;
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
                message.info(intl.get('RATE_1',{limit: this.state.minLimit}), 1 , () =>{})
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
            message.info(intl.get('RATE_8'), 1, () => {});
            return;
        }
        if(this.state.amount < this.state.minLimit){
            message.info(intl.get('RATE_1',{limit: this.state.minLimit}), 1 , () =>{});
            return
        }
        let data = {
            id: this.state.id,
            asset: this.state.asset,
            quantity: this.state.amount
        }
        
        net.postOrder(data).then(res =>{
            if(res.responseCode === '00'){
                let id = res.content.id;
                this.props.history.push(`/rate_second_step/${id}`);
            } else {
                message.info(intl.get(res.responseCode), 1, () => {});
            }
        })
    }

    renderPay(){
        const sec = this.state.sec;
        return(
            <div className={'flex-row mt-30'}>
                {
                    this.state.support.map((item,index) => {
                        return (
                        <div className={sec[index] ? 'rateStep-pay-sec' : 'rateStep-pay'} onClick={() => {this.choosePay(index)}}>
                            <img src={sec[index] ? icons[item] : icons[item + '1']} alt="" className={'rateStep-img'}/>
                            <span>{item}</span>
                        </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const login = this.props.redux.login;
        return (
            <div className={`${pre}`}>
                <div className={'bg'}></div>
                <div className={'content'}>
                    <div className={'rateStep'}>
                        <Back text={intl.get('RATE_9')} onClick={() => {this.props.history.push('/rate')}}/>
                        <div className={'mt-40'}>
                            <Progress step={this.state.step}/>
                        </div>
                        <div className={'rateStep-p1 mt-40'}>{intl.get('RATE_10')}</div>
                            <div className={'flex-row mt-30'} style={{alignItems: 'center'}}>
                                <div style={{width: '47%'}}>
                                    <div className={'flex-row-between'}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_11')}</p>
                                        <p className={'rateStep-p2'}>{this.state.name}</p>
                                    </div>
                                    <div className={'flex-row-between mt-25'}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_12')}</p>
                                        <ChooseInput 
                                        value={this.state.amount}
                                        onChange={(e) => {this.checkInput(e)}}
                                        onAdd={()=>{ this.extarClick('add') }}
                                        onSub={()=>{ this.extarClick('sub') }}
                                        width={'1.37rem'}
                                        height={'.28rem'}
                                        />
                                    </div>
                                    <div className={'flex-row-between mt-25'}>
                                        <div className={'flex-row'} style={{alignItems: 'center'}}>
                                            <p className={'rateStep-p3'}>{intl.get('RATE_13')}</p>
                                            <Popover trigger="hover" content={intl.get('RATE_14')}>
                                                <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'}/>
                                            </Popover>
                                        </div>    
                                        <p className={'rateStep-p2'}>{(this.state.serviceChargeRate * 100).toFixed(2) + '%'}</p>
                                    </div>
                                </div>
                                <div className={'rateStep-line'}></div>
                                <div style={{width: '47%'}}>
                                    <div className={'flex-row-between'}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_15')}</p>
                                        <p className={'rateStep-p2'}>${this.state.price}/{this.state.unit}</p>
                                    </div>
                                    <div className={'flex-row-between mt-25'}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_16')}</p>
                                        <p className={'rateStep-p2'}>{this.state.contractDuration}{intl.get('RATE_23')}</p>
                                    </div>
                                    <div className={'flex-row-between mt-25'}>
                                        <p className={'rateStep-p3'}>{intl.get('RATE_17')}</p>
                                        <p className={'rateStep-p2'}>${(this.state.amount * this.state.price).toFixed(4)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'rateStep-p1 mt-40'}>{intl.get('RATE_18')}</div>
                            {this.renderPay()}
                            <div className={'rateStep-p1 mt-30'}>{intl.get('RATE_19')}</div>
                            <div className={'flex-row-between'}>
                                <p className={'rateStep-p5'}>{((this.state.amount * this.state.price) / this.state.price_list[this.state.choose_index]).toFixed(6)} <span style={{fontSize: '.14rem'}}>{this.state.asset}</span></p>
                                <Button onClick={() => this.confrimData()} small={true}>{intl.get('RATE_20')}</Button>
                            </div>
                            <div className={'flex-row-end mt-15'} style={{alignItems: 'center'}}>
                                <Checkbox onChange={(e) => this.setState({ read: e.target.checked })} />
                                <span className={'rateStep-p3 ml-10 mt-3'}>{intl.get('RATE_21')} <a href={'#/article/service'} target="_blank" className={'rateStep-p4'}>{intl.get('RATE_22')}</a></span>
                            </div>
                        </div>   
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(Index)
