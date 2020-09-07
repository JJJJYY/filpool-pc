import React, { Component } from 'react';
import './index.less';
import Header from '../../pages/header';
import connect from '../../store/connect';
import net from '../../net';
import intl from 'react-intl-universal';
import Footer from '../../pages/footer';

class Article extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: '',
            key: '',
            notice: {},
            header: {}
        }
    }

    componentDidMount(){
        let key = this.props.match.params.key;
        this.setState({ key: key })
        this.getGeneralBottom(key);
    }

    getGeneralBottom(key){
        if(Number(key)){
            net.getGeneralNotice().then(res => {
                if(res.responseCode === '00'){
                    let data = res.content;
                    let notice = {};
                    let title = {};
                    for(let item of data){
                        notice[item.id] = item.content;
                        title[item.id] = item.title;
                    }
                    this.setState({ notice: notice, header: title })
                } else {
                }
            })
            return;
        } 
        net.getGeneralBottom(key).then(res => {
            if(res.responseCode === '00'){
                this.setState({ content: res.content })
            } else {
            }
        })
    }

    render() {
        const {
            key,content,notice,header
        } = this.state;
        const isMobile = window.innerWidth <= 1080;
        const title = {
            service : intl.get('RATE_58'),
            coop : intl.get('RATE_57'),
            about: intl.get('RATE_56'),
        }
        const tab = this.props.redux.tab;
        return (
            <div className={'article'}>
                <Header 
                    left={()=> { if(tab === 'mine'){ this.props.history.push('/'); }  else { this.props.history.goBack() }}}
                    title={Number(key) ? header[key] : title[key]}
                />
                <div className={isMobile ? 'bg-h5' : 'bg'}></div>
                {/* {
                    Number(key) ?
                    <div className={isMobile ? 'content-h5' : 'content'}>
                        {notice[key]}
                    </div>
                    : */}
                    <div className={isMobile ? null : 'cell'}>
                        <div dangerouslySetInnerHTML={{__html: Number(key) ? notice[key] : content}} className={isMobile ? 'content-h5' : 'content'}>
                    </div>
                    </div>
                {/* } */}
                {
                    isMobile ? null : <Footer />
                }
            </div>
        );
    }
}

export default connect(Article);

