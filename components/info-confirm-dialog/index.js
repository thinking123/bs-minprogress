const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'info-confirm-dialog/'
const url = `${baseComponentUrl}${component}`

Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        name: String,
        phone: String,
        address: String,
    },
    data: {
        url:url
    },
    methods: {
        handleConfirm() {
            console.log('handleConfirm')
            this.triggerEvent('confirmtap')
        },
        handleRetry() {
            console.log('handleRetry')
            this.triggerEvent('retrytap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
                console.log('handleOutHide')
            }
        }
    }

})
