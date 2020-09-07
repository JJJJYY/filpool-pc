/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import connect from '../../store/connect';

import './index.less';

// 首页
import User from './user';

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

const RedirectHome = () => (
    <Redirect to="/user/index" />
);

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/user" component={RedirectHome} />
                <Route path="/user/index" component={User} />
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
            </Router>
        )
    }
}

export default connect(App);
