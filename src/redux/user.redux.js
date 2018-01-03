import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    isAuth: '',
    msg: '',
    name: '',
    pwd: '',
    type: ''
}
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, msg: '', isAuth: true, ...action.payload }
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