import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getFollow , putfollowMusic} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'attention/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        attentionList: []
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
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
    async onLoad(){
        try {
            const attentionList = await getFollow()
            this.setData({
                attentionList:attentionList
            })
        }catch (e) {
            showMsg(e)
        }
    }
})
