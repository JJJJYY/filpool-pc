import React, { Component } from "react";
import { Modal } from 'antd';
import { Input } from '../../../components';
import intl from 'react-intl-universal';


 const cancel = require('../../../images/rate/quit.png');

export default class PayModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.payVisible}
                footer={null}
                closable={false}
                width={'4.58rem'}
                className={this.props.className ? this.props.className : null}
            >
                <div className={'modal'}>
                    <div className={'flex-row-end'}>
                        <img src={cancel} alt="" className={'img'} onClick={this.props.onCancel}/>
                    </div>
                    <div className={'flex-column-center'}>
                        <Input.Password
                            label={intl.get('RATE_42')}
                            value={this.props.value}
                            maxLength={17}
                            onChange={(v) =>this.props.onChange(v)}
                            onError={()=>{}}
                            error={''}
                        />
                        <button className={'btn mt-15'} onClick={this.props.onConfirm}>{intl.get('RATE_41')}</button>
                    </div>
                </div>
            </Modal>
        )
    }
}
