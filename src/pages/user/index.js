/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Progress, Modal, Select, Input, message } from 'antd';
import connect from '../../store/connect';
import intl from 'react-intl-universal';
import Foot from '@/pages/footer/index';
import net from "@/net/index";
import './index.less';
import styles from './index.module.less';

import parseFloatData from '../../util/parseFloatData';

//import Animate from './animate';

// 资产管理
import Asset from './asset';

// 订单管理
import Order from './order';

// 账户管理
import {
    Account,
    AccountPhone,
    AccountEmail,
    BindEmail,
    AccountPassword,
    AccountPay,
    AccountGa,
    SetPay,
    AccountGaModify,
} from './account';

// 算力管理
import Rate from './rate';

// 算力管理
import Distribution from './distribution';
import DistributionDetail from './distribution/InviteDetail';
import loadable from "@/components/loadable";

/*实名认证*/
import ActualIndex from './actual';
const imgs = {
    tab1: require('./images/icon-t1.png'),
    tab1s: require('./images/icon-t1-s.png'),
    tab2: require('./images/icon-t2.png'),
    tab2s: require('./images/icon-t2-s.png'),
    tab3: require('./images/icon-t3.png'),
    tab3s: require('./images/icon-t3-s.png'),
    tab4: require('./images/icon-t4.png'),
    tab4s: require('./images/icon-t4-s.png'),
    tab5: require('./images/icon-t5.png'),
    tab5s: require('./images/icon-t5-s.png'),
    tab6: require('./images/icon-t6.png'),
    tab6s: require('./images/icon-t6-s.png'),
}

const RedirectHome = () => (
    <Redirect to="/user/account" />
);

class App extends Component {

    constructor(props) {
        super(props);
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
        }

