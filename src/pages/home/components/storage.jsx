import React from 'react';
import styles from './storage.module.less';
import { Progress } from 'antd';
import net from '@/net';

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
            ]
        }
    }
    componentDidMount() {
        // this.createDom();
        net.getPoolInfo().then(res => {
            if(res.ret === 200) {
                this.setState({
                    progressData: this.done(res.data.poolAdjPower / res.data.poolMaxAdjPower * 100, 1),
                    poolData: res.data || {},
                    loading: true,
                })
                setTimeout(() => {
                    this.createDom();
                }, 0);
            }
        })
    }
    componentWillUnmount() {
        clearTimeout(this.timerId);
        this.setState = (state, callback) => {
            return;
        };
    }
    done(num, count) {
        var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
        return newNum;
    }
    createDom() {
        const myComp = document.querySelector('.progressUi .ant-progress-outer .ant-progress-inner .ant-progress-bg');
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
    render() {
        return (
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
                            <p className={styles.contentDataText1}>{this.state.poolData.poolPower}T</p>
                        </div>
                        <div className={styles.contentDataBox}>
                            <p className={styles.contentDataText}>总有效算力</p>
                            <p className={styles.contentDataText1}>{this.state.poolData.poolAdjPower}P</p>
                        </div>
                        <div className={styles.contentDataBox}>
                            <p className={styles.contentDataText}>全网有效算力</p>
                            <p className={styles.contentDataText1}>{this.state.poolData.netAdjPower}P</p>
                        </div>
                    </div>
                </div >
                {/* 矿池数据信息 */}
                <div className={styles.dataMessage}>
                    <div className={styles.progressContentFlex}>
                        <p className={styles.chuck}></p>
                        <p className={styles.test}>矿池数据信息</p>
                    </div>
                    <div className={styles.dataMessageCentent}>
                        <div className={styles.contentDataBox}>
                            <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[0]} /></p>
                            <p className={styles.contentDataText1}>{this.state.poolData.totalReward}</p>
                            <p className={styles.contentDataText}>矿池总收益  (FIL)</p>
                        </div>
                        <div className={styles.contentDataBox}>
                            <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[1]} /></p>
                            <p className={styles.contentDataText1}>{this.state.poolData.yesterdayReward}</p>
                            <p className={styles.contentDataText}>昨日收益  (FIL)</p>
                        </div>
                        <div className={styles.contentDataBox}>
                            <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[2]} /></p>
                            <p className={styles.contentDataText1}>{this.state.poolData.efficiency}</p>
                            <p className={styles.contentDataText}>累计单T收益  (FIL/T)</p>
                        </div>
                        <div className={styles.contentDataBox}>
                            <p style={{ textAlign: 'center', marginTop: '5px' }}><img src={this.state.iconImg[3]} /></p>
                            <p className={styles.contentDataText1}>{this.state.poolData.yesterdayEfficiency}</p>
                            <p className={styles.contentDataText}>昨日单T收益  (FIL/T)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Storage;