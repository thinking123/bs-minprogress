//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    handleRegister: function () {
        console.log('handleRegister')
        wx.navigateTo({
            url:'/pages/register/index?from=home'
        })
    },
    handleMyMusic: function () {
        console.log('handleMyMusic')
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
