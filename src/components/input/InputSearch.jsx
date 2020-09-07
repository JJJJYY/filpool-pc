import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.less';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(v) {
        const { value } = v.target;
        this.props.onChange(value);
    }

    render() {
        const {
            value, placeholder, maxLength, disabled, h5,
        } = this.props;
        const pre = h5 ? 'input-h5' : 'input';
        return (
            <section className={pre}>
                <div className={`${pre}-box`}>
                    <Icon type="search" className="mr-5 light-font-color" />
                    <input
                        value={value}
                        type="text"
                        onChange={this.onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        disabled={disabled}
                    />
                    {
                        this.props.right ? this.props.right : null
                    }
                </div>
            </section>
        );
    }
}
