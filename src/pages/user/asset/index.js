import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import Ope from './ope';
import Detail from './detail';
import App from './index2';
import intl from 'react-intl-universal';

import net from '../../../net';
import {Modal} from "antd";

// const images = {
//     FILP: require('../images/coin-filp.png'),
//     BTC: require('../images/coin-btc.png'),
//     ETH: require('../images/coin-eth.png'),
//     USDT: require('../images/coin-usdt.png'),
//     FIL: require('../images/coin-fil.png'),
// }
//
// class App extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             coins: []
//         }
//     }
//
//     componentDidMount() {
//
//         net.getAssetMy().then(res => {
//             console.log(res)
//             if (res.responseCode == '00') {
//                 this.setState({ coins: res.content });
//             }
//         }).catch(console.log);
//
//     }
//
//     bindPwd() {
//         // Modal.confirm({
//         //     title: "请先绑定资金密码",
//         //     okText: "去设置",
//         //     onOk() {
//         //         this.props.history.push('/user/account/ga');
//         //     },
//         //     onCancel() {},
//         // });
//     }
//
//     render() {
//
//         // const { userInfo } = this.props.redux;
//
//         return (
//             <ul className="assets">
//                 {this.state.coins.map(item => (
//                     <li key={String(item.asset)}>
//                         <img src={images[item.asset]} alt="" />
//                         <div className="asset-detail">
//                             <h5>{item.asset}</h5>
//                             <p>{intl.get('USER_27')}：{item.available}{item.asset}</p>
//                         </div>
//                         <span className="asset-ope">
//                             {item.asset === 'FILP' && (<span onClick={() => {this.props.history.push(`/user/asset/ope?type=exchange&coin=${item.asset}`)
//                             }}>{intl.get('USER_28')}</span>)}
//                             {item.asset === "FIL" ? <span style={{border: "1px solid #959fa9", color:"#959fa9"}}>{intl.get('USER_29')}</span> : <span onClick={() => {this.props.history.push(`/user/asset/ope?type=in&coin=${item.asset}`)
//                             }}>{intl.get('USER_29')}</span>}
//                             {item.asset === "FIL" ? <span style={{border: "1px solid #959fa9", color:"#959fa9"}}>{intl.get('USER_30')}</span> : <span onClick={() => {this.props.history.push(`/user/asset/ope?type=out&coin=${item.asset}`)
//                             } }>{intl.get('USER_30')}</span>}
//                         </span>
//                     </li>
//                 ))}
//             </ul>
//         )
//     }
// }

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
