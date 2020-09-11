import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import net from "@/net";

class Help extends Component{
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

    showDetail (item) {
        this.props.history.push({pathname: `/information_detail/${this.props.tabIndex}/${item.id}`, query: {title: item.title, content: item.content}});
    }

    getDataList () {
        net.getHelpLists({
            page: this.state.pageNo,
            count: this.state.pageSize
        }).then((res) => {
            if (res.ret == 200 && res.data.length) {
                this.setState({
                    listData: this.state.listData.concat(res.data),
                    pageNo: this.state.pageNo + 1
                });
            }
        })
    }


    render () {
        return (
            <div className={styles.project}>
                <ul className={styles.list}>
                    {
                        this.state.listData.map((item) => {
                            return (
                                <li className={styles.li} key={item.id}  onClick={() => {this.showDetail(item)}} style={{display: "flex",alignItems: "center", padding: "32px 0"}}>
                                    <h3 className={styles.title} style={{marginTop: "0px", color: "#575C62", fontSize: "20px"}}>{item.title}</h3>
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

export default withRouter(Help)