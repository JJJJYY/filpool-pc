import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { Header, Button } from '../../components';

import download1 from '../../images/common/download1.png';
import download2 from '../../images/common/download2.png';

import { android } from '../../config';
import { isIOS } from '../../util/brower';
import net from "../../net";
import md5 from "md5";
import { message } from "antd";

function download() {

    window.location.href = android;

    // alert(window.location.search);

    // alert(cans());
}

// function cans() {
//     var canvas = document.createElement('canvas');
//     var ctx = canvas.getContext('2d');
//     var txt = "https://new.filpool.io";
//     ctx.textBaseline = "top";
//     ctx.font = "14px 'Arial'";
//     ctx.textBaseline = "filpool";
//     ctx.fillStyle = "#f60";
//     ctx.fillRect(125, 1, 62, 20);
//     ctx.fillStyle = "#069";
//     ctx.fillText(txt, 2, 15);
//     ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
//     ctx.fillText(txt, 4, 17);
//
//     var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
//     var bin = atob(b64);
//     var crc = bin2hex(bin.slice(-16, -12));
//     //var crc = bin.slice(-16,-12);
//     return crc;
// }
//
// function bin2hex(str) {
//     var result = "";
//     for (let i = 0; i < str.length; i++) {
//         result += int16_to_hex(str.charCodeAt(i));
//     }
//     return result;
// }
//
// function int16_to_hex(i) {
//     var result = i.toString(16);
//     var j = 0;
//     while (j + result.length < 4) {
//         result = "0" + result;
//         j++;
//     }
//     return result;
// }
//
// function getQueryVariable(variable)
// {
//     let query = window.location.href;
//     let vars = query.split("?");
//     for (let i=0;i<vars.length;i++) {
//         let pair = vars[i].split("=");
//         if(pair[0] === variable){return pair[1];}
//     }
//     return("");
// }

export default class Download extends Component {
    render() {
        return (
            <div className="download" style={{ margin: "auto" }}>
                <Header style={{ margin: "60px auto" }} title={intl.get('ACCOUNT_132')} left={() => this.props.history.push('/home')} />

                <div className="back">
                    <img className="img1" src={download1} alt="" />
                    <img className="img2" src={download2} alt="" />

                    <div className="back3">
                        <Button onClick={download} style={{ width: '38vw' }} type="mobile">
                            {intl.get('RATE_114')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
