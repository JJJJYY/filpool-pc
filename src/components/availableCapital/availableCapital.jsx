import React from 'react';
import styles from './availableCapital.module.less';
import { Card, Tooltip, Table, Tag, Space, Select, Modal, Tabs, Button } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import net from '../../net'
// footer底部
import Footer from '../../pages/footer'
import parseFloatData from '../../util/parseFloatData';
import { Decimal } from "decimal.js";
const { TabPane } = Tabs;
export default class CapitalDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
            },
            asset: 'FIL',
            type: 3,
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
                    render: (text) => parseFloatData(text.quantity) + ' FIL'
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

    // tabs
    handleCallback = (key) => {
        let thisType = null;
        if (Number(key)) {
            console.log(Number(key))
            thisType = key
        } else {
            console.log(key.split(","))
            thisType = key.split(",").map(function (item) {
                return +item;
            });
        }
        console.log(`${thisType}`)
        this.setState({ loading: true });
        net.getRecordList({
            page: this.state.pagination.current,
            asset: this.state.asset,
            count: this.state.pagination.pageSize,
            type: `${thisType}`,
        }).then(res => {
            this.setState({
                loading: false,
                data: this.getId(res.data.list),
                pagination: {
                    current: this.state.pagination.current,
                    pageSize: this.state.pagination.pageSize,
                    total: res.data.total,
                },
                type: thisType
            })
        })
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

    // 类型
    dataType() {
        return [
            { type: 0, status: '全部' },
            { type: 1, status: '购买算力' },
            { type: 2, status: '购买加速算力' },
            { type: 3, status: '充值' },
            { type: 4, status: '提现' },
            { type: 5, status: '提现中' },
            { type: 6, status: '收益金额划转' },
            { type: 7, status: '充值金额划转' },
            { type: 8, status: '内部转出' },
            { type: 9, status: '内部转入' },
            { type: 12, status: '返佣' },
            { type: 13, status: '系统充币' },
            { type: 14, status: '活动奖励' },
            { type: 15, status: '系统提币' },
            { type: 17, status: '收益线性释放' },
            { type: 18, status: '系统扣除' },
            { type: 20, status: '冻结金额扣除' },
            { type: 21, status: '25%收益直接释放' },
            { type: 22, status: '可用金额划转至抵押' },
            { type: 23, status: '可用金额返还' },
            { type: 24, status: '挖矿收益' },
            { type: 25, status: 'SR质押币发放' },
            { type: 26, status: '扣除质押币' },
        ]
    }
    // 精度
    DecimalData(a, b, c) {
        return parseFloatData(new Decimal(a).add(new Decimal(b)));
        // return parseFloatData(Decimal.add(a, b, c));
    }
    totalMoney() {
        net.getAssetMy().then((res) => {
            if (res.ret == 200) {
                res.data.forEach((item) => {
                    if (item.asset === "FIL") {
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
                    if (item.asset === "FIL") {
                        this.setState({
                            myTokensData: item
                        });
                    }
                })
            }
        });
    }

    render() {
        const { pagination, loading } = this.state;
        const self = this;
        console.log(this.state.totalMoney)
        return (
            <div className={styles.centent}>
                <div className={styles.return}>
                    <div className={styles.returnIcon} >&#60;</div>
                    <div className={styles.return1} style={{ marginLeft: '10px' }}><a onClick={() => { this.props.history.goBack() }}>返回</a> </div>
                    <div className={styles.marginXian} style={{ marginLeft: '20px' }}></div>
                    <div className={styles.marginSize} style={{ marginLeft: '20px' }}>可用资产</div>
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
                                <p style={{ fontSize: '16px', fontWeight: 600 }}>可用资产</p>
                                <p style={{ marginTop: '6px', fontSize: '18px', color: '#E49B39', fontWeight: 600 }}>
                                    {this.DecimalData(this.state.totalMoney.available, this.state.totalMoney.recharge)}
                                </p>
                            </div>
                            <div className={styles.recharge}>
                                <Button shape="round" style={{ background: '#F49536FF', color: '#fff' }}>划转</Button>
                                {/* <p onClick={() => {
                                    this.state.myTokensData.deposit === 1 ?
                                        this.props.history.push(`/user/asset/ope?type=in&coin=FIL`) : void 0
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
                                            onCancel() {
                                                self.props.history.push(`/user/asset/ope?type=out&coin=FIL`)
                                            },
                                        }) : void 0
                                }} style={this.state.myTokensData.withdraw === 1 ? { cursor: 'pointer', color: '#E49B39' } : null}>提现</p> */}
                            </div>
                        </div>
                        <div className={styles.avail}>
                            <div className={styles.theAvail} style={{ textAlign: 'cneter' }}>
                                <p className={styles.availText}>充值余额</p>
                                <p style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }} className={styles.availSize}>
                                    <span>{parseFloatData(this.state.totalMoney.recharge)}</span>
                                    <Tooltip placement="top" title={'充值余额才能进行抢购算力加速、提币等操作'}>
                                        <QuestionCircleOutlined className={styles.doubt}></QuestionCircleOutlined>
                                    </Tooltip>
                                </p>
                            </div>
                            <div className={styles.theAvail}>
                                <Tooltip placement="top" title={'每日12点发放上一日挖矿收益，当日18点前不划转至充值余额，余额将自动划转至质押金额'}>
                                    <QuestionCircleOutlined className={styles.doubt}></QuestionCircleOutlined>
                                </Tooltip>
                                <p className={styles.availText}>收益余额</p>
                                <p className={styles.availSize}>{parseFloatData(this.state.totalMoney.available)}</p>
                            </div>
                            {/* <div className={styles.theAvail}>
                                <Tooltip placement="top" title={'质押金额用于有效算力增长'}>
                                    <QuestionCircleOutlined className={styles.doubt}></QuestionCircleOutlined>
                                </Tooltip>
                                <p className={styles.availText}>质押资产</p>
                                <p className={styles.availSize}>{parseFloatData(this.state.totalMoney.pledged)}</p>
                            </div> */}
                        </div>
                    </Card> : null}

                    {
                        this.state.totalMoney ? <Card style={{
                            width: 1200, margin: '15px auto 0', border: '0',
                            borderRadius: '16px'
                        }}>
                            <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                                <TabPane tab="充值明细" key={24}>
                                    {/* 表格 */}
                                    <Table style={{ marginTop: '10px' }} columns={this.state.columns} rowKey={(record) => record.id} pagination={pagination} loading={loading} onChange={this.handleTableChange} dataSource={this.state.data} />
                                </TabPane>
                                <TabPane tab="收益明细" key={[17, 24]}>
                                    {/* 表格 */}
                                    <Table style={{ marginTop: '10px' }} columns={this.state.columns} rowKey={(record) => record.id} pagination={pagination} loading={loading} onChange={this.handleTableChange} dataSource={this.state.data} />
                                </TabPane>
                            </Tabs>
                        </Card> : null
                    }
                </div>
                <Footer />
            </div>
        )
    }

}
