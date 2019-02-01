import regeneratorRuntime from './libs/regenerator-runtime/runtime.js'
import {initHttp} from "./http/http";
import {wxLogin} from "./http/index";
import {_wxGetSetting, _wxGetUserInfo, _wxLogin} from "./utils/wx";
// const baseUrl = '../../asserts/image/pages/'
// const baseComponentUrl = '../../asserts/image/components/'
const base = 'http://pm4uud0ld.bkt.clouddn.com/'
// const base = '../../'
const baseUrl = `${base}asserts/image/pages/`
const baseAudioUrl = `${base}asserts/audio/`
const baseComponentUrl = `${base}asserts/image/components/`

const mockToken ='z2OZe8yh1BCChkB5Z9BGiTQT/7wbJdGztqoXVhz8F/A'
const myMusicPersonality = 'https://www.lizikeji.cn'
// const myMusicPersonality = 'https://mp.weixin.qq.com/'
App({
    onLaunch: async function () {

        try{
            initHttp(this.globalData)
            const code = await _wxLogin()
            console.log('code' , code)
            // return
            const {authSetting} = await _wxGetSetting()
            if(authSetting['scope.userInfo']){
                // const {userInfo} = await _wxGetUserInfo()
                const userInfo = await _wxGetUserInfo()

                this.globalData.userInfo = userInfo

                const res = await wxLogin(code ,
                    userInfo.avatarUrl ,
                    userInfo.nickName,
                    userInfo.gender)

                const token = res.rows.token
                this.globalData.token = token
                console.log(userInfo )
                console.log(res )
                console.log(authSetting )
            }
        }catch (e) {
            console.log('on lanuch error' , e)
        }
    },
    globalData: {
        userInfo: null,
        baseUrl: baseUrl,
        baseComponentUrl: baseComponentUrl,
        baseAudioUrl: baseAudioUrl,
        myMusicPersonality:myMusicPersonality,
        code:'',
        requestQueue:[],
        token:mockToken
    }
})
