import {hadPlayVideo} from "../../utils/constant";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'video/'
const url = `${baseUrl}${page}`

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: url,
        noShow:false
    },
    onLoad: function (options) {
        const hadPlay = wx.getStorageSync(hadPlayVideo)
        if(hadPlay){
            wx.redirectTo({
                url: '/home/index/index'
            })
        }
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    setHadPlay(){
        wx.setStorageSync(hadPlayVideo, true)
    },
    hangleStartPlay(e) {
        console.log('hangleStartPlay' , e)
    },
    hangleEndPlay(e) {
        console.log('hangleEndPlay' , e)
        this.setHadPlay()
        wx.redirectTo({
            url: '/home/index/index'
        })
    },
    hangleWaiting(e) {
        console.log('hangleWaiting' , e)
    },
    hangleError(e) {
        console.log('hangleError' , e)
        this.setHadPlay()
        wx.redirectTo({
            url: '/home/index/index'
        })
    },
    handleProgress(e) {
        console.log('handleProgress' , e)
    },
    handleSkip(){
        this.setHadPlay()
        wx.redirectTo({
            url: '/home/index/index'
        })
    }
})
