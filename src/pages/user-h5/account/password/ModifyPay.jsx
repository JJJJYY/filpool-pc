import React, { Component } from 'react';
import intl from 'react-intl-universal';
import Modify from './Modify';

class ModifyPay extends Component {
    render() {
        return (
            <Modify
                history={this.props.history}
                type={1} // 0 - 登录密码，1 - 支付密码
                title={intl.get('ACCOUNT_71')}
            />
        );
    }
}

export default ModifyPay;
