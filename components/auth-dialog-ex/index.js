const app = getApp()
const base = app.globalData.base
const component = 'auth-dialog-ex-'
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
