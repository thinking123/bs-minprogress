import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getAchievement} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'my-achieve/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        achieveList:[]
        // ,
        // testShow:true
    },
    handleReturn() {
        wx.navigateBack({
            delta: 1
        })
    },
    async onLoad(){
        try {
            const res = await getAchievement()
            console.log('res' , res)
        }catch (e) {
            showMsg(e)
        }
    }
})
