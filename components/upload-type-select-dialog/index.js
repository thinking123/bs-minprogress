const app = getApp()
const base = app.globalData.base
const component = 'upload-type-select-dialog-'
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
        handleHide(e) {
            console.log(e)
            const uploadType = e.target.dataset.type
            this.triggerEvent('submit' , uploadType)
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        }
    }

})
