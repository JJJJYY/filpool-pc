import React, { Component } from 'react';
import intl from 'react-intl-universal';
import styles from './invite.module.less';
import Clipboard from 'clipboard';
import { message } from 'antd';
import Foot from '@/pages/footer/index';
import net from '@/net/index';
import { domin } from "@/config";
import connect from '@/store/connect';

class Invite extends Component {
    constructor(props) {
        super(props);
        if (!sessionStorage.getItem("login")) {
            window.location.href = `/#/login`;
        }

        this.state = {
            showShareImg: false,
            inviteInfo: {},
            rewardInfo: {},
            recordIndex: 0,
            totalSize: 0,
            inviteRecord: [],
            awardList: [],
            inviteLink: "",
            inviteCode: ""
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard('.copy');
        this.clipboard.on('success', () => {
            message.success(intl.get("invite_31"))
        });

        this.clipboard2 = new Clipboard('.copy2');
        this.clipboard2.on('success', () => {
            message.success(intl.get("invite_31"))
        });
        /*我的邀请详情*/
        net.getWeightDetail().then((res) => {
            let resInfo = res.data || {};
            this.setState({
                inviteInfo: resInfo,
                inviteLink: `${domin}#/register/${resInfo.invitationCode}`,
                inviteCode: resInfo.invitationCode
            });
        });
        /*获取邀请记录*/
        net.getWeightInviteRecord().then((res) => {
            if (res.ret === 200) {
                this.setState({
                    inviteRecord: res.data instanceof Array ? res.data : []
                });
            }
        });
        /*推广奖励*/
        net.getWeightOrderRecord().then((res) => {
            if (res.ret === 200) {
                this.setState({
                    awardList: res.data instanceof Array ? res.data : []
                });
            }
        });
    }

    showShareBox() {
        this.setState({
            showShareImg: true
        });
        document.body.style.overflow = "hidden";
    }
    hideShareBox() {
        this.setState({
            showShareImg: false
        });
        document.body.style.overflow = "initial";
    }

    toggleRecord(index) {
        this.setState({
            recordIndex: index
        })
    }

    getContractText(round) {
        return round === 1 ? intl.get("ACCOUNT_157") : intl.get("ACCOUNT_158");
    }

    setInviteLink(event) {
        this.setState({
            inviteLink: event.target.value
        })
    }

    setInviteCode(event) {
        this.setState({
            inviteCode: event.target.value
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
        this.clipboard2.destroy();
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let { inviteInfo, rewardInfo, totalSize, recordIndex, inviteRecord, awardList, inviteLink, inviteCode } = this.state;
        return (
            <div className={styles.inviteContainer}>
                {/*banner*/}
                <div className={styles.bannerBox}>
                    <img src="http://filpool.oss-cn-hongkong.aliyuncs.com/image/invitation_banner.png" className={styles.bannerBgImg} alt="" />
                    <div className={styles.textBox}>
                        <span>{intl.get("invite_1")}</span>
                        <span className={styles.large}>{intl.get("invite_32")}</span>
                    </div>
                    <div className={styles.stepBox}>
                        <div className={styles.stepGroup}>
                            <div className={styles.left}>
                                <img src={require("@/images/invite/invitation_icon_send@2x.png")} className={styles.stepIcon} alt="" />
                                <p>{intl.get("invite_33")}</p>
                            </div>
                            <img src={require("@/images/invite/invitation_icon_arrow@2x.png")} style={{ marginRight: "100px" }} alt="" />
                        </div>
                        <div className={styles.stepGroup}>
                            <div className={styles.left}>
                                <img src={require("@/images/invite/invitation_icon_buy@2x.png")} className={styles.stepIcon} alt="" />
                                <p>{intl.get("invite_34")}</p>
                            </div>
                            <img src={require("@/images/invite/invitation_icon_arrow@2x.png")} style={{ marginRight: "100px" }} alt="" />
                        </div>
                        <div className={styles.stepGroup}>
                            <div className={styles.left}>
                                <img src={require("@/images/invite/invitation_icon_reward@2x.png")} className={styles.stepIcon} alt="" />
                                <p>{intl.get("invite_35")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*邀请信息*/}
                <div className={styles.inviteContent}>
                    <div className={styles.main} style={{ paddingRight: 0 }}>
                        <p className={styles.label}>{intl.get("invite_36")}</p>
                        <div className={`flex-row-start`}>
                            <div className={`flex-row-start ${styles.leftBox}`}>
                                <div style={{ flex: 1 }}>
                                    <p className={styles.inputLabel}>{intl.get("invite_37")}</p>
                                    <div className={`flex-row-start`}>
                                        <input type="text" className={styles.input} value={inviteLink} onChange={(event) => { this.setInviteLink(event) }} style={{ flex: 1 }} />
                                        <button className={`${styles.button} copy`} data-clipboard-text={inviteLink}>{intl.get("invite_38")}</button>
                                    </div>
                                </div>
                                <div style={{ marginLeft: "32px" }}>
                                    <p className={styles.inputLabel}>{intl.get("invite_39")}</p>
                                    <div className={`flex-row-start`}>
                                        <input type="text" className={styles.input} value={inviteCode} onChange={(event) => { this.setInviteCode(event) }} style={{ width: "150px" }} />
                                        <button className={`${styles.button} copy2`} data-clipboard-text={inviteCode}>{intl.get("invite_38")}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightBox}>
                                <div className={styles.rewordRow} style={{ marginBottom: "50px" }}>
                                    <div className={styles.rewordItem}>
                                        <p className={styles.rewordLabel}>{intl.get("invite_27")}</p>
                                        <p className={styles.rewordVal}>{inviteInfo.inviteCount}</p>
                                    </div>
                                    <div className={styles.rewordItem}>
                                        <p className={styles.rewordLabel}>{intl.get("invite_28")}</p>
                                        <p className={styles.rewordVal}>{inviteInfo.purchaseCount}</p>
                                    </div>
                                </div>
                                <div className={styles.rewordRow}>
                                    <div className={styles.rewordItem}>
                                        <p className={styles.rewordLabel}>{intl.get("invite_29")}(TB)</p>
                                        <p className={styles.rewordVal}>{inviteInfo.filpReward}</p>
                                    </div>
                                    <div className={styles.rewordItem}>
                                        <p className={styles.rewordLabel}>{intl.get("invite_30")}(USDT)</p>
                                        <p className={styles.rewordVal}>{inviteInfo.usdtReward}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*邀请记录*/}
                    <div className={styles.recordBox}>
                        {/*邀请记录tab*/}
                        <div className={styles.areaBox}>
                            <div className={`${styles.areaItem}`} onClick={() => { this.toggleRecord(0) }}>
                                {/*<p className={`${styles.area} areaValue`}>{totalSize} {intl.get("invite_20")}</p>*/}
                                <p className={`${styles.areaLabel} areaValue ${recordIndex === 0 ? styles.active : null}`}>{intl.get('invite_19')}</p>
                            </div>
                            <div className={`${styles.areaItem}`} onClick={() => { this.toggleRecord(1) }}>
                                {/*<p className={`${styles.area} areaValue`}>{rewardInfo.totalRevenue} USDT</p>*/}
                                <p className={`${styles.areaLabel} areaValue ${recordIndex === 1 ? styles.active : null}`}>{intl.get('invite_15')}</p>
                            </div>
                        </div>
                        {
                            recordIndex === 0 ? (
                                /*邀请记录*/
                                <div className={styles.inviteTable}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th className={styles.th} style={{ width: "25%", textAlign: "left" }}>{intl.get('invite_21')}</th>
                                                <th className={styles.th} style={{ width: "75%", textAlign: "left" }}>{intl.get('invite_22')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.tbody}>
                                            {
                                                inviteRecord.map((item, index) => {
                                                    return (
                                                        <tr key={index} className={styles.tr}>
                                                            <td className={styles.td} style={{ width: "25%", textAlign: "left" }}>{item.nickname}</td>
                                                            <td className={styles.td} style={{ textAlign: "left" }}>{item.createTime}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                    /*推广记录*/
                                    <div className={`${styles.inviteTable}`}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th className={styles.th} style={{ width: "120px" }}>{intl.get('invite_23')}</th>
                                                    <th className={styles.th}>{intl.get('invite_21')}</th>
                                                    <th className={styles.th}>{intl.get('invite_24')}</th>
                                                    <th className={styles.th}>{intl.get('invite_25')} (TB)</th>
                                                    <th className={styles.th}>{intl.get('invite_26')} (USDT)</th>
                                                </tr>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                {
                                                    awardList.map((item, index) => {
                                                        return (
                                                            <tr key={index} className={styles.tr}>
                                                                <td className={styles.td} style={{ width: "120px" }}>{item.round}</td>
                                                                <td className={styles.td}>{item.nickname}</td>
                                                                <td className={styles.td}>{item.createTime}</td>
                                                                <td className={styles.td}>{parseFloat(item.orderQuantity)}</td>
                                                                <td className={styles.td}>{parseFloat(item.rewardQuantity)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <Foot />
            </div>


            /*<div className={styles.inviteContainer}>
                <div className={styles.inviteContent}>
                    <div className={styles.headText}>
                        <p className={styles.title}>{intl.get('invite_2')}</p>
                        <p>{intl.get('invite_3')}</p>
                    </div>
                    <div className={styles.contentBox}>
                        <img src={require('@/images/invite/bg3.png')} className={styles.bgImg} alt="" style={{top: "-14px", left: "-180px"}} />
                        <img src={require('@/images/invite/bg1.png')} className={styles.bgImg} alt="" style={{top: "690px", right: "-368px"}} />
                        <img src={require('@/images/invite/bg4.png')} className={styles.bgImg} alt="" style={{bottom: "40px", left: "-100px", top: "auto"}} />
                        <div className={styles.content1}>
                            <div className={styles.contentTitle}>
                                <p className={styles.normal}>{intl.get('invite_4')}</p>
                                <p>{inviteInfo.invitationCode}</p>
                            </div>
                            <div className={styles.btnBox}>
                                <button className={`${styles.btn} copy`} data-clipboard-text={`${domin}#/register/${inviteInfo.invitationCode}`}>{intl.get('invite_5')}</button>
                                <button className={`${styles.btn} ${styles.inviteCode}`} onClick={() => {this.showShareBox()}}>{intl.get('invite_6')}</button>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.inviteFlow}>
                                <p className={styles.flowTitle}>{intl.get('invite_7')}</p>
                                <div className={styles.flowContainer}>
                                    <div className={styles.flowGroup}>
                                        <img className={styles.flowIcon} src={require('@/images/invite/invitation_icon_1@2x.png')}
                                             alt=""/>
                                        <div className={styles.flowText}>{intl.get('invite_8')}</div>
                                    </div>
                                    <img className={styles.arrow} src={require('@/images/invite/invitation_icon_4@2x.png')} alt=""/>
                                    <div className={styles.flowGroup}>
                                        <img className={styles.flowIcon} src={require('@/images/invite/invitation_icon_2@2x.png')}
                                             alt=""/>
                                        <div className={styles.flowText}>{intl.get('invite_9')}</div>
                                    </div>
                                    <img className={styles.arrow} src={require('@/images/invite/invitation_icon_4@2x.png')} alt=""/>
                                    <div className={styles.flowGroup}>
                                        <img className={styles.flowIcon} src={require('@/images/invite/invitation_icon_3@2x.png')}
                                             alt=""/>
                                        <div className={styles.flowText}>{intl.get('invite_10')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/!*邀请好友列表*!/}
                        <div className={styles.content2} ref="inviteContainer">
                            <h3 className={styles.title2}>{intl.get('invite_15')}</h3>
                            <div className={styles.amountBox}>
                                <div className={styles.amountItem}>
                                    <p className={styles.amount}>{inviteInfo.inviteCount} {intl.get('AUTH_PEOPLE')}</p>
                                    <p className={styles.amountExplain}>{intl.get('invite_27')}</p>
                                </div>
                                <div className={styles.amountItem}>
                                    <p className={styles.amount}>{inviteInfo.purchaseCount} {intl.get('AUTH_PEOPLE')}</p>
                                    <p className={styles.amountExplain}>{intl.get('invite_28')}</p>
                                </div>
                                <div className={styles.amountItem}>
                                    <p className={styles.amount}>{inviteInfo.filpReward} TB</p>
                                    <p className={styles.amountExplain}>{intl.get('invite_29')}</p>
                                </div>
                                <div className={styles.amountItem}>
                                    <p className={styles.amount}>{inviteInfo.usdtReward} USDT</p>
                                    <p className={styles.amountExplain}>{intl.get('invite_30')}</p>
                                </div>
                            </div>
                            <div className={styles.areaBox}>
                                <div className={`${styles.areaItem} ${recordIndex === 0 ? styles.active : null}`} onClick={() => {
                                    this.toggleRecord(0)
                                }}>
                                    {/!*<p className={`${styles.area} areaValue`}>{totalSize} {intl.get("invite_20")}</p>*!/}
                                    <p className={`${styles.areaLabel} areaValue`}>{intl.get('invite_19')}</p>
                                </div>
                                <div className={`${styles.areaItem} ${recordIndex === 1 ? styles.active : null}`} onClick={() => {
                                    this.toggleRecord(1)
                                }}>
                                    {/!*<p className={`${styles.area} areaValue`}>{rewardInfo.totalRevenue} USDT</p>*!/}
                                    <p className={`${styles.areaLabel} areaValue`}>{intl.get('invite_15')}</p>
                                </div>
                            </div>
                            {
                                recordIndex === 0 ? (
                                    /!*邀请记录*!/
                                    <div className={styles.inviteTable}>
                                        <table className={styles.table}>
                                            <tbody>
                                                <tr>
                                                    <th className={styles.th} style={{width: "35%"}}>{intl.get('invite_21')}</th>
                                                    <th className={styles.th} style={{width: "65%"}}>{intl.get('invite_22')}</th>
                                                </tr>
                                                {
                                                    inviteRecord.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className={styles.td}>{item.nickname}</td>
                                                                <td className={styles.td}>{item.createTime}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    /!*推广记录*!/
                                    <div className={`${styles.inviteTable}`}>
                                        <table className={styles.table}>
                                            <tbody>
                                                <tr>
                                                    <th className={styles.th}>{intl.get('invite_23')}</th>
                                                    <th className={styles.th}>{intl.get('invite_21')}</th>
                                                    <th className={styles.th}>{intl.get('invite_24')}</th>
                                                    <th className={styles.th}>{intl.get('invite_25')} (TB)</th>
                                                    <th className={styles.th}>{intl.get('invite_26')} (USDT)</th>
                                                </tr>
                                                {
                                                    awardList.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className={styles.td}>{this.getContractText(item.round)}</td>
                                                                <td className={styles.td}>{item.nickname}</td>
                                                                <td className={styles.td}>{item.createTime}</td>
                                                                <td className={styles.td}>{item.orderQuantity}</td>
                                                                <td className={styles.td}>{item.rewardQuantity}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        this.state.showShareImg?(
                            <div className={styles.shareBox} onClick={() => {this.hideShareBox()}}>
                                <img src={inviteInfo.invitationImage} className={styles.shareImg} alt=""/>
                            </div>
                        ):null
                    }
                    {/!*<img src={require('@/images/invite/Invite_friends_bg_1@2x.png')} className={styles.bgImg} alt="" />*!/}
                </div>
                <Foot />
            </div>*/
        )
    }
}

export default connect(Invite)