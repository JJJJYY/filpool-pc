import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { Icon, Divider } from 'antd';

export default class Title extends PureComponent {
    render() {
        return (
            <div className="account-title">
                <div onClick={this.props.onClick}>
                    <Icon type="left" /> {intl.get('ACCOUNT_88')}
                </div>
                <Divider type="vertical" className="line" />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
