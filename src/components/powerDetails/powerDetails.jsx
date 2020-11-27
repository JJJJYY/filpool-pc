import React from 'react';
import styles from './powerDetails.module.less';
import { Card, Tooltip, Table, Tag, Space, Select, Progress, Radio, Modal, Input, message } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import net from '../../net'
// footer底部
import Footer from '../../pages/footer'
import parseFloatData from '../../util/parseFloatData';

export default class powerDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: this.paginationPage(),
            type: 0,
            data: [
            ],
            loading: false,
            progress: 0,
            mode: 1,
            myWeight: {},
            myAsset: {},
            asset: "FIL",
            buyNum: '',
            visible: false,
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
        this.getSumMyPowert();
        net.getAssetMy().then(res => {
            res.data.forEach(val => {
                if (val.asset = this.state.asset) {
                    this.setState({
                        myAsset: val
                    })
                }
            });
        })
    }
    paginationPage() {
        return {
            current: 1,
            pageSize: 2,
            total: 0,
        }
    }
    getSumMyPowert() {
        net.getMyPowert({
            number: this.state.mode,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState({
                    myWeight: res.data,
                });
            }
        });
    }

    tableData() {
        this.setState({ loading: true });
        net.getUserAdjPowerList({
            page: this.state.pagination.current,
            count: this.state.pagination.pageSize,
            type: this.state.type,
            number: this.state.mode
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
        this.setState({
            pagination
        }, () => {
            this.tableData()
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

    // 类型
    handleChange = (value) => {
        this.setState({
            type: value,
            pagination: this.paginationPage()
        }, () => {
            this.tableData()
        })
    }

    doneNum(num, count) {
        var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
        return newNum;
    }


    handleModeChange = (e) => {
        this.setState({
            mode: e.target.value,
            pagination: this.paginationPage()
        }, () => {
            this.getSumMyPowert();
            this.tableData()
        })
    }
    onChangeNum(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                buyNum: e.target.value
            })
        }
    }
    handleOk = () => {
        net.getTransferPledged({
            amount: this.state.buyNum
        }).then(res => {
            if (res.ret === 200) {
                this.setState({
                    visible: false
                })
                message.success('划转成功');
            }
        }).catch(() => {
            this.setState({
                visible: false
            })
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { pagination, loading, mode, myWeight, myAsset, buyNum } = this.state;
        let progress = this.doneNum((myWeight.adj / myWeight.maxAdj) * 100, 4)
        const self = this;
        return (
            <div className={styles.centent}>
                <div className={styles.return}>
                    <div className={styles.returnIcon} >&#60;</div>
                    <div className={styles.return1} style={{ marginLeft: '10px' }}><a onClick={() => { this.props.history.goBack() }}> 返回</a> </div>
                    <div className={styles.marginXian} style={{ marginLeft: '20px' }}></div>
                    <div className={styles.marginSize} style={{ marginLeft: '20px' }}>详情</div>
                </div>
                <div className={styles.powerRadio}>
                    <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                        <Radio.Button value={1}>算力一期</Radio.Button>
                        <Radio.Button value={2}>算力二期</Radio.Button>
                    </Radio.Group>
                </div>
                <div className={styles.myAssetsCentent}>
                    {
                        <Card style={{
                            width: 1200, margin: '15px auto 0', border: '0',
                            borderRadius: '16px'
                        }}>
                            <div className={`${styles.userHeader}`} style={{ justifyContent: 'space-between' }}>
                                {mode === 1 ? <span className={styles.bold}>一期:</span> : null}
                                {mode === 2 ? <span className={styles.bold}>二期:</span> : null}
                                <span className={styles.bold}>存储空间:{parseFloatData(myWeight.totalPower)} TiB</span>
                                <span className={styles.bold}>上限有效算力：{parseFloatData(myWeight.maxAdj)} TiB</span>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className={styles.bold}> 有效算力：{parseFloatData(myWeight.adj)}TiB</span>
                                    <Progress strokeColor='#EF8C21' style={{ width: '250px', margin: '0 20px' }} showInfo={false} percent={progress} status="active" />
                                </div>
                                {mode === 1 ? <a href="/#/expedite_details"><span style={{ fontSize: '16px', color: '#F49536', }}>去加速算力 &gt;&gt;</span></a> : null}
                                {/* {mode === 2 ? <div onClick={() => { this.setState({ visible: true }) }} style={{ cursor: 'pointer', color: '#F19921FF' }}>去划转质押 &gt;&gt; </div> : null} */}

                            </div>
                            {
                                mode === 2 ? <div>
                                    <div className={`${styles.xian}`}></div>
                                    <div className={styles.twoUserHeader}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '300px', display: 'flex' }}>
                                                <p>待质押：{parseFloatData(myWeight.currentPledged)} FIL</p>
                                                <Tooltip placement="top" title={'系统会优先扣除待质押余额进行质押，如需扣除数量不够，默认向合作DeFil平台进行借贷'}>
                                                    <QuestionCircleOutlined style={{ marginTop: '3px', marginLeft: '5px' }}></QuestionCircleOutlined>
                                                </Tooltip>
                                            </div>
                                            <p >已质押：{parseFloatData(myWeight.pledged)} FIL</p>
                                        </div>
                                        <div style={{ display: 'flex', marginTop: '30px' }}>
                                            <p style={{ width: '300px' }}>借贷总额：{parseFloatData(myWeight.totalLoan)} FIL</p>
                                            <div style={{ display: 'flex', width: '300px' }}>
                                                <p >待还款总额：{parseFloatData(myWeight.surplusLoan)} FIL</p>
                                                <Tooltip placement="top" title={'每日释放收益的80%用于还款'}>
                                                    <QuestionCircleOutlined style={{ marginTop: '3px', marginLeft: '5px' }}></QuestionCircleOutlined>
                                                </Tooltip>
                                            </div>
                                            <p style={{}}>预估所需质押量：{parseFloatData(myWeight.maxPledged)} FIL</p>
                                        </div>
                                    </div>
                                </div> : null
                            }
                        </Card>
                    }
                </div>
                <div className={styles.myAssetsCentent} style={{ height: '50vh' }}>
                    {
                        <Card style={{
                            width: 1200, margin: '15px auto 0', border: '0', borderRadius: '16px'
                        }}>
                            <div className={styles.selectCentent}>
                                <p style={{ fontSize: '14px', fontWeight: '600' }}>算力增长明细</p>
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
                <Modal
                    title="资金划转"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div style={{ width: '400px', display: "block", margin: '0 auto' }} >
                        <p>币种</p>
                        <Select style={{ width: 400 }} defaultValue={this.state.asset} disabled>
                            <Select.Option value={this.state.asset} >{this.state.asset}</Select.Option>
                        </Select>
                    </div>
                    <div style={{ width: '400px', display: 'flex', margin: '20px auto 0', justifyContent: 'space-between' }}>
                        <div>
                            <p>从</p>
                            <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                <Select.Option value='transferType' >充提账户</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <img src={require('@/images/exchange.png')} style={{ width: '18px', height: '10px', marginTop: '32px', cursor: 'pointer' }} alt="" />
                        </div>
                        <div >
                            <p>到</p>
                            <Select defaultValue="transferType" style={{ width: 170 }} disabled>
                                <Select.Option value='transferType' >质押</Select.Option>
                            </Select>
                        </div>
                    </div>

                    <div style={{ width: '400px', margin: '20px auto 0' }}>
                        <p>数量</p>
                        <Input style={{ width: 400 }} placeholder="请输入划转数量" value={buyNum} onChange={(e) => { this.onChangeNum(e) }} suffix={
                            <span>{this.state.asset}</span>
                        } />
                    </div>

                    <div style={{ width: '400px', margin: '10px auto 0' }}>
                        <span>{Math.min(
                            parseFloatData(myWeight.maxPledged) - parseFloatData(myWeight.currentPledged),
                            parseFloatData(myAsset.recharge)
                        )}</span>
                        <span onClick={() => {
                            this.setState({
                                buyNum: Math.min(
                                    parseFloatData(myWeight.maxPledged) - parseFloatData(myWeight.currentPledged),
                                    parseFloatData(myAsset.recharge)
                                )
                            })
                        }} style={{ marginLeft: '10px', color: '#F1A02C', cursor: 'pointer' }}>全部划转</span>
                    </div>
                </Modal>
                <Footer />
            </div>
        )
    }

}
