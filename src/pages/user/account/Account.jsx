import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Skeleton, Modal } from 'antd';
import { Button } from '../../../components';
import './index.less';
import styles from '../index.module.less';
import connect from '../../../store/connect';
import net from '../../../net';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalWeight: 0,
        };

        this.bindGa = this.bindGa.bind(this);
        this.goPath = this.goPath.bind(this);
    }

    componentDidMount() {
        net.getMyWeight({
            type: 0,
        }).then((res) => {
            if (res.ret === 200) {
                this.setState(res.data);
            }
        });
    }
    bindGa() {
        const { history } = this.props;
        Modal.confirm({
            title: intl.get('ACCOUNT_135'),
            okText: intl.get('ACCOUNT_137'),
            cancelText: intl.get('ACCOUNT_136'),
            onOk() {
                history.push('/user/account/ga');
            },
            onCancel() { },
        });
    }

    goPath(path) {
        if (!sessionStorage.getItem("login")) {
            this.props.history.push('/login');
            return;
        }
        this.props.history.push(`/user/account/${path}`);
    }

    /*获取用户等级*/
    renderLevelItem(level) {
        let levelData = {
            text: '',
            image: ''
        };
        switch (level) {
            case -1:
                levelData.text = intl.get('ACCOUNT_152');
                levelData.image = require('../../../images/user/level-1.png');
                break;
            case 0:
                levelData.text = intl.get('ACCOUNT_108');
                levelData.image = require('../../../images/user/level-2.png');
                break;
            case 1:
                levelData.text = intl.get('ACCOUNT_104');
                levelData.image = require('../../../images/user/level-3.png');
                break;
            case 2:
                levelData.text = intl.get('ACCOUNT_105');
                levelData.image = require('../../../images/user/level-4.png');
                break;
            case 3:
                levelData.text = intl.get('ACCOUNT_106');
                levelData.image = require('../../../images/user/level-5.png');
                break;
            case 4:
                levelData.text = intl.get('ACCOUNT_107');
                levelData.image = require('../../../images/user/level-6.png');
                break;
            case 5:
                levelData.text = intl.get('ACCOUNT_153');
                levelData.image = require('../../../images/user/level-7.png');
                break;
            default:
                levelData.text = intl.get('ACCOUNT_152');
                levelData.image = require('../../../images/user/level-7.png');
        }
        return levelData;
    }

    render() {
        const { userInfo } = this.props.redux;

        if (!userInfo.phone && !userInfo.email) {
            return (
                <div className="account">
                    <Skeleton active />
                </div>
            );
        }
        console.log(this.props.redux)
        return (
            <div className="accountR">
                <div className="account">
                    <div className="account-userInfo">
                        <div className={styles.thisMiddleBox}>
                            <img src={require("@/images/common/logo.png")} style={{ width: "62px", height: '62px', marginRight: "22px", marginLeft: '35px' }} alt="" />
                            <div>
                                <div style={{ marginBottom: "8px" }}>
                                    <span className={styles.bold}>{this.props.redux.userInfo.nickname}</span>
                                    {/* <span className={styles.label}>{this.renderLevelItem(this.props.redux.userInfo.level)}</span> */}
                                </div>
                                <span style={{ fontSize: '20px' }}>UID:{this.props.redux.userInfo.id}</span>
                            </div>
                            <img src={require('../../../images/user/userbanner.png')} style={{ height: '100%' }} alt="" />
                        </div>
                        <div className={styles.accountUserLevel}>
                            <div className={styles.accountUserLevelCenter}>
                                <img src={this.renderLevelItem(this.props.redux.userInfo.level).image} style={{ width: '72px', height: '82px' }} alt="" />
                                <p className={styles.label}>{this.renderLevelItem(this.props.redux.userInfo.level).text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="account-userInfo" style={{ marginTop: '16px' }}>
                        <div className={styles.accountPhone}>
                            <div className={styles.accountPhoneflex}>
                                <p className={styles.accountPhoneText}>绑定手机</p>
                                <button className={styles.accountPhoneButton}>修改手机</button>
                            </div>
                            <div className={styles.accountPhoneMargin}>登录、提现、修改安全设置</div>
                        </div>
                        <div className={styles.accountPhone} style={{ marginLeft: '13px' }}>
                            <div className={styles.accountPhoneflex}>
                                <p className={styles.accountPhoneText}>绑定手邮箱</p>
                                <button className={styles.accountPhoneButton}>修改邮箱</button>
                            </div>
                            <div className={styles.accountPhoneMargin}>登录、提现、修改安全设置</div>
                        </div>
                        <div className={styles.accountPassword}>
                            <div className={styles.accountPhoneflex}>
                                <p className={styles.accountPhoneText}>登录密码</p>
                                <button className={styles.accountPhoneButton}>修改密码</button>
                            </div>
                            <div className={styles.accountPhoneMargin}>登录账号时使用</div>
                        </div>
                    </div>
                    <div className="account-userInfo" style={{ marginTop: '16px' }}>
                        <div className={styles.accountVerification}>
                            <div>
                                <p className={styles.accountPhoneText}>资金密码</p>
                                <div className={styles.accountPhoneMargin}>提现、创造钱包时使用</div>
                            </div>
                            <img src={require('../../../images/user/userpassword.png')} style={{ width: '47px' }} alt="" />
                            <div>
                                <button className={styles.accountPhoneButton}>修改密码</button>
                            </div>
                        </div>
                        <div className={styles.accountVerification} style={{ marginLeft: '13px' }}>
                            <div>
                                <p className={styles.accountPhoneText}>谷歌验证</p>
                                <div className={styles.accountPhoneMargin}>提现、创造钱包时使用</div>
                            </div>
                            <img src={require('../../../images/user/userGoogle.png')} style={{ width: '47px' }} alt="" />
                            <div>
                                <button className={styles.accountPhoneButton}>设置</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="item">
                    <div>{intl.get('ACCOUNT_2')}</div>
                    <div>{intl.get('ACCOUNT_3')}</div>
                    <div className="primary-font-color">
                        {userInfo.phone}
                    </div>
                    <div className="ml-50">
                        <button className={styles.handleBtn}
                            onClick={() => this.goPath('phone')}
                        >
                            {intl.get('ACCOUNT_4')}
                        </button>
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_5')}</div>
                    <div>{intl.get('ACCOUNT_3')}</div>
                    <div className="primary-font-color">
                        {userInfo.email}
                    </div>
                    <div className="ml-50">
                        <button className={styles.handleBtn}
                            onClick={() => this.goPath(userInfo.email ? 'email' : 'bind_email')}
                        >
                            {intl.get(userInfo.email ? 'ACCOUNT_6' : 'ACCOUNT_7')}
                        </button>
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_8')}</div>
                    <div>{intl.get('ACCOUNT_9')}</div>
                    <div className="ml-50">
                        <button className={styles.handleBtn}
                            onClick={() => this.goPath('password')}
                        >
                            {intl.get('ACCOUNT_10')}
                        </button>
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_11')}</div>
                    <div>{intl.get('ACCOUNT_12')}</div>
                    <div className="ml-50">
                        {
                            userInfo.payPwd ? (
                                <button className={styles.handleBtn}
                                    onClick={userInfo.ga ? () => this.goPath('pay_pass') : this.bindGa}
                                >
                                    {intl.get('ACCOUNT_10')}
                                </button>
                            ) : (
                                    <button className={styles.handleBtn}
                                        onClick={userInfo.ga ? () => this.goPath('set_pay') : this.bindGa}
                                    >
                                        {intl.get('ACCOUNT_13')}
                                    </button>
                                )
                        }
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_14')}</div>
                    <div>{intl.get('ACCOUNT_12')}</div>
                    <div className="ml-50">
                        <button className={styles.handleBtn}
                            onClick={() => this.goPath(userInfo.ga ? 'modify_ga' : 'ga')}
                        >
                            {userInfo.ga ? intl.get('ACCOUNT_142') : intl.get('ACCOUNT_15')}
                        </button>
                    </div>
                </div>
                 */}
                </div>
                <div className={'imageAbsolute'}>
                    <img src={require('../../../images/user/level-1.png')} alt="" />
                    <img src={require('../../../images/user/level-2.png')} alt="" />
                    <img src={require('../../../images/user/level-3.png')} alt="" />
                    <img src={require('../../../images/user/level-4.png')} alt="" />
                    <img src={require('../../../images/user/level-5.png')} alt="" />
                    <img src={require('../../../images/user/level-6.png')} alt="" />
                    <img src={require('../../../images/user/level-7.png')} alt="" />
                </div>
            </div>
        );
    }
}

export default connect(Account);
