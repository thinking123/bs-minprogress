const computedBehavior = require('miniprogram-computed')
const app = getApp()
const baseComponentUrl = app.globalData.base
const component = 'cascade-swiper-'
const url = `${baseComponentUrl}${component}`

Component({
    behaviors: [computedBehavior],

    properties: {
        images: {
            type: Array,
            value: [],
            observer(images) {

                if (images && images.length > 0) {
                    const len = images.length
                    let centerIndex = parseInt((len + 1) / 2) - 1
                    if(this.data.centerIndex == this.data.images.length - 1){
                        centerIndex = this.data.centerIndex
                    }



                    const left1Index = centerIndex - 2
                    const left2Index = centerIndex - 1
                    const right2Index = centerIndex + 1
                    const right1Index = centerIndex + 2

                    const m = images.map((image, index) => {
                        let css = null
                        // image = `${url}${image}`
                        image = image.coverUrl
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
                                        left: '12.93%',
                                    }
                                    break
                                case centerIndex:
                                    css = {
                                        src: image,
                                        zIndex: 6,
                                        left: '25.86%',
                                    }
                                    break
                                case right2Index:
                                    css = {
                                        src: image,
                                        zIndex: 2,
                                        left: '38.79%',
                                    }
                                    break
                                case right1Index:
                                    css = {
                                        src: image,
                                        zIndex: 1,
                                        left: '51.72%',
                                    }
                                    break

                            }
                        }

                        if(index == centerIndex && image && image.indexOf('upload-btn.png') == -1){
                            css.uploaded = true
                        }

                        return css
                    })

                    this.setData({
                        centerIndex: centerIndex,
                        lists:m
                    })

                    this.triggerEvent('selected' , centerIndex)
                }
            }

        }
    },
    attached() {

    },
    data: {
        startX: 0,
        endX: 0,
        centerIndex: 0,
        lists:[],
        url:url

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
        handleTap(e){
            if(this.data.images.length == 0){
                return
            }
            const tapIndex = e.target.dataset.item
            console.log('handleTap' , tapIndex)


            if(tapIndex == this.data.centerIndex &&
                tapIndex == this.data.images.length - 1){
                console.log('tap upload')
                this.triggerEvent('upload')
            }
        },
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
            if(this.data.images.length == 0){
                return
            }
            var startX = e.changedTouches[0].pageX;
            this.setData({
                startX: startX
            });
        },
        handleTouchEnd(e) {
            console.log(e);
            if(this.data.images.length == 0){
                return
            }
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
                // image = `${url}${image}`
                image = image.coverUrl
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
                                left: '12.93%',
                            }
                            break
                        case centerIndex:
                            css = {
                                src: image,
                                zIndex: 6,
                                left: '25.86%',
                            }
                            break
                        case right2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '38.79%',
                            }
                            break
                        case right1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '51.72%',
                            }
                            break

                    }
                }
                if(index == centerIndex && image && image.indexOf('upload-btn.png') == -1){
                    css.uploaded = true
                }

                return css
            })

            this.setData({
                centerIndex: centerIndex,
                lists: m
            })

            this.triggerEvent('selected' , centerIndex)
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
                // image = `${url}${image}`
                image = image.coverUrl
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
                                left: '12.93%',
                            }
                            break
                        case centerIndex:
                            css = {
                                src: image,
                                zIndex: 6,
                                left: '25.86%',
                            }
                            break
                        case right2Index:
                            css = {
                                src: image,
                                zIndex: 2,
                                left: '38.79%',
                            }
                            break
                        case right1Index:
                            css = {
                                src: image,
                                zIndex: 1,
                                left: '51.72%',
                            }
                            break

                    }
                }
                if(index == centerIndex && image && image.indexOf('upload-btn.png') == -1){
                    css.uploaded = true
                }
                return css
            })

            this.setData({
                centerIndex: centerIndex,
                lists: m
            })

            this.triggerEvent('selected' , centerIndex)
        }

    }

})
