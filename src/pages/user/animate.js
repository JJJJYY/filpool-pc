import React, { PureComponent } from "react";
import './animate.less';

export default class Index extends PureComponent {
    render() {
        return (
            <div className="animate">
                <div className="ani-1">
                    <div className="ani-1-content"></div>
                </div>
                <div className="ani-2"></div>
                <div className="ani-3"></div>
                <div className="ani-4"></div>
                <div className="ani-5"></div>
                <div className="ani-6"></div>
            </div>
        )
    }
}
