import React, { Component } from "react";
import { Modal } from 'antd';
import intl from 'react-intl-universal';


 const cancel = require('@/images/common/close-min.png');

export default class CancelModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.cacelVisible}
                footer={null}
                closable={false}
                width={'4.58rem'}
                className={this.props.className ? this.props.className : null}
            >
                <div className={'modal'}>
                    <div className={'flex-row-end'}>
                        <img src={cancel} alt="" className={'img'} onClick={this.props.onCancel} title={intl.get('AUTH_CLOSE')} style={{cursor: "pointer"}} />
                    </div>
                    <div className={'flex-column-center'}>
                        <div className={'p1 mt-40'}>{this.props.content}</div>
                        <button className={'btn mt-35'} onClick={this.props.onConfirm}>{this.props.set ?  intl.get('RATE_83') :intl.get('RATE_20')}</button>
                    </div>
                </div>
            </Modal>
        )
    }
}
