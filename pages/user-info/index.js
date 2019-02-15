const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'user-info/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
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
