import {
    connect
} from 'react-redux';
import * as actions from './actions';
import net from '../net';

const mapStateToProps = state => ({
    redux: state.redux,
});

const mapDispatchToProps = dispatch => ({

    setLogin: (data) => {
        dispatch(actions.setLogin(data));
    },

    setUserInfo: (data) => {
        dispatch(actions.setUserInfo(data));
    },

    setTab: (data) => {
        dispatch(actions.setTab(data));
    },

    getUserInfo: (url) => {
        // 获取用户信息
        net.getLoginInfo(url).then((res) => {
            if (res.ret === 200) {
                dispatch(actions.setLogin(true));
                dispatch(actions.setUserInfo(res.data));
                sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                sessionStorage.setItem("login", true);
                // net.postSettingInfo().then((kyc) => {
                //     if (kyc.responseCode === '00') {
                //         dispatch(actions.setUserInfo(kyc.content));
                //     }
                // });
            }
        });
    },
    // refreshUserInfo: () => {
    //     net.getRefreshLoginInfo().then((res) => {
    //         if (res.responseCode === '00') {
    //             dispatch(actions.setLogin(true));
    //             dispatch(actions.setUserInfo(res.data.content));
    //             sessionStorage.setItem("userInfo", JSON.stringify(res.data.content));
    //             // net.postSettingInfo().then((kyc) => {
    //             //     if (kyc.responseCode === '00') {
    //             //         dispatch(actions.setUserInfo(kyc.content));
    //             //     }
    //             // });
    //         }
    //     })
    // }
});

export default c => connect(mapStateToProps, mapDispatchToProps)(c);