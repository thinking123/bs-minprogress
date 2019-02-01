import regeneratorRuntime from '../libs/regenerator-runtime/runtime.js'
import {baseUrl} from "../utils/constant";


let queue = []

export function initHttp(globalData){
    queue = globalData.requestQueue
}
function http(url, data, header, method = 'GET') {

    const app = getApp()
    if (url.indexOf('/') == 0) {
        url = url.substr(1)
    }

    if(app.globalData.token && url != 'api/login/wxlogin'){
        //授权token
        header.token = app.globalData.token
    }
    const _url = `${baseUrl}${url}`
    console.log('url',_url)
    queue.push(url)
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            data: data,
            header: header,
            method: method,
            success: res => {
                resolve(res ? res.data : null)
                queue.pop()
            },
            fail: err => {
                reject(err)
                queue.pop()
            }
        })
    })
}

export function get(url, params, headers = {}) {
    return http(url, params, headers)
}

export function post(url , data , headers = {}) {
    return http(url, data, headers , 'POST')
}
