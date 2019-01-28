const computedBehavior = require('miniprogram-computed')
Component({
    behaviors: [computedBehavior],

    properties: {
        images: {
            type: Array,
            value: [],
            observer(images) {
                if (images && images.length > 0) {
                    const len = images.length
                    const centerIndex = parseInt((len + 1) / 2) - 1
                    const left1Index = centerIndex - 2
                    const left2Index = centerIndex - 1
                    const right2Index = centerIndex + 1
                    const right1Index = centerIndex + 2


                    const m = images.map((image, index) => {
                        let css = null
                        if (index < left1Index) {
                            //left hide
                            css = {
                                src: image,
                                zIndex: 0,
                                left: '-22.22%',
                            }
                        } else if (index > right1Index) {
                            //right hide
                            css = {
                                src: image,
                                zIndex: 0,
                                left: '100%',
                            }
                        } else {
                            //center  show
                            switch (index) {
                                case left1Index:
                                    css = {
                                        src: image,
                                        zIndex: 1,
                                        left: '0',
                                    }
                                    break
                                case left2Index:
                                    css = {
                                        src: image,
                                        zIndex: 2,
                                        left: '12.1%',
                                    }
                                    break
                                case centerIndex:
                                    css = {
                                        src: image,
                                        zIndex: 6,
                                        left: '30.92%',
                                    }
                                    break
                                case right2Index:
                                    css = {
                                        src: image,
                                        zIndex: 2,
                                        left: '48.31%',
                                    }
                                    break
                                case right1Index:
                                    css = {
                                        src: image,
                                        zIndex: 1,
                                        left: '60.39%',
                                    }
                                    break

                            }
                        }

                        return css
                    })

                    this.setData({
                        centerIndex: centerIndex,
                        lists:m
                    })
                }
            }

        }
    },
    // computed: {
    //     lists1() {
    //         console.log('list coomputed')
    //         const len = this.data.images.length
    //         const centerIndex = parseInt((len + 1) / 2) - 1
    //         const left1Index = centerIndex - 2
    //         const left2Index = centerIndex - 1
    //         const right2Index = centerIndex + 1
    //         const right1Index = centerIndex + 2
    //
    //         this.setData({
    //             centerIndex: centerIndex
    //         })
    //         const m = this.data.images.map((image, index) => {
    //             let css = null
    //             if (index < left1Index) {
    //                 //left hide
    //                 css = {
    //                     src: image,
    //                     zIndex: 0,
    //                     left: '-22.22%',
    //                 }
    //             } else if (index > right1Index) {
    //                 //right hide
    //                 css = {
    //                     src: image,
    //                     zIndex: 0,
    //                     left: '100%',
    //                 }
    //             } else {
    //                 //center  show
    //                 switch (index) {
    //                     case left1Index:
    //                         css = {
    //                             src: image,
    //                             zIndex: 1,
    //                             left: '0',
    //                         }
    //                         break
    //                     case left2Index:
    //                         css = {
    //                             src: image,
    //                             zIndex: 2,
    //                             left: '12.1%',
    //                         }
    //                         break
    //                     case centerIndex:
    //                         css = {
    //                             src: image,
    //                             zIndex: 6,
    //                             left: '30.92%',
    //                         }
    //                         break
    //                     case right2Index:
    //                         css = {
    //                             src: image,
    //                             zIndex: 2,
    //                             left: '48.31%',
    //                         }
    //                         break
    //                     case right1Index:
    //                         css = {
    //                             src: image,
    //                             zIndex: 1,
    //                             left: '60.39%',
    //                         }
    //                         break
    //
    //                 }
    //             }
    //
    //             return css
    //         })
    //
    //         return m
    //     }
    // },
    attached() {

    },
    data: {
        startX: 0,
        endX: 0,
        centerIndex: 0,
        lists:[]


        // images: [
        //     "./1.jpg",
        //     "./2.jpg",
        //     "./3.jpg",
        //     "./4.jpg",
        //     "./5.jpg",
        //     "./6.jpg",
        //     "./7.jpg",
        //     "./8.jpg"
        // ]
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
        handleTouchStart(e) {
            console.log(e);
            var startX = e.changedTouches[0].pageX;
            this.setData({
                startX: startX
            });
        },
        handleTouchEnd(e) {
            console.log(e);
            var that = this;
            var endX = e.changedTouches[0].pageX;
            this.setData({
                endX: endX
            });
            //计算手指触摸偏移剧距离
            var moveX = this.data.startX - this.data.endX;
            //向左移动
            if (moveX > 30) {
                this.moveRight();

            }
            if (moveX < -30) {
                this.moveLeft();
            }
        },
        moveLeft() {
            const len = this.data.images.length
            const centerIndex = this.data.centerIndex - 1
            if (centerIndex < 0) {
                return
            }
            const left1Index = centerIndex - 2
            const left2Index = centerIndex - 1
            const right2Index = centerIndex + 1
            const right1Index = centerIndex + 2


            const m = this.data.images.map((image, index) => {
                let css = null
                if (index < left1Index) {
                    //left hide
                    css = {
                        src: image,
                        zIndex: 0,
                        left: '-22.22%',
                    }
                } else if (index > right1Index) {
                    //right hide
                    css = {
                        src: image,
                        zIndex: 0,
                        left: '100%',
                    }
                } else {
                    //center  show
                    switch (index) {
                        case left1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '0',
                            }
                            break
                        case left2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '12.1%',
                            }
                            break
                        case centerIndex:
                            css = {
                                src: image,
                                zIndex: 6,
                                left: '30.92%',
                            }
                            break
                        case right2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '48.31%',
                            }
                            break
                        case right1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '60.39%',
                            }
                            break

                    }
                }

                return css
            })

            this.setData({
                centerIndex: centerIndex,
                lists: m
            })
        },
        moveRight() {
            console.log('moveRight')
            const len = this.data.images.length
            const centerIndex = this.data.centerIndex + 1
            if (centerIndex > len - 1) {
                return
            }
            const left1Index = centerIndex - 2
            const left2Index = centerIndex - 1
            const right2Index = centerIndex + 1
            const right1Index = centerIndex + 2


            const m = this.data.images.map((image, index) => {
                let css = null
                if (index < left1Index) {
                    //left hide
                    css = {
                        src: image,
                        zIndex: 0,
                        left: '-22.22%',
                    }
                } else if (index > right1Index) {
                    //right hide
                    css = {
                        src: image,
                        zIndex: 0,
                        left: '100%',
                    }
                } else {
                    //center  show
                    switch (index) {
                        case left1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '0',
                            }
                            break
                        case left2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '12.1%',
                            }
                            break
                        case centerIndex:
                            css = {
                                src: image,
                                zIndex: 6,
                                left: '30.92%',
                            }
                            break
                        case right2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '48.31%',
                            }
                            break
                        case right1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '60.39%',
                            }
                            break

                    }
                }

                return css
            })

            this.setData({
                centerIndex: centerIndex,
                lists: m
            })
        }

    }

})
