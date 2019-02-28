const computedBehavior = require('miniprogram-computed')
const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const base = app.globalData.base
const component = 'rank-card-'
const url = `${base}${component}`

Component({

    behaviors: [computedBehavior],
    externalClasses: ['rank-card-external'],

    properties: {

        level: {
            type: String,
            value: '',
            observer(level) {


                if (level.length === 0) {
                    return
                }

                wx.nextTick(() => {
                    let q = this.createSelectorQuery()

                    // const rank = q.select('#rank-card-disk')
                    const rank = q.select('#gd')
                    // const gd = q.select('#gd')

                    rank.boundingClientRect(rect => {
                        if(rect){

                            let w = rect.width
                            let h = rect.height

                            // let v = Math.min(w , h)
                            // v = v + 'px'

                            console.log('h' , h)
                            h = h + 'px'
                            // console.log(w , h , ' ,set w' , v)
                            this.setData({
                                diskWidth: h,
                                // diskRadius: v
                            })

                        }

                    }).exec()
                })


                return;

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
                    const gd = q.select('#gd')

                    rank.boundingClientRect(rect => {
                        let w = rect.width
                        let h = rect.height

                        let v = Math.min(w , h)
                         v = v + 'px'
                        this.setData({
                            diskWidth: v,
                            diskRadius: v
                        })
                    }).exec()
                    return
                    if (dot && rank) {
                        wrap.boundingClientRect(rectWrap => {
                            const wrapWidth = rectWrap.width
                            const wrapHeight = rectWrap.height
                            console.log('wrapWidth', wrapWidth)

                            rank.boundingClientRect(rect => {
                                let w = rect.width
                                let h = rect.height

                                let rw = w / wrapWidth
                                let rh = h / wrapHeight
                                let count = 0
                                while (rh > 0.6467) {
                                    h -= 2
                                    rh = h / wrapHeight
                                    count++

                                    if (count > 100) {
                                        break
                                    }
                                }
                                count = 0
                                while (rw > 0.8037) {
                                    w -= 2
                                    rw = w / wrapWidth
                                    count++

                                    if (count > 100) {
                                        break
                                    }
                                }


                                let ph = h / wrapWidth

                                if (ph < 0.8037) {
                                    let v = h + 'px'
                                    this.setData({
                                        diskWidth: v,
                                        diskHeight: v,
                                        diskRadius: v
                                    })
                                } else {
                                    let v = w + 'px'
                                    this.setData({
                                        diskWidth: v,
                                        diskHeight: v,
                                        diskRadius: v
                                    })
                                }


                                // while (rh > 0.6467 || rw > 0.8037) {
                                //     h -= 2
                                //     w -= 2
                                //     rw = w / wrapWidth
                                //     rh = h / wrapHeight
                                //     count++
                                //
                                //     if (count > 100) {
                                //         let p = '64.67%'
                                //         this.setData({
                                //             diskWidth: p,
                                //             diskHeight: p,
                                //             diskRadius: p
                                //         })
                                //         console.log('count', count)
                                //         return
                                //     }
                                // }


                                // h += 'px'
                                //
                                //
                                // /*width: 80.37%;
                                // *    height: 64.67%;
                                // * */
                                //
                                // console.log(h)
                                // this.setData({
                                //     diskWidth: v,
                                //     diskHeight: v,
                                //     diskRadius: v
                                // })

                                // this.adjust3(w, dot, rank)
                            }).exec()

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
        // if (this.data._observer) this.data._observer.disconnect()
    },
    computed: {
        poleTransform() {
            let angle = this.data.playing ? '7deg' : '0'
            return `rotate(${angle})`
        },
        headerSrc() {
            return `${this.data.url}${this.data.level}.png`
        },
        playStatusSrc() {
            const url = this.data.playing ? 'playing' : 'play'
            return `${this.data.url}${url}.png`
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
        poleLeft: '10rpx',
        _observer: {},
        url:url
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
            let width = rW + step
            const w = width
            if (width > 1000) {
                return
            }
            width = width + 'px'
            this.setData({
                diskWidth: width,
                diskHeight: width,
                diskRadius: width,
            }, () => {
                wx.nextTick(() => {
                    this.checkIntersection(dot, rank).then(([isInter, dW]) => {
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

                return [isInter, rankR.width]
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
            //现在不显示播放动画，点击后进入歌手home page
            console.log('handlePlay')
            this.triggerEvent('play' , this.data.info)
            return
            this.setData({
                playing: !this.data.playing
            })
        },
        handleFollow() {
            this.triggerEvent('follow' , this.data.info)
        },
        handleVote() {
            this.triggerEvent('vote', this.data.info)
        }
    }

})
