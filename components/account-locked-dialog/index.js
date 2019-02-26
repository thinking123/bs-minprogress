const computedBehavior = require('miniprogram-computed')
const app = getApp()
const base = app.globalData.base
const globalData = app.globalData
const component = 'account-locked-dialog-'
const url = `${base}${component}`
Component({
    // behaviors: [computedBehavior],
    properties: {
        // visible: {
        //     type: Boolean,
        //     value: false
        // }
    },
    // computed: {
    //     visible() {
    //         console.log('visible', this.data.globalData.isLocked)
    //         return this.data.globalData.isLocked
    //     }
    // },
    attached() {
        app.watchData('isLocked', (val, old) => {
            if(val){
                this.setData({
                    visible:true
                })
            }

        })
    },
    data: {
        url: url,
        globalData: globalData,
        visible:false
    },
    methods: {
        handlemove() {

        },
        handleHide() {
            // this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            // if (e && e.target && e.target.id === 'mask') {
            //     this.triggerEvent('hidetap')
            // }
        }
    }

})
