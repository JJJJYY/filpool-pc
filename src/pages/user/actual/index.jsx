import React from 'react';
import connect from '@/store/connect';
import Actual from './Actual';
import styles from './actual.module.less';
import intl from 'react-intl-universal';

class ActualIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    componentDidMount(){
        this.props.getUserInfo();
    }

    reSubmit() {
        this.setState({step: 0});
    }

    render() {
        const userInfo = this.props.redux.userInfo;

        return (
            <div className={styles.actual}>
                {
                    (userInfo.authStatus === 2 || userInfo.authStatus === 3) && this.state.step !==0?(
                        userInfo.authStatus === 3?(
                            <div className={styles.waitingBox}>
                                <p className={styles.waiting}>{intl.get(`USER_125`)}</p>
                            </div>
                        ):(
                            <div className={styles.notPassBox}>
                                <p className={styles.waiting}>{intl.get("USER_126")}</p>
                                <button type="button" className={styles.reSubmit} onClick={() => this.reSubmit()}>{intl.get(`USER_127`)}</button>
                            </div>
                        )
                    ):(
                        <Actual  submited={() => this.setState({step: 1})}></Actual>
                    )
                }
            </div>
        )
    }
}

export default connect(ActualIndex)