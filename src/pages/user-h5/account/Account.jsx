import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { Modal } from 'antd-mobile';
import connect from '../../../store/connect';
import net from '../../../net';
import { Header } from '../../../components';
import right from '../images/icon-extra.png';

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
        net.getMyWeight().then((res) => {
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
        Modal.alert(intl.get('ACCOUNT_135'), '', [
            { text: intl.get('ACCOUNT_136'), onPress: () => { } },
            { text: intl.get('ACCOUNT_137'), onPress: () => history.push('/user/account/ga') },
        ]);
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

        return (
            <div className="bg-h5 account-h5">
                <Header
                    title={intl.get('ACCOUNT_16')}
                    left={this.props.history.goBack}
                />

                <div className="item">
                    <div>{intl.get('ACCOUNT_1')}</div>
                    <div>
                        {`${this.state.totalWeight} GB`}
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_2')}</div>
                    <div onClick={() => this.goPath('phone')}>
                        {intl.get('ACCOUNT_4')}
                        <img
                            src={right}
                            alt=""
                            className="ml-10"
                        />
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_7')}</div>
                    <div onClick={() => this.goPath(userInfo.email ? 'email' : 'bind_email')}>
                        {intl.get(userInfo.email ? 'ACCOUNT_6' : 'ACCOUNT_7')}
                        <img
                            src={right}
                            alt=""
                            className="ml-10"
                        />
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_8')}</div>
                    <div onClick={() => this.goPath('password')}>
                        {intl.get('ACCOUNT_10')}
                        <img
                            src={right}
                            alt=""
                            className="ml-10"
                        />
                    </div>
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_11')}</div>
                    {
                        userInfo.payPwd ? (
                            <div onClick={userInfo.ga ? () => this.goPath('pay_pass') : this.bindGa}>
                                {intl.get('ACCOUNT_10')}
                                <img
                                    src={right}
                                    alt=""
                                    className="ml-10"
                                />
                            </div>
                        ) : (
                                <div onClick={userInfo.ga ? () => this.goPath('set_pay') : this.bindGa}>
                                    {intl.get('ACCOUNT_13')}
                                    <img
                                        src={right}
                                        alt=""
                                        className="ml-10"
                                    />
                                </div>
                            )
                    }
                </div>

                <div className="item">
                    <div>{intl.get('ACCOUNT_14')}</div>

                    <div onClick={() => this.goPath(userInfo.ga ? 'modify_ga' : 'ga')}>
                        {userInfo.ga ? intl.get('ACCOUNT_142') : intl.get('ACCOUNT_15')}
                        <img
                            src={right}
                            alt=""
                            className="ml-10"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(Account);
