import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import connect from '../store/connect';
import '../styles/web-reset.less';
import loadable from '@/components/loadable';

import Home from './home/index';
import HomeH5 from './home/H5';
import HomeTest from './Home';

// 云算力
/*import Rate from './rate';
import RateDetail from './rate/Detail';
import RateOrderStep1 from './rate/order/OrderStep1';
import RateOrderStep2 from './rate/order/OrderStep2';
import RateH5 from './rate/H5/Rate';
import RateDetailH5 from './rate/H5/Detail';
import RateOrderStep1H5 from './rate/order/H5/OrderStep1';
import RateOrderStep2H5 from './rate/order/H5/OrderStep2';
import Article from '../components/article';*/

import { Register, Login, Reset } from './auth';

// 帮助中心
/*import Help from './help/web';
import HelpDetail from './help/web/detail';
import HelpView from './help/web/view';
import HelpH5 from './help/h5';
import HelpH5Detail from './help/h5/detail';
import HelpH5View from './help/h5/view';*/

// 下载页
import Download from './download';

// 云算力
const Rate = loadable(() => import(/* webpackChunkName: "rate" */'./rate'));
const RateDetail = loadable(() => import(/* webpackChunkName: "rate" */'./rate/Detail'));
const RateOrderStep1 = loadable(() => import(/* webpackChunkName: "rate" */'./rate/order/OrderStep1'));
const RateOrderStep2 = loadable(() => import(/* webpackChunkName: "rate" */'./rate/order/OrderStep2'));
const RateH5 = loadable(() => import(/* webpackChunkName: "rate5" */'./rate/H5/Rate'));
const RateDetailH5 = loadable(() => import(/* webpackChunkName: "rate5" */'./rate/H5/Detail'));
const RateOrderStep1H5 = loadable(() => import(/* webpackChunkName: "rate5" */'./rate/order/H5/OrderStep1'));
const RateOrderStep2H5 = loadable(() => import(/* webpackChunkName: "rate5" */'./rate/order/H5/OrderStep2'));
const Article = loadable(() => import(/* webpackChunkName: "rate" */'../components/article'));
// const market = loadable(() => import(/* webpackChunkName: "rate" */'../pages/market/market'));

// 个人中心
const User = loadable(() => import(/* webpackChunkName: "user" */'./user'));
const capitalDetails = loadable(() => import(/* webpackChunkName: "user" */'../components/capitalDetails/capitalDetails'));
const UserH5 = loadable(() => import(/* webpackChunkName: "user" */'./user-h5'));
//资迅中心
const Information = loadable(() => import(/* webpackChunkName: "Information" */'@/pages/information/Information.jsx'));
const Information_Detail = loadable(() => import(/* webpackChunkName: "Information" */'@/pages/information/Detail.jsx'));
//好友邀请
const Invite = loadable(() => import('@/pages/invite/Invite.jsx'));
//下单
const OrderPay = loadable(() => import('@/pages/rate/pay/OrderPay.jsx'));
/*静态页面*/
const Airticle = loadable(() => import('@/pages/ariticle/airticle.jsx'));
const RedirectHome = () => (
    <Redirect to="/home" />
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: false,
        };
    }

    render() {
        if (this.props.mobile) {
            return (
                <Router>
                    <Route exact path="/" component={RedirectHome} />
                    <Route path="/rate" component={RateH5} />

                    <Route path="/rate_detail/:id/:amount" component={RateDetailH5} />
                    <Route path="/rate_first_step/:id/:amount" component={RateOrderStep1H5} />
                    <Route path="/rate_second_step/:id" component={RateOrderStep2H5} />
                    <Route path="/user" component={UserH5} />
                    <Route path="/article/:key" component={Article} />
                    {/*<Route path="/help" component={HelpH5} />
                    <Route path="/help_detail" component={HelpH5Detail} />
                    <Route path="/help_view/:id?/:title?" component={HelpH5View} />*/}
                    <Route path="/login" component={props => (<Login h5 {...props} />)} />
                    <Route path="/register/:code?" component={props => (<Register h5 {...props} />)} />
                    <Route path="/reset" component={props => (<Reset h5 {...props} />)} />
                    <Route path="/home" component={HomeTest} />
                    <Route path="/download" component={Download} />
                </Router>
            );
        }
        return (
            <Router>
                <Route exact path="/" component={RedirectHome} />
                <Route path="/home" component={Home} />
                <Route path="/rate" component={Rate} />
                <Route path="/register/:code?" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/reset" component={Reset} />
                {/*<Route path="/help" component={Help} />
                <Route path="/help_detail" component={HelpDetail} />
                <Route path="/help_view/:id?/:title?" component={HelpView} />*/}
                <Route path="/rate_detail/:id/:amount" component={RateDetail} />
                <Route path="/rate_first_step/:id/:amount" component={RateOrderStep1} />
                <Route path="/rate_second_step/:id" component={RateOrderStep2} />
                <Route path="/user" component={User} />
                <Route path="/capital_details" component={capitalDetails} />
                <Route path="/article/:key" component={Article} />
                <Route path="/information/:tab?" component={Information} />
                <Route path="/information_detail/:tab/:id" component={Information_Detail} />
                <Route path="/invite" component={Invite} />
                <Route path="/orderPay" component={OrderPay} />
                <Route path="/common/airticle/:id?" component={Airticle} />
                <Route path="/download" component={Download} />
                {/* <Route path="/market" component={market} /> */}
            </Router>
        );
    }
}

export default connect(App);
