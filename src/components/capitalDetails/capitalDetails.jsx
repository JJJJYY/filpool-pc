import React from 'react';
import styles from './capitalDetails.module.less';
import { Card, Tooltip, Table, Tag, Space, Select, Modal } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import net from '../../net'
// footer底部
import Footer from '../../pages/footer'
import parseFloatData from '../../util/parseFloatData';
import { Decimal } from "decimal.js";

export default class CapitalDetail extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
            },
            asset: props.match.params.asset,
            type: 0,
            data: [
            ],
            loading: false,
            totalMoney: '',
            myTokensData: '',
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    render: (text, record, index) => `${index + 1}`,
                },
                {
                    title: '金额',
                    align: 'center',
                    render: (text) => parseFloatData(text.quantity) + text.asset
                },
                {
                    title: '类型',
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
                    title: '状态',
                    align: 'center',
                    render: (text, record) => this.statusText(text.status)
                },
                {
                    title: '时间',
                    align: 'center',
                    dataIndex: 'createTime',
                },
                // {
                //     title: '总金额',
                //     align: 'center',
                //     render: (text, record, index) =>
                //         // 总金额
                //         this.DecimalData(this.state.totalMoney.available, this.state.totalMoney.frozen, this.state.totalMoney.pledged),
                // },
            ]
        }
    }
    componentDidMount() {
        this.totalMoney();
        // 表格
        this.tableData();
        this.myTokens();
    }
    tableData() {
        this.setState({ loading: true });
        net.getRecordList({
            page: this.state.pagination.current,
            asset: this.state.asset,
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
        net.getRecordList({
            page: pagination.current,
            asset: this.state.asset,
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
    statusText(x) {
        const statusData = [
            { type: 0, name: "提现中" },
            { type: 1, name: "成功" },
            { type: 2, name: "拒绝" },
        ]
        let thisName = null
        statusData.forEach((val) => {
            if (val.type === x) {
                thisName = val.name;
            }
        });
        return thisName
    }
    // 类型
    dataType() {
        return [
            { type: 0, status: "全部" },
            { type: 1, status: "购买算力" },
            { type: 2, status: "申请加速算力" },
            { type: 3, status: "充值" },
            { type: 4, status: "提现" },
            { type: 5, status: "提现中" },
            { type: 6, status: "收益金额划转至充值" },
            { type: 7, status: "充值金额划转至收益" },
            { type: 8, status: "内部转出" },
            { type: 9, status: "内部转入" },
            { type: 10, status: '借贷' },
            { type: 11, status: '还贷' },
            { type: 12, status: "返佣" },
            { type: 13, status: "系统充币" },
            { type: 14, status: "活动奖励" },
            { type: 15, status: "系统提币" },
            { type: 17, status: "收益线性释放" },
            { type: 18, status: "系统扣除" },
            { type: 20, status: "冻结金额扣除" },
            { type: 21, status: "25%收益直接释放" },
            { type: 22, status: "收益金额划转至质押" },
            { type: 23, status: "质押金额返还至收益" },
            { type: 24, status: "挖矿收益" },
            { type: 25, status: "SR质押币发放" },
            { type: 26, status: "扣除质押币" },
            { type: 27, status: "充值划转质押" },
            { type: 28, status: '收益释放至质押' },
            { type: 29, status: "加速收益" },
            { type: 30, status: "25%加速收益释放" },
            { type: 31, status: "加速收益释放" },
        ]
    }
    // 精度
    DecimalData(a, b, c, d) {
        return parseFloatData(new Decimal(a).add(new Decimal(b).add(new Decimal(c).add(new Decimal(d)))));
        // return parseFloatData(Decimal.add(a, b, c));
    }

    availableCapitalGo = () => {
        // console.log(this.state.asset)
        // console.log(this.props)
        this.props.history.push(`/available_capital/${this.state.asset}`);
    }

    totalMoney() {
        net.getAssetMy().then((res) => {
            if (res.ret == 200) {
                res.data.forEach((item) => {
                    if (item.asset === this.state.asset) {
                        this.setState({
                            totalMoney: item
                        });
                    }
                })
            }
        });
    }

    myTokens() {
        net.getAssetTokens().then((res) => {
            if (res.ret == 200) {
                res.data.forEach((item) => {
                    if (item.asset === this.state.asset) {
                        this.setState({
                            myTokensData: item
                        });
                    }
                })
            }
        });
    }
    handleChange = (value) => {
        this.setState({ loading: true });
        net.getRecordList({
            page: 1,
            asset: this.state.asset,
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
                    <div className={styles.return1} style={{ marginLeft: '10px' }}><a href="/#/user/asset/index2">返回</a> </div>
                    <div className={styles.marginXian} style={{ marginLeft: '20px' }}></div>
                    <div className={styles.marginSize} style={{ marginLeft: '20px' }}>资产管理</div>
                </div>
                <div className={styles.myAssetsCentent}>
                    {this.state.totalMoney ? <Card style={{
                        width: 1200, margin: '0 auto', border: '0',
                        borderRadius: '16px'
                    }}>
                        <div className={styles.myAssets}>
                            <div>
                                <img style={{ width: '47px', height: '47px' }} src={require('../../images/coin-fil.png')} alt="" />
                            </div>
                            <div style={{ marginLeft: '30px', }}>
                                <p style={{ fontSize: '16px', fontWeight: 600 }}>总资产</p>
                                <p style={{ marginTop: '6px', fontSize: '18px', color: '#E49B39', fontWeight: 600 }}>
                                    {this.DecimalData(this.state.totalMoney.available, this.state.totalMoney.frozen, this.state.totalMoney.pledged, this.state.totalMoney.recharge)}
                                </p>
                            </div>
                            <div className={styles.recharge}>
                                <p onClick={() => {
                                    this.state.myTokensData.deposit === 1 ?
                                        this.props.history.push(`/user/asset/ope?type=in&coin=${this.state.asset}`) : void 0
                                }} style={this.state.myTokensData.deposit === 1 ? { cursor: 'pointer', color: '#E49B39' } : null}>充值</p>
                                <p className={styles.xian}></p>
                                <p onClick={() => {
                                    this.state.myTokensData.withdraw === 1 ?
                                        Modal.confirm({
                                            title: "提示",
                                            content: (
                                                <div>FILPool矿池每天12：00发放上一日挖矿收益，如用户选择不提币，则可用资产将用于FILPool矿池第二天算力增长所需的质押币。 由于目前需要质押币才能保持算力稳定增长，如用户提币导致账户质押币不足将影响您的算力增长以及次日挖矿收益。</div>
                                            ),
                                            okText: "取消",
                                            cancelText: "提现",
                                            onCancel: () => {
                                                self.props.history.push(`/user/asset/ope?type=out&coin=${this.state.asset}`)
                                            },
                                        }) : void 0
                                }} style={this.state.myTokensData.withdraw === 1 ? { cursor: 'pointer', color: '#E49B39' } : null}>提现</p>
                            </div>
                        </div>
                        <div className={styles.avail}>
                            <div className={styles.theAvail} style={{ textAlign: 'left' }}>
                                <p className={styles.availText}>可用资产</p>
                                <p onClick={this.availableCapitalGo} style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }} className={styles.availSize}><span>{parseFloatData(new Decimal(this.state.totalMoney.available).add(new Decimal(this.state.totalMoney.recharge)))}</span><span style={{ margin: '-2px 0 0 5px', color: '#666666FF' }}>{'>>'}</span></p>

                            </div>
                            <div className={styles.theAvail}>
                                <Tooltip placement="top" title={'每天线性释放，释放周期180天'}>
                                    <QuestionCircleOutlined className={styles.doubt}></QuestionCircleOutlined>
                                </Tooltip>
                                <p className={styles.availText}>冻结资产</p>
                                <p className={styles.availSize}>{parseFloatData(this.state.totalMoney.frozen)}</p>
                            </div>
                            <div className={styles.theAvail}>
                                <Tooltip placement="top" title={'质押金额用于有效算力增长'}>
                                    <QuestionCircleOutlined className={styles.doubt}></QuestionCircleOutlined>
                                </Tooltip>
                                <p className={styles.availText}>质押资产</p>
                                <p className={styles.availSize}>{parseFloatData(this.state.totalMoney.pledged)}</p>
                            </div>
                        </div>
                    </Card> : null}

                    {
                        this.state.totalMoney ? <Card style={{
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
                            <Table style={{ marginTop: '10px' }} columns={this.state.columns} rowKey={(record) => record.id} pagination={pagination} loading={loading} onChange={this.handleTableChange} dataSource={this.state.data} />
                        </Card> : null
                    }
                </div>
                <Footer />
            </div>
        )
    }

}
