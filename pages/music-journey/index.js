const app = getApp()
const base = app.globalData.base
const baseUrl = app.globalData.baseUrl
const page = 'music-journey-'
const url = `${base}${page}`
// const url = './'
Page({
    data: {
        baseUrl:url,
        showDialog:false
    },
    handleHowToPlay: function () {
        console.log('handleRegister')
        this.setData({
            showDialog:true
        })
    },
    handleStartMyMusicJourney: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url:'/pages/rhythm-select/index'
        })
    },
    hidetap(){
        this.setData({
            showDialog : false
        })
    },
})
