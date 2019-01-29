const computedBehavior = require('miniprogram-computed')
Component({

    behaviors: [computedBehavior],
    externalClasses: ['rank-card-external'],

    properties: {
        level: {
            type: String,
            value: '',
            observer(level) {
                return;
                if (level.length === 0) {
                    return
                }
                wx.nextTick(() => {
                    // this.isIntersection = false
                    // const _observer = this.createIntersectionObserver(this, {
                    //     left: 0,
                    //     top: 0
                    // })
                    // this.setData({
                    //     _observer: _observer
                    // })
                    // this.data._observer
                    //     .relativeTo('.rank-card-disk')
                    //     .observe('.disk-dot', (res) => {
                    //         console.log('Intersection');
                    //         // wx.nextTick(()=>{
                    //         //     this.isIntersection = true
                    //         //     this.data._observer.disconnect()
                    //         // })
                    //         this.isIntersection = true
                    //         this.data._observer.disconnect()
                    //     })

                    let q = this.createSelectorQuery()
                    const dot = q.select("#disk-dot")
                    const rank = q.select('#rank-card-disk')

                    if (dot && rank) {
                        rank.boundingClientRect(rect => {
                            const w = rect.width
                            const h = rect.height
                            this.initW = w
                            this.initH = h
                            this.adjust3(w, dot, rank)
                        }).exec()

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
    detached() {
        if (this.data._observer) this.data._observer.disconnect()
    },
    computed: {
        poleTransform() {
            let angle = this.data.playing ? '7deg' : '0'
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
        diskWidth: '10rpx',
        diskHeight: '10rpx',
        diskRadius: '10rpx',
        _observer: {}
    },
    methods: {

        adjust2(rank, width) {
            return
            let step = 10
            width += step
            if (width > 1000) {
                return
            }
            width = width * 2 + 'rpx'
            this.setData({
                diskWidth: width,
                diskHeight: width,
                diskRadius: width,
            }, () => {
                setTimeout(() => {
                    rank.boundingClientRect(rect => {
                        console.log('rect width', rect.width)
                        this.adjust(rank, rect.width)
                    }).exec()
                }, 50)
                // wx.nextTick(() => {
                //     rank.boundingClientRect(rect => {
                //         console.log('rect width' , rect.width)
                //         this.adjust( rank, rect.width)
                //     }).exec()
                // })
            })


        },
        adjust3(rW, dot, rank) {
            let step = 2
            let width = rW +  step
            const w = width
            if (width > 1000) {
                return
            }
            width = width  + 'px'
            this.setData({
                diskWidth: width,
                diskHeight: width,
                diskRadius: width,
            }, () => {
                wx.nextTick(()=>{
                    this.checkIntersection(dot, rank).then(([isInter , dW]) => {
                        if (!isInter) {
                            this.adjust3(dW, dot, rank)
                        } else {
                            console.log('end adjust')
                        }
                    })
                })

            })
        },
        getRect(node) {
            return new Promise((res, rej) => {
                node.boundingClientRect(rect => {
                    res(rect)
                }).exec()
            })
        },
        checkIntersection(dot, rank) {

            return Promise.all([this.getRect(dot), this.getRect(rank)]).then(rect => {
                const dotR = rect[0]
                const rankR = rect[1]
                const dX = dotR.left
                const dY = dotR.top
                const rX = rankR.left + rankR.width
                const rY = rankR.top + rankR.height

                let isInter = false
                isInter = dX < rX && dY < rY

                console.log('dot :', dX, dY, ' rank ', rX, rY)
                // return new Promise((res, rej) => {
                //     res(isInter)
                // })

                return [isInter , rankR.width]
            })
        },
        adjust1(dot, rank, ratio) {
            // let step = 0.02
            let step = 0.02
            ratio += step
            if (ratio > 0.9) {
                return
            }
            console.log(this.data.level, ' ', ratio)

            let diskWidth = this.initW * ratio * 2;
            diskWidth += 'rpx'

            this.setData({
                diskWidth: diskWidth,
                diskHeight: diskWidth,
                diskRadius: diskWidth,
            }, () => {
                wx.nextTick(() => {
                    if (!this.isIntersection) {
                        this.adjust(dot, rank, ratio)
                    }
                })
            })
            // wx.nextTick(() => {
            //     if (!this.isIntersection) {
            //         this.adjust(dot, rank, ratio)
            //     }
            // })
        },
        // getRect() {
        //     return new Promise((res, rej) => {
        //         rank.boundingClientRect(rect => {
        //             res(rect)
        //         }).exec()
        //     })
        // },
        getIntersection() {
            return new Promise((res, rej) => {
                this.data._observer
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
