import React, { Component } from 'react';
import In from './in';
import Out from './out';
import Exchange from './exchange';

import net from '../../../net';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: {}
        }
    }

    componentDidMount() {
        Promise.all([net.getAssetTokens(), net.getAssetMy()]).then((res) => {
            let res0 = res[0];
            let res1 = res[1];
            if (res0.ret == 200 && res1.ret == 200) {
                const coins = {};
                res0.data.forEach(item => {
                    coins[item.asset] = item;
                });

                res1.data.map(item => {
                    if (coins[item.asset]) {
                        coins[item.asset].available = parseFloat(item.available);
                        coins[item.asset].recharge = parseFloat(item.recharge);
                        coins[item.asset].frozen = parseFloat(item.frozen);
                        coins[item.asset].todayWithdrawAmount = item.todayWithdrawAmount;
                    }
                });

                this.setState({ coins });
            }
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        if (Object.keys(this.state.coins).length > 0) {
            const search = this.props.location.search;
            const params = {};
            search.replace('?', '').split('&').map(item => params[item.split('=')[0]] = item.split('=')[1]);

            switch (params.type) {
                case 'in':
                    return (<In {...this.props} coins={this.state.coins} coin={params.coin} />);
                case 'out':
                    return (<Out {...this.props} coins={this.state.coins} coin={params.coin} extra={params.extra} />);
                case 'exchange':
                    return (<Exchange {...this.props} coins={this.state.coins} coin={params.coin} />);
                default:
                    return null;
            }
        } else {
            return null;
        }
    }
}
