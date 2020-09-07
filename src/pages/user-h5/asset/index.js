import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import { Header } from '../../../components';
import intl from 'react-intl-universal';
import Ope from './ope';
import Detail from './detail';

import net from '../../../net';

const images = {
    FILP: require('../images/coin-filp.png'),
    BTC: require('../images/coin-btc.png'),
    ETH: require('../images/coin-eth.png'),
    USDT: require('../images/coin-usdt.png'),
    FIL: require('../images/coin-fil.png'),
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: []
        }
    }

    componentDidMount() {

        net.getAssetMy().then(res => {
            if (res.ret == 200) {
                this.setState({ coins: res.data });
            }
        })

    }

    render() {
        return (
            <div className="bg-h5">
                <Header
                    title={intl.get('USER_5')}
                    left={this.props.history.goBack}
                    right={
                        (<a style={{ fontSize: '3.7vw' }} onClick={() => this.props.history.push(`/user/asset/detail`)}>{intl.get('USER_6')}</a>)
                    }
                />
                <ul className="asset-h5">
                    {this.state.coins.map(item => (
                        <li key={String(item.asset)}>
                            <div className="asset-h5-detail">
                                <h5><img src={images[item.asset]} alt="" />{item.asset}</h5>
                                <span>{intl.get('USER_27')}：<span style={{color:"#E49C3A"}}>{item.available}</span> <span style={{ fontSize: '3.2vw', color:"#E49C3A"}}>{item.asset}</span></span>
                            </div>
                            {item.asset === 'FILP' ? (
                                <span className="asset-h5-ope">
                                    <div className="filp">
                                        <span onClick={() => this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)}>{intl.get('USER_29')}</span>
                                        <span onClick={() => this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)}>{intl.get('USER_30')}</span>
                                    </div>
                                    <span onClick={() => this.props.history.push(`/user/asset/ope?type=exchange&coin=${item.asset}`)}>{intl.get('USER_28')}</span>
                                </span>
                            ) : (
                                    <span className="asset-h5-ope">
                                        <span onClick={() => this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)}>{intl.get('USER_29')}</span>
                                        <span onClick={() => this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)}>{intl.get('USER_30')}</span>
                                    </span>
                                )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default class Index extends Component {
    render() {
        return (
            <Router>
                <Route path="/user/asset/index2" component={App} />
                <Route path="/user/asset/ope" component={Ope} />
                <Route path="/user/asset/detail" component={Detail} />
            </Router>
        )
    }
}
