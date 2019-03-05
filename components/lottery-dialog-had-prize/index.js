const computedBehavior = require('miniprogram-computed')
import {getRatioSize} from "../../utils/util";

const app = getApp()
const base = app.globalData.base

Component({
    behaviors: [computedBehavior],
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        lotteryInfo:{
            type:Object,
            value:null
        }
    },
    computed: {
        prizeTitle(){
            console.log('prizeTitle')
            if(this.data.lotteryInfo && this.data.lotteryInfo.prizeTitle){
                const ls = this.data.lotteryInfo.prizeTitle.split('\\n')
                return ls
            }else{
                return []
            }
        }
    },
    attached(){
        const res = wx.getSystemInfoSync()

        this.px2rpx = 750 / res.windowWidth;
    },
    data: {
        url:base,
        imageSize:{width:'',height:''}

    },
    methods: {
        handleGetPrize() {
            this.triggerEvent('getPrize' , this.data.lotteryInfo)
        },
        handleBindload(e){
            const originWidth = e.detail.width * this.px2rpx,
                originHeight = e.detail.height * this.px2rpx,
                viewWidth  = 245, viewHeight = 245

            this.setData({
                imageSize : getRatioSize(viewWidth , viewHeight , originWidth,originHeight)
            })
        }
    }

})
