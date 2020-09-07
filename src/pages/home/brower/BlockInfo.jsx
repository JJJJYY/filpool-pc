import React, {useState, useEffect} from 'react';
import styles from './browser.module.less';
import intl from 'react-intl-universal';
import net from '@/net';
import { bytesToSize, formatNumber } from '@/util/utilTools';


export default () => {
    const [height, setHeight] = useState("0");
    const [totalPower, setTotalPower] = useState("0");
    const [minerPower, setMinerPower] = useState("0");

    useEffect(() => {
        net.getBlockInfo().then((res) => {
            setHeight(formatNumber(res.data.height));
            setTotalPower(bytesToSize(res.data.total_power));
        });
        net.getPowerByMiner("t01009").then((res) => {
            setMinerPower(bytesToSize(res.data.miner.raw_byte_power));
        })
    }, []);

    return <div className={styles.groupBox}>
        <div className={styles.group}>
            <p className={styles.label}>{intl.get("homeStatus76")}</p>
            <p className={styles.value}>{height}</p>
        </div>
        <div className={styles.group}>
            <p className={styles.label}>{intl.get("homeStatus77")}</p>
            <p className={styles.value}>{totalPower}</p>
        </div>
        <div className={styles.group}>
            <p className={styles.label}>{intl.get("homeStatus78")}（t01009）</p>
            <p className={styles.value}>{minerPower}</p>
        </div>
    </div>
}