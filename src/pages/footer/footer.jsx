import React, { Component } from 'react';
import logo from '../../images/common/logo-white.png';
import './index.less';
import connect from '../../store/connect';
import intl from 'react-intl-universal';
import net from '../../net';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qq: '',
            wechat: '',
            public: '',
            business: '',
            link: [],
            deFIL: require('../../images/code.jpg')
        };
    }

    componentDidMount() {
        this.getGeneralBottom();
        this.getGeneralLink();
    }

    getGeneralBottom() {
        net.getGeneralBottomCode().then(res => {
            if (res.ret === 200) {
                this.setState(res.data)
            }
        })
    }

    getGeneralLink() {
        net.getGeneralLink().then(res => {
            if (res.ret === 200) {
                this.setState({ link: res.data })
            }
        })
    }

    render() {
        //const isMobile = window.innerWidth <= 1080;
        const isMobile = false;
        if (isMobile) {
            return (
                <div className={'footer-h5 flex-column-center'}>
                    <img src={logo} alt="" className={'logo'} />
                    <div className={'flex-row'}>
                        <a className={'white-text mr'} href="#/article/about" target="_blank">{intl.get('RATE_56')}</a>
                        <a className={'white-text mr'} href="#/article/coop" target="_blank">{intl.get('RATE_57')}</a>
                        <a className={'white-text'} href="#/article/service" target="_blank">{intl.get('RATE_58')}</a>
                    </div>
                    <div className={'footer-content-line'}></div>
                    <div className={'small-text'}>{intl.get('RATE_59')}</div>
                </div>
            )
        }
        return (

            <div className="footer">
                <div className={'footer-content'}>
                    <div className={'flex-column'}>
                        <div className={'flex-row'} style={{ alignItems: 'center' }}>
                            <img src={logo} alt="" className={'logo'} />
                            <div className={'flex-coloum-end'}>
                                <div className={'flex-row'}>
                                    <a className={'white-text mr'} href="#/article/about" target="_blank">{intl.get('RATE_56')}</a>
                                    <a className={'white-text mr'} href="#/article/coop" target="_blank">{intl.get('RATE_57')}</a>
                                    <a className={'white-text'} href="#/article/service" target="_blank">{intl.get('RATE_58')}</a>
                                </div>
                            </div>
                        </div>
                        <div className={'small-text'}>{intl.get('RATE_59')}</div>
                    </div>
                    <div className={'flex-row'}>
                        <div className={'flex-column-center mr-30'}>
                            <div className={'text'}>{intl.get('RATE_78')}</div>
                            <img src={this.state.wechat} alt="" className={'qrcode'} />
                        </div>
                        <div className={'flex-column-center mr-30'}>
                            <div className={'text'}>{intl.get('DeFIL借贷平台')}</div>
                            <img src={this.state.deFIL} alt="" className={'qrcode'} />
                        </div>
                        <div className={'flex-column-center mr-30'}>
                            <div className={'text'}>{intl.get('RATE_781')}</div>
                            <img src={this.state.business} alt="" className={'qrcode'} />
                        </div>
                        <div className={'flex-column-center mr-30'}>
                            <div className={'text'}>{intl.get('RATE_79')}</div>
                            <img src={this.state.public} alt="" className={'qrcode'} />
                        </div>
                        <div className={'flex-column-center'}>
                            <div className={'text'}>{intl.get('RATE_80')}</div>
                            <img src={this.state.qq} alt="" className={'qrcode'} />
                        </div>
                    </div>
                </div>
                <div className={'flex-column-center'}>
                    <div className={'footer-content-line'}></div>
                </div>
                <div className={'footer-links'}>
                    <div className={'flex-row mb-30 mt-15'}>
                        <div className={'small-text'} style={{ margin: '0' }}>{intl.get('RATE_85')}</div>
                        {
                            this.state.link.map((item, index) => {
                                return <a className={'links'} key={index} href={item.link} target={item.link}>{item.title}</a>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(Footer);
