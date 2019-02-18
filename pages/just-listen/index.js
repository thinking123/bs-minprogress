import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getFollow , putfollowMusic} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'just-listen/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        attentionList: [],
        curMusic:{
            num:8888,
            musicName:'斯蒂芬斯蒂芬',
            musicUserName:'士大夫',
            school:'北京大学',
        },
        curTime:'1:09',
        totalTime:'2:04',
        startX:0,
        endX:0,
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
        })
    },
    handleSliderStart(e){
        if(!e.changedTouches || e.changedTouches.length === 0){
            return
        }
        var startX = e.changedTouches[0].pageX
        this.setData({
            startX:startX
        })
    },
    handleSliderEnd(e){
        if(!e.changedTouches || e.changedTouches.length === 0){
            return
        }
        var that = this
        var endX = e.changedTouches[0].pageX
        this.setData({
            endX:endX
        })
        //计算手指触摸偏移剧距离
        var moveX = this.data.startX - this.data.endX
        //向左移动
        //loop
        if (moveX > 30 ) {
            // this.moveRight();

            this.nextSong()
        }
        if (moveX < -30 ) {
            // this.moveLeft();
            this.preSong()
        }

    },
    async nextSong(){
      console.log('nextSong')
    },
    async preSong(){
        console.log('preSong')
    },
    async handlePreSong(e){
        try {
            this.preSong()
        }catch (e) {
            showMsg(e)
        }
    },
    async handlePlaySong(e){
        try {
        }catch (e) {
            showMsg(e)
        }
    },
    async handleNextSong(e){
        try {
            this.nextSong()
        }catch (e) {
            showMsg(e)
        }
    },
    async handleVote(e){
        try {
        }catch (e) {
            showMsg(e)
        }
    },
    async handleAttention(e){
        try {
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
