import React, { Component } from 'react';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Popover, Icon } from 'antd';
import { Header, Table } from '../../../components';
import net from '../../../net';

class InviteRecords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };
    }

    componentDidMount() {
        net.getWeightInviteDetail().then((res) => {
            if (res.responseCode === '00') {
                this.setState(res.content);
            }
        });
    }

    render() {
        const columns = [
            {
                th: intl.get('ACCOUNT_120'),
                td: 'nickname',
            },
            {
                th: intl.get('ACCOUNT_121'),
                td: 'createTime',
                render: text => moment(text).format('YYYY-MM-DD'),
            },
            {
                th: intl.get('ACCOUNT_122'),
                td: 'inviteCount',
            },
            {
                th: (
                    <div>
                        {intl.get('ACCOUNT_124')}
                        <Popover content={(<span>{intl.get('ACCOUNT_123')}</span>)}>
                            <Icon type="info-circle" className="ml-5" />
                        </Popover>
                    </div>
                ),
                td: 'purchase',
                render: text => `${text} GB`,
            },
        ];

        return (
            <div className="bg-h5 account-h5">
                <Header left={this.props.history.goBack} title={intl.get('ACCOUNT_125')} />
                <div className="form">
                    <Table h5 columns={columns} data={this.state.content} />
                </div>
            </div>
        );
    }
}

export default InviteRecords;
