const computedBehavior = require('miniprogram-computed')
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
                const ls = this.data.lotteryInfo.prizeTitle.split('\n')
                return ls
            }else{
                return []
            }
        }
    },
    data: {
        url:base
    },
    methods: {
        handleGetPrize() {
            this.triggerEvent('getPrize' , this.data.lotteryInfo)
        }
    }

})
