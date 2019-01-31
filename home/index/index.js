const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'home/'
const url = `${baseUrl}${page}`
Page({
    data: {
        baseUrl:url
    },
    handleRegister: function () {
        console.log('handleRegister')
        wx.navigateTo({
            url:'/pages/register/index?from=home'
        })
    },
    handleMyMusic: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url:'/pages/my-music-personality/index'
        })
    },
    handleListen: function () {
        console.log('handleListen')
    },
    handleRankList: function () {
        console.log('handleRankList')
        wx.navigateTo({
            url:'/pages/rank-list/index'
        })
    },
    handleUserInfo: function () {
        console.log('handleUserInfo')
        wx.navigateTo({
            url:'/pages/user-info/index'
        })
    },
    onLoad: function () {

    }
})
