//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        howToplayVisible: false
    },
    handleStarttour: function () {
        // wx.navigateTo({
        //     url: '../logs/logs'
        // })
        console.log('handleStarttour')
    },
    handleHowtoplay: function () {
        this.setData({
            howToplayVisible: true
        })
        console.log('how to play')
    },
    onLoad: function () {

    },
    handleHidetap(){
        this.setData({
            howToplayVisible: false
        })
    }
})
