import {get, post} from "./http";


function parseRes(res, errMsg) {
    if (!!res && res.status == '200' && !!res.rows) {
        return res.rows
    } else {
        throw new Error(errMsg)
    }
}

export function wxLogin(code, userHead, userName, userSex) {
    const url = '/api/login/wxlogin'
    const loadintText = '正在登入...'
    const errMsg = '登入失败'
    const data = {
        code: code,
        userHead: userHead,
        userName: userName,
        userSex: userSex
    }
    return post(url, data, loadintText).then(res => parseRes(res, errMsg))
}

