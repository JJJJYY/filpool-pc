import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Header } from '../../../components';
import Service from './service';

import net from '../../../net';

import './index.less';

const img = {
    back: require('../images/icon-back.png'),
    extra: require('../images/icon-extra.png'),
};

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.search.split('=')[1],
            green: [],
            mining: [],
        };
    }

    componentDidMount() {
        net.getGeneralHelp().then((res) => {
            if (res.responseCode == '00') {
                this.setState({
                    green: res.content.green,
                    mining: res.content.mining,
                });
            }
        }).catch(console.log);
    }

    render() {
        return (
            <div className="help-h5">
                <Header
                    title={this.state.type === 'green' ? intl.get('USER_110') : intl.get('USER_111')}
                    left={this.props.history.goBack}
                />
                <div className="help-content">
                    <h5>{this.state.type === 'green' ? intl.get('USER_110') : intl.get('USER_111')}</h5>
                    <ul className="help-list">
                        {this.state.green.map((item, index) => (this.state.type === 'green' ? (
                            <li key={String(index)} onClick={() => this.props.history.push(`/help_view/${item.id}/${item.title}`)}>
                                <span>
                                    {index + 1}
                                    、
                                    {item.title}
                                </span>
                                <img src={img.extra} alt="" />
                            </li>
                        ) : (
                            <li key={String(index)} style={{ display: 'flex', alignItems: 'flex-start' }} onClick={() => this.props.history.push(`/help_view/${item.id}/${item.title}`)}>
                                <img src={item.image} style={{ width: '16.8vw', height: '16.8vw', marginRight: '4vw' }} alt="" />
                                <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
                                    <h6>
                                        {item.title}
                                        {' '}
                                    </h6>
                                    <small>{item.description}</small>
                                </div>
                            </li>
                        )))}
                    </ul>
                </div>
                <Service />
            </div>
        );
    }
}
