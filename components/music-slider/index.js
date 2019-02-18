function getSystemScreenRatio() {
    let res = wx.getSystemInfoSync();
    return 750 / res.screenWidth
}

Component({
    externalClasses: ['music-slider-external'],
    properties: {
        percent: {
            type: [Number, String],
            value: 100
        },
        pgWidth: {
            type: [Number, String],
            value: 700
        },
        pgHeight: {
            type: [Number, String],
            value: 6
        },
        pgRadius: {
            type: [String, Array],
            value: '#FFFAF0, #ff6600'
        },
        value: {
            type: [Number, String],
            value: 0
        },
        max: {
            type: [Number, String],
            value: 100
        }
    },
    data: {
        screenRatio: 0,
        sliderStartX: 0,
        sliderStartY: 0,
        startValue: 0,
        portraitOrientation: 'bottom',
        clickEnlargeSize: 60,
        disabled:false
    },
    attached: function () {
        this.setData({ screenRatio: getSystemScreenRatio()})
    },
    methods: {
        sliderTap: function (e) {
            console.log('sliderTap' , e)
            if (!this.data.disabled) {
                let that = this
                let changedTouches = e.changedTouches[0];
                let value = 0
                let pxW = this.data.pgWidth / 2
                const offset = changedTouches.pageX - e.currentTarget.offsetLeft

                value = offset / pxW

                value = value * 100 + '%'
                this.setData({value: value})
                this.triggerEvent('sliderTap', value);
            }
        },
        sliderStart: function (e) {
            if (!this.data.disabled) {
                let that = this
                let detail = e.changedTouches;
                let option = {};
                let pxW = this.data.pgWidth / 2
                let changedTouches = e.changedTouches[0];
                console.log('sliderStart' , e, changedTouches.pageX )
                this.setData({sliderStartX: changedTouches.pageX})
                let startV = parseFloat(this.data.value.replace('%'))/100
                startV = startV * pxW
                this.setData({ startValue: startV })
                this.triggerEvent('sliderStart', detail, option);
            }
        },
        sliderChange: function (e) {
            console.log('sliderChange')
            if (!this.data.disabled) {
                let changedTouches = e.changedTouches[0];
                // 当前相对值

                let value = 0


                let pxW = this.data.pgWidth / 2
                console.log('sliderChange',e , changedTouches.pageX , this.data.startValue)
                const offset = changedTouches.pageX - this.data.sliderStartX + this.data.startValue


                value = offset / pxW
                console.log('offset' ,offset , value)
                // if (this.data.orientation == 'landscape') {
                //     value = (changedTouches.pageX - this.data.sliderStartX) * this.data.screenRatio / this.data.pgWidth * this.data.max + Number(this.data.startValue)
                // } else {
                //     value = (this.data.sliderStartY - changedTouches.pageY) * this.data.screenRatio / this.data.pgWidth * this.data.max + Number(this.data.startValue)
                // }
                // 超出边界时
                if (value < 0) {
                    value = 0
                }
                if (value > 1 || value > this.data.max) {
                    value = this.data.max
                }
                value = value * 100 + '%'
                this.setData({value: value})
                let detail = e.changedTouches;
                let option = {};
                this.triggerEvent('sliderChange', value);
            }
        },
        sliderEnd: function (e) {
            console.log('sliderEnd')
            if (!this.data.disabled) {

                console.log('end' ,e.target.offsetLeft)
                // this.setData({isMonitoring: true})
                // let that = this
                // // 如果拉动的幅度比缓冲的值大，则调到缓冲值处播放
                // if (this.data.percent <= this.data.value / this.data.max * 100) {
                //     this.setData({value: that.data.percent * that.data.max / 100})
                // }
                // let detail = e.changedTouches;
                // let option = {};
                this.triggerEvent('sliderEnd', this.data.value);
            }
        },
        sliderCancel: function (e) {
            console.log('sliderCancel')
            if (!this.data.disabled) {
                let that = this
                this.setData({isMonitoring: true})
                if (this.data.percent <= this.data.value / this.data.max * 100) {
                    this.setData({value: that.data.percent * that.data.max / 100})
                }
                let detail = e.changedTouches;
                let option = {};
                this.triggerEvent('sliderCancel', detail, option);
            }
        },
    }
})
