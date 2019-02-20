import {getRandomInt , showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'rhythm-share/'
const url = `${baseUrl}${page}`
// const url = './'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:url,
        isPlaying:false,
        bg:'',
        shareBg:'',
        rand:1
    },
    handlePlay(e) {
        console.log('handlePlay' , this.data.isPlaying)
        if(this.tempFilePath){
            this.data.isPlaying ?  this.stop() : this.play()
        }else{
            this.showModal('没有要播放的录音')
        }
    },
    handleShare(e) {
        console.log('handleShare')
    },
    handleRegister(e) {
        console.log('handleRegister')
        wx.navigateTo({
            url:'/pages/register/index'
        })
    },
    onShareAppMessage(obj){
        console.log('onShareAppMessage' , obj)

        // showMsg(this.data.rand.toString())
        return {
            title:'我的音乐人格',
            path:`/pages/rhythm-share/index?rand=${this.data.rand}`,
            imageUrl:`${this.data.url}${this.data.shareBg}`
        }
    },
    onLoad(option) {



        const rand = option && option.rand ? option.rand : getRandomInt(1 , 5)
        // console.log('rand ' , rand)
        // showMsg(option && option.rand ? `have rand${rand}` : 'no rand')
        const bg = `bg${rand}.png`
        const shareBg = `share-bg${rand}.jpg`
        this.setData({
            bg:bg,
            shareBg:shareBg,
            rand:rand
        })


        console.log(option)
        this.tempFilePath = option ? option.temppath : null

        if(this.tempFilePath){
            this.initPlay()
        }





    },
    clearResource(){
        if(this.ctx){
            this.ctx.stop()
            this.ctx.destroy()
            this.ctx = null
        }
    },
    onHide(){
        if(this.ctx){
            this.data.isPlaying && this.ctx.stop()
        }
    },
    onUnload(){
        this.clearResource()
    },
    initPlay(){
        this.ctx = wx.createInnerAudioContext()
        this.ctx.onPlay(() => {
            console.log('开始播放')
        })
        this.ctx.onEnded(() => {
            console.log('播放结束')
            this.setData({
                isPlaying: false
            })
        })
        this.ctx.onError((res) => {
            console.log('error' , res)
            this.setData({
                isPlaying: false
            })
        })
    },
    play(){
        this.ctx.src = this.tempFilePath
        this.ctx.play()
        this.setData({
            isPlaying: true
        })
    },
    stop(){
        this.ctx.stop()
        this.setData({
            isPlaying: false
        })
    },
    showModal(msg, title = '') {
        wx.showModal({
            title: title.length === 0 ? '提示' : title,
            content: msg,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})
