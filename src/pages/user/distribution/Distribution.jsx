import React, { Component } from 'react';
import intl from 'react-intl-universal';
import '../account/index.less';
import './index.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    message, Icon, Popover, Modal,
} from 'antd';
import net from '../../../net';
import InviteRecords from './InviteRecords';
import OrderRecords from './OrderRecords';
import { Input, Button } from '../../../components';
import { domin } from '../../../config';

const images = {
    '-1': require('../../../images/distribution/level1.png'),
    0: require('../../../images/distribution/level1.png'),
    1: require('../../../images/distribution/level2.png'),
    2: require('../../../images/distribution/level3.png'),
    3: require('../../../images/distribution/level4.png'),
    4: require('../../../images/distribution/level5.png'),
    5: require('../../../images/distribution/level5.png'),
    next: require('../../../images/distribution/next.png'),
    lock: require('../../../images/distribution/lock.png'),
};

class Distribution extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLevel: { value5: 0 },
            filpReward: 0,
            invitationCode: '',
            inviteCount: 0,
            maxLevel: {},
            purchaseCount: 0,
            totalPurchase: 0,
            usdtReward: 0,
            tab: 0,
            invitationImage: '',
            visible: false,
        };
    }

    componentDidMount() {
        console.log(123)
        net.getWeightDetail().then((res) => {
            if (res.ret === 200) {
                this.setState(res.data);
            }
        });

        net.getLevelRule().then((res) => {
            if (res.responseCode === '00') {
                this.setState({ rule: res.content });
            }
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    renderLevelItem(data, type) {
        const { value1, value5, value6 } = data;
        let text = '';
        switch (value5) {
            case '-1':
                text = intl.get('ACCOUNT_152');
                break;
            case '1':
                text = intl.get('ACCOUNT_104');
                break;
            case '2':
                text = intl.get('ACCOUNT_105');
                break;
            case '3':
                text = intl.get('ACCOUNT_106');
                break;
            case '4':
                text = intl.get('ACCOUNT_107');
                break;
            case '5':
                text = intl.get('ACCOUNT_153');
                break;
            default:
                text = intl.get('ACCOUNT_108');
        }
        if (type === 2) text = intl.get('ACCOUNT_109');
        return (
            <div className={`level back${value5}`}>
                {type === 2 ? null : (
                    <div className={`right-top ${type === 0 && 'active'}`} />
                )}

                <div className="flex-column-center">
                    <img src={type ? type === 1 ? images.next : images.lock : images[data.value5]} alt="" />

                    <div className="mt-10">{text}</div>
                </div>

                {type === 1 ? (
                    <div className="sub-font-color ft-9 mt-10">
                        {intl.get('ACCOUNT_138')}
                        <span className="primary-color">{this.state.totalPurchase}</span>
                        /
                        {value1}
                    </div>
                ) : null}

                {type === 0 ? (
                    <div className="sub-font-color ft-9 mt-10">
                        {intl.get('ACCOUNT_141')}
                        {text}
                    </div>
                ) : null}
                {type === 1 ? (
                    <div className="sub-font-color ft-9 mt-10" style={{ lineHeight: '.15rem' }}>
                        <p>
                            {intl.get('ACCOUNT_116')}
:
                        </p>
                        <p>{intl.get('ACCOUNT_139', { value6 })}</p>
                        <p>{intl.get('ACCOUNT_140', { value1 })}</p>
                    </div>
                ) : null}
            </div>
        );
    }

    renderLevel() {
        const { currentLevel, maxLevel, nextLevel } = this.state;

        return (
            <div className="flex-row-between">
                {this.renderLevelItem(currentLevel, 0)}
                {nextLevel && this.renderLevelItem(nextLevel, 1)}
                {(nextLevel && nextLevel.value5 < maxLevel.value5) && this.renderLevelItem(maxLevel, 2)}
            </div>
        );
    }

    render() {
        const { tab } = this.state;
        const url = `${domin}#/register/${this.state.invitationCode}`;
        return (
            <div className="account">
                <div>
                    <div>
                        <div className="sub-font-color">{intl.get('ACCOUNT_110')}</div>
                        <div className="flex-row">
                            <Input
                                value={url}
                                disabled
                                right={(
                                    <div style={{ marginRight: '-0.15rem' }}>
                                        <CopyToClipboard
                                            text={url}
                                            onCopy={() => message.info(intl.get('ACCOUNT_57'))}
                                        >
                                            <Button
                                                type="square"
                                                style={{ width: '.5rem' }}
                                            >
                                                {intl.get('ACCOUNT_111')}
                                            </Button>
                                        </CopyToClipboard>
                                    </div>
                                )}
                            />
                            <Button
                                onClick={() => this.setState({ visible: true })}
                                type="square"
                                style={{ width: '1.2rem', marginTop: '.1rem', marginLeft: '.15rem' }}
                            >
                                {intl.get('ACCOUNT_112')}
                            </Button>
                        </div>
                    </div>
                    <div className="item">
                        <div>{intl.get('ACCOUNT_113')}</div>
                        <div>
                            {intl.getHTML('ACCOUNT_114', {
                                inviteCount: this.state.inviteCount,
                                purchaseCount: this.state.purchaseCount,
                                filpReward: this.state.filpReward,
                                usdtReward: this.state.usdtReward,
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <div className="flex-row-start">
                            {intl.get('ACCOUNT_115')}
                            <Popover
                                placement="right"
                                content={(
                                    <div
                                        style={{ lineHeight: '.2rem' }}
                                        dangerouslySetInnerHTML={{
                                            __html: this.state.rule,
                                        }}
                                    />
                                )}
                            >
                                <Icon type="info-circle" className="ml-5" />
                            </Popover>
                        </div>
                        <div>{this.renderLevel()}</div>
                    </div>
                </div>
                <div className="order" style={{ padding: 0 }}>
                    <div className="flex-row-between">
                        <div className="order-filter">
                            <ul style={{ padding: 0 }}>
                                <li
                                    className={tab === 0 ? 'active' : ''}
                                    onClick={() => this.setState({ tab: 0 })}
                                >
                                    {intl.get('ACCOUNT_117')}
                                </li>
                                <li
                                    className={tab === 1 ? 'active' : ''}
                                    onClick={() => this.setState({ tab: 1 })}
                                >
                                    {intl.get('ACCOUNT_118')}
                                </li>
                            </ul>
                        </div>
                        <div
                            className="light-font-color ft-11"
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.props.history.push('/user/distribution/detail')}
                        >
                            {intl.get('ACCOUNT_119')}
                            <Icon type="right" className="ml-5" />
                        </div>
                    </div>
                    {tab === 0 && <InviteRecords />}
                    {tab === 1 && <OrderRecords />}
                </div>

                <Modal
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                >
                    <div className="flex-column-center">
                        <img src={this.state.invitationImage} style={{ height: '60vh', width: 'auto' }} alt="" />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Distribution;
