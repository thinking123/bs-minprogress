import {get,post} from "./http";

export function wxLogin(code , userHead , userName , userSex) {
    const url = '/api/login/wxlogin'
    const data = {
        code:code,
        userHead:userHead,
        userName:userName,
        userSex:userSex
    }
    return post(url ,data)
}

