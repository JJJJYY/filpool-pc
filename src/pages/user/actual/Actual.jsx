import React from 'react';
import styles from './actual.module.less';
import { Select, Input, message } from 'antd';
import codeList from '@/data/country';
import connect from '@/store/connect';
import intl from 'react-intl-universal';

import Upload from './Upload';
import net from '@/net';

class Actual extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            areaCode: "",
            name: "",
            idNumber: "",
            idFront: "",
            idVerso: "",
            step: 1,
            actualData: {}
        }
    }

    componentDidMount() {
        if (this.props.redux.userInfo.authStatus === 1) {
            this.getActualInfo()
        }
    }

    getActualInfo() {
        net.getActualInfo().then((res) => {
            if (res.ret == 200) {
                this.setState({actualData: res.data, areaCode: res.data.country});
            }
        })
    }

    submit() {
        const {areaCode,name,idNumber,idFront,idVerso} = this.state;
        if (!areaCode || !name || !idNumber || !idFront || !idVerso) {
            message.info({content: intl.get("USER_128")});
            return;
        }
        net.postActual({
            country: this.state.areaCode,
            realName: this.state.name,
            idCardNo: this.state.idNumber,
            idFront: this.state.idFront,
            idVerso: this.state.idVerso
        }).then((res) => {
            if (res.ret === 200) {
                message.success({content: intl.get("USER_129")});
                this.props.getUserInfo();
                this.props.submited();
            }
        })
    }

    render() {
        const {actualData,areaCode} = this.state;
        const userInfo = this.props.redux.userInfo;
        return (
            <div>
                <div>
                    <h3 className={styles.title}>{intl.get("USER_130")}</h3>
                    <p className={styles.normalText}>{intl.get("USER_131")}</p>
                    <div className={styles.inputItem}>
                        <label className={styles.inputLabel}>{intl.get("USER_132")}</label>
                        <Select disabled={userInfo.authStatus === 1} value={areaCode} onSelect={(areaCode) => {
                            this.setState({areaCode: areaCode})
                        }}>
                            {
                                codeList.map((item) => {
                                    return (
                                        <Select.Option value={item.code} key={item.zh}>
                                            <span style={{display: "inline-block", marginRight: "20px"}}>{item.zh}</span>
                                            {/*<span>{item.code}</span>*/}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className={styles.inputItem}>
                        <label className={styles.inputLabel}>{intl.get("USER_133")}</label>
                        <Input placeholder={intl.get("USER_134")}
                               disabled={userInfo.authStatus === 1}
                               value={actualData.realName || this.state.name}
                               onChange={(event) => this.setState({name: event.target.value})} />
                    </div>
                    <div className={styles.inputItem}>
                        <label className={styles.inputLabel}>{intl.get("USER_135")}</label>
                        <Input placeholder={intl.get("USER_136")}
                               disabled={userInfo.authStatus === 1}
                               value={actualData.idCardNo || this.state.idNumber}
                               onChange={(event) => this.setState({idNumber: event.target.value})} />
                    </div>
                    {
                        userInfo.authStatus === 1?null:(
                            <div>
                                <div className={`flex-row-between ${styles.uploadContainer}`}>
                                    <Upload text={intl.get("USER_137")} bgImg={require("@/pages/user/images/card-right.png")} onChange={(url) => this.setState({idFront: url})}></Upload>
                                    <Upload text={intl.get("USER_138")} bgImg={require("@/pages/user/images/card-back.png")} onChange={(url) => this.setState({idVerso: url})}></Upload>
                                </div>
                                <div className={styles.submitBox}>
                                    <button className={styles.submit} onClick={() => this.submit()}>{intl.get("USER_139")}</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(Actual)