import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Popover, message } from 'antd';
import logo from '../../images/common/logo.png';
import './index.less';
import connect from '../../store/connect';
import setLanguage from '../../locales/setLanguage';
import intl from 'react-intl-universal';
import net from '../../net';

const keys = ['home', 'rate', 'help', 'user', 'login', 'register', 'information', 'invite', 'market'];

const lang = {
    zh: '中文',
    zhTW: '繁体中文',
    en: 'English',
};

const download = {
    ios: require('../../images/common/apple.png'),
    android: require('../../images/common/android.png'),
};

function handlePath(key) {
    let result = '';
    keys.forEach((item) => {
        if (~key.indexOf(item)) result = item;
    });
    return result;
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: handlePath(window.location.hash),
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => this.onUrlChange());
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', () => this.onUrlChange());
        this.setState = (state, callback) => {
            return;
        };
    }
    onUrlChange() {
        const tab = handlePath(window.location.hash);
        if (tab === 'home' || tab === 'rate' || tab === 'help' || tab === 'user' || tab === 'register' || tab === 'login') {
            this.setState({ tab: handlePath(window.location.hash) });
        }
    }

    onChange(v) {
        window.location.href = `/#/${v.key}`;
        this.setState({ tab: v.key });
    }

    setLang(currentLocale) {
        if (currentLocale !== 'zh' && currentLocale !== 'en' && currentLocale !== 'zhTW') currentLocale = 'zh';
        localStorage.setItem('lang', currentLocale);
        setLanguage(currentLocale).then(() => {
            window.location.reload();
        });
    }

    loginOut() {
        net.getLogout().then((res) => {
            if (res.ret === 200) {
                this.props.setUserInfo({});
                this.props.setLogin(false);
                sessionStorage.removeItem('login')
                sessionStorage.removeItem("userInfo");
                message.info(intl.get('RATE_72'), 1, () => { });
                window.location.href = '/#/login';
            }
        });
    }

    render() {
        const { tab } = this.state;
        const { login, userInfo } = this.props.redux;
        const currentLocale = localStorage.getItem('lang') || 'zh';
        //const isMobile = window.innerWidth <= 1080;
        const isMobile = false;
        if (isMobile) {
            return (
                <div className="header-h5" style={this.props.transparent ? { backgroundColor: 'transparent' } : {}}>
                    {
                        this.props.left ? (
                            <div className="header-h5-item" onClick={this.props.left}>
                                {
                                    this.props.logo
                                        ? <img src={require('../../images/common/logo.png')} onClick={this.props.left} style={{ width: '23vw', height: '8vw' }} />
                                        : <img src={require('../../images/common/back.png')} onClick={this.props.left} style={{ width: '2vw', height: '3vw' }} />

                                }
                            </div>
                        ) : (<div className="header-h5-item" />)
                    }

                    <div className="header-h5-title">{this.props.title}</div>
                    {
                        (window.plus && window.plus.webview) ? (
                            <div className="header-h5-item" style={{ textAlign: 'right' }} onClick={this.props.right}>
                                {this.props.rightText || ''}
                            </div>
                        ) : (
                                <Link to="/download" className="header-h5-item primary-font-color" style={{ textAlign: 'right' }}>
                                    下载APP
                                </Link>
                            )
                    }
                </div>
            );
        }
        return (
            <div className="header">
                <div style={{ margin: '0 .9rem' }}>
                    <div className="header-content">
                        <div>
                            <div className='flex-row-center'>
                                <img className="logo" src={logo} alt="" style={{ width: 'auto', marginRight: "5px" }} onClick={() => { window.location.href = '/#/'; }} />
                                <span style={{ marginRight: '0.3rem', fontWeight: "bold" }}>FILPool.io</span>
                            </div>
                            <Menu
                                onClick={this.onChange}
                                mode="horizontal"
                                selectedKeys={[tab]}
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: '#24375E',
                                }}
                            >
                                <Menu.Item key={keys[0]}>
                                    {intl.get('RATE_60')}
                                </Menu.Item>
                                <Menu.Item key={keys[1]}>
                                    {intl.get('RATE_61')}
                                </Menu.Item>
                                <Menu.Item key={keys[8]}>
                                    {intl.get('RATE_601')}
                                </Menu.Item>
                                <Menu.Item key={keys[6]}>
                                    {intl.get('RATE_86')}
                                </Menu.Item>
                                <Menu.Item key={keys[7]}>
                                    {intl.get('RATE_94')}
                                </Menu.Item>
                                {/*<Menu.Item key={keys[2]}>
                                    {intl.get('RATE_62')}
                                </Menu.Item>*/}
                                {login && (
                                    <Menu.Item key={keys[3]}>
                                        {intl.get('RATE_63')}
                                    </Menu.Item>
                                )}
                            </Menu>
                        </div>

                        <div>
                            {login || (
                                <div
                                    className={`header-circle ${tab === keys[4] ? 'selected' : ''}`}
                                    onClick={() => this.onChange({ key: keys[4] })}
                                >
                                    {intl.get('RATE_64')}
                                </div>
                            )}
                            {login || (
                                <div
                                    className={`header-circle ${tab === keys[5] ? 'selected' : ''}`}
                                    onClick={() => this.onChange({ key: keys[5] })}
                                >
                                    {intl.get('RATE_65')}
                                </div>
                            )}
                            {login && (
                                <Popover
                                    trigger="hover"
                                    placement="bottom"
                                    content={(
                                        <div onClick={() => this.loginOut()} className="header-lang">
                                            {intl.get('RATE_71')}
                                        </div>
                                    )}
                                >
                                    <div className="header-lang">{userInfo.nickname}</div>
                                </Popover>
                            )}
                            <Popover
                                trigger="hover"
                                placement="bottom"
                                content={(
                                    <div className="flex-column-center">
                                        <div className="header-lang">{intl.get('RATE_113')}</div>
                                        {/*<img src={download.android} alt="" className="header-download" />*/}
                                        <img src={require("@/images/common/downloadCode.png")} alt="" className="header-download" />
                                        {/*<div id="invite-code"></div>*/}
                                    </div>
                                )}
                            >
                                <div className="header-item">{intl.get('RATE_114')}</div>
                            </Popover>
                            <div id="invite-code"></div>
                            <Popover
                                trigger="hover"
                                placement="bottom"
                                content={(
                                    <div className="flex-column-center">
                                        <div className="header-lang" onClick={() => this.setLang('zh')}>中文</div>
                                        <div className="header-line" />
                                        <div className="header-lang" onClick={() => this.setLang('zhTW')}>繁体中文</div>
                                        <div className="header-line" />
                                        <div className="header-lang" onClick={() => this.setLang('en')}>English</div>
                                    </div>
                                )}
                            >
                                <div className="flex-row" style={{ alignItems: 'center' }}>
                                    <div className="header-item">{lang[currentLocale]}</div>
                                    <img src={require('../../images/common/down.png')} alt="" className="header-img" />
                                </div>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="header-back" />
            </div>
        );
    }
}

export default connect(Header);
