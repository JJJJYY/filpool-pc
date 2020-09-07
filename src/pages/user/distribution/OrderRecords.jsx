import React, { Component } from 'react';
import intl from 'react-intl-universal';
import moment from 'moment';
import net from '../../../net';
import Table from '../table';

class InviteRecords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };
    }

    componentDidMount() {
        net.getWeightOrderRecord().then((res) => {
            if (res.responseCode === '00') {
                this.setState(res.content);
            }
        });
    }

    render() {
        const columns = [
            {
                th: intl.get('ACCOUNT_126'),
                td: 'round',
            },
            {
                th: intl.get('ACCOUNT_127'),
                td: 'nickname',
            },
            {
                th: intl.get('ACCOUNT_129'),
                td: 'createTime',
                render: text => moment(text).format('YYYY-MM-DD'),
            },
            {
                th: intl.get('ACCOUNT_128'),
                td: 'orderQuantity',
                render: text => `${text} GB`,
            },
            {
                th: intl.get('ACCOUNT_130'),
                td: 'rewardQuantity',
                render: text => `${text} USDT`,
            },
        ];

        return (<Table columns={columns} data={this.state.content} />);
    }
}

export default InviteRecords;
