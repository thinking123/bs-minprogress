const app = getApp()
const base = app.globalData.base
const component = 'lottery-dialog-no-prize-'
const url = `${base}${component}`
Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        }
    },
    data: {
        url:base,
        url:url
    },
    methods: {
        handleHide() {
            this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            if (e && e.target && (e.target.id === 'mask' || e.target.id === 'wrap' )) {
                this.triggerEvent('hidetap')
            }
        }
    }

})
