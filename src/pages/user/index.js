/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import connect from '../../store/connect';
import intl from 'react-intl-universal';
import Foot from '@/pages/footer/index';
import net from "@/net/index";
import './index.less';
import styles from './index.module.less';

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
            myWeight: {}
        };
    }

    componentDidMount() {
        net.getMyWeight({
            type: 0,
        }).then((res) => {
            if (res.ret == 200) {
                this.setState({
                    myWeight: res.data
                });
            }
        })
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

    render() {
        let { myWeight } = this.state;
        return (
            <div className="user">
                <div>
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
                        {/*<div className="user-header">
                        <div className="user-header-icon"></div>
                        <h5 className="user-header-account">{this.props.redux.userInfo.nickname}</h5>
                        {this.props.location.pathname.includes('/user/asset') ? (
                            <a className="user-more" onClick={() => this.props.history.push(`/user/asset/detail`)}>{intl.get('USER_6')}</a>
                        ) : null}
                    </div>*/}
                        <div className={`${styles.userHeader}`}>
                            <span className={styles.bold}>{intl.get('ACCOUNT_156')}：{myWeight.totalWeight} TB</span>
                            {/* <span className={styles.bold}>{intl.get('ACCOUNT_200')}：{myWeight.validWeight} TB</span> */}
                            <Link className={styles.label} to={{ pathname: '/rate' }}>
                                <span className={styles.label}>{intl.get("USER_122")}</span>
                            </Link>
                        </div>
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
