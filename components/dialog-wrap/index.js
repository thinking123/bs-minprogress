const computedBehavior = require('miniprogram-computed')
const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'dialog-wrap/'
const url = `${baseComponentUrl}${component}`

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
