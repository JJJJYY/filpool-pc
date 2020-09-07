import React from 'react';
import styles from './browser.module.less';

import BlockInfo from './BlockInfo';
import BlockChart from './BlockChart';
import MinerRank from './MinerRank';


export default class Browser extends React.Component{
    render() {
        return (
            <div>
                <BlockInfo></BlockInfo>
                <div className={styles.MinerContainer}>
                    <MinerRank></MinerRank>
                    <BlockChart></BlockChart>
                </div>
            </div>
        )
    }
}