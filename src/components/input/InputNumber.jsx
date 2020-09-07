import React, { Component }  from 'react';
import styles  from './inputNumber.module.less';
import {message} from "antd";
import intl from "react-intl-universal";

export default class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.defalutStyle = {
            height: "40px"
        }
    }

    onchange (event) {
        if (event.target.value > 100000) {
            message.info(intl.get("RATE_112"));
            return;
        }
        this.props.onChange(event, event.target.value);
    }

    add () {
        if (this.props.value >= 100000) {
            message.info(intl.get("RATE_112"));
            return;
        }
        this.props.onAdd();
    }

    sub () {
        this.props.onSub();
    }
    render() {
        const {value} = this.state;
        let style = Object.assign(this.defalutStyle, this.props.style);

        return (
            <div className={styles.container} style={style}>
                <button className={styles.button} onClick={() => {this.sub()}}>
                    <span>-</span>
                </button>
                <input type="text" className={styles.input} min={0} value={this.props.value}
                       onChange={(event) => {this.onchange(event)}}/>
                <button className={styles.button} onClick={() => {this.add()}}>+</button>
            </div>
        )
    }
}