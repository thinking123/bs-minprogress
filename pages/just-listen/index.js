import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {
    getFollow,
    putfollowMusic,
    casualListen,
    followMusic,
    voteMusic,
    casualListenTopFive,
    casualListenHistory,
    addCasualListenHistory
} from "../../http/http-business";
import {showMsg, secondToMinus} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'just-listen/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url: url,
        rankListOther: [],
        curMusic: {
            num: 0,
            musicName: '-',
            musicUserName: '-',
            school: '-',
            voteState: 0,
            followState: 0,
        },
        currentNum: 1,
        isHasNext: false,


        curTime: '0',
        curProgress:'0',
        totalTime: '0',
        startX: 0,
        endX: 0,


        isDraging:false,
        canDraging:true,
        isPlaying: false,
        maxBuffer: '0',
        isSeeking:false
    },
    handleSliderStart(e) {
        if (!e.changedTouches || e.changedTouches.length === 0) {
            return
        }
        var startX = e.changedTouches[0].pageX
        this.setData({
            startX: startX
        })
    },
    handleSliderEnd(e) {
        if (!e.changedTouches || e.changedTouches.length === 0) {
            return
        }
        var that = this
        var endX = e.changedTouches[0].pageX
        this.setData({
            endX: endX
        })
        //计算手指触摸偏移剧距离
        var moveX = this.data.startX - this.data.endX
        //向左移动
        //loop
        if (moveX > 30) {
            // this.moveRight();

            this.nextSong()
        }
        if (moveX < -30) {
            // this.moveLeft();
            this.preSong()
        }

    },
    async nextSong() {
        console.log('nextSong')
    },
    async preSong() {
        console.log('preSong')
    },
    async handlePreSong(e) {
        try {
            this.preSong()
        } catch (e) {
            showMsg(e)
        }
    },
    handlePlaySong(e) {
        this.playAudio()
    },
    async handleNextSong(e) {
        try {
            this.nextSong()
        } catch (e) {
            showMsg(e)
        }
    },
    async handleFollowed(e) {
        try {
            await this._putfollowMusic(e.target.dataset.rank.id)
            await this._casualListenTopFive()
        } catch (e) {
            showMsg(e)
        }

    },
    async handleNotFollowed(e) {
        try {
            await this._followMusic(e.target.dataset.rank.id)
            await this._casualListenTopFive()
        } catch (e) {
            showMsg(e)
        }

    },
    async handleVote(e) {
        try {
            await this._voteMusic(e.target.dataset.rank.id)
            await this._casualListenTopFive()
        } catch (e) {
            showMsg(e)
        }

    },
    async handleCurVote(e) {
        try {
            const curMusic = await this._voteMusic(this.data.curMusic.musicId)
            this.setData({
                curMusic: curMusic,
            })

        } catch (e) {
            showMsg(e)
        }

    },
    async handleCurAttention(e) {
        try {
            const curMusic = await this._followMusic(this.data.curMusic.musicId)
            this.setData({
                curMusic: curMusic,
            })
        } catch (e) {
            showMsg(e)
        }

    },
    async _casualListen() {
        try {
            const {bsCasual} = await casualListen()
            this.setData({
                curMusic: bsCasual
            })

            this.setAudioSrc(bsCasual.musicUrl)
        } catch (e) {
            showMsg(e)
        }
    },
    async _casualListenHistory() {
        try {
            const {bsCasual, currentNum, isHasNext, musicList} = await casualListenHistory(this.data.currentNum)
            this.setData({
                curMusic: bsCasual,
                currentNum: currentNum,
                isHasNext: isHasNext,
                rankListOther: musicList,
            })
        } catch (e) {
            showMsg(e)
        }
    },
    onLoad() {
        this.init()
    },

    async _casualListenTopFive() {
        const list = await casualListenTopFive(this.data.curMusic.schoolId, this.data.curMusic.musicId)
        this.setData({
            rankListOther: list,
        })
    },
    async _followMusic(musicId) {
        const curMusic = await followMusic(musicId)
        return curMusic
    },
    async _putfollowMusic(musicId) {
        const curMusic = await putfollowMusic(musicId)
        return curMusic
    },
    async _voteMusic(musicId) {
        const curMusic = await voteMusic(musicId)
        return curMusic
    },
    setAudioSrc(src) {
        if (this.ctx) {
            this.ctx.src = src
        }

    },
    initAudio() {
        const ctx = this.ctx = wx.createInnerAudioContext()
        ctx.autoplay = true
        ctx.onPlay(() => {
            console.log('开始播放')
            const duration = Math.round(ctx.duration)
            const totalTime = secondToMinus(duration)
            this.setData({
                isPlaying: true,
                totalTime: totalTime,
                canDraging:true,
                isSeeking:false
            })

        })
        ctx.onPause(() => {
            console.log('onPause')
            this.setData({
                isPlaying: false,
                isSeeking:false
            })

        })
        ctx.onStop(() => {
            console.log('onStop')
            this.setData({
                isPlaying: false,
                isSeeking:false
            })
        })
        ctx.onEnded(() => {
            console.log('onEnded')
            this.setData({
                isPlaying: false,
                isSeeking:false
            })
        })
        ctx.onTimeUpdate(() => {
            console.log('onTimeUpdate')
            const currentTime = Math.round(ctx.currentTime)
            const curTime = secondToMinus(currentTime)
            const buffered = ctx.buffered





            const duration = Math.round(ctx.duration)
            const totalTime = secondToMinus(duration)

            let curProgress = this.data.curProgress
            if(duration > 0 && !this.data.isDraging){
                 curProgress = (currentTime * 1.0 / duration) * 100  + '%'
            }


            let maxBuffer = this.data.maxBuffer

            if(duration > 0){
                maxBuffer = buffered  * 1.0 / ctx.duration

                console.log('maxBuffer', maxBuffer)
            }

            if(this.data.isSeeking){
                return
            }
            this.setData({
                curTime: curTime,
                maxBuffer: maxBuffer,
                totalTime: totalTime
            })

            if(!this.data.isDraging){
                this.setData({
                    curProgress:curProgress
                })
            }else{
                console.log('isDragingisDragingisDraging')
            }
        })
        ctx.onError(() => {
            console.log('onError')
            this.setData({
                isPlaying: false,
                canDraging:false,
                isSeeking:false
            })
        })
        ctx.onWaiting(() => {
            console.log('onWaiting')
            this.setData({
                canDraging:false,
                isSeeking:false
            })
        })
        ctx.onSeeking((e) => {
            console.log('onSeeking', e)
            // this.setData({
            //     isSeeking:true
            // })
        })
        ctx.onSeeked((e) => {
            console.log('onSeeked', e)
            this.setData({
                isSeeking:false,
                canDraging:true,
            })
        })

    },
    handleSliderVoiceProgress(e) {
        let seek = e.detail
        seek = parseFloat(seek) / 100
        console.log('seek', seek)
        this.setAudioVoice(seek)
    },
    setAudioVoice(seek) {
        if (this.ctx && seek < 1 && seek > 0) {
            console.log('setAudioVoice voice', seek)
            this.ctx.volume = seek
        }
    },
    handleStartSliderMusicProgress(e) {
        this.setData({
            isDraging:true
        })
    },
    handleChangeSliderMusicProgress(e) {
        let seek = e.detail
        let seekRadio = parseFloat(seek) / 100
        if(seekRadio > 0 && seekRadio < 1 && seekRadio < this.data.maxBuffer){
            this.setData({
                curProgress:seek
            })
        }

    },
    handleCancelSliderMusicProgress(e) {
        this.setData({
            isDraging:false
        })
    },
    handleSliderMusicProgress(e) {
        this.setData({
            isDraging:false
        })

        let seek = e.detail
        seek = parseFloat(seek) / 100
        console.log('seek', seek)
        this.seekAudio(seek)
    },
    seekAudio(seek) {

        console.log('seek', seek , this.data.canDraging)
        if (this.ctx && seek < 1 && seek > 0 && this.data.canDraging) {
            if(!this.data.isPlaying){
                const curProgress = seek * 100 + '%'
                this.setData({
                    curProgress:curProgress
                })
            }
            seek = seek * this.ctx.duration
            console.log('seek time', secondToMinus(Math.round(seek)))
            this.ctx.seek(seek)

        }
    },
    async init() {
        try {
            this.initAudio()
            await this._casualListen()
            await this._casualListenTopFive()
        } catch (e) {
            showMsg(e)
        }
    },
    playAudio() {
        if (this.ctx) {
            this.data.isPlaying ? this.ctx.pause() : this.ctx.play()
        }
    },
    onShareAppMessage(obj) {
        console.log('onShareAppMessage', obj)

        return obj
    }
})
