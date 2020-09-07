import React, { Component } from 'react';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Popover, Icon } from 'antd';
import Table from '../table';
import Title from '../account/components/Title';
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
                        <Popover content={(<span>{intl.get('ACCOUNT_123')}</span>)}>
                            <Icon type="info-circle" className="mr-5" />
                        </Popover>
                        {intl.get('ACCOUNT_124')}
                    </div>
                ),
                td: 'purchase',
                render: text => `${text} GB`,
            },
        ];

        return (
            <div className="account">
                <Title onClick={this.props.history.goBack}>
                    {intl.get('ACCOUNT_125')}
                </Title>
                <div className="mt-20">
                    <Table columns={columns} data={this.state.content} />
                </div>
            </div>
        );
    }
}

export default InviteRecords;
