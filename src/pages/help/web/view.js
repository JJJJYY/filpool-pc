import React, { PureComponent } from 'react';
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
            title: this.props.match.params.title,
            content: ''
        };
    }

    componentDidMount() {
        net.getGeneralHelpDetail(this.props.match.params.id).then(res => {
            if (res.responseCode == '00') {
                this.setState({
                    content: res.content,
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
                                <span onClick={() => this.props.history.go(-1)}><img src={img.back} alt="" />{intl.get('USER_115')}</span>
                            </p>
                            <h5>{this.state.title}</h5>
                            <pre dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ padding: '.2rem 0' }}></pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
