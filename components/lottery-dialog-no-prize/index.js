const app = getApp()
const base = app.globalData.base
Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        }
    },
    data: {
        url:base
    },
    methods: {
        handleHide() {
            this.triggerEvent('hidetap')
        }
    }

})
