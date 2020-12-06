// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { Component } from 'react';
// import { Modal, Toast } from 'antd-mobile';
// import Header from '../header';
// import connect from '../../store/connect';
// import setLanguage from '../../locales/setLanguage';
// import net from '../../net';
// import intl from 'react-intl-universal';

// import './index.less';

// const imgs = {
//     extra: require('./images/icon-extra.png'),
//     eye: require('./images/icon-eye.png'),
//     icon_t1: require('./images/icon-t1.png'),
//     icon_t2: require('./images/icon-t2.png'),
//     icon_t3: require('./images/icon-t3.png'),
//     icon_t4: require('./images/icon-t4.png'),
//     icon_t5: require('./images/icon-t5.png'),
//     icon_t6: require('./images/icon-t6.png'),
//     icon_t7: require('./images/icon-t7.png'),
//     icon_t8: require('./images/icon-t8.png'),
// };

// class App extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             totalWeight: 0
//         };
//     }

//     componentDidMount() {
//         net.getMyWeight().then((res) => {
//             if (res.ret === 200) {
//                 this.setState({ totalWeight: res.data.totalWeight });
//             }
//         });
//     }
//     componentWillUnmount = () => {
//         this.setState = (state, callback) => {
//             return;
//         };
//     }
//     renderItem(path, text, img) {
//         return (
//             <li>
//                 <a onClick={() => typeof path === 'string' ? this.props.history.push(path) : path()}>
//                     <img src={imgs[img]} alt="" />
//                     <span>{text}</span>
//                     <img src={imgs.extra} alt="" />
//                 </a>
//             </li>
//         );
//     }

//     setLang(currentLocale) {
//         if (currentLocale !== 'zh' && currentLocale !== 'en' && currentLocale !== 'zhTW') currentLocale = 'zh';
//         localStorage.setItem('lang', currentLocale);
//         setLanguage(currentLocale).then(() => {
//             window.location.reload();
//         });
//     }

//     loginOut() {
//         net.getLogout().then(res => {
//             if (res.ret === 200) {
//                 this.props.setUserInfo({});
//                 this.props.setLogin(false);
//                 sessionStorage.removeItem('login')
//                 Toast.success(intl.get('RATE_72'), 1, () => { }, false);
//             } else {
//                 this.props.setUserInfo({});
//                 this.props.setLogin(false);
//                 sessionStorage.removeItem('login')
//                 Toast.fail(intl.get(res.responseCode));
//             }
//         });
//     }

//     render() {
//         const { login, userInfo } = this.props.redux;
//         if (!login) {
//             return (
//                 <div className="user-h5">
//                     <Header
//                         title={intl.get('RATE_63')}
//                     />
//                     <div className="user-h5-main" style={{ marginTop: '4vw' }}>
//                         <div className="user-h5-main-info-1" style={{ borderBottom: 'none' }} onClick={() => this.props.history.push('/login')}>
//                             <div />
//                             <p>{intl.get('RATE_7')}</p>
//                             {/* <img src={imgs.eye} alt="" /> */}
//                         </div>
//                     </div>
//                     <ul className="user-h5-ul">
//                         {this.renderItem('/article/service', intl.get('USER_116'), 'icon_t6')}
//                         {this.renderItem('/article/about', intl.get('USER_117'), 'icon_t7')}
//                         {this.renderItem(() => this.setState({ lang: true }), intl.get('USER_118'), 'icon_t8')}
//                     </ul>
//                     <Modal
//                         transparent
//                         popup
//                         animationType="slide-up"
//                         visible={this.state.lang}
//                         maskClosable={true}
//                         onClose={() => this.setState({ lang: false })}
//                     >
//                         <div className="user-lang">
//                             <a onClick={() => this.setLang('zh')}>简体中文</a>
//                             <a onClick={() => this.setLang('zhTW')}>繁体中文</a>
//                             <a onClick={() => this.setLang('en')}>English</a>
//                             <a onClick={() => this.setState({ lang: false })} style={{ borderTop: '1px solid #EAF2F9' }}>{intl.get('USER_9')}</a>
//                         </div>
//                     </Modal>
//                 </div>
//             );
//         }
//         return (
//             <div className="user-h5">
//                 <Header
//                     logo={true}
//                     left={() => this.props.history.push('home')}
//                     rightText={userInfo.nickname}
//                 />
//                 <div className="user-h5-main" style={{ marginTop: '4vw' }}>
//                     <div className="user-h5-main-info-1">
//                         <div />
//                         <p>{userInfo.nickname}</p>
//                         {/* <img src={imgs.eye} alt="" /> */}
//                     </div>
//                     <div className="user-h5-main-info-2">
//                         <span>{intl.get('ACCOUNT_1')}</span>
//                         <span>{this.state.totalWeight}GB</span>
//                     </div>
//                 </div>
//                 <ul className="user-h5-ul">
//                     {this.renderItem('/user/account', intl.get('USER_1'), 'icon_t1')}
//                     {this.renderItem('/user/order', intl.get('USER_2'), 'icon_t2')}
//                     {this.renderItem('/user/rate', intl.get('USER_3'), 'icon_t3')}
//                     {this.renderItem('/user/distribution', intl.get('USER_4'), 'icon_t4')}
//                     {this.renderItem('/user/asset/index2', intl.get('USER_5'), 'icon_t5')}
//                     {this.renderItem('/article/service', intl.get('USER_116'), 'icon_t6')}
//                     {this.renderItem('/article/about', intl.get('USER_117'), 'icon_t7')}
//                     {this.renderItem(() => this.setState({ lang: true }), intl.get('USER_118'), 'icon_t8')}
//                 </ul>
//                 <a className="user-h5-logout" onClick={() => this.loginOut()}>{intl.get('RATE_71')}</a>
//                 <Modal
//                     transparent
//                     popup
//                     animationType="slide-up"
//                     visible={this.state.lang}
//                     maskClosable={true}
//                     onClose={() => this.setState({ lang: false })}
//                 >
//                     <div className="user-lang">
//                         <a onClick={() => this.setLang('zh')}>简体中文</a>
//                         <a onClick={() => this.setLang('zhTW')}>繁体中文</a>
//                         <a onClick={() => this.setLang('en')}>English</a>
//                         <a onClick={() => this.setState({ lang: false })} style={{ borderTop: '1px solid #EAF2F9' }}>{intl.get('USER_9')}</a>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default connect(App);
