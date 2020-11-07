import React from 'react';
import styles from './availableCapital.module.less';
import { Card, Tooltip, Table, Tag, Space, Select, Modal, Tabs, Button, Input } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import net from '../../net'
// footer底部
import Footer from '../../pages/footer'
import parseFloatData from '../../util/parseFloatData';
import { Decimal } from "decimal.js";
const { TabPane } = Tabs;
export default class AvailableCapital extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
            },
            visible: false,
            asset: 'FIL',
            // 划转类型
            transferType: 1,
            type: [3, 13],
            data: [
            ],
            loading: false,
            totalMoney: '',
            myTokensData: '',
            buyNum: '',
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
    handleOk = e => {
        net.getTransfer({
            type: this.state.transferType,
            asset_id: this.state.myTokensData.id,
            amount: this.state.buyNum
        }).then(res => {
            if (res.ret == 200) {
                Modal.success({
                    content: '划转成功',
                });
                this.totalMoney();
            }
        })
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    transformation() {
        if (this.state.transferType == 1) {
            this.setState({
                transferType: 2
            })
        }
        if (this.state.transferType == 2) {
            this.setState({
                transferType: 1
            })
        }
    }

    onChangeNum(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                buyNum: e.target.value
            })
        }
    }



    render() {
        const { pagination, loading } = this.state;
        const self = this;
        return (
            <div className={styles.centent}>
                <Modal
                    title="资金划转"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div style={{ width: '400px', display: "block", margin: '0 auto' }} >
                        <p>币种</p>
                        <Select style={{ width: 400 }} defaultValue="FIL" disabled>
                            <Select.Option value='FIL' >FIL</Select.Option>
                        </Select>
                    </div>
                    <div style={{ width: '400px', display: 'flex', margin: '20px auto 0', justifyContent: 'space-between' }}>
                        <div>
                            <p>从</p>
                            <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                <Select.Option value='transferType' >{this.state.transferType == 1 ? '收益余额' : '充值余额'}</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <img onClick={() => { this.transformation() }} src={require('../../images/exchange.png')} style={{ width: '18px', height: '10px', marginTop: '32px', cursor: 'pointer' }} alt="" />
                        </div>
                        <div >
                            <p>到</p>
                            <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                <Select.Option value='transferType' >{this.state.transferType == 1 ? '充值余额' : '收益余额'}</Select.Option>
                            </Select>
                        </div>
                    </div>

                    <div style={{ width: '400px', margin: '20px auto 0' }}>
                        <p>数量</p>
                        <Input style={{ width: 400 }} placeholder="请输入划转数量" value={this.state.buyNum} onChange={(e) => { this.onChangeNum(e) }} suffix={
                            <span>FIL</span>
                        } />
                    </div>

                    <div style={{ width: '400px', margin: '10px auto 0' }}>
                        <span>{this.state.transferType == 1 ? `收益余额${parseFloatData(this.state.totalMoney.available)}` : `充值余额${parseFloatData(this.state.totalMoney.recharge)}`} FIL</span>
                        <span onClick={() => { this.setState({ buyNum: this.state.transferType == 1 ? parseFloatData(this.state.totalMoney.available) : parseFloatData(this.state.totalMoney.recharge) }) }} style={{ marginLeft: '10px', color: '#F1A02C', cursor: 'pointer' }}>全部划转</span>
                    </div>
                </Modal>
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
                                <Button onClick={() => { this.setState({ visible: true }) }} shape="round" style={{ background: '#F49536FF', color: '#fff' }}>划转</Button>
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
                                <TabPane tab="充值明细" key={[3, 13]}>
                                    {/* 表格 */}
                                    <Table style={{ marginTop: '10px' }} columns={this.state.columns} rowKey={(record) => record.id} pagination={pagination} loading={loading} onChange={this.handleTableChange} dataSource={this.state.data} />
                                </TabPane>
                                <TabPane tab="收益明细" key={[17, 21]}>
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
