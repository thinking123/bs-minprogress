const app = getApp()
const base = app.globalData.base
const component = 'check-success-but-music-dialog-'
const url = `${base}${component}`
Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        content:String
    },
    data: {
        url:url
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
