import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import net from "@/net";

class Ketang extends Component{
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
            type: 1,
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
                                <li className={styles.li} style={{display: "flex",alignItems: "center"}} key={item.id}  onClick={() => {this.showDetail(item)}}>
                                    <div>
                                        <img src={item.image} style={{width: "160px"}} alt="" />
                                    </div>
                                    <div style={{display: "flex",flexDirection: "column", marginLeft: "40px"}}>
                                        <h3 className={styles.title} style={{marginTop: "0px"}}>{item.title}</h3>
                                        <p className={styles.date} style={{marginTop: "20px"}}>{item.createTime}</p>
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

export default withRouter(Ketang)