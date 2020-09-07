import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import './index.less';

export default class Header extends PureComponent {
    render() {
        let headStyle = this.props.style || {};
        if (this.props.transparent) {
            headStyle.backgroundColor = "transparent";
        }
        return (
            <div className="header-auth" style={headStyle}>
                {
                    this.props.left ? (
                        <div className="header-auth-item" onClick={this.props.left}>
                            <Icon type="left" />
                        </div>
                    ) : (<div className="header-auth-item" />)
                }

                <div>{this.props.title}</div>

                {
                    this.props.right ? (
                        <div className="header-auth-item" style={{ textAlign: 'right' }}>
                            {this.props.right}
                        </div>
                    ) : (<div className="header-auth-item" />)
                }
            </div>
        );
    }
}
