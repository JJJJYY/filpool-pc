import React from 'react';
import connect from "../../store/connect";
import styles from './market.module.less';
import { Table, Tag, Space } from 'antd';
import net from '../../net'

class Market extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileCoin: {},
            quotationList: [],
            loading: false,
            columns: [
                {
                    title: '币种',
                    width: 400,
                    align: 'left',
                    render: text => <div style={{ display: 'flex', alignItems: 'center' }}>
                        <meta name="referrer" content="never" />
                        <img src={text.logo} style={{ width: '24px', height: '24px', marginRight: '5px' }} alt="" />
                        {text.sign}
                    </div>,
                },
                {
                    title: '市值',
                    align: 'center',
                    render: (text) => {
                        return <div style={{ fontSize: '16px' }}>{this.numUnit(text.marketValue)}</div>
                    },
                },
                {
                    title: '最新价（￥）',
                    align: 'center',
                    render: (text) => {
                        return <div style={{ fontSize: '16px' }}>{text.currentPrice}</div>
                    },
                },
                {
                    title: '24H涨跌幅',
                    align: 'center',
                    render: (text) => {
                        return this.fontColor(text)
                    },
                },
            ]
        }
    }
    componentDidMount() {
        this.handleData()
    }
    handleData() {
        net.getQuotation().then(res => {
            this.setState({
                fileCoin: res.data.fileCoin,
                quotationList: res.data.quotationList,
                loading: true
            })
        })
    }


    fontBigColor(x) {
        if (x.changePercent > 0) {
            return <div style={{ color: '#1C9730FF', fontSize: '25px', fontWeight: '500' }}>+{x.changePercent}%</div>
        } else if (x.changePercent === 0) {
            return <div style={{ color: '#ADADADFF', fontSize: '25px', fontWeight: '500' }}>{x.changePercent}%</div>
        } else {
            return <div style={{ color: '#D53131FF', fontSize: '25px', fontWeight: '500' }}>{x.changePercent}%</div>
        }
    }

    fontColor(x) {
        if (x.changePercent > 0) {
            return <div style={{ fontSize: '16px', color: '#1C9730FF' }}>+{x.changePercent}%</div>
        } else if (x.changePercent === 0) {
            return <div style={{ fontSize: '16px', color: '#ADADADFF' }}>{x.changePercent}%</div>
        } else {
            return <div style={{ fontSize: '16px', color: '#D53131FF' }}>{x.changePercent}%</div>
        }
    }

    // 转换单位方法
    numUnit(num) {
        let f = parseFloat(num);
        let data = this.unitConvert(f);
        return data.num + data.unit;
    }
    unitConvert(num) {
        let moneyUnits = ["元", "万元", "亿元", "万亿"];
        let dividend = 10000;
        let curentNum = num;
        //转换数字
        let curentUnit = moneyUnits[0];
        //转换单位
        for (let i = 0; i < 4; i++) {
            curentUnit = moneyUnits[i];
            if (this.strNumSize(curentNum) < 5) {
                break;
            }
            curentNum = curentNum / dividend;
        }
        let m = { num: 0, unit: "" };
        m.num = curentNum.toFixed(2);
        m.unit = curentUnit;
        return m;
    }
    strNumSize(tempNum) {
        let stringNum = tempNum.toString();
        let index = stringNum.indexOf(".");
        let newNum = stringNum;
        if (index != -1) {
            newNum = stringNum.substring(0, index);
        }
        return newNum.length;
    }



    render() {
        return (
            <div className={styles.centent}>
                { this.state.loading ? <div className={styles.marketCentent}>
                    <div className={styles.marketCententFIL}>
                        <div className={[styles.marketBox, styles.marketFlex].join(' ')}>
                            <img src={this.state.fileCoin.logo} alt="" />
                            <div className={styles.marketTitle}>{this.state.fileCoin.sign}</div>
                        </div>
                        <div className={styles.marketCharts}>
                            <div className={styles.marketChartsSize}>市值</div>
                            <div className={styles.marketChartsNum}>{this.numUnit(this.state.fileCoin.marketValue)}</div>
                            <div></div>
                        </div>
                        <div className={styles.marketCharts}>
                            <div className={styles.marketChartsSize}>最新价（￥）</div>
                            <div className={styles.marketChartsNum}>{this.state.fileCoin.currentPrice}</div>
                            <div></div>
                        </div>
                        <div className={styles.marketDecline}>
                            <div className={styles.marketDeclineH}>24H涨跌幅</div>
                            <div className={styles.marketDeclineNum} >{this.fontBigColor(this.state.fileCoin)}</div>
                        </div>
                    </div>
                    <div className={styles.tableCentent}>
                        <Table className={styles.tableCententThis} rowKey={(record) => record.id} columns={this.state.columns} dataSource={this.state.quotationList} />
                    </div>
                </div> : null}
            </div>
        )
    }
}

export default connect(Market)
