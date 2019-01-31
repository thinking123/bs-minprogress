const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'rhythm-share/'
const url = `${baseUrl}${page}`
// const url = './'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:url,
        isPlaying:false,
    },
    handlePlay(e) {
        console.log('handlePlay' , this.data.isPlaying)
        this.setData({
            isPlaying:!this.data.isPlaying
        })
    },
    handleShare(e) {
        console.log('handleShare')
    },
    handleRegister(e) {
        console.log('handleRegister')
        wx.navigateTo({
            url:'/pages/register/index'
        })
    }
})
