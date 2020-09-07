import React, { Component } from 'react';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import Foot from '@/pages/footer/index';
import connect from '@/store/connect';

import Project from './Project';
import Ketang from './Ketang';
import Help from './Help';
import Notice from './Notice';
import { getSearchParams } from '@/util/utilTools';

class Information extends Component{

    constructor(props) {
        super(props);

        if (!props.redux.userInfo.account) {
            window.location.href = `/#/login`;
        }
        let tab = Number(props.match && props.match.params.tab);
        this.state = {
            tabIndex: (props.location.query && props.location.query.tabIndex) || tab || 0,
            tabList: [intl.get("RATE_87"), intl.get("RATE_88"), intl.get("RATE_89"), intl.get("RATE_90")]
        };
    }

    changeTab (index) {
        this.setState({
            tabIndex: index
        })
    }

    toggleComponent (index) {
        switch (index) {
            case 0:
                return <Project tabIndex={this.state.tabIndex} />;
            case 1:
                return <Ketang tabIndex={this.state.tabIndex} />;
            case 2:
                return <Help tabIndex={this.state.tabIndex} />;
            case 3:
                return <Notice tabIndex={this.state.tabIndex} />;
            default:
                return <Project tabIndex={this.state.tabIndex} />;
        }
    }

    render () {
        return (
            <div className={styles.container}>
                <div className={styles.content} style={{minHeight: "calc(100vh - 280px)"}}>
                    <div className={styles.bannerBox}>
                        <p className={styles.bannetText}>{intl.get("ACCOUNT_162")}</p>
                        <img src={require('@/images/information/news_center_bg_1@2x.png')} className={styles.bannerImg}  alt=""/>
                    </div>
                    <div className={styles.tabBox}>
                        {
                            this.state.tabList.map((item, index) => {
                                return (
                                    <div className={`${styles.tabItem} ${index === this.state.tabIndex?styles.active:null}`} key={index}
                                         onClick={() => {this.changeTab(index)}}>
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        this.toggleComponent(this.state.tabIndex)
                    }
                </div>
                <Foot />
            </div>
        )
    }
}

export default connect(Information)