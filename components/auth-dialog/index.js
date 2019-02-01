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
        handlemove(e){

        },
        handleGotUserInfo(e){
            try{
                console.log(e.detail.errMsg)
                console.log(e.detail.userInfo)
                console.log(e.detail.rawData)

                if(e.detail.userInfo){
                    this.triggerEvent('getuserinfo', e.detail.userInfo)
                }

            }catch (e) {
                console.log('用户拒绝授权')
            }

        }
    }

})
