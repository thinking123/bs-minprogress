const app = getApp()
const base = app.globalData.base
const component = 'upload-music-origin-dialog-'
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
        },
        handleBtn(e){
            this.triggerEvent('argee' , e.target.dataset.agree)
        }
    }

})
