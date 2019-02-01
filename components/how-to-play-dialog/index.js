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
            value: false
        },
        bg: String
    },
    data: {
        url:url
    },
    computed: {
        src() {
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
