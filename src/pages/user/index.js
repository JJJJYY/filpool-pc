/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Progress, Modal, Select, Input, Menu, Tooltip } from 'antd';
import {
    FileSearchOutlined,
    FundOutlined,
    IdcardOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import connect from '../../store/connect';
import intl from 'react-intl-universal';
import Foot from '@/pages/footer/index';
import net from "@/net/index";
import './index.less';
import styles from './index.module.less';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Decimal } from "decimal.js";
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

const keys = ['order', 'rate', 'account', 'actual'];

function thisHandlePath(key) {
    let result = '';
    keys.forEach((item) => {
        if (key.includes(item)) result = item;
    });
    return result;
}


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
            // asset: "FIL",
            myAsset: null,
            buyNum: ''
        };
    }

    componentDidMount() {
        Promise.all([net.getAssetTokens(), net.getAssetMy()]).then((res) => {
            let res0 = res[0];
            let res1 = res[1];
            if (res0.ret == 200 && res1.ret == 200) {
                let myAsset = res1.data || [];

                let assetList = myAsset.map((item) => {
                    res0.data.forEach((item1) => {
                        if (item.asset === item1.asset) {
                            item.withdraw = item1.withdraw;
                            item.deposit = item1.deposit;
                            item.type = item1.type;
                        }
                    });
                    return item;
                });

                this.setState({ myAsset: assetList });
            }
        });

        // 一二期算力
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

    DecimalData(a, b) {
        return parseFloatData(Decimal.add(a, b));
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

    bindPwd() {
        const { history } = this.props;
        Modal.warning({
            title: "请先绑定资金密码",
            okText: "去设置",
            cancelText: "取消",
            onOk() {
                history.push('/user/account');
            },
        });
    }
    onChange(v) {
    }

    render() {
        const { myWeight1, myWeight2, myAsset, buyNum } = this.state;
        const { userInfo } = this.props.redux;
        const self = this;
        return (
            <div className="user">
                <div>
                    <div className="user-content" style={{ minHeight: "auto", paddingBottom: "0" }}>
                        <div className={styles.bannerBox}>
                            <div className={styles.middleBox}>
                                {
                                    myAsset ? myAsset.map((item, index) => {
                                        return (
                                            <div className={styles.thisBox} key={index}>
                                                <div className={styles.myAssetTitle}>
                                                    <div className={styles.myAssetAlign}>
                                                        <img className={styles.myAssetImage} src={item.asset === "USDT" ? require('../../images/myasset/USDT.png') : require('../../images/myasset/Fil.png')} alt="" />
                                                        <p className={styles.myAssetTitleText}> {item.asset}{item.type ? '（' + item.type + '）' : ''}</p>
                                                    </div>
                                                    <div className={styles.myAssetAlign}>
                                                        <img className={styles.myAssetImgSize} src={require('../../images/myasset/myassetO.png')} alt="" />
                                                        <button disabled={item.deposit !== 1} onClick={() => {
                                                            userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)
                                                                : this.bindPwd()
                                                        }}>充币</button>
                                                        <p className={styles.xian}>|</p>
                                                        <img className={styles.myAssetImgSize} src={require('../../images/myasset/myassetG.png')} alt="" />
                                                        <button disabled={item.withdraw !== 1} onClick={() => {
                                                            userInfo.payPwd ?
                                                                item.asset == 'FIL' ?
                                                                    Modal.confirm({
                                                                        title: "提示",
                                                                        content: (
                                                                            <div>FILPool矿池每天12：00发放上一日挖矿收益，如用户选择不提币，则可用资产将用于FILPool矿池第二天算力增长所需的质押币。 由于目前需要质押币才能保持算力稳定增长，如用户提币导致账户质押币不足将影响您的算力增长以及次日挖矿收益。</div>
                                                                        ),
                                                                        okText: "取消",
                                                                        cancelText: "提现",
                                                                        onCancel() {
                                                                            self.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)
                                                                        },
                                                                    })
                                                                    : this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)
                                                                : this.bindPwd()
                                                        }}>提币</button>
                                                    </div>
                                                    <button onClick={() => { this.props.history.push(`/capital_details/${item.asset}`) }} className={styles.myAssetAlign}>
                                                        <p className={styles.myAssetText}>资金明细</p>
                                                        <img className={styles.myAssetTextImage} src={require('../../images/jiantou.png')} alt="" />
                                                    </button>
                                                </div>
                                                <div className={styles.myAssetNum}>
                                                    <span>总资产：</span>
                                                    <span className={styles.myAssetNumBole}>{this.DecimalData(Decimal.add(item.available, item.recharge), Decimal.add(item.frozen, item.pledged))} {item.asset}</span>
                                                </div>
                                                <div className={styles.myAssetDetail}>
                                                    <div>
                                                        <button onClick={() => { this.props.history.push(`/available_capital/${item.asset}`) }} className={styles.myAssetDetailFlex}>
                                                            <p>可用资产</p>
                                                            <img className={styles.myAssetTextImage} src={require('../../images/jiantou.png')} alt="" />
                                                        </button>
                                                        <p className={styles.myAssetDetailNum}>{this.DecimalData(item.available, item.recharge)}</p>
                                                    </div>
                                                    <div>
                                                        <div className={styles.myAssetDetailFlex}>
                                                            <p>冻结资产</p>
                                                            <Tooltip placement="top" className={styles.doubt} title={'每天线性释放，释放周期180天'}>
                                                                <QuestionCircleOutlined></QuestionCircleOutlined>
                                                            </Tooltip>
                                                        </div>
                                                        <p className={styles.myAssetDetailNum}>{parseFloatData(item.frozen)}</p>
                                                    </div>
                                                    <div>
                                                        <div className={styles.myAssetDetailFlex}>
                                                            <p>质押资产</p>
                                                            <Tooltip placement="top" className={styles.doubt} title={'质押金额用于有效算力增长'}>
                                                                <QuestionCircleOutlined ></QuestionCircleOutlined>
                                                            </Tooltip>
                                                        </div>
                                                        <p className={styles.myAssetDetailNum}>{parseFloatData(item.pledged)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                            {/* <div className={styles.middleBox}>
                                <img src={require("@/images/common/logo.png")} style={{ width: "56px", marginRight: "22px" }} alt="" />
                                <div>   
                                    <div style={{ marginBottom: "8px" }}>
                                        <span className={styles.bold}>{this.props.redux.userInfo.nickname}</span>
                                        <span className={styles.label}>{this.renderLevelItem(this.props.redux.userInfo.level)}</span>
                                    </div>
                                    <span>UID:{this.props.redux.userInfo.id}</span>
                                </div>
                            </div> */}
                        </div>
                        <div className={`${styles.userHeader}`} >
                            <div className={`${styles.powerText}`} >
                                <span className={styles.bold}>一期{intl.get('ACCOUNT_156')}：<span className={styles.boldColor}>{myWeight1.totalPower}</span> TB</span>
                                <span className={styles.xian}>|</span>
                                <span className={styles.bold}>二期{intl.get('ACCOUNT_156')}：<span className={styles.boldColor}>{myWeight2.totalPower}</span> TB</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userCententBackground}>
                        <div className={styles.userCententWidth}>
                            <div className="user-main" >
                                {/* <div className="user-side-tab">
                                <ul>
                                    {this.renderItem('/user/asset/index2', intl.get('USER_5'), 'tab5')}
                                    {this.renderItem('/user/order', intl.get('USER_2'), 'tab2')}
                                    {this.renderItem('/user/rate', intl.get('USER_3'), 'tab3')}
                                    {this.renderItem('/user/account', intl.get('账户管理'), 'tab1')}
                                    {this.renderItem('/user/actual', intl.get('实名认证'), 'tab6')}
                                </ul>
                            </div> */}
                                <Menu
                                    style={{ width: 194, minHeight: 715, marginRight: '10px' }}
                                    mode={'inline'}
                                    theme={'light'}
                                    selectedKeys={thisHandlePath(window.location.hash)}
                                    onClick={this.onChange}
                                >
                                    <Menu.Item key={keys[0]} icon={<FileSearchOutlined />}>
                                        <Link to='/user/order'>
                                            {intl.get('订单管理')}
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key={keys[1]} icon={<FundOutlined />}>
                                        <Link to='/user/rate'>
                                            {intl.get('算力管理')}
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key={keys[2]} icon={<IdcardOutlined />}>
                                        <Link to='/user/account'>
                                            {intl.get('账户管理')}
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key={keys[3]} icon={<UserSwitchOutlined />}>
                                        <Link to='/user/actual'>
                                            {intl.get('实名认证')}
                                        </Link>
                                    </Menu.Item>
                                </Menu>
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
                </div>
                {/*<Animate />*/}
                <Foot />
            </div>
        )
    }
}

export default connect(App);
