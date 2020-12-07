import React, { Component } from "react";
import intl from "react-intl-universal";
import "../account/index.less";
import styles from "../index.module.less";
import moment from "moment";
import net from "../../../net";
import Table from "../table";
import connect from "@/store/connect";
import parseFloatData from '@/util/parseFloatData'
import { Tabs, Progress, Modal, Select, Input, message, Divider } from 'antd'

class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myWeight: {},
      weights: [],
      details: [],
      incomes: [],
      tab: 0,
      visible: false,
      asset: "FIL",
      myAsset: {},
      buyNum: '',
      number: 1
    };
    this.typeAry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.incomeTypeAry = [1, 2, 3];
  }

  componentDidMount() {
    net.getAssetMy().then(res => {
      res.data.forEach(val => {
        if (val.asset = this.state.asset) {
          this.setState({
            myAsset: val
          })
        }
      });
    })
    net
      .getMyPowert({
        number: 1,
      })
      .then((res) => {
        if (res.ret === 200) {
          this.setState({
            myWeight: res.data,
          });
        }
      });

    net.getMyWeightApp().then((res) => {
      if (res.ret === 200) {
        this.setState({
          weights: res.data,
        });
      }
    });

    net
      .getMyIncome({
        page: 1,
        count: 100,
      })
      .then((res) => {
        if (res.ret === 200) {
          this.setState({
            incomes: res.data,
          });
        }
      });
  }
  renderDetail() {
    if (this.state.details.length === 0) {
      return;
    }
    let type = this.state.details[0].type;
    let columns = [];
    switch (type) {
      case 1:
      case 7:
        columns = this.getTable1();
        break;
      case 8:
        columns = this.getTable4();
        break;
      default:
        columns = this.getTable3();
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <button onClick={() => { this.setState({ tab: 0 }) }}>&#60;返回上一级</button>
          <p style={{ margin: '0 10px' }}>|</p>
          <p>赠送</p>
        </div>
        <div style={{
          flex: '1', background: '#fff', padding: '20px', borderRadius: '8px 16px 16px 16px', marginTop: '20px'
        }}>
          <Table columns={columns} data={this.state.details} />
        </div>
      </div>
    );
  }

  dateFtt(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  getTable1() {
    return [
      {
        th: intl.get("云算力名称"),
        style: {
          width: "208px",
        },
        td: "relatedName",
      },
      {
        th: intl.get("单价"),
        td: "price",
        render: (text, obj) =>
          text ? `${parseFloatData(text)} ${obj.asset}/${obj.unit}` : "",
      },
      {
        th: intl.get("算力"),
        td: "quantity",
        style: {
          width: "120px",
        },
        render: (text, obj) => (text ? `${parseFloatData(text)} ${obj.unit}` : ""),
      },
      {
        th: intl.get("USER_16"),
        td: "paymentQuantity",
        render: (text, obj) => (text ? `${parseFloatData(text)} ${obj.asset}` : ""),
      },
      {
        th: intl.get("时间"),
        td: "createTime",
        style: {
          width: "188px",
        },
        render: (text) => text,
      },
      {
        th: intl.get("类型"),
        td: "type",
        render: (text, obj) =>
          `${intl.get("ACCOUNT_RATE_" + text)} ${obj.serviceChargeRate == 0.2 ? "N" : "B"
          }`,
      },
    ];
  }
  getTable3() {
    return [
      {
        th: intl.get("算力"),
        td: "quantity",
        render: (text, obj) => (text ? `${parseFloatData(text)} ${obj.unit}` : ""),
      },
      {
        th: intl.get("时间"),
        td: "createTime",
        render: (text) => text,
      },
      {
        th: intl.get("类型"),
        td: "type",
        render: (text) => `${intl.get("ACCOUNT_RATE_" + text)}`,
      },
    ];
  }
  getTable4() {
    return [
      {
        th: intl.get("云算力名称"),
        td: "relatedName",
        style: {
          width: "284px",
        },
      },
      {
        th: intl.get("购买人"),
        td: "nickname",
      },
      {
        th: intl.get("算力"),
        td: "quantity",
        style: {
          width: "120px",
        },
        render: (text, obj) => (text ? `${parseFloatData(text)} ${obj.unit}` : ""),
      },
      {
        th: intl.get("时间"),
        td: "createTime",
        style: {
          width: "220px",
        },
        render: (text) => text,
      },
      {
        th: intl.get("类型"),
        td: "type",
        style: {
          width: "140px",
        },
        render: (text) =>
          `${this.typeAry.includes(text)
            ? intl.get("ACCOUNT_RATE_" + text)
            : intl.get("其他")
          }`,
      },
    ];
  }
  /*获取详情*/
  getDetailList(item) {
    net
      .getMyWeight({
        type: item.type,
      })
      .then((res) => {
        if (res.ret === 200) {
          this.setState({
            details: res.data.details,
            tab: 2,
          });
        }
      });
  }

  doneNum(num, count) {
    var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
    return newNum;
  }

  callback = () => {
    net
      .getMyPowert({
        number: this.state.number,
      })
      .then((res) => {
        if (res.ret === 200) {
          this.setState({
            myWeight: res.data,
          });
        }
      });
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
    const { tab, myWeight, details, weights, incomes, myAsset, buyNum } = this.state;
    let progress = this.doneNum((myWeight.adj / myWeight.maxAdj) * 100, 4)
    return (
      <div className="account">
        {tab === 2 ? this.renderDetail() :
          <div className='accountPage'>

            <div className="rateCentent">
              <div className="rateCententTop">
                <div className="rateCententPowerSelect">
                  <div onClick={() => { this.setState({ number: 1 }, () => { this.callback() }) }} className={this.state.number === 1 ? `rateCententPowerTitle rateCententPowerActive` : 'rateCententPowerTitle'}>算力一期</div>
                  <div onClick={() => { this.setState({ number: 2 }, () => { this.callback() }) }} className={this.state.number === 2 ? `rateCententPowerTitle rateCententPowerActive` : 'rateCententPowerTitle'}>算力二期</div>
                </div>
                <div className="rateCententFlex">
                  <div onClick={() => { window.location.href = '/#/power_details' }} style={{ cursor: 'pointer' }}>详情 &gt;&gt; </div>
                  {
                    this.state.number === 1 ? <a href="/#/expedite_details"><span style={{ fontSize: '16px', color: '#F49536', marginLeft: '40px' }}>去加速算力 &gt;&gt;</span></a>
                      : <div onClick={() => { this.setState({ visible: true }) }} style={{ cursor: 'pointer', fontSize: '16px', color: '#F49536', marginLeft: '40px' }}>去质押 &gt;&gt; </div>
                  }

                </div>
              </div>
              <div className="ratePowerData">
                <div className="item-d">
                  <p>{intl.get("ACCOUNT_1")}:</p>
                  <p>{parseFloatData(myWeight.totalPower)} TB</p>
                </div>
                <div className="item-d item-left">
                  <p>上线有效算力:</p>
                  <p>{parseFloatData(myWeight.maxAdj)} TB</p>
                </div>
                <div className="item-d">
                  <p>有效算力:</p>
                  <p>{parseFloatData(myWeight.adj)} TB</p>
                  <Progress style={{ margin: '0 30px', width: '300px' }} percent={progress} strokeColor='#EF8C21FF' status="active" />
                </div>
              </div>
              {
                this.state.number === 2 ? <div>
                  <Divider />
                  <div className="item-power">
                    <div className="item-d">
                      <p>预估所需质押量:</p>
                      <p className="item-num">{parseFloatData(myWeight.maxPledged)} FIL</p>
                    </div>
                    <div className="item-d">
                      <p>待质押:</p>
                      <p className="item-num">{parseFloatData(myWeight.currentPledged)} FIL</p>
                    </div>
                    <div className="item-d item-left">
                      <p>已质押:</p>
                      <p className="item-num">{parseFloatData(myWeight.pledged)} FIL</p>
                    </div>
                    <div className="item-d item-left">
                      <p>借贷总额:</p>
                      <p className="item-num">{parseFloatData(myWeight.totalLoan)} FIL</p>
                    </div>
                    <div className="item-d item-left">
                      <p>待还款总额:</p>
                      <p className="item-num">{parseFloatData(myWeight.surplusLoan)} FIL</p>
                    </div>
                  </div>
                </div> : null
              }

            </div>

            <div className="rateCentent" style={{ marginTop: '10px', flex: '1', overflow: 'auto' }}>
              <Tabs defaultActiveKey="0" onChange={this.callbackList}>
                <Tabs.TabPane tab="算力管理" key="0">
                  <div className="rateCententGrid" >
                    {
                      tab === 0 ? weights.map((item, index) => {
                        return (
                          <div key={index} className="rateCententDetail">
                            <div className="rateCententFlex">
                              <div>
                                {this.typeAry.includes(item.type)
                                  ? intl.get(`ACCOUNT_RATE_${item.type}`)
                                  : intl.get("其他")}
                              </div>
                              <button
                                onClick={() => {
                                  this.getDetailList(item);
                                }}
                              >{intl.get("明细")}&gt;&gt;</button>
                            </div>
                            <div className="rateCententFlexText">{parseFloatData(item.quantity)}</div>
                          </div>
                        )
                      }) : null
                    }
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="算力收益" key="1">
                  {
                    incomes.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className='powerProfit'>
                            <div>
                              {this.incomeTypeAry.includes(item.type)
                                ? item.number + " 期--" + intl.get(`ACCOUNT_INCOME_${item.type}`)
                                : item.number + " 期--" + intl.get("其他")}
                            </div>
                            <div>
                              {parseFloatData(item.quantity)} {item.asset}
                              <span style={{ color: '#F26464FF' }}>（已扣除服务费）</span>
                            </div>
                            <div>
                              {this.dateFtt(
                                "yyyy-MM-dd",
                                new Date(item.createTime)
                              )}
                            </div>
                          </div>
                          <div className='xian'></div>
                        </div>
                      )
                    })
                  }
                </Tabs.TabPane>
              </Tabs>
            </div>

          </div>
        }

        {/* <div className="order" style={{ padding: 0 }}>
          <div className="order-filter">
            <ul style={{ padding: 0 }}>
              <li
                className={tab === 0 ? "active" : ""}
                onClick={() => this.setState({ tab: 0 })}
              >
                {intl.get("算力管理")}
              </li>
              <li
                className={tab === 1 ? "active" : ""}
                onClick={() => this.setState({ tab: 1 })}
              >
                {intl.get("算力收益")}
              </li>
            </ul>
          </div>
          {tab === 0 && (
            <table className={styles.mTable}>
              <tbody>
                {weights instanceof Array &&
                  weights.map((item, index) => {
                    return (
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          {this.typeAry.includes(item.type)
                            ? intl.get(`ACCOUNT_RATE_${item.type}`)
                            : intl.get("其他")}
                        </td>
                        <td className={styles.td}>
                          {parseFloatData(item.quantity)}
                        </td>
                        <td className={styles.td}>
                          <button
                            className={styles.handleBtn}
                            onClick={() => {
                              this.getDetailList(item);
                            }}
                          >
                            {intl.get("明细")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {tab === 1 && (
            <table className={styles.mTable}>
              <tbody>
                {incomes instanceof Array &&
                  incomes.map((item, index) => {
                    return (
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          {this.incomeTypeAry.includes(item.type)
                            ? item.number + " 期--" + intl.get(`ACCOUNT_INCOME_${item.type}`)
                            : item.number + " 期--" + intl.get("其他")}
                        </td>
                        <td className={styles.td}>
                          {parseFloatData(item.quantity)} {item.asset} <span style={{ color: '#e17055', fontSize: '12px' }}>(已扣除服务费)</span>
                        </td>
                        <td className={styles.td}>
                          {this.dateFtt(
                            "yyyy-MM-dd",
                            new Date(item.createTime)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {tab === 2 && this.renderDetail()}
        </div> */}
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
      </div >
    );
  }
}

export default connect(Rate);
