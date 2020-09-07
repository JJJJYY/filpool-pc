import React, { PureComponent } from 'react';
import Header from '../../header';
import Service from './service';
import connect from '../../../store/connect';
import intl from 'react-intl-universal';

import net from '../../../net';

import './index.less';

const img = {
    icon1: require('../images/icon-1.png'),
    icon2: require('../images/icon-2.png'),
    icon3: require('../images/icon-3.png'),
    extra: require('../images/icon-extra.png'),
    qr: require('../images/icon-qr.png'),
    qq: require('../images/icon-qq.png'),
}

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            green: [],
            mining: []
        };
    }

    componentDidMount() {
        net.getGeneralHelp().then(res => {
            if (res.responseCode == '00') {
                this.setState({
                    green: res.content.green,
                    mining: res.content.mining
                })
            }
        }).catch(console.log);
    }

    render() {
        const { login, userInfo } = this.props.redux;
        return (
            <div className="help-h5" style={{ paddingTop: '0' }}>
                <Header
                    logo={true}
                    left={() => this.props.history.push('home')}
                    right={() => { if (login) { } else { this.props.history.push('login') } }}
                    rightText={login ? userInfo.nickname : intl.get('RATE_7')}
                />
                <ul className="help-show">
                    <li style={{cursor: "pointer"}} onClick={() => this.props.history.push('/help_detail?type=green')}>
                        <img src={img.icon1} alt="" />
                        <span>{intl.get('USER_110')}</span>
                    </li>
                    <li style={{cursor: "pointer"}} onClick={() => this.props.history.push('/help_detail?type=mining')}>
                        <img src={img.icon2} alt="" />
                        <span>{intl.get('USER_111')}</span>
                    </li>
                    <li>
                        <img src={img.icon3} alt="" />
                        <span>{intl.get('USER_104')}</span>
                    </li>
                </ul>
                <div className="help-content">
                    <h5>{intl.get('USER_110')}</h5>
                    <ul className="help-list">
                        {this.state.green.map((item, index) => (
                            <li key={String(index)} onClick={() => this.props.history.push(`/help_view/${item.id}/${item.title}`)}>
                                <span>{index + 1}、{item.title}</span>
                                <img src={img.extra} alt="" />
                            </li>
                        ))}
                    </ul>
                    <p className="help-extra">
                        <span onClick={() => this.props.history.push('/help_detail?type=green')}>
                            {intl.get('USER_112')}
                            <img src={img.extra} alt="" />
                        </span>
                    </p>
                </div>
                <div className="help-content deep">
                    <h5>{intl.get('USER_111')}</h5>
                    <ul className="help-list">
                        {this.state.mining.map((item, index) => (
                            <li key={String(index)} onClick={() => this.props.history.push(`/help_view/${item.id}/${item.title}`)}>
                                <h6>{item.title} </h6>
                                <small>{item.description}</small>
                            </li>
                        ))}
                    </ul>
                    <p className="help-extra">
                        <span onClick={() => this.props.history.push('/help_detail?type=mining')}>
                            {intl.get('USER_112')}
                            <img src={img.extra} alt="" />
                        </span>
                    </p>
                </div>
                <Service />
            </div>
        );
    }
}

export default connect(App);
