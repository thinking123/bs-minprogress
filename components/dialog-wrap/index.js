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
        bg: String,
        type:String
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

            if(this.data.type == 'ok'){
                this.triggerEvent('ok')
            }else{
                this.triggerEvent('hidetap')
            }

        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                if(this.data.type == 'ok'){
                    this.triggerEvent('ok')
                }else{
                    this.triggerEvent('hidetap')
                }

            }
        }
    }

})
