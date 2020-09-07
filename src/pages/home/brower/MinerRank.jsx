import React, {useState, useEffect} from 'react';
import intl from 'react-intl-universal';
import styles from './browser.module.less';

import net from '@/net';
import { bytesToSize } from '@/util/utilTools';


export default () => {
    const [minerList, setMiners] = useState([]);

    useEffect(() => {
        net.getMinerTop().then((res) => {
            setMiners(res.data.list);
        })
    }, []);

    return (
        <div className={styles.rankBox}>
            <h3 className={styles.rankTitle}>{intl.get("homeStatus79")}</h3>
            <p className={styles.titleBox}>
                <span className={styles.td}>{intl.get("homeStatus80")}</span>
                <span className={styles.td} style={{textAlign: "center"}}>{intl.get("homeStatus81")}</span>
                <span className={styles.td} style={{textAlign: "right"}}>{intl.get("homeStatus82")}</span>
            </p>
            <ul className={styles.rankList}>
                {
                    minerList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className={styles.td}>{index+1}</span>
                                <span className={styles.td} style={{textAlign: "center"}}>{bytesToSize(item.raw_byte_power)}</span>
                                <span className={styles.td} style={{textAlign: "right", color: "#11ccb4"}}>
                                      {item.miner}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}