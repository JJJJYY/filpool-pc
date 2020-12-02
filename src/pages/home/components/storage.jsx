import React from 'react';
import styles from './storage.module.less';
import { Progress, Table, Tabs } from 'antd';
import net from '@/net';
import parseFloatData from '../../../util/parseFloatData';

class Storage extends React.Component {
    constructor() {
        super();
        this.state = {
            progressData: 0,
            poolData: {},
            loading: false,
            iconImg: [
                require('@/images/webPageIcon/昨日收益.png'),
                require('@/images/webPageIcon/累计单t收益.png'),
                require('@/images/webPageIcon/昨日单t收益.png'),
                require('@/images/webPageIcon/矿池总收益.png')
            ],
            PoolInfoNumber: 1,
            PoolInfoList: []
        }
    }
    componentDidMount() {
        // this.createDom();
        this.getPoolInfoHandle()
    }
    componentWillUnmount() {
        clearTimeout(this.timerId);
        this.setState = (state, callback) => {
            return;
        };
    }

    getPoolInfoHandle() {
        net.getPoolInfo({ number: this.state.PoolInfoNumber }).then(res => {
            if (res.ret === 200) {
                this.setState({
                    progressData: this.done(res.data.poolAdjPower / res.data.poolMaxAdjPower * 100, 1),
                    poolData: res.data || {},
                    loading: true,
                    PoolInfoList: res.data.nodes
                })
                setTimeout(() => {
                    this.createDom();
                }, 0);
            }
        })
    }

    done(num, count) {
        var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
        return newNum;
    }
    createDom() {
        const myCompAll = document.querySelectorAll('.progressUi .ant-progress-outer .ant-progress-inner .ant-progress-bg');
        const myComp = myCompAll[this.state.PoolInfoNumber - 1]
        if (myComp) {
            const span = document.createElement("span");
            span.innerHTML = `${this.state.progressData} %`;
            // 判断数字左还是右
            if (this.state.progressData >= 4) {
                span.className = styles.progressSpanLeft;
            } else {
                span.className = styles.progressSpanRigth;
            }
            myComp.appendChild(span);
        }
    }

    callback = (key) => {
        this.setState({
            PoolInfoNumber: key,
            loading: false
        }, () => {
            this.getPoolInfoHandle();
        })
    }

    TabDataMessage = () => {
        const data = this.state.PoolInfoList
        const columns = [
            {
                title: '节点ID',
                dataIndex: 'miner',
                align: 'center',
                key: 'miner',
                render: text => <div>{text}</div>,
            },
            {
                title: '有效算力 (PiB)',
                dataIndex: 'adj',
                align: 'center',
                key: 'adj',
                render: text => <div>{parseFloatData(text)}</div>,
            },
            {
                title: '24小时挖矿收益 (FIL)',
                dataIndex: 'rewards',
                align: 'center',
                key: 'rewards',
                render: text => <div>{parseFloatData(text)}</div>,
            },
            {
                title: '24小时消耗GAS (FIL)',
                dataIndex: 'gas',
                align: 'center',
                key: 'gas',
                render: text => <div>{parseFloatData(text)}</div>,
            },
            {
                title: '',
                align: 'center',
                render: (text, record) => {
                    return <a href={`https://filfox.info/zh/address/${text.miner}`} target="_blank">
                        <img src={require("@/images/webPageIcon/jiantou.png")} style={{ width: '10px', height: '10px', cursor: 'pointer' }} alt="" />
                    </a>
                }

            },
        ];
        return (
            <div>
                {
                    this.state.loading ?
                        <div>
                            {/* 矿池填充进度 */}
                            <div className={styles.progressContent}>
                                <div className={styles.progressContentFlex}>
                                    <p className={styles.chuck}></p>
                                    <p className={styles.test}>矿池填充进度</p>
                                    <p className={styles.testRight}>最新区块高度：{this.state.poolData.height}</p>
                                </div>
                                {
                                    this.state.loading ? <Progress className='progressUi' percent={this.state.progressData} status="active" showInfo={false} /> : void 0
                                }
                                <div className={styles.xian}></div>
                                <div className={styles.contentData}>
                                    <div className={styles.contentDataBox}>
                                        <p className={styles.contentDataText}>总储存空间</p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.poolPower) || 0} <span style={{ fontSize: '20px' }}>TB</span></p>
                                    </div>
                                    <div className={styles.contentDataBox}>
                                        <p className={styles.contentDataText}>总有效算力</p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.poolAdjPower) || 0} <span style={{ fontSize: '20px' }}>PiB</span></p>
                                    </div>
                                    <div className={styles.contentDataBox}>
                                        <p className={styles.contentDataText}>全网有效算力</p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.netAdjPower) || 0} <span style={{ fontSize: '20px' }}>PiB</span></p>
                                    </div>
                                </div>
                            </div >
                            {/* 矿池数据信息 */}
                            <div className={styles.dataMessage}>
                                <div className={styles.progressContentFlex}>
                                    <p className={styles.chuck}></p>
                                    <p className={styles.test}>矿池数据信息</p>
                                </div>
                                <div className={styles.dataMessageCentent} style={{ marginBottom: '30px' }}>
                                    <div className={styles.contentDataBox}>
                                        <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[0]} /></p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.totalReward) || 0}</p>
                                        <p className={styles.contentDataText}>矿池总收益 (FIL)</p>
                                    </div>
                                    <div className={styles.contentDataBox}>
                                        <p style={{ textAlign: 'center', marginTop: '5px' }}><img style={{ width: '80px', height: '80px' }} src={this.state.iconImg[1]} /></p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.yesterdayReward) || 0}</p>
                                        <p className={styles.contentDataText}>昨日收益 (FIL)</p>
                                    </div>
                                    <div className={styles.contentDataBox}>
                                        <p style={{ textAlign: 'center', marginTop: '5px' }}><img style={{ width: '80px', height: '80px' }} src={this.state.iconImg[2]} /></p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.yesterdayGas) || 0}</p>
                                        <p className={styles.contentDataText}>昨日消耗GAS  (FIL)</p>
                                    </div>
                                    <div className={styles.contentDataBox}>
                                        <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[3]} /></p>
                                        <p className={styles.contentDataText1}>{parseFloatData(this.state.poolData.yesterdayEfficiency) || 0}</p>
                                        <p className={styles.contentDataText}>有效算力单T收益  (FIL/TiB)</p>
                                    </div>
                                </div>
                            </div>
                            {/* 节点信息 */}
                            <div className={styles.dataMessage} >
                                <div className={styles.progressContentFlex}>
                                    <p className={styles.chuck}></p>
                                    <p className={styles.test}>节点信息</p>
                                </div>
                                <div className={styles.dataTable}>
                                    <Table className={styles.myDataTable} columns={columns} dataSource={data} pagination={false} />
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }
    render() {

        return (
            <div>
                <Tabs defaultActiveKey="1" className={styles.TabsCentent} onChange={this.callback}>
                    <Tabs.TabPane tab="一期运营数据" key="1">
                        {this.TabDataMessage()}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="二期运营数据" key="2">
                        {this.TabDataMessage()}
                    </Tabs.TabPane>
                </Tabs>

            </div>
        )
    }
}

export default Storage;