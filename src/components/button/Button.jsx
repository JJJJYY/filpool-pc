import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.less';

export default class Button extends Component {
    render() {
        const {
            type, loading, disabled, style, size,
        } = this.props;

        return (
            <div
                className={`button ${type || ''} ${size || ''} ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}
                style={style}
                onClick={this.props.onClick}
            >
                {loading ? (<Icon type="loading" className="mr-10" />) : null}
                {this.props.children}
            </div>
        );
    }
}
