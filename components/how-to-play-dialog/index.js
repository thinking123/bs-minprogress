const computedBehavior = require('miniprogram-computed')
const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'how-to-play-dialog/'
const url = `${baseComponentUrl}${component}`
// const url = './'

Component({

    behaviors: [computedBehavior],

    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal, changedPath) {
                console.log('visible change ', newVal, oldVal, changedPath)
            }
        },
        bg: String
    },
    data: {
        url:url
    },
    computed: {
        src() {
            console.log('src' , this.data.bg)
            return `${url}${this.data.bg}.png`
        }
    },
    methods: {
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
