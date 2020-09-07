import React, { Component } from "react";
import './menu.less';


/**
 * tab选择
 * selected 为true 显示橙色
 * 
 */

export default class MenuItem extends Component {
    render() {
        return (
            <div className={'Menu'} onClick={this.props.onClick}>
                {
                    this.props.selected ?
                    <div className={'flex-column'}>
                        <p className={'p2'}>{this.props.content}</p>
                        <div className={'line'}></div>
                    </div>
                    :
                    <p className={'p1'}>{this.props.content}</p>
                }
            </div>
        )
    }
}
