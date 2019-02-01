// const baseUrl = '../../asserts/image/pages/'
// const baseComponentUrl = '../../asserts/image/components/'
const base = 'http://pm4uud0ld.bkt.clouddn.com/'
// const base = '../../'
const baseUrl = `${base}asserts/image/pages/`
const baseAudioUrl = `${base}asserts/audio/`
const baseComponentUrl = `${base}asserts/image/components/`


const myMusicPersonality = 'https://www.lizikeji.cn'
// const myMusicPersonality = 'https://mp.weixin.qq.com/'
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log('login info' , res)

                this.globalData.code = res.code
                //此处通过code 获取 服务端token
            },
            fail: err => {
                console.log('login error' , err)
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        baseUrl: baseUrl,
        baseComponentUrl: baseComponentUrl,
        baseAudioUrl: baseAudioUrl,
        myMusicPersonality:myMusicPersonality,
        code:''
    }
})
