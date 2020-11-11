import React from 'react';
import styles from './expediteDetails.module.less';
import Expedite from './expedite';

export default class ExpediteDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div className={styles.centent}>
                <div className={styles.return}>
                    <div className={styles.returnIcon} >&#60;</div>
                    <div className={styles.return1} style={{ marginLeft: '10px' }}><a onClick={() => { this.props.history.goBack() }}>返回</a> </div>
                    <div className={styles.marginXian} style={{ marginLeft: '20px' }}></div>
                    <div className={styles.marginSize} style={{ marginLeft: '20px' }}>算力增速</div>
                </div>
                <Expedite />
                {/* <div className={styles.cententText}>
                    <div style={{ lineHeight: '46px', fontSize: '16px', color: '#333333FF' }}>具体细则如下：</div>
                    <p>1、“30天算力加速计划”- 期限额45PB (30天内有效算力达到30PiB) ，以1TB存储空间需要约4枚FIL质押币，共募集18万枚FIL作为质押币，30天内完成所有扇区封装(30天内有效算力达到30PiB) ; </p><br />
                    <p>2、“30天算力加速计划” 以独立节点运行，收益独立核算，有效算力并入FILPool矿池一期总有效算力;</p><br />
                    <p>3、“30天算 力加速计划”新增有效算力计入FILPool矿池-期总算力，但不会增加一期矿池的总存储空间;</p><br />
                    <p>4、每位用户可认购(充值)的FIL数量，以其存储空间剩余所未封装的扇区所需要的质押币为上限，如用户充值的FIL超过质押所需要的FIL,多余部分再算力加速计划结束之后转至其“可用资产”账户;</p><br />
                    <p>5、参与“30天算力加速计划”的用户，如满额充值FIL作为质押币,则在加速计划结束之后其账户的存储空间全部转化为有效算力(按照67%的利用率) ;</p><br />
                    <p>6、未参与算力加速计划的用户，其有效算力将根据矿池原有节点每日正常新增算力与其个人账户剩余可用资产及对应比例进行同步增长，如用户将可用资产全部提取，则其有效算力不再增长。</p><br />
                    <p>7、质押币质押周期为540天(扇区生命周期为)</p><br />
                </div> */}
            </div>
        )
    }
}
