import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Icon } from 'antd';
import inputUtil from './inputUtil';
import './index.less';
import styles from "./input.module.less";

export default class InputPass extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(v) {
        const { value } = v.target;
        this.props.onChange(value);

        // this.props.onError && this.props.onError(inputUtil.passCheck(value) ? '' : intl.get('AUTH_RIGHT_PASS'));

        this.props.onError && this.props.onError(value ? '' : intl.get('AUTH_RIGHT_PASS'));
    }

    render() {
        const {
            label, value, placeholder, maxLength, error, info, h5,icon
        } = this.props;
        const pre = h5 ? 'input-h5' : 'input';
        return (
            <div className={`${styles.inputContainer}`} style={{marginBottom: "30px"}}>
                {
                    icon?(
                        <div className={`${styles.iconBox}`}>
                            <span className={`${styles.iconfont} iconfont`} style={{color: icon.color}} dangerouslySetInnerHTML={{__html: icon.text}}></span>
                        </div>
                    ):null
                }
                <section className={pre}>
                    <div className={`${pre}-label`}>
                        {label}
                    </div>

                    <div className={`${pre}-box`}>
                        <input
                            value={value}
                            type="password"
                            autoComplete="new-password"
                            onChange={this.onChange}
                            placeholder={placeholder}
                            maxLength={maxLength || 17}
                        />
                    </div>

                    {/*{
                        info ? (
                            <div className={`${pre}-info`}>
                                <div
                                    className={value.length >= 6 && value.length <= 17 ? 'active' : ''}
                                >
                                    <Icon type="check-circle" />
                                    {intl.get('AUTH_PASS_RULE_1')}
                                </div>
                                <div className={inputUtil.passCheck(value) ? 'active' : ''}>
                                    <Icon type="check-circle" />
                                    {intl.get('AUTH_PASS_RULE_2')}
                                </div>
                            </div>
                        ) : (
                            <div className={`${pre}-error`}>
                                {error}
                            </div>
                        )
                    }*/}
                </section>
            </div>
        );
    }
}
