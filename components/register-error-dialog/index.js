const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'register-error-dialog/'
const url = `${baseComponentUrl}${component}`
Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal, changedPath) {
                console.log('visible change ' , newVal , oldVal ,changedPath)
            }
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
            if (e && e.target && (e.target.id === 'mask' || e.target.id === 'wrap' )) {
                this.triggerEvent('hidetap')
            }
        }
    }

})
