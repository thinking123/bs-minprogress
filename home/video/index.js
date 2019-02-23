import {hadPlayVideo , lastPlayVideoTime} from "../../utils/constant";

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
        const lastTime = wx.getStorageSync(lastPlayVideoTime)
        console.log('lastPlayVideoTime' , lastTime)

        if(lastTime){
            const curTime = (new Date()).getTime()
            const threeMinus = 30 * 3600 * 1000
            const offtime = curTime - lastTime
            console.log('offtime' , offtime)
            if(offtime < threeMinus){
                wx.setStorageSync(lastPlayVideoTime , curTime)
                wx.redirectTo({
                    url: '/home/index/index'
                })
                return
            }

        }

        // const hadPlay = wx.getStorageSync(hadPlayVideo)
        // if(hadPlay){
        //     wx.redirectTo({
        //         url: '/home/index/index'
        //     })
        // }
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
        wx.setStorageSync(lastPlayVideoTime , (new Date()).getTime())
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
