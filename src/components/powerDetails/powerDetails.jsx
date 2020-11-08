import React from 'react';
import styles from './powerDetails.module.less';
import { Card, Tooltip, Table, Tag, Space, Select, Modal } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import net from '../../net'
// footer底部
import Footer from '../../pages/footer'
import parseFloatData from '../../util/parseFloatData';
import { Decimal } from "decimal.js";

export default class powerDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
            },
            type: 0,
            data: [
            ],
            loading: false,
            columns: [
                {
                    align: 'center',
                    render: (text, record) => {
                        return this.dataType().map(val => {
                            if (val.type === text.type) {
                                return val.status
                            }
                        })
                    }
                },
                {
                    align: 'center',
                    render: (text) => parseFloatData(text.power) + ' TB'
                },
                {
                    align: 'center',
                    dataIndex: 'createTime',
                },
            ]
        }
    }
    componentDidMount() {
        // 表格
        this.tableData();
    }
    tableData() {
        this.setState({ loading: true });
        net.getUserAdjPowerList({
            page: this.state.pagination.current,
            count: this.state.pagination.pageSize,
            type: this.state.type,
        }).then(res => {
            this.setState({
                loading: false,
                data: this.getId(res.data.list),
                pagination: {
                    current: this.state.pagination.current,
                    pageSize: this.state.pagination.pageSize,
                    total: res.data.total
                },
            })
        })
    }

    getId(item) {
        return item.map((val, index) => {
            val.id = index
            return val
        })
    }
    handleTableChange = (pagination) => {
        this.setState({ loading: true });
        net.getUserAdjPowerList({
            page: pagination.current,
            count: pagination.pageSize,
            type: this.state.type,
        }).then(res => {
            this.setState({
                loading: false,
                data: this.getId(res.data.list),
                pagination: {
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: res.data.total,
                },
            })
        })
    };

    // 类型
    dataType() {
        return [
            { type: 0, status: '全部' },
            { type: 1, status: '算力增长' },
            { type: 2, status: '算力加速' },
        ]
    }
    // 精度
    DecimalData(a, b, c, d) {
        return parseFloatData(new Decimal(a).add(new Decimal(b).add(new Decimal(c).add(new Decimal(d)))));
        // return parseFloatData(Decimal.add(a, b, c));
    }

    availableCapitalGo() {
        window.location.href = `/#/available_capital`;
    }

    handleChange = (value) => {
        this.setState({ loading: true });
        net.getUserAdjPowerList({
            page: 1,
            count: 10,
            type: value,
        }).then(res => {
            this.setState({
                loading: false,
                data: this.getId(res.data.list),
                type: value,
                pagination: {
                    current: 1,
                    pageSize: 10,
                    total: res.data.total
                }
            })
        })
    }
    render() {
        const { pagination, loading } = this.state;
        const self = this;
        return (
            <div className={styles.centent}>
                <div className={styles.return}>
                    <div className={styles.returnIcon} >&#60;</div>
                    <div className={styles.return1} style={{ marginLeft: '10px' }}><a onClick={() => { this.props.history.goBack() }}> 返回</a> </div>
                    <div className={styles.marginXian} style={{ marginLeft: '20px' }}></div>
                    <div className={styles.marginSize} style={{ marginLeft: '20px' }}>算力增长明细</div>
                </div>
                <div className={styles.myAssetsCentent}>
                    {
                        <Card style={{
                            width: 1200, margin: '15px auto 0', border: '0',
                            borderRadius: '16px'
                        }}>
                            <div className={styles.selectCentent}>
                                <p style={{ fontSize: '14px', fontWeight: '600' }}>资金明细</p>
                                <div className={styles.select}>
                                    <p>类型</p>
                                    <Select className={styles.selectBody} defaultValue="全部" style={{ width: 120, marginLeft: '20px' }} onChange={this.handleChange}>
                                        {
                                            this.dataType().map((item, index) => {
                                                return <Select.Option key={index} value={item.type}>{item.status}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            {/* 表格 */}
                            <Table showHeader={false} style={{ marginTop: '10px' }} columns={this.state.columns} rowKey={(record) => record.id} pagination={pagination} loading={loading} onChange={this.handleTableChange} dataSource={this.state.data} />
                        </Card>
                    }
                </div>
                <Footer />
            </div>
        )
    }

}
