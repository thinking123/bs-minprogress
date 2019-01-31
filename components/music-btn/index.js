const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'music-btn/'
const url = `${baseComponentUrl}${component}`
// const url = './'

Component({
    externalClasses: ['music-btn-external'],
    properties: {
        text: String,
        key: String
    },
    data: {
        url: url,
        pressing: false,
        time: null
    },
    methods: {
        touchstart(e) {

            this.setData({
                pressing: true
            })
            this.triggerEvent('touching', this.data.key)
            this.time = setInterval(() => {
                console.log('开始按钮')
                this.triggerEvent('touching', this.data.key)
            }, 300)

            console.log('开始按钮')


        },
        touchend(e) {


            this.setData({
                pressing: false
            })
            clearInterval(this.time)
            this.time = null
            console.log('结束按钮')
        }
    },
    detached() {
        clearInterval(this.time)
    }

})
