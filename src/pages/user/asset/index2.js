import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import Ope from './ope';
import Detail from './detail';
import intl from 'react-intl-universal';
import parseFloatData from '@/util/parseFloatData'
import net from '../../../net';
import { Modal } from "antd";
import connect from "../../../store/connect";

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

        Promise.all([net.getAssetTokens(), net.getAssetMy()]).then((res) => {
            let res0 = res[0];
            let res1 = res[1];
            if (res0.ret == 200 && res1.ret == 200) {
                let coins = res1.data || [];

                let assetList = coins.map((item) => {
                    res0.data.forEach((item1) => {
                        if (item.asset === item1.asset) {
                            item.withdraw = item1.withdraw;
                            item.deposit = item1.deposit;
                            item.type = item1.type;
                        }
                    });
                    return item;
                });

                this.setState({ coins: assetList });
            }
        });
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

    render() {

        const { userInfo } = this.props.redux;

        return (
            <ul className="assets">
                {this.state.coins.map(item => (
                    <li key={String(item.asset)}>
                        <img src={images[item.asset]} alt="" style={{ width: "40px", height: "40px" }} />
                        <div className="asset-detail">
                            <h5>{item.asset}{item.type ? '（' + item.type + '）' : ''}</h5>
                            {/*<span>{intl.get('USER_27')}：</span><span style={{color: "#E49C3A"}}>{item.available}  {item.asset}</span>*/}
                            <span>{intl.get('USER_27')}：</span><span>{parseFloatData(item.available) + parseFloatData(item.frozen)}  {item.asset}</span>
                        </div>
                        <span className="asset-ope">
                            {/*{item.asset === 'FILP' && (<span onClick={() => {userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=exchange&coin=${item.asset}`) : this.bindPwd()
                            }}>{intl.get('USER_28')}</span>)}*/}
                            {<button disabled={item.deposit !== 1} onClick={() => {
                                userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)
                                    : this.bindPwd()
                            }}>{intl.get('USER_29')}</button>}
                            {<button disabled={item.withdraw !== 1} onClick={() => {
                                userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)
                                    : this.bindPwd()
                            }}>{intl.get('USER_30')}</button>}
                            {/*{item.asset === "FIL" ? <span>{intl.get('USER_29')}</span> : <span onClick={() => {userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)
                                : this.bindPwd()
                            }}>{intl.get('USER_29')}</span>}
                            {item.asset === "FIL" ? <span>{intl.get('USER_30')}</span> : <span onClick={() => {userInfo.payPwd ? this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)
                                : this.bindPwd()
                            } }>{intl.get('USER_30')}</span>}*/}
                        </span>
                    </li>
                ))}
            </ul>
        )
    }
}

export default connect(App)
