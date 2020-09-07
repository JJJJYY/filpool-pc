import React, { Component } from "react";
import { Modal } from 'antd';
import { Input } from '../../../components';
import intl from 'react-intl-universal';


 const cancel = require('../../../images/rate/quit.png');

export default class LoginModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.visible}
                footer={null}
                closable={false}
                width={'4.58rem'}
            >
                <div className={'modal'}>
                    <div className={'flex-row-end'}>
                        <img src={cancel} alt="" className={'img'} onClick={this.props.onCancel}/>
                    </div>
                    <div className={'flex-column-center'}>
                        <Input
                            label={intl.get('RATE_36')}
                            value={this.props.account}
                            type={'account'}
                            placeholder=""
                            onChange={v => this.props.loginChange('account', v)}
                            onError={()=>{}}
                        />
                        <Input.Password
                            label={intl.get('RATE_37')}
                            value={this.props.password}
                            maxLength={17}
                            onChange={v => this.props.loginChange('password', v)}
                            onError={()=>{}}
                            error={''}
                        />
                        <div className={'flex-row-between'} style={{width: '3rem', marginTop: '-.22rem'}}>
                            <a className={'p3'} href={'/#/register'}>{intl.get('RATE_38')}<span className={'p4'}>{intl.get('RATE_39')}</span></a>
                            <a className={'p4'} href={'/#/reset'}>{intl.get('RATE_40')}</a>
                        </div>
                        <button className={'btn mt-35'} onClick={this.props.onConfirm}>{intl.get('RATE_41')}</button>
                    </div>
                </div>
            </Modal>
        )
    }
}
