import React, { Component } from "react";
import connect from "../../store/connect";
import net from '../../net';
import './index.less';
import Cell from './component/shopCell';
import { Button, ChooseInput, MenuItem } from '../../components';
import { reg } from '../../util';
import { LoginModal, CancelModal } from './component';
import { message } from 'antd';
import md5 from 'md5';
import Footer from '../footer';
import intl from 'react-intl-universal';
import LazyLoad from 'react-lazyload';
import styles from './detail.module.less';
import { stringify } from '@/util/utilTools';


const pre = 'rate';

class RateDetail extends Component {

    constructor(props) {
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
            price: 0,
            amount: 0,
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
            unit: '',
        }
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        let id = this.props.match.params.id;
        let amount = this.props.match.params.amount;
        this.setState({ amount: Number(amount) })
        this.getGoodDetail(id);
        // this.getRatePrice();
        // this.getRateProblem();
        this.setState({ id: id });
        this.setRefresh(id);
    }

    componentWillUnmount() {
        if (this.refreshData) {
            clearInterval(this.refreshData);
            this.refreshData = null;
        }
    }

    getGoodDetail(id) {
        net.getGoodDetail(id).then(res => {
            if (res.ret === 200) {
                this.setState(res.data)
            }
        })
    }

    getRateProblem() {
        net.getRateProblem().then(res => {
            if (res.responseCode === '00') {
                this.setState({ problem: res.content })
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

    setRefresh(id) {
        if (this.refreshData) return;
        this.refreshData = setInterval(() => {
            this.getGoodDetail(id)
        }, 15000)
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
                this.props.setLogin(true);
                this.props.getUserInfo();
            }
        });
    }

    loginChange(type, val) {
        console.log('type,val', type, val)
        if (type === 'password') {
            this.setState({ password: val })
        } else {
            this.setState({ account: val })
        }
    }

    checkInput(e) {
        let val = e.target.value;
        if (reg.regInt(Number(val) && val >= this.state.minLimit)) {
            this.setState({ amount: Number(val) });
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

    selectTab(tab) {
        this.setState({ tab: tab })
    }

    checkStatus(amount) {
        const login = this.props.redux.login;
        if (!login) {
            this.setState({ loginVisible: true })
        }
        /* else if(this.props.redux.userInfo.payPwd !== 1 || !this.props.redux.userInfo.ga)*/
        else if (this.props.redux.userInfo.payPwd !== 1) {
            this.setState({ cacelVisible: true })
            // Toast.info(intl.get('RATE_73'), 2, ()=>{ this.props.history.push('/user/account') },false);
        }
        else if (this.state.status !== 1) {
            message.info(intl.get('p400006'), 1, () => { });
        }
        else if (amount < this.state.minLimit) {
            message.info(intl.get('RATE_1', { limit: this.state.minLimit }), 2, () => { });
        }
        else {
            //this.props.history.push(`/rate_first_step/${this.state.id}/${amount}`)
            //this.props.history.push(`/orderPay/${this.state.id}/${amount}`)
            this.props.history.push({
                pathname: '/orderPay',
                search: stringify({ id: this.state.id, amount: amount })
            })

        }
    }

    render() {
        let currentLocale = localStorage.getItem('lang') || 'zh';
        return (
            <div className={`${pre}`}>
                {/*<div className={'bg'}></div>*/}
                <div className={'content'}>
                    <div style={{ width: "1200px", position: "relative", margin: "auto" }}>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/count_picture_1.png')} style={{ position: "absolute", right: "-150px", top: "600px" }} alt="" />
                        </LazyLoad>
                        <LazyLoad height={75}>
                            <img src={require('@/images/home/count_picture_2.png')} style={{ position: "absolute", left: "-156px", top: "300px" }} alt="" />
                        </LazyLoad>
                    </div>
                    <Cell
                        key={0}
                        type={4}
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
                        amount={this.state.amount}
                        originalPrice={this.state.originalPrice}
                        settlementPeriod={this.state.settlementPeriod}
                        support={this.state.support}
                        locale={currentLocale}
                        onClick={(amount) => { this.checkStatus(amount) }}
                        unit={this.state.unit}
                    />
                    {/* <div className={'detail-bottom flex-row-center'}>
                            <p className={'p1'} style={{width: '2.5rem'}}>{intl.get('RATE_2')} <span className={'p2'}> $ {(this.state.price * this.state.amount).toFixed(2)}</span></p>
                            <ChooseInput 
                             value={this.state.amount}
                             onChange={(e) => {this.checkInput(e)}}
                             onAdd={()=>{ this.extarClick('add') }}
                             onSub={()=>{ this.extarClick('sub') }}
                            />
                            <Button type={'big'} onClick={()=>{this.checkStatus()}}>{intl.get('RATE_3')}</Button>
                        </div>  */}
                    <div className={styles.detailContent}>
                        {/*<div className={'flex-row margin'} style={{margin: '.45rem auto 0 auto'}}>
                                <MenuItem content={intl.get('RATE_6')} selected={this.state.tab === 0 ? true : false} onClick={() => {this.selectTab(0)}}/>
                                <MenuItem content={intl.get('RATE_4')} selected={this.state.tab === 1 ? true : false} onClick={() => {this.selectTab(1)}}/>
                                <MenuItem content={intl.get('RATE_5')} selected={this.state.tab === 2 ? true : false} onClick={() => {this.selectTab(2)}}/>
                            </div>*/}
                        <div className={styles.detailLabel}>{intl.get('RATE_4')}</div>
                        <div className={styles.container} dangerouslySetInnerHTML={{ __html: this.state.contractDetails }}></div>
                        {/*{
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
                        }*/}
                    </div>

                </div>
                <Footer />
                <LoginModal
                    visible={this.state.loginVisible}
                    account={this.state.account}
                    password={this.state.password}
                    onConfirm={() => this.login()}
                    onCancel={() => this.setState({ loginVisible: false })}
                    loginChange={(type, v) => this.loginChange(type, v)}
                />
                <CancelModal
                    cacelVisible={this.state.cacelVisible}
                    content={intl.get('RATE_73')}
                    onConfirm={() => { this.props.history.push('/user/account') }}
                    onCancel={() => this.setState({ cacelVisible: false })}
                    set={true}
                />
            </div>
        );
    }
}

export default connect(RateDetail)
