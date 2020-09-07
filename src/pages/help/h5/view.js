import React, { PureComponent } from 'react';
import { Header } from '../../../components';

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
            <div className="help-h5">
                <Header
                    title={this.state.title}
                    left={this.props.history.goBack}
                />
                <pre dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ padding: '4vw' }}></pre>
            </div>
        );
    }
}
