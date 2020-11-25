import React from 'react';
import styles from './expedite.module.less';
import { Progress, message, Tooltip, Modal, Button, Spin, Table } from 'antd';
import Input from '../../components/input'
import { reg } from '../../util'
import intl, { load } from "react-intl-universal";
import net from '@/net';
import md5 from "md5";
import parseFloatData from '@/util/parseFloatData';
class Expedite extends React.Component {
    state = {
        isHome: false,
        amount: 1,
        minLimit: 1,
        visible: false,
        confirmLoading: false,
        lineUpVisible: false,
        password: '',
        // 抢购信息
        product: '',
        // 最大可购买算力
        remainPower: '',
        avlFil: '',
        // 进度条
        progress: 0,
        protuctId: '',
        pid: '',
        flashUsers: null,
        page: 1,
        count: 10,
        flashUsersLoading: false,
    }

    columns = () => {
        const { page, count } = this.state;
        return [
            {
                title: '排队顺序',
                align: 'center',
                render: (text, record, index) => {
                    return (page - 1) * count + (index + 1)
                }
            }, {
                title: 'ID',
                dataIndex: 'auth_user_id',
                align: 'center',
            }, {
                title: '申请数量/TiB',
                dataIndex: 'power',
                align: 'center',
                render: (text) => (
                    parseFloatData(text)
                )
            }, {
                title: '申请时间',
                dataIndex: 'create_time',
                align: 'center',
            },
        ]
    }

    componentDidMount() {
        this.state.isHome = window.location.hash.includes('home');
        this.loadPage();
        this.loadProduct();
    }

    loadPage = () => {
        const { page, count } = this.state;
        this.setState({
            flashUsersLoading: true,
        })
        net.getListTopFlashUsers({
            page: page,
            count: count,
        }).then(res => {
            if (res.ret == 200) {
                this.setState({
                    flashUsers: res.data
                })
            }
            this.setState({
                flashUsersLoading: false,
            })
        })
    }

    loadProduct = () => {
        net.getHomePageSaleLatestInfo().then(res => {
            if (res.ret == 200 && res.data) {
                this.setState({
                    protuctId: res.data.id,
                    product: res.data,
                    progress: parseFloatData(((res.data.total_power - res.data.remain_power) / res.data.total_power) * 100),
                    loading: true
                })
                if (!this.state.isHome) {
                    net.getPurchaseInfo({ product_id: this.state.protuctId }).then(res => {
                        if (res.ret == 200) {
                            this.setState({
                                product: res.data.product,
                                remainPower: Math.min(res.data.avl_buy_power, res.data.product.remain_power),
                                avlFil: res.data.avl_fil,
                                progress: parseFloatData(((res.data.product.total_power - res.data.product.remain_power) / res.data.product.total_power) * 100),
                            })
                        }
                    })
                }
            }
        })
    }

    // 输入框
    change(e) {
        this.setState({
            password: e.target.value
        })
    }

