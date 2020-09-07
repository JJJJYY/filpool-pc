import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Foot from '@/pages/footer/index';
import styles from './information.module.less';
import intl from 'react-intl-universal';
import net from '@/net';
import { get as fetchGet } from '@/net/axios';

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.query && this.props.location.query.title || '',
            content: this.props.location.query && this.props.location.query.content || ''
        };
    }

    componentDidMount() {
        if (!this.state.content) {
            let tabIndex = this.props.match.params.tab;
            let id = this.props.match.params.id;
            /*switch (tabIndex) {
                case "0":
                case "1":
                    url = "/message/detail";
                    break;
                case "2":
                    url = "/general/access/helpDetail";
                    break;
                default:
                    url = "/message/access/get_notice";
            }
            fetchGet(`${url}/${this.props.match.params.id}`).then((res) => {
                this.setState({title: res.content.title, content: res.content.pcContent});
            });*/
            if (tabIndex === "0" || tabIndex === "1") {
                net.getInforDetail(id).then((res) => {
                    this.setState({title: res.content.title, content: res.content.pcContent});
                })
            } else if (tabIndex === "2") {
                net.getHelpDetail(id).then((res) => {
                    this.setState({title: res.content.title, content: res.content.content});
                })
            } else {
                net.getNoticeDetail({id: id}).then((res) => {
                    this.setState({title: res.content.title, content: res.content.content});
                })
            }
        }
    }

    back () {
        let tabIndex = this.props.match.params.tab;
        if (tabIndex || tabIndex == '0') {
            this.props.history.push({pathname: `/information/${tabIndex}`});
        } else {
            this.props.history.goBack();
        }
    }

    render () {
        return (
            <div className={styles.detail}>
                <div className={styles.contentBox}>
                    <div className={styles.head}>
                        <a className={`flex-row-start`} style={{color: "#86929D"}} onClick={() => {this.back()}}>
                            <span className={`iconfont ${styles.icon}`}>&#xe679;</span>
                            <span>{intl.get("RATE_92")}</span>
                        </a>
                    </div>
                    <div style={{width: "1200px", position: "relative", margin: "auto"}}>
                        <img src={require('@/images/home/count_picture_1.png')} style={{position: "absolute",right: "-150px", top: "100px"}} alt="" />
                        <img src={require('@/images/home/count_picture_2.png')} style={{position: "absolute",left: "-156px", top: "10px"}} alt="" />
                    </div>
                    <div className={styles.boxShow} style={{backgroundColor: "#fff"}}>
                        <h3 className={styles.title}>{this.state.title}</h3>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                    </div>
                </div>
                <Foot></Foot>
            </div>
        )
    }
}

export default withRouter(Detail)