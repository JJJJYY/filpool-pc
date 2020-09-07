import React, { PureComponent, Fragment } from 'react';
import { Popover } from 'antd';
import intl from 'react-intl-universal';
import Footer from '../../footer';

const img = {
    qr: require('../images/icon-qr.png'),
    qq: require('../images/icon-qq.png'),
    iwechat: require('../images/wechat.png'),
    iqq: require('../images/qq.png'),
}

export default class App extends PureComponent {
    render() {
        return (
            <Fragment>
                <div style={{ margin: '0px 0.9rem' }}>
                    <div className="help-main">
                        <div className="help-content">
                            <h5>{intl.get('USER_104')} <span>{intl.get('USER_105')}</span></h5>
                            <ul className="help-list h66">
                                <li>
                                    <h6>
                                        {intl.get('USER_106')}
                                        <Popover placement="left" content={(
                                            <img src={img.iwechat} style={{ height: '1rem' }} alt="" />
                                        )}>
                                            <a>
                                                <img src={img.qr} alt="" />
                                            </a>
                                        </Popover>
                                    </h6>
                                </li>
                                <li>
                                    <h6>
                                        {intl.get('USER_107')}
                                        <Popover placement="left" content={(
                                            <img src={img.iwechat} style={{ height: '1rem' }} alt="" />
                                        )}>
                                            <a>
                                                <img src={img.qr} alt="" />
                                            </a>
                                        </Popover>
                                    </h6>
                                </li>
                                <li>
                                    <h6>
                                        {intl.get('USER_108')}
                                        <Popover placement="left" content={(
                                            <img src={img.iqq} style={{ height: '1rem' }} alt="" />
                                        )}>
                                            <a>
                                                <img src={img.qq} alt="" />
                                            </a>
                                        </Popover>
                                    </h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"1.8rem"}}/>
                <Footer {...this.props} />
            </Fragment>
        );
    }
}