    extarClick(type) {
        if (type === "add") {
            this.setState({ amount: this.state.amount + 1 });
        } else {
            if (this.state.amount - 1 >= this.state.minLimit) {
                this.setState({ amount: this.state.amount - 1 });
            } else {
                message.info(
                    intl.get("RATE_1", { limit: this.state.minLimit }),
                    1,
                    () => { }
                );
            }
        }
    }
    checkInput(e) {
        let val = e.target.value;
        if (reg.regInt(Number(val)) && !(Number(val) === 0)) {
            this.setState({ amount: Number(val) });
        }
    }
    checkMaxNum = () => {
        this.setState({
            amount: this.state.remainPower
        })
    }
    // 申请加速
    appleFor = () => {
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
            return;
        }
        if (this.state.isHome) {
            window.location.href = '/#/expedite_details';
        } else {
            if (this.state.amount == 0 || this.state.remainPower == 0) {
                Modal.warning({
                    content: '无可申请数量',
                });

            } else {
                this.setState({
                    visible: true
                })
            }
        }
    }
    // 查看详情跳转
    onDetails = () => {
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
            return;
        }
        if (this.state.isHome) {
            window.location.href = '/#/expedite_details';
        }
    }
    // 弹框 
    // 确认支付开始抢购
    handleOk = () => {
        const { amount, product, protuctId, avlFil, password } = this.state;
        if ((product.price * amount) > avlFil) {
            Modal.warning({
                content: '余额不足，请先充值',
            });

        } else {
            this.setState({
                confirmLoading: true,
            });
            net.getPurchase({
                buy_power: amount,
                capital_pwd: md5(password),
                product_id: protuctId
            }).then(res => {
                if (res.ret === 200) {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                        // lineUpVisible: true,
                        pid: res.data
                    }, () => {
                        Modal.success({
                            content: '申请成功',
                            onOk: () => {
                                this.loadPage();
                                this.loadProduct();
                            },
                        })
                        // this.purchaseStatus(this.state.pid)
                    });
                } else {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }
            })
        }
    };


    // 定时刷新抢购状态
    // purchaseStatus(pid) {
    //     let timer = null
    //     net.getCheckOrderStatus({
    //         pid
    //     }).then(res => {
    //         if (res.ret === 200) {
    //             if (res.data) {
    //                 this.setState({
    //                     lineUpVisible: false
    //                 })
    //                 // 提示
    //                 if (res.data.payment_status) {
    //                     Modal.success({
    //                         content: res.data.description,
    //                     });
    //                 } else {
    //                     Modal.warning({
    //                         content: res.data.description,
    //                     });
    //                 }
    //                 clearTimeout(timer)
    //             } else {
    //                 clearTimeout(timer)
    //                 timer = setTimeout(() => {
    //                     this.purchaseStatus(pid)
    //                 }, 1000)
    //             }
    //         } else {
    //             clearTimeout(timer)
    //             this.setState({
    //                 lineUpVisible: false
    //             })
    //         }
    //     })
    // }

    // 取消
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    doneNum(num, count) {
        var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
        return newNum;
    }

    render() {
        const { isHome, confirmLoading, remainPower, product, amount, minLimit, avlFil, progress, flashUsers, flashUsersLoading } = this.state
        return (
            <div className={styles.title}>
                {/* 弹出支付框  */}
                <Modal
                    footer={[
                        <Button style={{ borderRadius: '16px' }} key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                            确认申请
                                        </Button>,
                    ]}
                    bodyStyle={{ borderRadius: '16px' }}
                    title="订单信息"
                    readOnly={true}
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    maskClosable={false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div style={{ width: '420px', margin: '0 auto' }}>
                        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                            <span>申请算力：</span>
                            <span>{amount}TiB</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                            <span>质押数量：</span>
                            <span>{parseFloatData(product.price * amount)}FIL</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                            <span>质押期限/天</span>
                            <span>{product.pledge_days}</span>
                        </p>
                        <div style={{ width: '100%', height: '1px', background: '#DDDDDDFF', margin: '10px 0' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>资金密码</div>
                            <input value={this.state.password} onChange={(event) => { this.change(event) }} type="password" placeholder='请输入资金密码' style={{ outline: 'none', border: '1px solid #DDDDDDFF', borderRadius: '4px', height: '40px', padding: '16px', marginLeft: '10px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                            <div>仅充值余额进行算力加速购买。当前充值余额为{parseFloatData(avlFil)}FIL </div>
                            <a href="/#/user/asset/ope?type=in&coin=FIL">去充值 &gt;&gt;</a>
                        </div>
                    </div>
                </Modal>
                {/* 排队弹框 */}
                {/* <Modal
                    visible={this.state.lineUpVisible}
                    footer={null}
                    closable={false}
                    width='370px'
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>排队中，正在努力中</p>
                        <Spin style={{ marginLeft: '10px' }} size='small ' />
                    </div>
                    <p style={{ display: 'flex', justifyContent: 'center' }}>现在参与人数较多请耐心等待...</p>
                </Modal> */}
                {
                    product ?
                        <div>
                            <div className={styles.titleText}>
                                <div className={styles.textAlign}>
                                    <img style={{ width: '34px', height: '27px' }} src={require('../../images/expedite-icon.png')} alt="" />
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginLeft: '20px' }}>{product.tittle}</div>
                                    <div style={{ padding: '6px 30px', background: '#F89C19FF', borderRadius: '8px', marginLeft: '30px', color: '#fff' }} >限量</div>
                                </div>
                                {
                                    isHome && <div className={styles.textAlign} onClick={this.onDetails}>
                                        <div style={{ fontSize: '18px', fontWeight: '500', color: '#666666FF' }}>产品详情</div>
                                        <img style={{ width: '15px', height: '15px', marginLeft: '10px' }} src={require('../../images/expedite-fuhao.png')} alt="" />
                                    </div>
                                }
                            </div>
                            <div style={{ marginTop: '10px', marginLeft: '50px' }}>开始时间：{product.start_time}</div>
                            {/* <div style={{ marginTop: '10px', marginLeft: '50px' }}>结束时间：{product.finish_time}</div> */}
                            <div className={styles.numCentent}>
                                <div className={styles.centent}>
                                    <div className={styles.buy}>
                                        <p style={{ fontSize: '18px', color: '#705845FF' }}>当前有效算力质押</p>
                                        <p style={{ marginTop: '20px' }}><span style={{ fontSize: '30px', color: '#040000FF' }}>{parseFloatData(product.price)}</span> <span style={{ fontSize: '18px', color: '#040000FF' }}>FIL/TiB</span></p>
                                    </div>
                                    <div className={styles.buy}>
                                        <p style={{ fontSize: '18px', color: '#705845FF' }}>排队中</p>
                                        <p style={{ marginTop: '20px' }}><span style={{ fontSize: '30px', color: '#040000FF' }}>{flashUsers ? flashUsers.total : '-'} <span style={{ fontSize: '18px', color: '#040000FF' }}>位</span></span></p>
                                    </div>

                                </div>
                                <div className={styles.xian}></div>
                                <div className={styles.classFIL}>
                                    {!isHome ?
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '-60px', }}>
                                                <p style={{ fontSize: '18px', color: '#33333FF' }}>需要质押：</p>
                                                <p style={{ fontSize: '30px', fontWeight: '500', color: '#33333FF' }}>{parseFloatData(product.price * amount)}FIL</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
                                                <Input.Number
                                                    value={this.state.amount}
                                                    maxLimit={remainPower}
                                                    minLimit={minLimit}
                                                    onChange={(e) => {
                                                        this.checkInput(e);
                                                    }}
                                                    onAdd={() => {
                                                        this.extarClick("add");
                                                    }}
                                                    onSub={() => {
                                                        this.extarClick("sub");
                                                    }}
                                                />
                                                <div style={{ marginLeft: '10px', fontSize: '18px', }}>TiB</div>
                                            </div>
                                        </div>
                                        :
                                        <div style={{ width: '300px', marginRight: '40px' }}>
                                            <p onClick={this.appleFor} style={{ padding: '12px 0', textAlign: 'center', width: '240px', background: '#F89C19FF', borderRadius: '16px', cursor: 'pointer' }}><span style={{ fontSize: '18px', color: '#fff' }}>申请加速包</span></p>
                                        </div>
                                    }
                                    {
                                        !isHome ? <div style={{ marginLeft: '10px', position: 'relative', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <div >可申请的最大值  {remainPower}TiB</div>
                                            <a style={{ margin: '0 5px 0 20px', color: '#E58F15FF', pointerEvents: remainPower == 0 ? 'none' : 'auto' }} disable={remainPower == 0} onClick={this.checkMaxNum}>全部</a>
                                            <Tooltip placement="bottomRight" title={product.description}>
                                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#474747', border: '1px solid  #474747', borderRadius: '50%', textAlign: 'center', width: '14px', height: '14px' }}>?</div>
                                            </Tooltip>
                                            {/* <div style={{ position: 'absolute', top: '-15px', left: '-32px', fontSize: '16px' }}>全部</div> */}
                                        </div> : null
                                    }
                                </div>
                            </div>
                            <div className={styles.purchase}>
                                <div style={{ width: '542px' }}>
                                    {/* <div style={{ fontSize: '18px', color: '#333333FF', marginLeft: '5px' }}>进度</div>
                                    <Progress className={styles.expediteProgress} strokeColor='linear-gradient(90deg, #F9A03E 0%, #FF4504 100%)' style={{ marginTop: '10px' }} percent={progress} showInfo={false} />
                                    <div style={{ fontSize: '14px', color: '#666666FF', marginLeft: '8px', marginTop: '10px' }}>已申请{this.doneNum(progress, 2)}%</div> */}
                                </div>
                                {!isHome &&
                                    <div style={{ width: '300px', marginRight: '40px' }}>
                                        <p onClick={this.appleFor} style={{ padding: '12px 0', textAlign: 'center', width: '240px', background: '#F89C19FF', borderRadius: '16px', cursor: 'pointer' }}><span style={{ fontSize: '18px', color: '#fff' }}>申请加速包</span></p>
                                    </div>
                                }
                            </div>
                        </div> : <div style={{ fontSize: '18px', color: '#000', textAlign: 'center' }}>暂无数据</div>
                }
                {!isHome &&
                    <Table
                        size='small'
                        style={{ marginTop: '22px' }}
                        columns={this.columns()}
                        rowKey={(record) => record.id}
                        loading={flashUsersLoading}
                        pagination={{
                            total: flashUsers ? flashUsers.total : 0,
                            current: flashUsers ? flashUsers.current : 0
                        }}
                        onChange={(pagination) => {
                            this.state.page = pagination.current;
                            this.state.count = pagination.pageSize;
                            this.loadPage()
                        }}
                        dataSource={flashUsers && flashUsers.list} />
                }
            </div>
        )
    }
}
export default Expedite;