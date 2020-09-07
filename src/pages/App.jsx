import React, { Component } from 'react';
import Router from './Router';
import connect from '../store/connect';
import Header from './header';
import setLanguage from '../locales/setLanguage';
import '../styles/loading.css';
import intl from 'react-intl-universal';
import { Modal } from 'antd-mobile';
import { BackTop } from 'antd';

const mobile = window.innerWidth <= 1080;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false,
            init: false,
            visible: false,
            red: !localStorage.getItem('red'),
        };
    }

    componentDidMount() {
        this.props.getUserInfo();
        /*window.onresize = () => {
            this.setState({
                mobile: window.innerWidth <= 1080,
            });
            window.onWindowResize && window.onWindowResize(window.innerWidth);
        };*/

        this.loadLocales();

        if (process.env.NODE_ENV === 'production') {
            window.console = {
                info: () => {
                },
                log: () => {
                },
                warn: () => {
                },
                debug: () => {
                },
                error: () => {
                },
            };
        }
    }

    componentDidCatch(error, info) {
        /*alert("987654");*/
        console.log(error)
        console.log(info)
    }


    loadLocales() {
        let currentLocale = localStorage.getItem('lang') || 'zh';
        const { href } = window.location;
        if (href.indexOf('?') > -1) {
            const params = href.split('?')[1].split('#')[0];

            const paramList = params.split('&');

            paramList.forEach((item) => {
                const [key, value] = item.split('=');
                if (key === 'lang') {
                    currentLocale = value;
                }
            });
        }
        if (currentLocale !== 'zh' && currentLocale !== 'en' && currentLocale !== 'zhTW') currentLocale = 'zh';
        localStorage.setItem('lang', currentLocale);
        setLanguage(currentLocale).then(() => {
            this.setState({ init: true });
        });
    }

    render() {
        if (!this.state.init) {
            return (
                <div className="full">
                    <div className="loding-filp" />
                </div>
            );
        }

        const { href } = window.location;
        const obj = {};
        if (href.indexOf('?') > -1) {
            const arr = href.split('?')[1].split('&');
            arr.forEach((i) => { obj[i.split('=')[0]] = i.split('=')[1]; });
            localStorage.setItem('param', JSON.stringify(obj));
        }
        let register = '';
        if (href.indexOf('#/register/') > -1) { [, register] = window.location.hash.split('#/register/'); }
        const flag = obj.channel;

        return (
            <div>
                { this.state.mobile ? null : <Header /> }
                <section style={this.state.mobile ? null : { paddingTop: '.44rem' }}>
                    <Router mobile={this.state.mobile} />
                </section>
                {/*<div className={this.state.mobile ? 'img-kefu-h5' : 'img-kefu'} onMouseOver={() => this.setState({ visible: true })} onMouseLeave={() => this.setState({ visible: false })}>*/}
                <div className={[this.state.mobile ? 'img-kefu-h5' : 'img-kefu']} onMouseOver={() => this.setState({ visible: true })} onMouseLeave={() => this.setState({ visible: false })}>
                    <span className="iconfont" style={{fontSize: "32px", color: "#fff"}}>&#xe6cd;</span>
                    <div className={this.state.mobile ? 'wechat-text-h5' : 'wechat-text'}>{intl.get('RATE_84')}</div>
                </div>
                {
                    this.state.visible
                        ? (
                            <div className={this.state.mobile ? 'flex-column-center kefu-h5' : 'flex-column-center kefu'}>
                                <img src={require('../images/home/qrcode.png')} alt="" className="qrcode" />
                                <div className="triangle" />
                            </div>
                        )
                        : null
                }
                <Modal
                    visible={flag && this.state.mobile && this.state.red}
                    transparent
                    className="transparent"
                >
                    <img
                        src="https://filp.oss-cn-hongkong.aliyuncs.com/app/red.png"
                        style={{ width: '75vw', height: 'auto', margin: 'auto' }}
                        alt=""
                        onClick={() => {
                            localStorage.setItem('red', 'true');
                            this.setState({ red: false });
                            window.location.href = `/#/register${register ? `/${register}` : ''}`;
                        }}
                    />

                    <img
                        src={require('../images/common/close.png')}
                        style={{ width: '8vw', marginTop: '8vw' }}
                        alt=""
                        onClick={() => {
                            localStorage.setItem('red', 'true');
                            this.setState({ red: false });
                            window.location.href = '/#/';
                        }}
                    />
                </Modal>
                {this.state.mobile?null:<BackTop visibilityHeight={1200} />}
            </div>
        );
    }
}

export default connect(App);
