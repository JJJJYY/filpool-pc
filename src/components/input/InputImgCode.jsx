import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import styles from './input.module.less'
import inputUtil from './inputUtil';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgURL: props.imgURL
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(v) {
        let error = '';
        let { value } = v.target;
        switch (this.props.type) {
            case 'account':
                if (!(inputUtil.emailCheck(value) || inputUtil.phoneCheck(value))) {
                    error = intl.get('AUTH_RIGHT_ACCOUNT');
                }
                break;
            case 'phone':
                value = inputUtil.numberFilter(value);
                if (!inputUtil.phoneCheck(value)) {
                    error = intl.get('AUTH_RIGHT_PHONE');
                }
                break;
            case 'email':
                if (!inputUtil.emailCheck(value)) {
                    error = intl.get('AUTH_RIGHT_EMAIL');
                }
                break;
            case 'ga':
                if (!inputUtil.num6Check(value)) {
                    error = intl.get('AUTH_RIGHT_GA');
                }
                break;
            default:
                this.props.onChange(value);
                break;
        }

        this.props.onError && this.props.onError(error);
        this.props.onChange(value);
    }

    changeCode () {
        this.setState({
            imgURL: `${this.props.imgURL}?v=${Math.random()}`
        })
    }

    render() {
        const {
            label, value, placeholder, maxLength, error, disabled, h5, icon
        } = this.props;
        const pre = h5 ? 'input-h5' : 'input';
        return (
            <div className={`${styles.inputContainer}`}>
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


                    <div className={'flex-row-center'}>
                        <div className={`${pre}-box`}>
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
                        <img src={this.state.imgURL} style={{height: "40px",marginLeft: "10px", cursor: "pointer"}} onClick={() => {this.changeCode()}} alt="" />
                    </div>

                    <div className={`${pre}-error`}>
                        {error}
                    </div>
                </section>
            </div>
        );
    }
}
