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
            observer(newVal, oldVal, changedPath) {
                if (newVal) {
                    wx.nextTick(() => {
                        //
                    })
                }
            }
        },
        lotteryMusic:Object
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

                const res = await luckDraw(
                    this.data.lotteryMusic.gid ,
                    this.data.lotteryMusic.musicId
                    )
            } catch (e) {
                showMsg(e)
            }finally {
                // this.setData({
                //     visible: false
                // })
            }
        }
    },
    hide() {
        this.setData({
            lotterying: false
        })
    }

})
