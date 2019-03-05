const computedBehavior = require('miniprogram-computed')
const app = getApp()
const base = app.globalData.base
const component = 'info-confirm-dialog-'
const url = `${base}${component}`

Component({  behaviors: [computedBehavior],
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        name: String,
        phone: String,
        qq: String,
        card: String,
        address: String,
        type:{
            type:String,
            value:'win-info'
        }
    },
    data: {
        url:url
    },
    computed: {
        cs() {
            switch (this.data.type) {
                case 'win-info':
                    return '0'
                case 'achieve-win-info':
                    return '1'
                case 'achieve-win-info-virtual':
                    return '2'
                default:
                    return '0'
            }
        }
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
