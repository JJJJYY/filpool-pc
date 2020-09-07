import React, { Component } from "react";
import connect from "../../../store/connect";
import net from '../../../net';
import './index.less';
import { Button, ChooseInput, MenuItem } from '../../../components';
import { reg } from '../../../util';
import { Toast } from 'antd-mobile';
import md5 from 'md5';
import Header from '../../header';
import Cell from '../component/shopCell';
import Footer from '../../footer';
import intl from 'react-intl-universal';
import { LoginModal, CancelModal } from '../component';


const pre = 'rate-h5';

class RateDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            contractDetails: '',
            quantity: 1,
            remainingQuantity: '',
            contractDuration: '',
            serviceChargeRate: '-',
            contractName: '-',
            highlight: '-',
            name: '-',
            originalPrice: '',
            slogan: '-',
            tag: '-',
            minLimit: '',
            amount: '',
            tab: 0,
            weightAsset: '-',
            loginVisible: false,
            account: '',
            password: '',
            support: [],
            problem: '',
            features: '',
            enHighlight: '',
            enName: '',
            enSlogan: '',
            enTag: '',
            single: false,
            cacelVisible: false,
            unit: '',
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let amount = this.props.match.params.amount;
        this.setState({ amount: Number(amount) })
        this.getGoodDetail(id);
        // this.getRatePrice();
        this.getRateProblem();
        this.setState({id: id});
        this.setRefresh(id);
        this.getGoodList();
    }

    componentWillUnmount(){
        if(this.refreshData) {
            clearInterval(this.refreshData);
            this.refreshData = null;
        }
    }

    getGoodList(){
        net.getGoodList().then(res => {
            if(res.ret === 200){
                if(res.data.length === 1){
                    this.setState({ single: true })
                }
            } 
        })
    }

    getGoodDetail(id){
        net.getGoodDetail(id).then(res => {
            if(res.ret === 200){
                this.setState(res.data)
            }
        })
    }

    getRateProblem(){
        net.getRateProblem().then(res => {
            if(res.responseCode === '00'){
                this.setState({ problem: res.content })
            } else {
                console.log(`%c ${intl.get(res.responseMsg)}`,'color: red');
            }

        })
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

    setRefresh(id){
        if(this.refreshData) return;
        this.refreshData = setInterval(() => {
            this.getGoodDetail(id)
        },15000)
    }
 
    login() {
        const {
            account, password,
        } = this.state;

        this.setState({ loading: true });
        net.postLogin({
            account: account,
            password: md5(password),
        }).then((res) => {
            this.setState({ loading: false });
            if (res.ret === 200) {
                this.setState({ loginVisible: false });
                this.props.getUserInfo();
                this.props.setLogin(true);
            }
        });
    }

    loginChange(type,val){
        if(type === 'password'){
            this.setState({ password: val })
        } else {
            this.setState({ account: val })
        }
    }

    checkInput(e){
        let val = e.target.value;
        if(reg.regInt(val) && val >= this.state.minLimit){
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

    selectTab(tab){
        this.setState({ tab: tab })
    }

    checkStatus(amount){
        const login = this.props.redux.login;
        if(!login){
            this.setState({ loginVisible: true })
        }
        else if(this.props.redux.userInfo.payPwd !== 1 || !this.props.redux.userInfo.ga)
        { 
            this.setState({ cacelVisible: true })
            // Toast.info(intl.get('RATE_73'), 2, ()=>{ this.props.history.push('/user/account') },false);
        } 
        else if(this.state.status !== 1){
            Toast.info(intl.get('p400006'), 1, ()=>{},false);
        } else if(this.state.amount < this.state.minLimit){
            Toast.fail(intl.get('RATE_1',{limit: this.state.minLimit}), 2, ()=>{}, false);
        }
        else{
            this.props.history.push(`/rate_first_step/${this.state.id}/${amount}`)
        }
    }

    render() {
        let currentLocale = localStorage.getItem('lang') || 'zh';

        return (
            <div className={`${pre}`}>
                <Header 
                    left={() => { if(this.state.single) { this.props.setTab('home');;this.props.history.push('/') } else { this.props.setTab('could');this.props.history.push('/')  } }}
                    title={intl.get('RATE_3')}
                    /> 
                <div className={'bg'}></div>
                <div className={'content'} style={{minHeight: '60vh'}}>
                    <Cell 
                        key={0} 
                        type={5}
                        serviceChargeRate={this.state.serviceChargeRate} 
                        contractDuration={this.state.contractDuration}
                        contractName={this.state.contractName}
                        weightAsset={this.state.weightAsset}
                        highlight={currentLocale === 'en' ? this.state.enHighlight : this.state.highlight}
                        name={currentLocale === 'en' ? this.state.enName : this.state.name}
                        price={this.state.price}
                        quantity={this.state.quantity}
                        remainingQuantity={this.state.remainingQuantity}
                        slogan={currentLocale === 'en' ? this.state.enSlogan : this.state.slogan}
                        tag={currentLocale === 'en' ? this.state.enTag : this.state.tag}
                        status={this.state.status}
                        originalPrice={this.state.originalPrice}
                        settlementPeriod={this.state.settlementPeriod}
                        support={this.state.support}
                        amount={this.state.amount}
                        onClick={(amount)=>{this.checkStatus(amount)}}
                        unit={this.state.unit}
                        />
                        {/* <div className={'detail-bottom'}>
                            <p className={'p1'} >{intl.get('RATE_2')} <span className={'p2'}> $ {(this.state.price * this.state.amount).toFixed(2)}</span></p>
                            <div className={'flex-row-between'} style={{marginTop: '3vw'}}>
                                <ChooseInput 
                                value={this.state.amount}
                                height={'7vw'}
                                width={'50vw'}
                                onChange={(e) => {this.checkInput(e)}}
                                onAdd={()=>{ this.extarClick('add') }}
                                onSub={()=>{ this.extarClick('sub') }}
                                />
                                <Button type={'h5'} onClick={()=>{this.checkStatus()}}>{intl.get('RATE_3')}</Button>
                            </div>
                        </div> */}
                        <div className={'flex-row margin'} style={{margin: '7vw 8vw 0 8vw'}}>
                            <MenuItem content={intl.get('RATE_6')} selected={this.state.tab === 0 ? true : false} onClick={() => {this.selectTab(0)}}/> 
                            <MenuItem content={intl.get('RATE_4')} selected={this.state.tab === 1 ? true : false} onClick={() => {this.selectTab(1)}}/> 
                            <MenuItem content={intl.get('RATE_5')} selected={this.state.tab === 2 ? true : false} onClick={() => {this.selectTab(2)}}/> 
                        </div>
                        {
                            this.state.tab === 0 ?
                            <div className={'product-detail'} dangerouslySetInnerHTML={{__html: this.state.features}}></div>
                            :
                            null
                        }
                        {
                            this.state.tab === 1 ?
                            <div className={'product-detail'} dangerouslySetInnerHTML={{__html: this.state.contractDetails}}></div>
                            :
                            null
                        }
                        {
                            this.state.tab === 2 ?
                            <div className={'product-detail'} dangerouslySetInnerHTML={{__html: this.state.problem}}></div>
                            :
                            null
                        }    

                </div>
                <LoginModal 
                    visible={this.state.loginVisible}
                    account={this.state.account}
                    password={this.state.password}
                    onConfirm={()=>this.login()}
                    onCancel={()=>this.setState({loginVisible: false})}
                    loginChange={(type,v) => this.loginChange(type,v)}
                />
                <CancelModal 
                    cacelVisible={this.state.cacelVisible}
                    content={intl.get('RATE_73')}
                    onConfirm={() =>{this.props.history.push('/user/account')}}
                    onCancel={()=> this.setState({cacelVisible: false})}
                    set={true}
                />
            </div>
        );
    }
}

export default connect(RateDetail)
