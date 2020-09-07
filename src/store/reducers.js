import { combineReducers } from 'redux';
import * as actionsTypes from './actionsTypes';

const data = {
    login: false,
    userInfo: sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{},
    tab: 'home',
};

const reducer = {
    redux: (state = data, action) => {
        switch (action.type) {
        case actionsTypes.LOGIN:
            return { ...state, login: action.data };
        case actionsTypes.USER_INFO:
            return { ...state, userInfo: { ...state.userInfo, ...action.data } };
        case actionsTypes.TAB:
            return { ...state, tab: action.data };
        default:
            return state;
        }
    },
};

export default combineReducers(reducer);
