import React, { Component } from 'react';
import intl from 'react-intl-universal';
import '../account/index.less';
import moment from 'moment';
import net from '../../../net';
import { Header, Table } from '../../../components';

class Rate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalWeight: 0,
            details: [],
            tab: 0,
        };
    }

    componentDidMount() {
        net.getMyWeight().then((res) => {
            if (res.ret === 200) {
                this.setState(res.data);
            }
        });
    }

    render() {
        const { tab } = this.state;

        const columns = [
            {
                th: intl.get('ACCOUNT_89'),
                td: 'createTime',
                render: text => moment(text).format('YYYY-MM-DD'),
            },
            {
                th: intl.get('云算力名称'),
                td: 'relatedName',
            },
            {
                th: intl.get('ACCOUNT_91'),
                td: 'type',
                render: (text) => {
                    switch (text) {
                        case 1:
                            return intl.get('ACCOUNT_92');
                        case 2:
                            return intl.get('ACCOUNT_93');
                        case 3:
                            return intl.get('ACCOUNT_94');
                        default:
                            return '';
                    }
                },
            },
            {
                th: intl.get('ACCOUNT_95'),
                td: 'quantity',
                render: text => `${text} GB`,
            },
            {
                th: intl.get('ACCOUNT_96'),
                td: 'leftDays',
                render: text => `${text} ${intl.get('ACCOUNT_97')}`,
            },
        ];

        return (
            <div className="bg-h5 account-h5">
                <Header title={intl.get('ACCOUNT_98')} left={this.props.history.goBack} />

                <div className="ope-h5" style={{ padding: 0, marginTop: '4vw' }}>
                    <div className="ope-h5-tabs">
                        <a
                            className={tab === 0 ? 'active' : ''}
                            onClick={() => this.setState({ tab: 0 })}
                        >
                            {intl.get('ACCOUNT_98')}
                        </a>
                        <a
                            className={tab === 1 ? 'active' : ''}
                            onClick={() => this.setState({ tab: 1 })}
                        >
                            {intl.get('算力收益')}
                        </a>
                    </div>
                    {tab === 0 && (
                        <div>
                            <div className="sub-font-color" style={{ margin: '4vw', fontSize: '3.47vw' }}>
                                {intl.get('ACCOUNT_100', { weight: this.state.totalWeight })}
                            </div>
                            <Table h5 columns={columns} data={this.state.details} />
                        </div>
                    )}
                    {tab === 1 && (
                        <div className="sub-font-color ft-c" style={{ padding: '37.3vw 0', fontSize: '3.47vw' }}>
                            {intl.get('ACCOUNT_101')}
                            <br />
                            {intl.get('ACCOUNT_102')}
                            <br />
                            {intl.get('ACCOUNT_103')}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Rate;
