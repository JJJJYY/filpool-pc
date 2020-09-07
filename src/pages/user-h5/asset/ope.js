import React, { Component } from 'react';
import { Header } from '../../../components';
import In from './in';
import Out from './out';
import Exchange from './exchange';
import intl from 'react-intl-universal';

import net from '../../../net';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: {}
        }
    }

    componentDidMount() {

        net.getAssetTokens().then(res => {
            if (res.ret == 200) {
                const coins = {};
                res.data.forEach(item => {
                    coins[item.asset] = item;
                });
                this.setState({ coins });
            }
        })

        net.getAssetMy().then(res => {
            if (res.ret == 200) {
                const coins = this.state.coins;
                res.data.map(item => {
                    coins[item.asset].available = item.available;
                    coins[item.asset].frozen = item.frozen;
                    coins[item.asset].todayWithdrawAmount = item.todayWithdrawAmount;
                });
                this.setState({ coins });
            }
        })

    }

    render() {
        if (Object.keys(this.state.coins).length > 0) {
            const search = this.props.location.search;
            const params = {};
            search.replace('?', '').split('&').map(item => params[item.split('=')[0]] = item.split('=')[1]);
            let main = null, title = '';
            switch (params.type) {
                case 'in':
                    title = intl.get('USER_29');
                    main = (<In {...this.props} coins={this.state.coins} coin={params.coin} />);
                    break;
                case 'out':
                    title = intl.get('USER_30');
                    main = (<Out {...this.props} coins={this.state.coins} coin={params.coin} extra={params.extra} />);
                    break;
                case 'exchange':
                    title = intl.get('USER_28');
                    main = (<Exchange {...this.props} coins={this.state.coins} coin={params.coin} />);
                    break;
                default:
                    break;
            }
            return (
                <div className="bg-h5">
                    <Header
                        title={title}
                        left={this.props.history.goBack}
                    />
                    <div className="ope-h5">
                        <div className="ope-h5-tabs">
                            <a
                                onClick={() => this.props.history.replace(`/user/asset/ope?type=in&coin=${params.coin}`)}
                                className={params.type === 'in' ? 'active' : ''}>{intl.get('USER_29')}</a>
                            <a
                                onClick={() => this.props.history.replace(`/user/asset/ope?type=out&coin=${params.coin}`)}
                                className={params.type === 'out' ? 'active' : ''}>{intl.get('USER_30')}</a>
                            <a
                                onClick={() => this.props.history.replace(`/user/asset/ope?type=exchange&coin=${params.coin}`)}
                                className={params.type === 'exchange' ? 'active' : ''}>{intl.get('USER_28')}</a>
                        </div>
                        {main}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}
