import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {showMsg} from "../../utils/util";
import {getPrizeRecord} from "../../http/http-business";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'win-info-'
const url = `${baseUrl}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url:url,
        prizeList:[]
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
        })
    },
    handleGetWin(e){
        const data = e.target.dataset.win
        console.log('handleGetWin' , data)
        const url = `/pages/win-info-input/index?id=${data.id}`
        wx.navigateTo({
            url:url
        })

    },
    async onShow(){
        try {
            let prizeList = await getPrizeRecord()
            console.log('prizeList' , prizeList)
            prizeList = prizeList.map(m=>{
                const l = m.createTime.split(' ')
                m.winTime = l[0]
                return m
            })
            this.setData({
                prizeList:prizeList
            })
        }catch (e) {
            showMsg(e)
        }
    },
    async onLoad(){

    }
})
