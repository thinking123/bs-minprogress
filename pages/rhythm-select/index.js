import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {showMsg , showLoading ,hideLoading} from "../../utils/util";
import {saveFile} from "../../utils/file";
import {recordDir} from "../../utils/constant";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const baseAudioUrl = app.globalData.baseAudioUrl
const page = 'rhythm-select-'
const url = `${base}${page}`
// const url = './'
const recordMaxTime = 10
const options = {
    duration: 60000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'aac',
    frameSize: 50
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        left: '136rpx',
        url: url,
        isPlaying: false,
        isRecording: false,
        isRecorded: false,
        //最大录音时间 10s
        remainTime: recordMaxTime,
        //是否点击了音乐按钮
        isPressMusicBtn: false,
        tempFilePath: null,
        icon1Taped:false,
        icon2Taped:false,
        icon3Taped:false,
        icon4Taped:false,
        icon5Taped:false,
        icon6Taped:false,
        icon7Taped:false,

        timeline:[]
    },
    handleDev(e) {
        const data = e.target.dataset.dev
        let left = 0

        switch (data) {
            case "0" :
                left = 68 * 2;
                break
            case "1" :
                left = 149 * 2;
                break
            case "2" :
                left = 230 * 2;
                break

        }

        left += 'rpx'

        console.log('handleDev', data, left)
        this.setData({
            left: left
        })

    },
    handleRecord(e) {
        if (this.data.isRecording) {
            this.recorderManager.stop()
        } else {
            //IOS 开始录音的时候不能为静音模式
            //或者开启 播放录音的:obeyMuteSwitch
            this.recorderManager.start(options)
        }
    },
    handlePlay(e) {
        if (!this.isHadRecord()) {
            this.showModal('您还没有录音')
            return
        }

        if (this.data.isPlaying) {
            this.ctx.stop()
            this.setData({
                isPlaying: false
            })
        } else {
            this.ctx.src = this.data.tempFilePath
            this.ctx.play()
            this.setData({
                isPlaying: true
            })
        }
        // this.setData({
        //     isPlaying: !this.data.isPlaying
        // })
    },
    handleSave(e) {
        if (!this.isHadRecord()) {
            this.showModal('您还没有录音')
            return
        }
        this._saveFile()
        console.log('handleSave')
    },
    async _saveFile(){
        try {
            showLoading('正在保存...')
            console.log('this.data.tempFilePath' , this.data.tempFilePath)
            const path = await saveFile(this.data.tempFilePath , recordDir)
            this.setData({
                tempFilePath:path
            })
        }catch (e) {
            showMsg(e)
        }finally {
            hideLoading()
        }
    },
    handleMusicPerson(e) {
        if (!this.isHadRecord()) {
            this.showModal('您还没有录音')
            return
        }

        // if(this.ctx){
        //     this.ctx.stop()
        // }
        // if(this.time){
        //     clearInterval(this.time)
        //     this.time = null
        // }
        // if(this.recorderManager){
        //     this.recorderManager.stop()
        // }


        const url = `/pages/rhythm-share/index?temppath=${this.data.tempFilePath}`
        console.log('url' , url)
        wx.navigateTo({
            url: url
        })
    },
    setTaped(key){

    },
    handleTouching(e) {
        const key = e.detail
        if(this.data.isRecording){
            this.timeline.push({
                key:key,
                time:(this.getTime() - this.startTime)
            })
        }
        switch (key) {
            case 'do':
                this.setData({
                    icon1Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon1Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 're':
                this.setData({
                    icon2Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon2Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 'mi':
                this.setData({
                    icon3Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon3Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 'fa':
                this.setData({
                    icon4Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon4Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 'sol':
                this.setData({
                    icon5Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon5Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 'la':
                this.setData({
                    icon6Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon6Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
            case 'xi':
                this.setData({
                    icon7Taped: true
                })
                this.time = setTimeout(()=>{
                    this.setData({
                        icon7Taped: false
                    })
                    clearTimeout(this.time)
                } , 250)

                break
        }
        this.playMusic(key)
    },
    startPlayRecord(){
        this.setData({
            isPlaying: true
        })
        this.startTime = this.getTime()
        this.cloneTimeline = [...this.timeline]
        this.playRecordTime = setInterval(()=>{
            const offTime = this.getTime() - this.startTime
            if(this.cloneTimeline.length > 0){
                const cur = this.cloneTimeline[0]
                if(cur.time > offTime - 100 && cur.time < offTime + 100){
                    this.handleTouching({
                        key:cur.key
                    })
                    this.cloneTimeline.shift()
                }
            }
        } , 100)
    },
    stopPlayRecord(){
        this.setData({
            isPlaying: false
        })
        clearInterval(this.playRecordTime)
    },
    getTime(){
        const d = new Date()
        const t = d.getTime();
        console.log('time' , t)
        return t
    },
    startRecord(){
        // this.show('录音开始')
        this.startTime = this.getTime()
        this.timeline = []
        this.setData({
            isPlaying: false,
            isRecording:true,
            isPressMusicBtn:false,
            tempFilePath:null,
            remainTime:recordMaxTime,
            isRecorded:false
        })

        this.ctx.stop()
        this.ctx.src = null

        this.time = setInterval(()=>{
            const remain = --this.data.remainTime
            console.log('remain' , remain)
            this.setData({
                remainTime: remain
            })

            if(remain <= 0){
                this.recorderManager.stop()
            }
        } , 1000)
    },
    stopRecord(tempFilePath){

        // this.show('录音结束')
        if(this.time){
            clearInterval(this.time)
            this.time = null
        }
        this.setData({
            isPlaying: false,
            isRecording: false,
            tempFilePath:tempFilePath,
            isRecorded:this.data.isPressMusicBtn
        })


        this.ctx.stop()
        this.ctx.src = null
    },
    onLoad() {
        this.recorderManager = wx.getRecorderManager()

        this.recorderManager.onStart(() => {
            this.startRecord()
        })
        this.recorderManager.onPause(() => {
            console.log('recorder pause')
        })
        this.recorderManager.onStop((res) => {
            const {tempFilePath} = res
            this.stopRecord(res.tempFilePath)
        })
        this.recorderManager.onFrameRecorded((res) => {
            const {frameBuffer} = res
            console.log('frameBuffer.byteLength', frameBuffer.byteLength)
        })
        this.recorderManager.onError((err) => {
            console.log('onError', err.errMsg)
            this.stopRecord(null)
        })

        this.recorderManager.onInterruptionBegin((err) => {
            console.log('onInterruptionBegin', err)
        })

        this.recorderManager.onInterruptionEnd((err) => {
            console.log('onInterruptionEnd', err)
        })


        this.ctx = wx.createInnerAudioContext()

        // this.ctx.autoplay = true
        /*
        * obeyMuteSwitch	boolean	true	否
        * （仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音
        * */
        wx.setInnerAudioOption({
            obeyMuteSwitch: false
        })
        this.ctx.onPlay(() => {
            console.log('开始播放')
            // this.show('开始播放')
            // this.startPlayRecord()
        })
        this.ctx.onEnded(() => {
            console.log('播放结束')
            // this.stopPlayRecord()
            this.setData({
                isPlaying: false
            })
            // this.show('播放结束')
        })
        this.ctx.onError((res) => {
            // this.stopPlayRecord()
            // console.log(res.errMsg)
            // console.log(res.errCode)
            this.setData({
                isPlaying: false
            })
            // this.showModal(err.errMsg , 'ctx onError')
        })

    },
    isHadRecord() {
        return this.data.isRecorded
    },
    playMusic(key) {
        const ctx = this.ctx
        //停止之前的播放
        ctx.stop()

        this.setData({
            isPlaying: false,
            isPressMusicBtn: this.data.isRecording
        })


        const url = `${baseAudioUrl}gt/A${key == 'do' ? '2' : '3'}.mp3`
        ctx.src = url
        ctx.play()
    },
    show(msg) {
        const obj = {
            title: msg,
        }
        wx.showToast(obj)
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
    },
    clearResource(){
        if(this.ctx){
            this.ctx.stop()
            this.ctx.destroy()
            this.ctx = null
        }
        if(this.time){
            clearInterval(this.time)
            this.time = null
        }
        if(this.recorderManager){
            this.recorderManager.stop()
            this.recorderManager = null
        }
    },
    onHide(){
        if(this.ctx){
           this.data.isPlaying && this.ctx.stop()
        }
        if(this.time){
            clearInterval(this.time)
            this.time = null
        }
        if(this.recorderManager){
            this.data.isRecording && this.recorderManager.stop()
        }
    },
    onUnload(){
        this.clearResource()
    }
})
