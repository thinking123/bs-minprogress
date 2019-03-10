import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {luckDraw, prizeImg} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const base = app.globalData.base
const component = 'register-error-dialog/'
const url = `${baseComponentUrl}${component}`
Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer(v) {
                console.log('show' , this.data.lotterying)
                if(!v){

                    this.setData({
                        lotterying: false,
                        isLottering: false,
                    })
                    clearTimeout(this.time)

                }else{
                    this.setData({
                        lotterying: false,
                        isLottering: false,
                    })
                    prizeImg().then(prizeImgs => {
                        console.log('lotteryInfo' , prizeImgs)
                        this.setData({
                            prizeImgs: prizeImgs
                        })
                    })
                }
            }
        },
        lotteryMusic:Object,
        gid:String,
    },
    data: {
        url: base,
        lotterying: false,
        isLottering:false,
        prizeImgs:[],
        animationData:{}
    },
    detached(){
      clearTimeout(this.time)
    },
    methods: {
        handleHide() {
            !this.data.isLottering && this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                !this.data.isLottering && this.triggerEvent('hidetap')
            }
        },
        handleStart(){
            if(this.data.isLottering || this.data.lotterying){
                console.log('isLottering' , this.data.isLottering)
                console.log('lotterying' , this.data.lotterying)
                return
            }
            this.setData({
                lotterying: true,
                isLottering:true
            })
          this.time = setTimeout(()=>{
              this.setData({
                  isLottering:false
              })
              this.handleLottery()
          } , 1000)
        },
        async handleLottery() {
            try {
                //prizeImage 为空就是没有奖品
                const prize = await luckDraw(
                    this.data.gid ,
                    this.data.lotteryMusic.musicId
                    )

                this.triggerEvent('lottery' , prize)
            } catch (e) {
                showMsg(e)
                this.triggerEvent('hidetap')
            }
        }
    },
    hide() {
        this.setData({
            lotterying: false
        })
    }

})
