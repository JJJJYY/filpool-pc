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
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

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
                        rightText={login ? userInfo.nickname : intl.get('登录/注册')}
                    />
                    : null}
                <div style={isMobile ? {} : { minHeight: "4.27rem" }}>
                    <Carousel autoplay>
                        {this.state.banner.map((item, index) => {
                            return (
                                <a href={item.url} target="_blank" key={index}>
                                    <div className={'banner'}>
                                        <img src={item.pcImage} alt="" className={'bg'} />
                                    </div>
                                </a>)
                        })}
                    </Carousel>
                </div>
                <div className={'content'} style={{ margin: 0 }}>
                    <div className={`${styles.noticeContainer}`} style={{ height: "56px" }}>
                        <Carousel style={{ minWidth: "68%" }} className="ddd"
                            dotPosition="right"
                            autoplay
                            dots={false}
                        >
                            {
                                this.state.notice.map((item, index) => {
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
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        <Link to={{ pathname: '/information', query: { tabIndex: 3 } }} className={styles.moreNoticeBtn}>
                            <span>{intl.get("更多")}</span>
                            <span className={`iconfont ${styles.icon}`} style={{ verticalAlign: "top", color: "#575C62" }}>&#xe62d;</span>
                        </Link>
                    </div>
                    {/* 算力加速 */}
                    <div style={{ width: '100%', paddingBottom: '60px', overflow: 'auto' }}>
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '500', color: '#333333FF', marginTop: '55px' }}>FILPool矿池算力加速计划</div>
                        <div style={{ marginTop: '40px', overflow: 'auto' }}>
                            <Expedite />
                        </div>
                    </div>
                    {/* 存储空间 */}
                    <div style={{ background: '#F5F5F5FF', padding: '46px 0', overflow: 'auto' }}>
                        <div>
                            <p style={{ fontSize: '24px', color: '#333333', marginBottom: '46px', textAlign: 'center' }}>FILPool矿池运营数据</p>
                        </div>
                        <Storage />
                    </div>
                </div>
                <div>
                    <div className={'content'}>
                        <div className={'advertisement flex-column-center'}>
                            <div className={`${styles.videoTitle}`}>{intl.get("IPFS官方视频")}</div>
                            {
                                this.state.advertisement.map((item, index) => {
                                    if (item.type !== 1) {
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
                    <div className={'title'} style={{ marginTop: "40px" }}>{intl.get('合作伙伴')}</div>
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
                <Footer />
            </div>
        );
    }
}

export default connect(Home)
