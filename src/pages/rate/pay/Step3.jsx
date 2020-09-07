import React from 'react';
import styles from './orderPay.module.less';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className={styles.step3} style={{paddingBottom: "80px", position: "relative",marginBottom: "130px"}}>
            <img src={require('@/images/rate/count_picture_succeed.png')} className={styles.icon} alt="" />
            <p className={styles.text}>{intl.get("RATE_102")}</p>
            <Link to={{pathname: '/rate'}}>
                <button className={`${styles.btnSmall} ${styles.active}`} onClick={() => {props.setStep({stepIndex: 0})}}>{intl.get("RATE_101")}</button>
            </Link>
        </div>
    )
}