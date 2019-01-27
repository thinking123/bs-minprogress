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
    },
    handleUserInfo: function () {
        console.log('handleUserInfo')
    },
    onLoad: function () {

    }
})
