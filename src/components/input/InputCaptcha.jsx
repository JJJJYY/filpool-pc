import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { message } from 'antd';
import inputUtil from './inputUtil';
import net from '../../net';
import Button from '../button';
import { delCookie, setCookie } from '@/util/brower';
import connect from '@/store/connect';

class InputCaptcha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 60,
            loading: false,
        };
        this.send = this.send.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    onChange(v) {
        const value = inputUtil.numberFilter(v.target.value);

        this.props.onError(value.length === 6 ? '' : intl.get('AUTH_RIGHT_CAPTCHA'));
        this.props.onChange(value);
    }

    send() {
        if (this.state.count < 60) return;

        this.setState({ loading: true });
        const {
            path, phone, areaCode, email, pathType,imageCaptcha
        } = this.props;
        let pms = null;
        const type = phone ? 'phone' : 'email';
        const to = phone ? phone : email;
        if (path === 'access') {
            let reqData = {
                to,
                areaCode,
                type,
                imageCaptcha
            };
            pms = net.postAccessSend(reqData);
        } else {
            pms = net.postSend({
                imageCaptcha,
                type: pathType,
            });
        }
        pms.then((res) => {
            if (res.ret === 200) {
                this.timer = setInterval(() => {
                    if (this.state.count > 0) {
                        this.setState(pre => ({ count: pre.count - 1 }));
                    } else {
                        clearInterval(this.timer);
                        this.setState({ count: 60 });
                    }
                }, 1000);
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 1000);
            } else {
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const {
            label, value, placeholder, error, h5,
        } = this.props;
        const { count, loading } = this.state;
        const pre = h5 ? 'input-h5' : 'input';
        return (
            <section className={pre}>
                <div className={`${pre}-label`}>
                    {label}
                </div>

                <div className={`${pre}-box`}>
                    <input
                        value={value}
                        type="text"
                        onChange={this.onChange}
                        placeholder={placeholder}
                        maxLength={6}
                        style={{height: "100%"}}
                    />

                    <div style={{ marginRight: h5 ? '-2.93vw' : '-0.15rem' }}>
                        <Button
                            onClick={this.send}
                            type="square"
                            loading={loading}
                            disabled={count < 60}
                            style={h5 ? { width: '30.9vw', height: '9.6vw', fontSize: '4vw', padding: '0 2vw' } : { width: '.9rem',height: '0.4rem' }}
                        >
                            {
                                count > 59
                                    ? intl.get('AUTH_GET_CAPTCHA')
                                    : intl.get('AUTH_GET_CAPTCHA_AGAIN', { count })
                            }
                        </Button>
                    </div>
                </div>

                <div className={`${pre}-error`}>
                    {error}
                </div>
            </section>
        );
    }
}

export default connect(InputCaptcha)
