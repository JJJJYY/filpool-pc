import React, { Component } from "react";
import connect from "../../store/connect";
import { Link } from 'react-router-dom';
import { Button } from "../../components";
import Header from '../header';
import Footer from '../footer';
import net from '../../net';
import './index.less';
import styles from './home.module.less';
import { Carousel, message } from 'antd';
import Cell from '../rate/component/shopCell';
import intl from 'react-intl-universal';
import HomeStatic from './HomeStatic';
import LazyLoad from 'react-lazyload';
import Storage from './components/storage';
import Expedite from '../../components/expedite/expedite';

const pre = 'home';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            notice: [],
            data: [],
            advertisement: [],
            partner: [],
            visible: false,
            support: [],
        }
    }

    componentDidMount() {
        this.getGeneralBanner();
        this.getGeneralNotice();
        this.getGoodList();
        this.getGeneralAdvertisement();
        this.getGeneralPartner();
        // this.getRatePrice()
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    // getRatePrice(){
    //     net.getRatePrice().then(res => {
    //         if(res.responseCode === '00'){
    //             let data = res.content;
    //             let support = [];
    //             for(let item of data){
    //                 if(item.purchaseFlag){
    //                     support.push(item.asset)
    //                 }
    //             }
    //             this.setState({ support: support })
    //         } else {
    //             //console.log(`%c ${intl.get(res.responseMsg)}`,'color: red');
    //         }
    //     })
    // }

    getGeneralAdvertisement() {
        net.getGeneralAdvertisement({ type: 1 }).then(res => {
            if (res.ret === 200) {
                this.setState({ advertisement: res.data })
            }
        })
    }

    getGeneralBanner() {
        net.getGeneralBanner().then(res => {
            if (res.ret === 200) {
                this.setState({ banner: res.data })
            }
        })
    }

    getGeneralNotice() {
        net.getGeneralNotice({
            page: 1,
            count: 10
        }).then(res => {
            if (res.ret === 200) {
                this.setState({ notice: res.data })
            }
        })
    }

    getGoodList() {
        net.getGoodList().then(res => {
            if (res.ret === 200) {
                this.setState({ data: res.data })
            }
        })
    }

    getGeneralPartner() {
        net.getGeneralPartner().then(res => {
            if (res.ret === 200) {
                this.setState({ partner: res.data })
            }
        })
    }

    render() {
        //const isMobile = window.innerWidth <= 1080;
        const isMobile = false;
        const { login, userInfo } = this.props.redux;
        let currentLocale = localStorage.getItem('lang') || 'zh';
        return (
            <div className={'home'}>
                { isMobile ?
                    <Header
                        logo={true}
                        left={() => this.props.history.push('home')}
                        right={() => { if (login) { } else { this.props.history.push('login') } }}
                        rightText={login ? userInfo.nickname : intl.get('RATE_7')}
                    />
                    : null}
                <div style={isMobile ? {} : { minHeight: "4.27rem" }}>
                    <Carousel autoplay>
                        {/* <div className={'banner'}>
                            <img src={require('../../images/rate/test.png')} alt="" className={'bg'}/>
                            <div className={'content'}>
                                <div className={'cell'}>
                                    <div className={'btn'} style={{background: `#EDA43B`}}>{'123'}</div>
                                </div>
                            </div>
                        </div> */}
                        {this.state.banner.map((item, index) => {
                            return (
                                <a href={item.url} target="_blank" key={index}>
                                    <div className={'banner'}>
                                        <img src={item.pcImage} alt="" className={'bg'} />
                                    </div>
                                </a>)
                            // return <div className={'bg'} style={{background: `url(${item.webImage}) !important`, height: '4.32rem', backgroundSize: 'cover', width: '100%'}}></div>
                        })}
                    </Carousel>
                </div>
                <div className={'content'} style={{ margin: 0 }}>
                    <div className={`${styles.noticeContainer}`} style={{ height: "56px" }}>
                        {/*<span className="iconfont">&#xe6d2;</span>*/}
                        <Carousel style={{ minWidth: "68%" }} className="ddd"
                            dotPosition="right"
                            autoplay
                            dots={false}
                        >
                            {
                                this.state.notice.map((item, index) => {
                                    /*if(index === 0){*/
                                    return (
                                        <div key={index}>
                                            <Link key={index} to={{ pathname: `/information_detail/3/${item.id}`, query: { title: item.title, content: item.content } }}>
                                                <div className={'notice'} style={{ display: 'block' }}>
                                                    <span className={'cell'}>{item.title}</span>
                                                    <span style={{ marginLeft: '40px', paddingRight: "16px", borderRight: "1px solid #86929D" }}>
                                                        {item.createTime}
                                                    </span>
                                                </div>
                                            </Link>
                                            {/*<a key={index} target="_blank" href={`#/article/${item.id}`}>

                                                    </a>*/}
                                        </div>
                                    )
                                    /*}*/
                                })
                            }
                        </Carousel>
                        <Link to={{ pathname: '/information', query: { tabIndex: 3 } }} className={styles.moreNoticeBtn}>
                            <span>{intl.get("homeStatus52")}</span>
                            <span className={`iconfont ${styles.icon}`} style={{ verticalAlign: "top", color: "#575C62" }}>&#xe62d;</span>
                        </Link>
                    </div>
                    {/* 算力加速 */}
                    <div style={{ width: '100%', paddingBottom: '60px', overflow: 'auto' }}>
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '500', color: '#333333FF', marginTop: '55px' }}>30天算力加速计划</div>
                        <div style={{ marginTop: '40px', overflow: 'auto' }}>
                            <Expedite stats={'111'} />
                        </div>
                    </div>
                    {/* 存储空间 */}
                    <div style={{ background: '#F5F5F5FF', padding: '46px 0', overflow: 'auto' }}>
                        <div>
                            <p style={{ fontSize: '24px', color: '#333333', marginBottom: '46px', textAlign: 'center' }}>FILPool矿池运营数据</p>
                        </div>
                        <Storage />
                    </div>
                    {/* <div className="shopContainer" style={{ minHeight: "3.24rem", position: "relative" }}>
                        <div className={styles.shopCellLabel}>
                            <div className={styles.item}>
                                <img src={require("@/images/home/home_icon_filecoin@2x.png")} className={`${styles.icon}`} alt="" />
                                <span className={styles.iconText}>{intl.get("homeStatus50")}</span>
                            </div>
                            <Link to={{ pathname: "/rate" }} className={styles.item}>
                                <span className={styles.iconText}>{intl.get("homeStatus51")}</span>
                                <span className={`iconfont ${styles.icon}`}>&#xe62d;</span>
                            </Link>
                        </div>
                        <div style={{ width: "1200px", position: "relative", margin: "auto" }}>
                            <LazyLoad height={75}>
                                <img src={require('@/images/home/home_picture_1.png')} className={`${styles.bgImg}`} style={{ left: "-196px", top: "160px" }} alt="" />
                            </LazyLoad>
                        </div>
                        <div style={{ position: "relative" }}>
                            {
                                this.state.data.map((item, index) => {
                                    if (index > 2) return null;
                                    return (<Cell
                                        key={index}
                                        type={0}
                                        weightAsset={item.weightAsset}
                                        serviceChargeRate={item.serviceChargeRate}
                                        contractDuration={item.contractDuration}
                                        contractName={item.contractName}
                                        highlight={currentLocale === 'en' ? item.enHighlight : item.highlight}
                                        name={currentLocale === 'en' ? item.enName : item.name}
                                        price={item.price}
                                        quantity={item.quantity ? item.quantity : 1}
                                        remainingQuantity={item.remainingQuantity}
                                        slogan={currentLocale === 'en' ? item.enSlogan : item.slogan}
                                        tag={currentLocale === 'en' ? item.enTag : item.tag}
                                        status={item.status}
                                        originalPrice={item.originalPrice}
                                        settlementPeriod={item.settlementPeriod}
                                        support={this.state.support}
                                        amount={item.minLimit}
                                        unit={item.unit}
                                        locale={currentLocale}
                                        checkDetail={(amount) => { if (item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, () => { }) } else { this.props.history.push(`/rate_detail/${item.id}/${amount}`) } }}
                                        onClick={(amount) => { if (item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, () => { }) } else { this.props.history.push(`/orderPay?id=${item.id}&amount=${amount}`) } }}
                                    />)
                                })
                            }
                        </div>
                    </div> */}
                    {/*<div className={'flex-row-end cell'} style={{marginTop: '.2rem', marginBottom: '.35rem'}}>
                            <div className={'flex-row'} onClick={() => this.props.history.push('/rate')} style={{cursor: 'pointer'}}>
                                <p className={'grey-text'}>{intl.get('RATE_67')}</p>
                                <img src={require('../../images/home/right.png')} alt="" className={'img'}/>
                            </div>
                        </div>*/}
                </div>
                {/*<div className={'grey-bg'}>*/}
                <div>
                    <div className={'content'}>
                        <div className={'advertisement flex-column-center'}>
                            <div className={`${styles.videoTitle}`}>{intl.get("homeStatus57")}</div>
                            {
                                this.state.advertisement.map((item, index) => {
                                    if (item.type !== 1) {
                                        /*return <img src={item.pcContent} alt="" className={'picture'} key={index}/>*/
                                        return null;
                                    }
                                    return (
                                        <video src={item.pcContent} type="video/mp4" controls="controls" className={'cell'} width={'1200'} key={index} poster={require("@/images/home/preview.png")} >
                                            <source src={item.pcContent} type="video/mp4" />
                                        </video>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <HomeStatic locale={currentLocale}></HomeStatic>
                <div className={'content'}>
                    <div className={'title'} style={{ marginTop: "40px" }}>{intl.get('RATE_68')}</div>
                    <div className={'cell'} style={{ marginBottom: '.3rem' }}>
                        <div className={'flex-row'} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                            {
                                this.state.partner.map((item, index) => {
                                    return (
                                        <a href={item.link} target="_blank" key={index}><img src={item.image} alt={item.title} className={'img-2'} key={index} /></a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <Popover trigger="hover" placement="leftTop" content={<img src={require('../../images/home/qrcode.jpeg')} alt="" style={{width: '1rem'}}/>}> */}

                {/* </Popover> */}
                <Footer />
            </div>
        );
    }
}

export default connect(Home)
