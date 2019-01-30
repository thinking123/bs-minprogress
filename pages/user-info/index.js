//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad() {
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
    },
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    },
    handleSingerHome: function () {
        console.log('handleRegister')
        wx.navigateTo({
            url:'/pages/singer-home/index'
        })
    },
    handleMyAchieve: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url:'/pages/my-achieve/index'
        })
    },
    handleWinInfo: function () {
        console.log('handleListen')
        wx.navigateTo({
            url:'/pages/win-info/index'
        })
    },
    handleAttentionList: function () {
        console.log('handleRankList')
        wx.navigateTo({
            url:'/pages/attention/index'
        })
    }
})
