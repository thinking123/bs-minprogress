const app = getApp()
const base = app.globalData.base
const component = 'just-listen-lottery-tip-dialog-'
const url = `${base}${component}`
Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        achievePrize:Object
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
