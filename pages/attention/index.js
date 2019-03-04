import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getFollow , putfollowMusic} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'attention-'
const url = `${baseUrl}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url:url,
        attentionList: []
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
        })
    },
    handleToSingerHome(e){
        console.log('handleToSingerHome' , e.target.dataset.attention)
        let music = e.target.dataset.attention
        const url = `/pages/singer-home/index?id=${music.userId}`
        wx.navigateTo({
            url: url
        })
    },
    async handlePutFollow(e){
        try {
            console.log(e)
            let music = e.target.dataset.attention
            const res = await putfollowMusic(music.musicId)
            const attentionList = await getFollow()
            this.setData({
                attentionList:attentionList
            })
        }catch (e) {
            showMsg(e)
        }
    },
    async onShow(){
        try {
            const attentionList = await getFollow()
            this.setData({
                attentionList:attentionList
            })
        }catch (e) {
            showMsg(e)
        }
    },
    async onLoad(){
        // try {
        //     const attentionList = await getFollow()
        //     this.setData({
        //         attentionList:attentionList
        //     })
        // }catch (e) {
        //     showMsg(e)
        // }
    }
})
