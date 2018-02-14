import axios from 'axios'

import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo: '',
    isAuth: '',
    msg: '',
    name: '',
    // pwd: '',
    type: ''
}
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOGIN_SUCCESS:
            return { ...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth:false, msg: action.msg }
        default:
            return state
    }
}

function registerSuccess(data) {
    return { type: REGISTER_SUCCESS, payload: data }
}

function errorMsg(msg) {
    //本来应该是{ type: ERROR_MSG, msg: msg }，省略掉的话需要放到前面
    return { msg, type: ERROR_MSG}
}

export function register({name, pwd, repeatPwd, type}) {
    if (!name || !pwd || !type) {
        return errorMsg('用户名密码不得为空！')
    }
    if(pwd !== repeatPwd) {
        return errorMsg('请确认两次输入的密码相同！')
    }
    return dispatch => {
        axios.post('/user/register', { name, pwd, type})
            .then(res=>{
                if(res.status===200 && res.data.code === 0) {
                    dispatch(registerSuccess({ name, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })

    }
}

function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
    
}

export function login({name, pwd}) {
    if (!name || !pwd) {
        return errorMsg('用户名密码不得为空！')
    }

    return dispatch => {
        axios.post('/user/login', { name, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })

    }
}

export function loadData(userinfo) {
    // return dispatch => {
    return { type: 'LOAD_DATA', payload: userinfo}
    // }
}