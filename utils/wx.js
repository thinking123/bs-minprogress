export function _wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //此处通过code 获取 服务端token
                resolve(res.code)
            },
            fail: err => {
                console.log('login error', err)
                reject(err)
            }
        })
    })
}


export function _wxGetSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: resolve,
            fail: reject
        })
    })
}

export function _wxGetUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: resolve,
            fail: reject
        })
    })
}

