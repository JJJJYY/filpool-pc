import React, { Component } from "react";
import './index.less';
import intl from 'react-intl-universal';

/**
 * 订单页面进度条
 * props: step
 * 不填默认 step = 1
 */

export default class  Progress extends Component {

    renderCell(step,content,sec){
        //const mobile = window.innerWidth <= 1080
        const mobile = false;
        if(mobile){
            return(
                <div key={step}>
                    {
                        sec ?
                            <div className={'flex-column'} style={{position: 'relative'}}>
                                <div className={'flex-row'} style={{alignItems: 'center'}}>
                                    <div className={'ball-sec-h5'}>{step}</div>
                                    { [0,1,2,3,4,5].map((item,index) => {
                                        if(step === 4) return;
                                        return <div className={'line-sec-h5'} key={index}></div>
                                    })}
                                </div>
                                <span className={'p1-h5'}>{content}</span>
                            </div>
                            :
                            <div className={'flex-column'} style={{position: 'relative'}}>
                                <div className={'flex-row'} style={{alignItems: 'center'}}>
                                    <div className={'ball-h5'}>{step}</div>
                                    { [0,1,2,3,4,5].map((item,index) => {
                                        if(step === 4) return;
                                        return <div className={'line-h5'} key={index}></div>
                                    })}
                                </div>
                                <span className={'p2-h5'}>{content}</span>
                            </div>
                    }
                </div>
            )
        }
        return(
            <div key={step}>
                {
                    sec ?
                        <div className={'flex-row'} style={{alignItems: 'center'}}>
                            <div className={'ball-sec'}>{step}</div>
                            <span className={'p1'}>{content}</span>
                            { [0,1,2,3,4,5,6,7,8,9,10].map((item,index) => {
                                if(step === this.props.step.length) return;
                                return <div className={step <= this.props.activeIndex?'line-sec':'line'} key={index}></div>
                            })}
                        </div>
                        :
                        <div className={'flex-row'} style={{alignItems: 'center'}}>
                            <div className={'ball'}>{step}</div>
                            <span className={'p2'}>{content}</span>
                            { [0,1,2,3,4,5,6,7,8,9,10].map((item,index) => {
                                if(step === this.props.step.length) return;
                                return <div className={step <= this.props.activeIndex?'line-sec':'line'} key={index}></div>
                            })}
                        </div>
                }
            </div>
        )
    }

    render() {
        const step = this.props.step ? this.props.step : [1,0,0,0];
        return (
            <div className={'component-progress'}>
                {
                    step.map((item, index) => {
                        return (
                            this.renderCell(index + 1,item.label,this.props.activeIndex >= index)
                        )
                    })
                }
            </div>
        )
    }
}
