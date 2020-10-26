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
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
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

    render() {
        const { userInfo } = this.props.redux;

        if (!userInfo.phone && !userInfo.email) {
            return (
                <div className="account">
                    <Skeleton active />
                </div>
            );
        }

        return (
            <div className="account">
                {/*<div className="item">
                    <div>{intl.get('ACCOUNT_1')}</div>
                    <div>
                        {`${this.state.totalWeight} GB`}
                    </div>
                </div>*/}

                <div className="item">
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
            </div>
        );
    }
}

export default connect(Account);