        this.state = {
            myWeight1: {},
            myWeight2: {},
            visible: false,
            asset: "FIL",
            myAsset: {},
            buyNum: ''
        };
    }

    componentDidMount() {
        net.getAssetMy().then(res => {
            res.data.forEach(val => {
                if (val.asset = this.state.asset) {
                    this.setState({
                        myAsset: val
                    })
                }
            });
        })
        net.getMyPowert({
            number: 1,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState({
                    myWeight1: res.data,
                });
            }
        });
        net.getMyPowert({
            number: 2,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState({
                    myWeight2: res.data,
                });
            }
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    /*获取用户等级*/
    renderLevelItem(level) {
        let text = "";
        switch (level) {
            case -1:
                text = intl.get('ACCOUNT_152');
                break;
            case 0:
                text = intl.get('ACCOUNT_108');
                break;
            case 1:
                text = intl.get('ACCOUNT_104');
                break;
            case 2:
                text = intl.get('ACCOUNT_105');
                break;
            case 3:
                text = intl.get('ACCOUNT_106');
                break;
            case 4:
                text = intl.get('ACCOUNT_107');
                break;
            case 5:
                text = intl.get('ACCOUNT_153');
                break;
            default:
                text = intl.get('ACCOUNT_152');
        }
        return text;
    }

    renderItem(path, text, tab) {
        const pathname = this.props.location.pathname;
        const active = pathname.includes(path.replace('/index', '')) || pathname.includes(path.replace('/index2', ''));
        return (
            <li>
                <a
                    onClick={() => this.props.history.push(path)}
                    className={active ? 'active' : ''}>
                    <img src={active ? imgs[`${tab}s`] : imgs[tab]} alt="" style={{ height: "auto" }} />
                    <span>{text}</span>
                </a>
            </li>
        );
    }

    doneNum(num, count) {
        var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
        return newNum;
    }
    // onChangeNum(e) {
    //     if (!isNaN(e.target.value)) {
    //         this.setState({
    //             buyNum: e.target.value
    //         })
    //     }
    // }
    // handleOk = () => {
    //     net.getTransferPledged({
    //         amount: this.state.buyNum
    //     }).then(res => {
    //         console.log(res)
    //         if (res.ret === 200) {
    //             this.setState({
    //                 visible: false
    //             })
    //             message.success('划转成功');
    //         }
    //     }).catch(() => {
    //         this.setState({
    //             visible: false
    //         })
    //     })
    // }
    // handleCancel = () => {
    //     this.setState({
    //         visible: false
    //     })
    // }
    render() {
        let { myWeight1, myWeight2, myAsset, buyNum } = this.state;
        console.log(myWeight1)
        console.log(myWeight2)
        // let progress1 = this.doneNum((myWeight1.adj / myWeight1.maxAdj) * 100, 4)
        // let progress2 = this.doneNum((myWeight2.adj / myWeight2.maxAdj) * 100, 4)
        return (
            <div className="user">
                <div>
                    {/* <Modal
                        title="资金划转"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div style={{ width: '400px', display: "block", margin: '0 auto' }} >
                            <p>币种</p>
                            <Select style={{ width: 400 }} defaultValue={this.state.asset} disabled>
                                <Select.Option value={this.state.asset} >{this.state.asset}</Select.Option>
                            </Select>
                        </div>
                        <div style={{ width: '400px', display: 'flex', margin: '20px auto 0', justifyContent: 'space-between' }}>
                            <div>
                                <p>从</p>
                                <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                    <Select.Option value='transferType' >充提账户</Select.Option>
                                </Select>
                            </div>
                            <div>
                                <img src={require('@/images/exchange.png')} style={{ width: '18px', height: '10px', marginTop: '32px', cursor: 'pointer' }} alt="" />
                            </div>
                            <div >
                                <p>到</p>
                                <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                    <Select.Option value='transferType' >质押</Select.Option>
                                </Select>
                            </div>
                        </div>

                        <div style={{ width: '400px', margin: '20px auto 0' }}>
                            <p>数量</p>
                            <Input style={{ width: 400 }} placeholder="请输入划转数量" value={buyNum} onChange={(e) => { this.onChangeNum(e) }} suffix={
                                <span>{this.state.asset}</span>
                            } />
                        </div>

                        <div style={{ width: '400px', margin: '10px auto 0' }}>
                            <span>{Math.min(
                                parseFloatData(myWeight2.maxPledged) - parseFloatData(myWeight2.currentPledged),
                                parseFloatData(myAsset.recharge)
                            )}</span>
                            <span onClick={() => {
                                this.setState({
                                    buyNum: Math.min(
                                        parseFloatData(myWeight2.maxPledged) - parseFloatData(myWeight2.currentPledged),
                                        parseFloatData(myAsset.recharge)
                                    )
                                })
                            }} style={{ marginLeft: '10px', color: '#F1A02C', cursor: 'pointer' }}>全部划转</span>
                        </div>
                    </Modal> */}
                    <div className="user-content" style={{ minHeight: "auto", paddingBottom: "0" }}>
                        <div className={styles.bannerBox}>
                            <div className={styles.middleBox}>
                                {/*<span className={`iconfont ${styles.icon}`}>&#xe62c;</span>*/}
                                <img src={require("@/images/common/logo.png")} style={{ width: "56px", marginRight: "22px" }} alt="" />
                                <div>
                                    <div style={{ marginBottom: "8px" }}>
                                        <span className={styles.bold}>{this.props.redux.userInfo.nickname}</span>
                                        <span className={styles.label}>{this.renderLevelItem(this.props.redux.userInfo.level)}</span>
                                    </div>
                                    <span>UID:{this.props.redux.userInfo.id}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.userHeader}`} style={{ justifyContent: 'space-between' }}>
                            <div>
                                <span className={styles.bold} style={{ marginRight: '40px' }}>一期{intl.get('ACCOUNT_156')}：{myWeight1.totalPower} TB</span>
                                <span className={styles.bold} style={{ marginRight: '20px' }}>二期{intl.get('ACCOUNT_156')}：{myWeight2.totalPower} TB</span>
                            </div>
                            <a href="/#/power_details">详情&gt;&gt;</a>
                            {/* <span className={styles.bold}>{intl.get('ACCOUNT_200')}：{parseFloatData(myWeight1.maxAdj)} TB</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={styles.bold}> 目前有效算力：{myWeight1.adj}TB</span>
                                <Progress strokeColor='#EF8C21' style={{ width: '250px', margin: '0 20px' }} percent={progress1} status="active" />
                            </div> */}
                        </div>
                        {/* <div className={`${styles.userHeader}`} style={{ justifyContent: 'space-between' }}>
                            <span className={styles.bold}>二期:</span>
                            <span className={styles.bold}>{intl.get('ACCOUNT_156')}：{myWeight2.totalPower} TB</span>
                            <span className={styles.bold}>{intl.get('ACCOUNT_200')}：{parseFloatData(myWeight2.maxAdj)} TB</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={styles.bold}> 目前有效算力：{myWeight2.adj}TB</span>
                                <Progress strokeColor='#EF8C21' style={{ width: '250px', margin: '0 20px' }} percent={progress2} status="active" />
                            </div>
                        </div> */}
                        {/* <div className={`${styles.userHeader}`} style={{ justifyContent: 'space-between' }}>
                            <div></div>
                            <div style={{ display: 'flex' }}>
                                <a href="/#/expedite_details"><span style={{ fontSize: '16px', color: '#F49536', }}>去加速算力 &gt;&gt;</span></a>
                                <div onClick={() => { this.setState({ visible: true }) }} style={{ cursor: 'pointer', marginLeft: '30px' }}>去质押 &gt;&gt; </div>
                            </div>
                        </div> */}
                    </div>
                    <div style={{ width: "1200px", margin: '0 auto 60px' }}>
                        <div className="user-main" style={{ width: "calc(100% + 158px)", transform: "translateX(-158px)" }}>
                            <div className="user-side-tab">
                                <ul>
                                    {this.renderItem('/user/asset/index2', intl.get('USER_5'), 'tab5')}
                                    {this.renderItem('/user/order', intl.get('USER_2'), 'tab2')}
                                    {this.renderItem('/user/rate', intl.get('USER_3'), 'tab3')}
                                    {/* {this.renderItem('/user/distribution', intl.get('USER_4'), 'tab4')} */}
                                    {this.renderItem('/user/account', intl.get('USER_1'), 'tab1')}
                                    {this.renderItem('/user/actual', intl.get('USER_124'), 'tab6')}
                                </ul>
                            </div>
                            <div className="user-body">
                                <Router>
                                    <Route exact path="/user" component={RedirectHome} />
                                    <Route path="/user/asset" component={Asset} />
                                    <Route path="/user/order" component={Order} />
                                    <Route exact path="/user/account" component={Account} />
                                    <Route path="/user/account/phone" component={AccountPhone} />
                                    <Route path="/user/account/email" component={AccountEmail} />
                                    <Route path="/user/account/bind_email" component={BindEmail} />
                                    <Route path="/user/account/password" component={AccountPassword} />
                                    <Route path="/user/account/pay_pass" component={AccountPay} />
                                    <Route path="/user/account/set_pay" component={SetPay} />
                                    <Route path="/user/account/ga" component={AccountGa} />
                                    <Route path="/user/account/modify_ga" component={AccountGaModify} />
                                    <Route path="/user/rate" component={Rate} />
                                    <Route exact path="/user/distribution" component={Distribution} />
                                    <Route path="/user/distribution/detail" component={DistributionDetail} />
                                    <Route path="/user/actual" component={ActualIndex} />
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Animate />*/}
                <Foot />
            </div>
        )
    }
}

export default connect(App);
