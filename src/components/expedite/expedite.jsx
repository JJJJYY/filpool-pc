import React from 'react';
import styles from './expedite.module.less';
import { Progress, message, Tooltip, Modal, Button, Spin } from 'antd';
import Input from '../../components/input'
import { reg } from '../../util'
import intl from "react-intl-universal";
import net from '@/net';
import parseFloatData from '@/util/parseFloatData';
class Expedite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHome: window.location.hash.includes('home'),
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
            progress: ''
        }
    }
    componentDidMount() {
        // net.getHomePageSaleLatestInfo().then(res => {
        //     console.log(res)
        // })
        net.getPurchaseInfo().then(response => {
            console.log(response)
            let res = {
                "ret": 200,
                "data": {
                    "product": {
                        "id": 1,
                        "tittle": "Filpool算力加速包",
                        "price": "6.40000000",
                        "total_power": "1000.00",
                        "remain_power": "982.00",
                        "minimum_unit": "1.00",
                        "pledge_days": 520,
                        "description": "矿池采用的是1.5倍的冗余方案，即每位用户可抢购最大值=用户总存储空间/1.5 用户算力",
                        "status": 1,
                        "start_time": "2020-11-05 16:13:01",
                        "finish_time": "2020-11-11 14:53:24",
                        "create_time": "2020-11-04 14:53:32",
                        "update_time": "2020-11-04 14:53:34"
                    },
                    "avl_buy_power": 89,
                    "avl_fil": "55.600000000000"
                },
                "msg": ""
            }
            // console.log(res)
            this.setState({
                product: res.data.product,
                remainPower: res.data.avl_buy_power,
                avlFil: res.data.avl_fil,
                progress: parseFloatData(((res.data.product.total_power - res.data.product.remain_power) / res.data.product.total_power) * 100)
            })
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
    // 申请加速
    appleFor() {
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
            return;
        }
        if (this.state.isHome) {
            window.location.href = '/#/expedite_details';
        } else {
            this.setState({
                visible: true
            })
        }

    }
    // 查看详情跳转
    onDetails() {
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
            return;
        }
        if (this.state.isHome) {
            window.location.href = '/#/expedite_details';
        }
    }
    // 弹框 
    // 确认支付
    handleOk = val => {
        console.log(val);
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                lineUpVisible: true,
            });
        }, 2000);
    };
    // 取消
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { isHome, confirmLoading, remainPower, product, amount, avlFil, progress } = this.state
        return (
            <div className={styles.title}>
                {
                    !isHome ? <div>
                        {/* 弹出支付框  */}
                        <Modal
                            footer={[
                                <Button style={{ borderRadius: '16px' }} key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                                    确认支付
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
                                    <span>抢购算力：</span>
                                    <span>{amount}TB</span>
                                </p>
                                <p style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <span>金额：</span>
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
                        <Modal
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
                        </Modal>
                    </div> : null

                }
                <div className={styles.titleText}>
                    <div className={styles.textAlign}>
                        <img style={{ width: '34px', height: '27px' }} src={require('../../images/expedite-icon.png')} alt="" />
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginLeft: '20px' }}>{product.tittle}</div>
                        <div style={{ padding: '6px 30px', background: '#F89C19FF', borderRadius: '8px', marginLeft: '30px', color: '#fff' }} >限量</div>
                    </div>
                    {
                        isHome ? <div className={styles.textAlign} onClick={() => { this.onDetails() }}>
                            <div style={{ fontSize: '18px', fontWeight: '500', color: '#666666FF' }}>产品详情</div>
                            <img style={{ width: '15px', height: '15px', marginLeft: '10px' }} src={require('../../images/expedite-fuhao.png')} alt="" />
                        </div> : null
                    }
                </div>
                <div style={{ marginTop: '10px', marginLeft: '50px' }}>时间：{product.start_time}</div>
                <div className={styles.numCentent}>
                    <div className={styles.centent}>
                        <div className={styles.buy}>
                            <p style={{ fontSize: '18px', color: '#705845FF' }}>总抢购算力</p>
                            <p style={{ marginTop: '20px' }}><span style={{ fontSize: '30px', color: '#040000FF' }}>{parseFloatData(product.total_power)}T</span></p>
                        </div>
                        <div className={styles.buy}>
                            <p style={{ fontSize: '18px', color: '#705845FF' }}>有效算力质押量</p>
                            <p style={{ marginTop: '20px' }}><span style={{ fontSize: '30px', color: '#040000FF' }}>{parseFloatData(product.price)}</span> <span style={{ fontSize: '18px', color: '#040000FF' }}>FIL/T</span></p>
                        </div>
                    </div>
                    <div className={styles.xian}></div>
                    <div className={styles.classFIL}>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-60px', }}>
                            <p style={{ fontSize: '18px', color: '#33333FF' }}>金额：</p>
                            <p style={{ fontSize: '30px', fontWeight: '500', color: '#33333FF' }}>{parseFloatData(product.price * amount)}FIL</p>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
                            <Input.Number
                                value={this.state.amount}
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
                            <div style={{ marginLeft: '10px', fontSize: '18px', }}>TB</div>

                        </div>
                        {
                            !isHome ? <div style={{ marginLeft: '10px', position: 'relative', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <div >可申请的最大值  {remainPower}TB</div>
                                <div style={{ margin: '0 5px 0 20px', color: '#E58F15FF' }}>全部</div>
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
                        <div style={{ fontSize: '18px', color: '#333333FF', marginLeft: '5px' }}>进度</div>
                        <Progress className={styles.expediteProgress} strokeColor='linear-gradient(90deg, #F9A03E 0%, #FF4504 100%)' style={{ marginTop: '10px' }} percent={progress} showInfo={false} />
                        <div style={{ fontSize: '14px', color: '#666666FF', marginLeft: '8px', marginTop: '10px' }}>已出售{progress}%</div>
                    </div>
                    <div style={{ width: '300px', marginRight: '40px' }}>
                        <p onClick={() => { this.appleFor() }} style={{ padding: '12px 0', textAlign: 'center', width: '240px', background: '#F89C19FF', borderRadius: '16px', cursor: 'pointer' }}><span style={{ fontSize: '18px', color: '#fff' }}>申请加速包</span></p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Expedite;