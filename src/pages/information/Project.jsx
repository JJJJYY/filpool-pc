import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import net from '@/net/index';

class Project extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 5,
            listData: []
        }
    }

    componentDidMount () {
        this.getDataList();
    }

    getDataList () {
        net.getInfoList({
            type: 2,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        }).then((res) => {
            let resArr = res.data || [];
            let dv = document.createElement("div");
            let newList = resArr.map((item) => {
                dv.innerHTML = item.content;
                item.simpleContent = dv.firstChild && dv.firstChild.innerText || item.content;
                return item;
            });

            this.setState({
                listData: this.state.listData.concat(newList),
                pageNo: this.state.pageNo + 1
            });
        })
    }

    showDetail (item) {
        this.props.history.push({pathname: `/information_detail/${this.props.tabIndex}/${item.id}`, query: {title: item.title, content: item.pcContent}});
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
                                    <div className={styles.content} dangerouslySetInnerHTML={{__html: item.simpleContent}}></div>
                                    <p className={styles.date}>{item.createTime}</p>
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

export default withRouter(Project)