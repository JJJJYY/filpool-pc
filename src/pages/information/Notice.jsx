import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import net from "@/net";
import { formatDate } from '@/util/utilTools';

class Notice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 2,
            listData: []
        }
    }

    componentDidMount () {
        this.getDataList();
    }

    getDataList () {
        net.getNotice({
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        }).then((res) => {
            let dv = document.createElement("div");
            let list = res.content.map((item) => {
                dv.innerHTML = item.content;
                item.simpleContent = dv.firstChild && dv.firstChild.innerText || item.content;
                return item;
            });

            this.setState({
                listData: this.state.listData.concat(list),
                pageNo: this.state.pageNo + 1
            });
        })
    }

    showDetail (item) {
        this.props.history.push({pathname: `/information_detail/${this.props.tabIndex}/${item.id}`, query: {title: item.title, content: item.content}});
    }

    render () {
        return (
            <div className={styles.project}>
                <ul className={styles.list}>
                    {
                        this.state.listData.map((item) => {
                            return (
                                <li className={styles.li} key={item.id} onClick={() => {this.showDetail(item)}}>
                                    <h3 className={styles.title}>{item.title}</h3>
                                    <div style={{display: "flex", justifyContent: "space-between",alignItems: "baseline"}}>
                                        <div className={`${styles.content}, ${styles.nowrap}`} style={{flex: 1}} dangerouslySetInnerHTML={{__html: item.simpleContent}}></div>
                                        <p className={styles.date} style={{width: "200px", marginTop: "34px", marginLeft: "200px"}}>{formatDate(item.createTime, 'yyyy-MM-dd mm:hh:ss')}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.checkDetail}>
                    <button className={styles.checkBtn} onClick={() => {this.getDataList()}}>{intl.get("RATE_91")}</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Notice)