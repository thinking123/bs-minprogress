const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'home/'
// const url = `${baseUrl}${page}`
const url = './'
Page({
    data: {
        baseUrl:url,
        showDialog:true
    },
    handleHowToPlay: function () {
        console.log('handleRegister')
        this.setData({
            showDialog:true
        })
    },
    handleStartMyMusicJourney: function () {
        console.log('handleMyMusic')
        // wx.navigateTo({
        //     url:'/pages/my-music-personality/index'
        // })
    },
    hidetap(){
        this.setData({
            showDialog : false
        })
    },
})
