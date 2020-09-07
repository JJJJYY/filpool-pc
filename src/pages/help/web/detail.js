import React, { PureComponent } from 'react';
import Service from './service';
import intl from 'react-intl-universal';

import net from '../../../net';

import './index.less';

const img = {
    back: require('../images/icon-back.png'),
    extra: require('../images/icon-extra.png'),
}

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.search.split('=')[1],
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
        return (
            <div className="help">
                <div style={{ margin: '0 .9rem' }}>
                    <div className="help-main">
                        <div className="help-content">
                            <p className="back">
                                <span onClick={() => this.props.history.go(-1)}><img src={img.back} alt="" />返回上一级页面</span>
                            </p>
                            <h5>{this.state.type === 'green' ? intl.get('USER_110') : intl.get('USER_111')}</h5>
                            <ul className="help-list">
                                {this.state.green.map((item, index) => this.state.type === 'green' ? (
                                    <li key={String(index)} onClick={() => this.props.history.push(`/help_view/${item.id}`)}>
                                        <span>{index + 1}、{item.title}</span>
                                        <img src={img.extra} alt="" />
                                    </li>
                                ) : (
                                        <li key={String(index)} style={{ display: 'flex', alignItems: 'flex-start' }} onClick={() => this.props.history.push(`/help_view/${item.id}`)}>
                                            <img src={item.image} style={{ width: '1.25rem', height: '1.25rem', marginRight: '.38rem' }} alt="" />
                                            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
                                                <h6>{item.title} </h6>
                                                <small>{item.description}</small>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <Service />
            </div>
        );
    }
}
