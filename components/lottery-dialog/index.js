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
                if(v){
                    this.setData({
                        lotterying: false
                    })
                }
            }
        },
        lotteryMusic:Object,
        gid:String,
    },
    data: {
        url: base,
        lotterying: false
    },
    methods: {
        handleHide() {
            this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        },
        async handleLottery() {
            try {
                this.setData({
                    lotterying: true
                })

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
