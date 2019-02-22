const app = getApp()
const base = app.globalData.base
const component = 'account-locked-dialog-'
const url = `${base}${component}`
Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false
        }
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
