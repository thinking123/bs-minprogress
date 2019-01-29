const computedBehavior = require('miniprogram-computed')
Component({

    behaviors: [computedBehavior],
    externalClasses: ['rank-card-external'],

    properties: {
        level: {
            type: String,
            value: '',
            observer(level) {

                return
                wx.nextTick(() => {
                    let q = this.createSelectorQuery()
                    this._observer = this.createIntersectionObserver(this)
                    // let step = 0.02
                    let initRatio = 0.5
                    // this.isSeparate = false
                    this.isIntersection = false

                    this._observer
                        .relativeTo('#rank-card-wrap')
                        .observe('#disk-dot', (res) => {
                            console.log('Intersection');
                            this.isIntersection = true
                        })

                    if (q && this._observer) {
                        const dot = q.select("#disk-dot")
                        const rank = q.select('#rank-card-wrap')
                        if(dot && rank){
                            this.adjust(dot ,rank , initRatio)
                        }

                    }

                })


            }
        },
        name: String,
        school: String,
        song: String,
        vote: Number,
        info: Object
    },
    computed: {
        poleTransform() {
            let angle = this.data.playing ? '7deg' : '0'

            console.log('transofrm roate', `rotate(${angle})`)
            return `rotate(${angle})`
        },
        headerSrc() {
            return `./${this.data.level}.png`
        },
        playStatusSrc() {
            const url = this.data.playing ? 'playing' : 'play'
            return `./${url}.png`
        },
        // diskWidth(){
        //     let rank = wx.createSelectorQuery().select('#rank-card-wrap')
        //     rank.boundingClientRect(rect => {
        //         console.log('w , h',rect.height, rect.width)
        //         const w = rect.width
        //         res(rect)
        //     }).exec()
        //     return `./${this.data.level}.png`
        // },
    },
    data: {
        playing: false,
        diskWidth: '100rpx',
        diskHeight: '100rpx',
        diskRadius: '100rpx',
    },
    onUnload() {
        if (this._observer) this._observer.disconnect()
    },
    methods: {
        adjust(dot ,rank , ratio) {
            // const dot = q.select("#disk-dot")
            // const rank = q.select('#rank-card-wrap')
            let step = 0.02
            ratio += step
            if (ratio > 0.95) {
                return
            }
            rank.boundingClientRect(rect => {
                console.log('w , h', rect.width, rect.height)
                const w = rect.width
                const h = rect.height

                // let diskWidth = w * 0.7522 * 2;
                let diskWidth = w * ratio * 2;
                diskWidth += 'rpx'
                console.log('diskWidth : ', diskWidth)

                this.setData({
                    diskWidth: diskWidth,
                    diskHeight: diskWidth,
                    diskRadius: diskWidth,
                })



                // setTimeout(()=>{
                //     if (!this.isIntersection) {
                //         this.adjust(dot ,rank , ratio)
                //     }
                // } , 200)
                wx.nextTick(() => {
                    if (!this.isIntersection) {
                        this.adjust(dot ,rank , ratio)
                    }
                })
            }).exec()

        },
        getRect() {
            return new Promise((res, rej) => {
                rank.boundingClientRect(rect => {
                    res(rect)
                }).exec()
            })
        },
        getIntersection() {
            return new Promise((res, rej) => {
                this._observer
                    .relativeTo('#rank-card-wrap')
                    .observe('#disk-dot', (res) => {
                        console.log('Intersection');
                        // this.isSeparate = true
                        this.isIntersection = true
                    })
            })
        },
        handlePlay() {
            this.triggerEvent('handlePlay')
            this.setData({
                playing: !this.data.playing
            })
        },
        handleFollow() {
            this.triggerEvent('handleFollow')
        },
        handleVote() {
            this.triggerEvent('handleVote')
        },
        handleHide() {
            this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        }
    }

})
