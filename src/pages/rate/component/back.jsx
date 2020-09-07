import React, { Component } from "react";

/**
 * 返回上一级组件
 * props : text , onClick
 */

 const right = require('../../../images/rate/left.png');

export default class Back extends Component {
    render() {
        return (
            <div className={'flex-row'} onClick={this.props.onClick} style={{alignItems: 'center', cursor: 'pointer'}}>
                <img src={right} alt="" style={{width: '.06rem', height: '.1rem',marginRight: '.05rem'}}/>
                <div style={{color: '#959FA9', fontSize: '.12rem'}}>{this.props.text}</div>
            </div>
        )
    }
}
