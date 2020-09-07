import React, { Component } from 'react';
import intl from 'react-intl-universal';
import Modify from './Modify';

class ModifyPass extends Component {
    render() {
        return (
            <Modify
                history={this.props.history}
                type={0} // 0 - 登录密码，1 - 支付密码
                title={intl.get('ACCOUNT_70')}
            />
        );
    }
}

export default ModifyPass;
