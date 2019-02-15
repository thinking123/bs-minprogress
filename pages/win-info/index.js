import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {showMsg} from "../../utils/util";
import {getPrizeRecord} from "../../http/http-business";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'win-info/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        prizeList:[
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            },
        ]
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
            url:'/pages/win-info-input/index'
        })

    },
    async onLoad(){
        try {
            const prizeList = await getPrizeRecord()
            console.log('prizeList' , prizeList)
            this.setData({
                prizeList:prizeList
            })
        }catch (e) {
            showMsg(e)
        }
    }
})
