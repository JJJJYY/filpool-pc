import React, { Component } from "react";
import './index.less';

const images = {
    up: require('../../images/rate/up.png'),
    down: require('../../images/rate/down.png'),
}

/**
 * input输入框带加减功能
 * width/height 可自定义
 * 方法：onChange / onAdd / onSub
 */

export default class ChooseInput extends Component {
    render() {
        const isMobile = window.innerWidth <= 1080;
        return (
            <div className={'chooseInput'}>
                <input value={this.props.value} onChange={this.props.onChange} style={{width: this.props.width ? this.props.width : '2.83rem', height: this.props.height ? this.props.height : '.39rem'}}/>
                {
                    isMobile ? null
                    :
                    <div className={'flex-column imgs'} style={{left: this.props.left ? this.props.left : null, top: this.props.top ? this.props.top : null}}>
                        <img src={images.up} alt="" className={'img'} onClick={this.props.onAdd}/>
                        <img src={images.up} alt="" className={'img mt-5'} onClick={this.props.onSub} style={{transform: 'rotate(180deg)'}}/>
                    </div>
                }
                <span className={'unit'}>{this.props.unit ? this.props.unit : ''}</span>
            </div>
        )
    }
}
