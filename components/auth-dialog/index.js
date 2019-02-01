const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'register-error-dialog/'
// const url = `${baseComponentUrl}${component}`
const url = './'
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
        handleOutHide(e){
            e
        },
        handleGotUserInfo(e){
            console.log(e.detail.errMsg)
            console.log(e.detail.userInfo)
            console.log(e.detail.rawData)

            this.triggerEvent('getuserinfo', e.detail.userInfo)
        }
    }

})
