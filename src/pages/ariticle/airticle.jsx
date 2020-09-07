import React, { Component } from 'react';
import { getSearchParams } from '@/util/utilTools';

export default class Airticle extends Component {
    constructor(props) {
        super(props);
        this.airs = {
            "1": {
                url: "/user/xieyi.html"
            }
        }
    }

    iframeLoad () {
        let iframe = document.getElementById('argIframe');
        let article = iframe.contentWindow.document.body.children[0];
        iframe.height = article.clientHeight + 100 + 'px';
    }

    render () {
        let id = this.props.match && this.props.match.params.id || 1;
        return (
            <div style={{width: "1200px",margin: "80px auto"}}>
                <iframe src={this.airs[id].url} id={"argIframe"} onLoad={() => {this.iframeLoad()}}  style={{width: "100%"}}></iframe>
            </div>
        )
    }
}