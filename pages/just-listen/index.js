import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {
    getFollow,
    putfollowMusic,
    casualListen,
    followMusic,
    voteMusic,
    casualListenTopFive,
    casualListenHistory,
    addCasualListenHistory,
    isYesPrize
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
        preMusicId: null,
        currentNum: 0,
        isHasNext: 1,


        curTime: '0',
        curProgress: '0',
        totalTime: '0',
        startX: 0,
        endX: 0,


        isDraging: false,
        canDraging: true,
        isPlaying: false,
        maxBuffer: '0',
        isSeeking: false,

        gid:null,
        showLotteryDialog:false,
        showNoLotteryDialog:false,
        showHadLotteryDialog:false,
        lotteryInfo:null,
        isCanLottery:false,
        curMusicHadLottery:false,
        lotteryMusic:null,
        // lotteryInfo:{
        //     prizeTitle:'恭喜您获得\n苹果手机一部',
        //     prizeName:'苹果手机X 256G',
        // }
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
            this.preSong()

        }
        if (moveX < -30) {
            // this.moveLeft();
            this.nextSong()
        }

    },
    async nextSong() {
        console.log('nextSong')
        try {
            // this.playAudio(true)
            const oldMusic = await this._casualListen()
            await addCasualListenHistory(oldMusic.musicId)
            await this._isCanLottery()
            // await this._casualListenHistory()
            // await this._casualListenHistory()
        } catch (e) {
            showMsg(e)
        }

    },
    async preSong() {
        console.log('preSong')
        try {
            const isHasNext = await this._casualListenHistory()
            if(isHasNext == 1){
                await this._casualListenTopFive()
            }
        } catch (e) {
            showMsg(e)
        }
    },
    handleHideLotteryDialog(e){
      this.setData({
          showLotteryDialog:false
      })
    },
    handleHideNoLotteryDialog(e){
        this.setData({
            showNoLotteryDialog:false
        })
    },
    handleGetPrize(e){
      const lotteryInfo = e.detail
        this.setData({
            showHadLotteryDialog:false
        })

        wx.navigateTo({
            url: '/pages/win-info/index'
        })
    },
    handlePreSong(e) {
        this.preSong()
    },
    handlePlaySong(e) {
        this.playAudio()
    },
    handleSingerHome(e) {
        const id = e.target.dataset.rank.userId
        this.gotoSingerHome(id)
    },
    gotoSingerHome(id) {
        const url = `/pages/singer-home/index?id=${id}`
        wx.navigateTo({
            url: url
        })
    },
    handleLottery(e){
        const prize = e.detail
        console.log('prize' , prize)
        //prizeImage 为空就是没有奖品
        if(!prize.prizeImage){
            this.setData({
                showLotteryDialog: false,
                showNoLotteryDialog: true
            })
        }else{
            this.setData({
                showLotteryDialog: false,
                showHadLotteryDialog: true,
                lotteryInfo:prize
            })
        }
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
            const {id, num, followState, voteState} = await this._voteMusic(this.data.curMusic.musicId)
            this.data.curMusic.num = num
            this.data.curMusic.followState = followState
            this.data.curMusic.voteState = voteState
            this.setData({
                curMusic: this.data.curMusic,
            })

        } catch (e) {
            showMsg(e)
        }

    },
    async handleCurAttention(e) {
        try {
            if (this.data.curMusic.followState == 0) {
                const {id, num, followState, voteState} = await this._followMusic(this.data.curMusic.musicId)
                this.data.curMusic.num = num
                this.data.curMusic.followState = followState
                this.data.curMusic.voteState = voteState
                this.setData({
                    curMusic: this.data.curMusic,
                })
            } else {
                //已经关注
                const {id, num, followState, voteState} = await this._putfollowMusic(this.data.curMusic.musicId)
                this.data.curMusic.num = num
                this.data.curMusic.followState = followState
                this.data.curMusic.voteState = voteState
                this.setData({
                    curMusic: this.data.curMusic,
                })
            }

        } catch (e) {
            showMsg(e)
        }

    },
    async _isCanLottery(){
        //0:不能抽奖
      const res = await isYesPrize()
      this.setData({
          isCanLottery:res == 1
      })
      return this.data.isCanLottery
    },
    async _casualListen() {
        try {

            this.stopAudio()
            const {bsCasual,gid} = await casualListen()
            const oldMusic = this.data.curMusic
            this.setData({
                curMusic: bsCasual,
                gid:gid,
                isHasNext:1,
                curMusicHadLottery: false
            })

            this.setAudioSrc(bsCasual.musicUrl)

            return oldMusic
        } catch (e) {
            showMsg(e)
        }
    },
    async _casualListenHistory() {
        try {

            if(this.data.isHasNext == 1){
                //第一次的时候不传id
                const  musicId = this.data.preMusicId ? this.data.preMusicId : ''
                const {bsCasual, isHasNext , preMusicId , gid} = await casualListenHistory(musicId)

                this.stopAudio()
                this.setData({
                    curMusic: bsCasual,
                    gid:gid,
                    preMusicId:preMusicId,
                    isHasNext:isHasNext,
                    curMusicHadLottery: false
                })
                this.setAudioSrc(bsCasual.musicUrl)
            }else{
                showMsg('没有上一首歌曲了')
            }

            return this.data.isHasNext
            // return bsCasual
        } catch (e) {
            showMsg(e)
        }
    },
    onLoad() {
        this.init()
    },
    onHide() {
        if (this.ctx) {
            this.ctx.pause()
        }
    },
    onUnload() {
        if (this.ctx) {
            this.ctx.stop()
            this.ctx.destroy()
            this.ctx = null
        }
    },
    async _casualListenTopFive() {
        if(this.data.curMusic){
            const list = await casualListenTopFive(this.data.curMusic.schoolId, this.data.curMusic.musicId)
            this.setData({
                rankListOther: list,
            })
        }

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
            this.ctx.play()
        }
    },
    initAudio() {
        const ctx = this.ctx = wx.createInnerAudioContext()
        ctx.autoplay = false
        ctx.obeyMuteSwitch = true
        ctx.onPlay(() => {
            console.log('开始播放')
            const duration = Math.round(ctx.duration)
            const totalTime = secondToMinus(duration)
            this.setData({
                isPlaying: true,
                totalTime: totalTime,
                canDraging: true,
                isSeeking: false
            })

        })
        ctx.onPause(() => {
            console.log('onPause')
            this.setData({
                isPlaying: false,
                isSeeking: false
            })


        })
        ctx.onStop(() => {
            console.log('onStop')
            this.setData({
                isPlaying: false,
                isSeeking: false
            })
        })
        ctx.onEnded(() => {
            console.log('onEnded')
            this.setData({
                isPlaying: false,
                isSeeking: false
            })
            this.nextSong()
        })
        ctx.onTimeUpdate(() => {
            // console.log('onTimeUpdate')
            const currentTime = Math.round(ctx.currentTime)
            const curTime = secondToMinus(currentTime)
            const buffered = ctx.buffered


            const duration = Math.round(ctx.duration)
            const totalTime = secondToMinus(duration)

            let curProgress = this.data.curProgress
            if (duration > 0 && !this.data.isDraging) {
                curProgress = (currentTime * 1.0 / duration) * 100 + '%'
            }


            let maxBuffer = this.data.maxBuffer

            if (duration > 0) {
                maxBuffer = buffered * 1.0 / ctx.duration

                // console.log('maxBuffer', maxBuffer)
            }

            if (this.data.isSeeking) {
                return
            }
            if(currentTime > 20 && !this.data.curMusicHadLottery && this.data.isCanLottery){
                //当前歌曲已经抽奖了,一首歌曲只能抽奖一次
                this.setData({
                    curMusicHadLottery: true,
                    showLotteryDialog:true,
                    lotteryMusic:this.data.curMusic
                })
            }
            this.setData({
                curTime: curTime,
                maxBuffer: maxBuffer,
                totalTime: totalTime
            })

            if (!this.data.isDraging) {
                this.setData({
                    curProgress: curProgress
                })
            } else {
                // console.log('isDragingisDragingisDraging')
            }
        })
        ctx.onError(() => {
            console.log('onError')
            this.setData({
                isPlaying: false,
                canDraging: false,
                isSeeking: false
            })
        })
        ctx.onWaiting(() => {
            console.log('onWaiting')
            this.setData({
                // canDraging: false,
                isSeeking: false
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
                isSeeking: false,
                canDraging: true,
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
            isDraging: true
        })
    },
    handleChangeSliderMusicProgress(e) {
        let seek = e.detail
        let seekRadio = parseFloat(seek) / 100
        if (seekRadio > 0 && seekRadio < 1 && seekRadio < this.data.maxBuffer) {
            this.setData({
                curProgress: seek
            })
        }

    },
    handleCancelSliderMusicProgress(e) {
        this.setData({
            isDraging: false
        })
    },
    handleSliderMusicProgress(e) {
        this.setData({
            isDraging: false
        })

        let seek = e.detail
        seek = parseFloat(seek) / 100
        console.log('seek', seek)
        this.seekAudio(seek)
    },
    seekAudio(seek) {

        console.log('seek', seek, this.data.canDraging)
        if (this.ctx && seek < 1 && seek > 0 && this.data.canDraging) {
            if (!this.data.isPlaying) {
                const curProgress = seek * 100 + '%'
                this.setData({
                    curProgress: curProgress
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
            await this._isCanLottery()
            // await this._casualListenHistory()
        } catch (e) {
            showMsg(e)
        }
    },
    playAudio() {
        if (this.ctx) {
            this.data.isPlaying ? this.ctx.pause() : this.ctx.play()
        }
    },
    stopAudio(){
        if (this.ctx) {
            this.ctx.stop()
        }
    },
    onShareAppMessage(obj) {
        console.log('onShareAppMessage', obj)

        return obj
    }
})
