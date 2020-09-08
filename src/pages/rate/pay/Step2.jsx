import  React,{ Component } from 'react';
import intl from 'react-intl-universal';
import styles from './orderPay.module.less';
import '@/pages/rate/order/index.less';
import {CancelModal} from "@/pages/rate/component";
import md5 from "md5";
import net from "@/net";
import {message} from "antd";
import { Link, withRouter  } from 'react-router-dom';

class Step2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            countDown: 900,
            cacelVisible: false,
            detailInfo: {},
            password: "",
            available: 0
        };
        this.images = {
            success: require('@/images/rate/ok.png'),
            cancel: require('@/images/rate/cancel.png'),
        }
    }


    componentDidMount() {
        /*获取订单详情*/
        net.getOrderDetail(this.props.orderId).then((res) => {
            if (res.ret == 200) {
                this.setState({
                    detailInfo: res.data
                });
                this.caluTime();
            }
        });
        /*获取可用余额*/
        net.getAssetMy().then((res) => {
            if (res.ret == 200) {
                res.data.forEach((item) => {
                    if (item.asset === "USDT") {
                        this.setState({
                            available: item.available
                        });
                    }
                })
            }
        });
    }

    /*倒计时*/
    caluTime () {
        this.timer = setInterval(() => {
            if (this.state.countDown > 0) {
                this.setState({
                    countDown: this.state.countDown - 1
                });
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    renderCount(){
        return(
            <div className={`rateStep-orange ${styles.rateStepOrange}`} style={{background: '', display: "flex", alignItems: "center"}}>
                <span className="iconfont" style={{fontSize: '30px', color: '#86929D', margin: "0 24px"}}>&#xe6d3;</span>
                <div>
                    <p className={`rateStep-orange-p1 ${styles.rateStepOrangeP1}`}>{intl.get('RATE_27')} {this.state.countDown === 0 ? '14m 59s' :this.formatTime(this.state.countDown)}</p>
                    <p className={`rateStep-orange-p2 ${styles.rateStepOrangeP2}`}>{intl.get('RATE_28')}</p>
                </div>
            </div>
        )
    }
    renderItem(status,content){
        if(status === 1){
            return(
                <div className={`rateStep-orange flex-row-center ${styles.rateStepOrange}`} style={{background: ''}}>
                    <img src={this.images.success} alt="" className={'rateStep-orange-img'}/>
                    <p className={`rateStep-orange-p1 ${styles.rateStepOrangeP1}`}>{content}</p>
                </div>

            )
        }
        return(
            <div className={`rateStep-grey flex-row-center ${styles.rateStepOrange}`}>
                <img src={this.images.cancel} alt="" className={'rateStep-orange-img'}/>
                <p className={`rateStep-grey-p1 ${styles.rateStepOrangeP1}`}>{content}</p>
            </div>
        )
    }
    formatTime(mss){
        let minutes = Math.floor(mss/60)%60;
        let seconds = mss % 60;
        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return minutes + 'm ' + seconds + 's'
    }

    postOrder(index){
        let data = {
            id: this.props.orderId,
            operation: index
        };

        if(index === 1) {
            data.payPwd = md5(this.state.password);
        }

        net.postConfirmOrder(data).then(res => {
            if(res.ret === 200){
                if(index === 1){
                    /*message.info(intl.get('RATE_24'), 1, () => {});
                    this.setState({ payVisible: false, status: 1, step: [1,1,1,1]});*/
                    this.props.setStep({stepIndex: 2});
                } else {
                    message.info(intl.get('RATE_25'), 1, () => {});
                    this.setState({ cacelVisible: false, status: 2, step: [1,1,0,0] });
                    this.props.history.push({pathname: '/rate'});
                }
            }
        })
    }

    chnageState (key, value) {
        this.setState({
            [key]: value
        });
    }

    render () {
        const status_text = {
            1 : intl.get('RATE_24'),
            2 : intl.get('RATE_25'),
            3 : intl.get('RATE_26'),
        };
        let { detailInfo } = this.state;
        return (
            <div style={{paddingBottom: "80px", position: "relative",marginBottom: "130px"}}>
                <div className={'flex-row-center mt-55'}>
                    { this.state.status === 0 ? this.renderCount() : this.renderItem(this.state.status, status_text[this.state.status]) }
                </div>
                <div style={{marginTop: "50px"}}>
                    <span className={styles.fieldLabel}>{intl.get('RATE_98')}:</span>
                    <span className={styles.fieldValue}>{detailInfo.relatedName}</span>
                </div>
                <div>
                    <span className={styles.fieldLabel}>{intl.get('RATE_15')}:</span>
                    <span className={styles.fieldValue}>{parseFloat(detailInfo.price)}/USDT</span>
                </div>
                <div>
                    <span className={styles.fieldLabel}>{intl.get('RATE_12')}:</span>
                    <span className={styles.fieldValue}>{parseFloat(detailInfo.quantity)} TB</span>
                </div>
                <div>
                    <span className={styles.fieldLabel}>{intl.get('RATE_17')}:</span>
                    <span className={styles.fieldValue}>{parseFloat(detailInfo.paymentQuantity)} USDT</span>
                </div>
                <div className={`flex-row-start`} style={{margin: "12px 0 16px 90px"}}>
                    <input type="password" className={styles.amountInput} value={this.state.password} onChange={(event) => {this.chnageState("password", event.target.value)}} placeholder={intl.get("ACCOUNT_78")} />
                    <Link to={{pathname: '/user/account/pay_pass'}} className={styles.link}>
                        {intl.get("AUTH_FORGET")}
                    </Link>
                </div>
                <div className={`flex-row-start`} style={{marginLeft: "90px"}}>
                    <span className={`${styles.grayText}`}>{intl.get("USER_54")}：{parseFloat(this.state.available)} USDT</span>
                    <Link to={{pathname: '/user/asset/ope?type=in&coin=USDT'}} className={styles.link}>
                        {intl.get("RATE_100")}
                    </Link>
                    {/*<span className={`${styles.link}`}>{intl.get("RATE_100")}</span>*/}
                </div>
                <div className={`flex-row-start`} style={{margin: "60px 0 0 90px"}}>
                    <button className={`${styles.btnSmall} ${styles.active}`} onClick={() => {this.postOrder(1)}} style={{marginRight: "56px"}}>{intl.get("RATE_3")}</button>
                    <button className={`${styles.btnSmall}`} onClick={() => {this.setState({cacelVisible: true})}}>{intl.get("RATE_32")}</button>
                </div>

                <CancelModal
                    cacelVisible={this.state.cacelVisible}
                    content={intl.get('RATE_34')}
                    onConfirm={() =>{this.postOrder(2)}}
                    onCancel={()=> this.setState({cacelVisible: false})}
                />
            </div>
        )
    }
}

export default withRouter(Step2)