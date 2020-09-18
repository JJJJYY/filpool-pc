import React, { Component } from "react";
import { Button, ChooseInput, Input } from '../../../components';
import { Popover, message, Progress } from 'antd';
import { Toast as ToastH5 } from 'antd-mobile';
import { reg } from '../../../util';

import intl from 'react-intl-universal';
import { tsObjectKeyword } from "@babel/types";
import '@/pages/rate/index.less';
import styles from './shopCell.module.less';
const pre = 'rate';

const images = {
    'FILP': require('../../../images/rate/fil.png'),
    'USDT': require('../../../images/rate/usdt.png'),
    'BTC': require('../../../images/rate/btc.png'),
    'ETH': require('../../../images/rate/eth.png'),
    'sell-zh': require('../../../images/rate/sell-zh.png'),
    'sell-en': require('../../../images/rate/sell-zh.png'),
}

export default class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 100,
            minLimit: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.amount != nextProps.amount) {
            let amount = this.props.amount || 1;
            this.setState({ amount: amount, minLimit: amount })
        }
    }

    componentDidMount() {
        let amount = this.props.amount || 1;
        this.setState({ amount: amount, minLimit: amount })
    }

    checkInput(e) {
        let val = e.target.value;
        if (reg.regInt(Number(val))) {
            this.setState({ amount: Number(val) });
        }
    }

    extarClick(type) {
        if (type === 'add') {
            this.setState({ amount: this.state.amount + 1 })
        } else {
            if ((this.state.amount - 1) >= this.state.minLimit) {
                this.setState({ amount: this.state.amount - 1 })
            } else {
                message.info(intl.get('RATE_1', { limit: this.state.minLimit }), 1, () => { })
            }
        }
    }

    sendToast(text) {
        return ToastH5.info(text, 1, () => { }, false);
    }

    renderText(p1, p2, img, content, noMr, style) {
        return (
            <div className={noMr ? `flex-column sp-8` : `flex-column mr-60`} style={style}>
                <div className={'flex-row mb-15'} style={{ alignItems: 'center' }}>
                    <p className={'p4'} style={{ fontSize: "0.18rem" }}>{p1}</p>
                    {
                        img ?
                            <Popover trigger="hover" content={content}>
                                <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'} />
                            </Popover>
                            : null
                    }
                </div>
                <p className={'p5'} style={{ color: "#24375E", fontSize: "0.22rem" }}>{p2}</p>
            </div>
        )
    }

    renderList() {
        let width = window.innerWidth >= 1300 ? '350px' : '2.63rem';
        let left = window.innerWidth >= 1300 ? '300px' : '2.2rem';
        return (
            <div className={`${pre}-cell mt-20 ${styles.rateCell} ${this.props.status === 3 ? styles.notAllow : ''}`} style={{ height: "auto", maxHeight: "initial", paddingBottom: "60px" }}>
                <span className={'flag'}>{this.props.tag}</span>
                {/*<div className={'flex-row-center'} style={window.innerWidth >= 1300 ? {marginTop: '20px'} : {}}>*/}
                <div className={`flex-row-center ${styles.flexRowCenter}`} >
                    <div className={'flex-row'} style={{ marginTop: "0", width: "100%", paddingLeft: "80px" }}>
                        <div className={`flex-column rate-cell-content ${styles.rateCellContent}`} onClick={() => { this.props.checkDetail && this.props.checkDetail(this.state.amount) }}>
                            <div className={'flex-row'}>
                                <p className={'p1'}>{this.props.name}</p>
                                {/*<div className={'limit'}>{this.props.highlight}</div>*/}
                            </div>
                            {
                                this.props.type === 4 ?
                                    <div className={'flex-row mt-15'}>
                                        <p className={'p2'} style={{ color: "#86929D" }}>{this.props.slogan}</p>
                                    </div>
                                    :
                                    <div className={'flex-row mt-15'} style={{ alignItems: "center" }}>
                                        <p className={`p2 ${styles.maxTitle}`} style={{ color: "#86929D" }} title={this.props.slogan}>{this.props.slogan}</p>
                                        <div className={'sp-5'} style={{ background: "#86929D" }}></div>
                                        <div className={'p2'} onClick={() => { this.props.checkDetail && this.props.checkDetail(this.state.amount) }} style={{ cursor: 'pointer' }}>{intl.get('RATE_82')}</div>
                                        {/* <div className={'progress'}>
                                            <div className={'progress-content'} style={{width: `${( ( this.props.status === 3 ? 0 : this.props.remainingQuantity )/this.props.quantity) * 100}%`}}></div>
                                            <p className={'p3'}>{intl.get('RATE_47')}{`${((( this.props.status === 3 ? 0 : this.props.remainingQuantity )/this.props.quantity) * 100).toFixed(2)}%`}</p>
                                        </div> */}
                                    </div>
                            }
                            <div className={'flex-row mt-30'}>
                                {this.renderText(intl.get('RATE_48'), this.props.weightAsset, false, false, true, { width: "2rem" })}
                                {this.renderText(intl.get('RATE_49'), this.props.settlementPeriod, false, false, true, { width: "4rem" })}
                            </div>
                            <div className={'flex-row mt-30'}>
                                {this.renderText(intl.get('RATE_50'), this.props.contractDuration + intl.get('RATE_23'), true, intl.get('RATE_52'), true, { width: "2rem" })}
                                {this.renderText(intl.get('RATE_51'), (this.props.serviceChargeRate * 100).toFixed(2) + '%', true, intl.get('RATE_53'), true, { width: "4rem" })}
                            </div>
                            <div className={'flex-row mt-30'}>
                                {this.renderText(intl.get('RATE_511'), <Progress strokeColor='#E49C3A' percent={(this.props.quantity - this.props.remainingQuantity) / this.props.quantity * 100} status="active" />, false, false, true, { width: "3.2rem" })}
                            </div>
                            {
                                /*this.props.status === 3 ?
                                <img src={images["sell-zh"]} alt="" className={'img-sell'}/>
                                :
                                null*/
                            }
                            {this.props.locale === 'en' ? (
                                <img src={require("@/images/home/home_icon_pre_sale_1.png")} className={`${styles.contentItemImg}`} alt="" />
                            ) : (
                                    <img src={require("@/images/home/home_icon_pre_sale_2@2x.png")} className={`${styles.contentItemImg}`} alt="" />
                                )}

                        </div>
                        {/*<div className={'line'} style={{height: '2.05rem'}}></div>*/}
                        <div className={'flex-column'} style={{ marginLeft: "100px" }}>
                            {/*<div className={'flex-row'} style={{alignItems: 'center'}}>
                                <p className={'sp-1'}>$ {this.props.price}<span className={'sp-2'}>/{this.props.unit ? this.props.unit : ''}</span></p>
                                <div style={{position: 'relative'}}>
                                    <p className={'p7'}>${this.props.originalPrice}</p>
                                    <div className={'low-line'}></div>
                                </div>
                            </div>*/}
                            <div className={'flex-row mb-10 mt-10'} style={{ alignItems: 'flex-end' }}>
                                <p className={'p6'}><span className={'sp-7'} style={{ color: '#575C62' }}>{intl.get('RATE_2')}</span> {(this.props.price * this.state.amount).toFixed(2)} USDT</p>
                            </div>
                            <div className={styles.numberBox}>
                                <Input.Number
                                    value={this.state.amount}
                                    width={width}
                                    left={left}
                                    unit={this.props.unit}
                                    onChange={(e) => { this.checkInput(e) }}
                                    onAdd={() => { this.extarClick('add') }}
                                    onSub={() => { this.extarClick('sub') }}
                                />
                                <span className={`${styles.unit}`}>{this.props.unit}</span>
                            </div>
                            {/*<ChooseInput
                                value={this.state.amount}
                                width={width}
                                left={left}
                                unit={this.props.unit}
                                onChange={(e) => {this.checkInput(e)}}
                                onAdd={()=>{ this.extarClick('add') }}
                                onSub={()=>{ this.extarClick('sub') }}
                            />*/}
                            {/*<div className={'flex-row mb-10'} style={{marginTop: '.22rem'}}>
                                <p className={'p4'} className={'sp-3'}>{intl.get('RATE_55')}</p>
                                <div className={'flex-row'}>
                                    {
                                        this.props.support.map((item,index) => {
                                            return <img src={images[item]} key={index} alt="" className={'sp-4'}/>
                                        })
                                    }
                                </div>
                            </div>*/}
                            {/* message.info(intl.get('RATE_1',{limit: this.state.minLimit}), 1 , () =>{}) */}
                            <div style={{ textAlign: "center" }}>
                                <Button onClick={() => { if (this.state.minLimit > this.state.amount) { message.info(intl.get('RATE_1', { limit: this.state.minLimit }), 1, () => { }) } else { this.props.onClick(this.state.amount) } }}
                                    type={'newBig'}
                                    style={{ width: "264px", marginLeft: "10px" }}
                                    disabled={this.props.status === 3}>
                                    {this.props.status === 3 ? intl.get('ACCOUNT_161') : intl.get('RATE_3')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderListH5() {
        return (
            <div className={`${pre}-h5-cell`} style={{ height: '76vw' }}>
                <div className={'flex-row-end'}>
                    <div className={'flag'}>{this.props.tag}</div>
                </div>
                <div className={'content'}>
                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                        <div className={'p1'}>{this.props.name}</div>
                        <div className={'limit'}>{this.props.highlight}</div>
                    </div>
                    {
                        this.props.type === 5 ?
                            <div className={'flex-row'} style={{ alignItems: 'center', margin: '3vw 0' }}>
                                <p className={'p2'}>{this.props.slogan}</p>
                            </div>
                            :
                            <div className={'flex-row'} style={{ alignItems: 'center', margin: '3vw 0' }}>
                                <p className={'p2'}>{this.props.slogan}</p>
                                <div style={{ background: '#EAF2F9', width: '1px', height: '2.5vw', margin: '0 2vw' }}></div>
                                <p className={'p2'} onClick={() => this.props.onClick(this.state.amount)}>{intl.get('RATE_82')}</p>
                            </div>
                    }
                    <div className={'flex-row'}>
                        <div className={'flex-column'} style={{ width: '100%' }}>
                            <div className={'flex-row'}>
                                <div style={{ width: '50%' }}>
                                    <div className={'p3'}>{intl.get('RATE_48')}</div>
                                    <div className={'p4'}>{this.props.weightAsset}</div>
                                </div>
                                <div>
                                    <div className={'p3'}>{intl.get('RATE_49')}</div>
                                    <div className={'p4'}>{this.props.settlementPeriod}</div>
                                </div>
                            </div>
                            <div className={'flex-row'} style={{ marginTop: '4vw' }}>
                                <div style={{ width: '50%' }}>
                                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                                        <div className={'p3'}>{intl.get('RATE_50')}</div>
                                        <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'} onClick={() => message.info(intl.get('RATE_52'), 1)} />
                                    </div>
                                    <div className={'p4'}>{this.props.contractDuration}{intl.get('RATE_23')}</div>
                                </div>
                                <div>
                                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                                        <div className={'p3'}>{intl.get('RATE_51')}</div>
                                        <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'} onClick={() => message.info(intl.get('RATE_53'), 1)} />
                                    </div>
                                    <div className={'p4'}>{(this.props.serviceChargeRate * 100).toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>
                        {
                            this.props.status === 3 ?
                                <img src={images["sell-zh"]} alt="" className={'img-sell'} />
                                :
                                null
                        }
                    </div>
                    <div className={'line-bg'}></div>
                    <div className={'flex-row-between'} style={{ marginBottom: '4vw' }}>
                        <div className={'flex-row'} style={{ alignItems: 'flex-end' }}>
                            <div className={'p5'}><span style={{ fontSize: '3vw' }}>{intl.get('RATE_2')}</span>$ {(this.props.price * this.state.amount).toFixed(2)}</div>
                        </div>
                        <div className={'flex-row'} style={{ alignItems: 'center' }}>
                            <div style={{ color: '#5A5F65', fontSize: '4vw', marginRight: '3vw', fontWeight: 'bold' }}>$ {this.props.price}<span style={{ fontSize: '3vw' }}>/{this.props.unit ? this.props.unit : ''}</span></div>
                            <div style={{ position: 'relative' }}>
                                <p className={'p3'}>{this.props.originalPrice}</p>
                                <div className={'low-line'}></div>
                            </div>
                        </div>
                    </div>
                    <ChooseInput
                        value={this.state.amount}
                        unit={this.props.unit}
                        height={'7vw'}
                        width={'84vw'}
                        left={'76vw'}
                        top={'1.5vw'}
                        onChange={(e) => { this.checkInput(e) }}
                        onAdd={() => { this.extarClick('add') }}
                        onSub={() => { this.extarClick('sub') }}
                    />
                    <div className={'flex-row-between'} style={{ marginTop: '3vw' }}>
                        <div className={'flex-row'} style={{ alignItems: 'center' }}>
                            <p className={'p3'} style={{ marginRight: '2vw' }}>{intl.get('RATE_18')} </p>
                            <div className={'flex-row'}>
                                {
                                    this.props.support.map((item, index) => {
                                        return <img src={images[item]} key={index} alt="" className={'img-coin'} />
                                    })
                                }
                            </div>
                        </div>
                        <Button type={'h5-big'} disabled={this.props.status === 3 ? true : false} onClick={() => { if (this.state.minLimit > this.state.amount) { ToastH5.fail(intl.get('RATE_1', { limit: this.state.minLimit }), 2, () => { }, false); } else { this.props.onClick(this.state.amount) } }} >{intl.get('RATE_3')}</Button>
                    </div>
                </div>
            </div>
        )
    }

    renderDetailH5() {
        return (
            <div className={`${pre}-h5-cell`}>
                <div className={'flex-row-end'}>
                    <div className={'flag'}>{this.props.tag}</div>
                </div>
                <div className={'content'}>
                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                        <div className={'p1'}>{this.props.name}</div>
                        <div className={'limit'}>{this.props.highlight}</div>
                    </div>
                    <p className={'p2'}>{this.props.slogan}</p>
                    <div className={'flex-row'}>
                        <div className={'flex-column'} style={{ width: '50%' }}>
                            <div className={'flex-row'}>
                                <div style={{ width: '50%' }}>
                                    <div className={'p3'}>{intl.get('RATE_48')}</div>
                                    <div className={'p4'}>{this.props.weightAsset}</div>
                                </div>
                                <div>
                                    <div className={'p3'}>{intl.get('RATE_49')}</div>
                                    <div className={'p4'}>{this.props.settlementPeriod}</div>
                                </div>
                            </div>
                            <div className={'flex-row'} style={{ marginTop: '4vw' }}>
                                <div style={{ width: '50%' }}>
                                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                                        <div className={'p3'}>{intl.get('RATE_50')}</div>
                                        <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'} onClick={() => message.info(intl.get('RATE_52'), 1)} />
                                    </div>
                                    <div className={'p4'}>{this.props.contractDuration}{intl.get('RATE_23')}</div>
                                </div>
                                <div>
                                    <div className={'flex-row'} style={{ alignItems: 'center' }}>
                                        <div className={'p3'}>{intl.get('RATE_51')}</div>
                                        <img src={require('../../../images/rate/info.png')} alt="" className={'img-info'} onClick={() => message.info(intl.get('RATE_53'), 1)} />
                                    </div>
                                    <div className={'p4'}>{(this.props.serviceChargeRate * 100).toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className={'line'}></div>
                        <div>
                            <div className={'p3'}>{intl.get('RATE_54')}</div>
                            <div className={'flex-row'} style={{ alignItems: 'flex-end', marginBottom: '3vw' }}>
                                <div className={'p5'}>$ {this.props.price}</div>
                                <div style={{ position: 'relative' }}>
                                    <p className={'p3'}>{this.props.originalPrice}</p>
                                    <div className={'low-line'}></div>
                                </div>
                            </div>
                            <p className={'p3'}>{intl.get('RATE_18')}</p>
                            <div className={'flex-row'} style={{ marginTop: '2vw' }}>
                                {
                                    this.props.support.map((item, index) => {
                                        return <img src={images[item]} key={index} alt="" className={'img-coin'} />
                                    })
                                }
                            </div>
                        </div>
                        {
                            this.props.status === 3 ?
                                <img src={images["sell-zh"]} alt="" className={'img-sell'} />
                                :
                                null
                        }
                    </div>
                    <div className={'progress'}>
                        <div className={'progress-content'} style={{ width: `${((this.props.status === 3 ? 0 : this.props.remainingQuantity) / this.props.quantity) * 100}%` }}></div>
                        <div className={'p6'}>{intl.get('RATE_47')}{`${(((this.props.status === 3 ? 0 : this.props.remainingQuantity) / this.props.quantity) * 100).toFixed(2)}%`}</div>
                    </div>
                </div>
            </div>
        )
    }

    renderDetail() {
        return (
            <div className={`${pre}-cell mt-20`} style={{ minHeight: '2.13rem', maxHeight: '2.84rem' }}>
                <span className={'flag'}>{this.props.tag}</span>
                <div className={'flex-row-center'}>
                    <div className={'flex-row mt-10'}>
                        <div className={'flex-column'}>
                            <div className={'flex-row'}>
                                <p className={'p1'}>{this.props.name}</p>
                                <div className={'limit'}>{this.props.highlight}</div>
                            </div>
                            <div className={'flex-row mt-15'}>
                                <p className={'p2'}>{this.props.slogan}</p>
                                <div className={'progress'}>
                                    <div className={'progress-content'} style={{ width: `${((this.props.status === 3 ? 0 : this.props.remainingQuantity) / this.props.quantity) * 100}%` }}></div>
                                    <p className={'p3'}>{intl.get('RATE_47')}{`${(((this.props.status === 3 ? 0 : this.props.remainingQuantity) / this.props.quantity) * 100).toFixed(2)}%`}</p>
                                </div>
                            </div>
                            <div className={'flex-row mt-30'}>
                                {this.renderText(intl.get('RATE_48'), this.props.weightAsset, false)}
                                {this.renderText(intl.get('RATE_49'), this.props.settlementPeriod, false)}
                                {this.renderText(intl.get('RATE_50'), this.props.contractDuration + intl.get('RATE_23'), true, intl.get('RATE_52'))}
                                {this.renderText(intl.get('RATE_51'), (this.props.serviceChargeRate * 100).toFixed(2) + '%', true, intl.get('RATE_53'))}
                            </div>
                        </div>
                        <div className={'line'}></div>
                        <div className={'flex-column'}>
                            <p className={'p4'}>{intl.get('RATE_54')}</p>
                            <div className={'flex-row mb-20 mt-15'} style={{ alignItems: 'flex-end' }}>
                                <p className={'p6'}>$ {this.props.price}</p>
                                <div style={{ position: 'relative' }}>
                                    <p className={'p7'}>{this.props.originalPrice}</p>
                                    <div className={'low-line'}></div>
                                </div>
                            </div>
                            <p className={'p4'}>{intl.get('RATE_55')}</p>
                            <div className={'flex-row mt-15'}>
                                {
                                    this.props.support.map((item, index) => {
                                        return <img src={images[item]} key={index} alt="" className={'img-coin'} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {(this.props.type === 0 || this.props.type === 4) ? this.renderList() : null}
                {/* {(this.props.type === 1 || this.props.type === 4) ? this.renderDetail() : null} */}
                {(this.props.type === 2 || this.props.type === 5) ? this.renderListH5() : null}
                {/* {(this.props.type === 3 || this.props.type === 5) ? this.renderDetailH5() : null} */}
            </div>
        );
    }
}
