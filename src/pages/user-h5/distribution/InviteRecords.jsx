import React, { Component } from 'react';
import moment from 'moment';
import intl from 'react-intl-universal';
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
        net.getWeightInviteRecord().then((res) => {
            if (res.ret === 200) {
                this.setState({ content: res.data });
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
                th: intl.get('ACCOUNT_121'),
                td: 'createTime',
                render: text => moment(text).format('YYYY-MM-DD'),
            },
            {
                th: intl.get('ACCOUNT_127'),
                td: 'nickname',
            },
            {
                th: intl.get('ACCOUNT_128'),
                td: 'orderQuantity',
                render: text => `${text} GB`,
            },
        ];

        return (<Table columns={columns} data={this.state.content} />);
    }
}

export default InviteRecords;
