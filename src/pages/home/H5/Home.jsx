import React, { Component } from "react";
import connect from "../../../store/connect";
import Header from '../../header';
import Footer from '../../footer';
import net from '../../../net';
import './index.less';
import '../../rate/H5/index.less';
import { Carousel, message } from 'antd';
import Cell from '../../rate/component/shopCell';
import { Toast } from 'antd-mobile';
import intl from 'react-intl-universal';

const pre = 'home-h5'; 

class Home extends Component {

    constructor(props){
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

    componentDidMount(){
        this.getGeneralBanner();
        this.getGeneralNotice();
        this.getGoodList();
        this.getGeneralAdvertisement();
        this.getGeneralPartner();
        // this.getRatePrice();
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
    //             console.log(`%c ${intl.get(res.responseMsg)}`,'color: red');
    //         }
    //     })
    // }

    getGeneralAdvertisement(){
        net.getGeneralAdvertisement().then(res => {
            if(res.ret === 200){
                this.setState({advertisement: res.data })
            }
        })
    }
    
    getGeneralBanner(){
        net.getGeneralBanner().then(res => {
            if(res.responseCode === '00'){
                this.setState({banner: res.content })
            }
        })
    }

    getGeneralNotice(){
        net.getGeneralNotice({
            page: 1,
            count: 10
        }).then(res => {
            if(res.ret === 200){
                this.setState({notice: res.data })
            }
        })
    }

    getGoodList(){
        net.getGoodList().then(res => {
            if(res.ret === 200){
                this.setState({data: res.data})
            }
        })
    }

    getGeneralPartner(){
        net.getGeneralPartner().then(res => {
            if(res.ret === 200){
                this.setState({partner: res.data})
            }
        })
    }
    
    render() {
        const isMobile = window.innerWidth <= 1080;
        const { login, userInfo } = this.props.redux;
        let currentLocale = localStorage.getItem('lang') || 'zh';

        return (
            <div className={'home-h5'}>
                { isMobile ? 
                    <Header 
                    logo={true} 
                    left={() => this.props.history.push('home')}
                    right={() => { if(login) { } else { this.props.history.push('login') }}}
                    rightText={login ? userInfo.nickname : intl.get('RATE_7') }
                    /> 
                    : null }
                    <Carousel autoplay>
                        {this.state.banner.map((item,index) => {
                            return (
                                <a href={item.content} target="_blank">
                                    <div className={'banner'} key={index}>
                                        <img src={item.image} alt="" className={'bg'}/>
                                        <div className={'content'}>
                                            {
                                                item.ifButton ?
                                                <div className={'cell'}>
                                                    <div className={'btn'} style={{background: `${item.buttonColor}`}}>{item.buttonText}</div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </a>)
                        })}
                    </Carousel>
                    <Carousel 
                        autoplay
                        dots={false}
                        style={{marginTop: '6vw'}}
                    >   
                        {
                            this.state.notice.map((item,index) => {
                                return (
                                    <div key={index}>
                                        <a key={index} target="_blank" href={`#/article/${item.id}`}>
                                        <div className={'notice'} style={{display: 'block'}}>
                                            <span className={'cell'}>{item.title.length > 28 ? item.title.substring(0,28) + '...'   : item.title}</span> 
                                        </div>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <div className={'rate-h5'} style={{minHeight: 'auto'}}>
                        {
                            this.state.data.map((item,index) => {
                                if(index > 2) return;
                                return (<Cell 
                                key={index} 
                                type={2}
                                weightAsset={item.weightAsset}
                                serviceChargeRate={item.serviceChargeRate} 
                                contractDuration={item.contractDuration}
                                contractName={item.contractName}
                                highlight={currentLocale === 'en' ? item.enHighlight :item.highlight}
                                name={currentLocale === 'en' ? item.enName : item.name}
                                price={item.price}
                                quantity={item.quantity ? item.quantity : 1}
                                remainingQuantity={item.remainingQuantity}
                                slogan={currentLocale === 'en' ? item.enSlogan :item.slogan}
                                tag={currentLocale === 'en' ? item.enTag : item.tag}
                                status={item.status}
                                originalPrice={item.originalPrice}
                                settlementPeriod={item.settlementPeriod}
                                support={this.state.support}
                                unit={item.unit}
                                amount={item.minLimit}
                                onClick={(amount)=>{if(item.startTime > (new Date().getTime())) { message.info(intl.get('RATE_0'), 1, ()=>{}) } else { this.props.history.push(`/rate_detail/${item.id}/${amount}`) }}}
                                />)
                            })
                        }
                    </div>
                    <div className={'flex-row-end detail'} onClick={() =>{ this.props.setTab('could');this.props.history.push('/')}}>
                        <div className={'p1'}>{intl.get('RATE_67')}</div>
                        <img src={require('../../../images/home/right.png')} alt="" className={'img-1'}/>
                    </div>
                    <div className={'grey-content'}>
                        <div className={'flex-column-center'}>
                            {
                                this.state.advertisement.map((item,index) => {
                                    if(item.type === 0){
                                        return <img src={item.content} alt="" className={'picture'} key={index}/>
                                    }
                                    return(
                                        <video src={item.pcContent} type="video/mp4" controls="controls" width={'335'} height={'251'} className={'mt'} key={index}>
                                            <source src={item.pcContent} type="video/mp4" />
                                        </video>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={'partner'}>
                        <div className={'partner-title'}>{intl.get('RATE_68')}</div>
                        <div className={'flex-row-between'} style={{flexWrap: 'wrap'}}>
                            {
                                this.state.partner.map((item,index) => {
                                    return(
                                        <a href={item.link} target="_blank" key={index}><img src={item.image} alt={item.title} className={'partner-img'}/></a>
                                    )
                                })
                            }
                        </div>
                    </div>
            </div>
        );
    }
}

export default connect(Home)
