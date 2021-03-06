import React, { Component } from 'react';
import intl from 'react-intl-universal';
import '../account/index.less';
import './index.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    message, Icon, Popover,
} from 'antd';
import { Modal } from 'antd-mobile';
import net from '../../../net';
import InviteRecords from './InviteRecords';
import OrderRecords from './OrderRecords';
import { Input, Header, Button } from '../../../components';
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

        const right = () => {
            switch (type) {
            case 0:
                return (
                    <div className="sub-font-color ft6" style={{ width: '42vw' }}>
                        {intl.get('ACCOUNT_141')}
                        {text}
                    </div>
                );
            case 1:
                return (
                    <div className="sub-font-color ft6" style={{ width: '42vw' }}>
                        <p>
                            {intl.get('ACCOUNT_116')}
:
                        </p>
                        <p>{intl.get('ACCOUNT_139', { value6 })}</p>
                        <p>{intl.get('ACCOUNT_140', { value1 })}</p>
                    </div>
                );
            case 2:
                return (
                    <div className="sub-font-color ft6" style={{ width: '42vw' }}>
                        {intl.get('ACCOUNT_109')}
                    </div>
                );
            default:
                return null;
            }
        };
        return (
            <div className={`level-h5 back${value5}`}>
                {type === 2 ? null : (
                    <div className={`right-top ${type === 0 && 'active'}`} />
                )}

                <div className="flex-column-between" style={{ width: '40vw' }}>
                    <img src={type ? type === 1 ? images.next : images.lock : images[data.value5]} alt="" />

                    <div className="mt-5">{text}</div>

                    {type === 1 ? (
                        <div className="sub-font-color ft6">
                            {intl.get('ACCOUNT_138')}
                            <span className="primary-color">{this.state.totalPurchase}</span>
                            /
                            {value1}
                        </div>
                    ) : null}
                </div>

                {right()}
            </div>
        );
    }

    renderLevel() {
        const { currentLevel, maxLevel, nextLevel } = this.state;

        return (
            <div>
                {this.renderLevelItem(currentLevel, 0)}
                {nextLevel && this.renderLevelItem(nextLevel, 1)}
                {(nextLevel && nextLevel.value5 < maxLevel.value5) && this.renderLevelItem(maxLevel, 2) }
            </div>
        );
    }

    render() {
        const { tab } = this.state;
        const url = `${domin}#/register/${this.state.invitationCode}`;
        return (
            <div className="bg-h5 account-h5">
                <Header
                    title={intl.get('USER_4')}
                    left={this.props.history.goBack}
                />

                <div className="form">
                    <div>
                        <div>{intl.get('ACCOUNT_131')}</div>
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
                        <Button type="mobile" onClick={() => this.setState({ visible: true })}>
                            {intl.get('ACCOUNT_112')}
                        </Button>
                    </div>
                    <div className="flex-column-center">
                        <div className="title">{intl.get('ACCOUNT_113')}</div>
                        <div style={{ height: '6vw' }}>
                            {intl.getHTML('ACCOUNT_114', {
                                inviteCount: this.state.inviteCount,
                                purchaseCount: this.state.purchaseCount,
                                filpReward: this.state.filpReward,
                                usdtReward: this.state.usdtReward,
                            })}
                        </div>
                    </div>
                    <div className="flex-column-center">
                        <div className="title">
                            {intl.get('ACCOUNT_115')}
                            <Popover
                                content={(
                                    <div
                                        style={{ lineHeight: '5vw' }}
                                        dangerouslySetInnerHTML={{
                                            __html: this.state.rule,
                                        }}
                                    />
                                )}
                            >
                                <Icon type="info-circle" className="ml-5 light-font-color" />
                            </Popover>
                        </div>
                        <div style={{ width: '100%' }}>{this.renderLevel()}</div>
                    </div>

                    <div className="order mt-20" style={{ padding: 0 }}>
                        <div className="ope-h5-tabs">
                            <a
                                className={tab === 0 ? 'active' : ''}
                                onClick={() => this.setState({ tab: 0 })}
                            >
                                {intl.get('ACCOUNT_117')}
                            </a>
                            <a
                                className={tab === 1 ? 'active' : ''}
                                onClick={() => this.setState({ tab: 1 })}
                            >
                                {intl.get('ACCOUNT_118')}
                            </a>
                        </div>
                        {tab === 0 && <InviteRecords />}
                        {tab === 1 && <OrderRecords />}
                        <div className="flex-row-end">
                            <div
                                className="light-font-color ft-11"
                                onClick={() => this.props.history.push('/user/distribution/detail')}
                            >
                                {intl.get('ACCOUNT_119')}
                                <Icon type="right" className="ml-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    visible={this.state.visible}
                    onClose={() => this.setState({ visible: false })}
                    transparent
                >
                    <div className="flex-column-center">
                        <img src={this.state.invitationImage} style={{ height: 'auto', width: '100%' }} alt="" />
                        {
                            (window.plus && window.plus.webview) ? (
                                <Button
                                    onClick={() => {
                                        window.plus.gallery.save(this.state.invitationImage, () => {
                                            message.success(intl.get('ACCOUNT_151'));
                                        }, e => console.log(JSON.stringify(e)));
                                    }}
                                >
                                    {intl.get('ACCOUNT_150')}
                                </Button>
                            ) : null
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Distribution;
