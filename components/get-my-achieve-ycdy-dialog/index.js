const app = getApp()
const base = app.globalData.base
const component = 'get-my-achieve-ycdy-dialog-'
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
            this.triggerEvent('tapbutton')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        }
    }

})
