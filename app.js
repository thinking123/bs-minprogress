import regeneratorRuntime from './libs/regenerator-runtime/runtime.js'
import {initHttp} from "./http/http";
// import {wxLogin} from "./http/index";
import {_wxGetSetting, _wxGetUserInfo, _wxLogin} from "./utils/wx";
import {showMsg} from "./utils/util";
// const baseUrl = '../../asserts/image/pages/'
// const baseComponentUrl = '../../asserts/image/components/'
const base = 'https://cdnpepsi.ysmine.com/'
// const base = 'http://pm4uud0ld.bkt.clouddn.com/'
// const base = '../../'
const baseUrl = `${base}asserts/image/pages/`
const baseAudioUrl = `${base}asserts/audio/`
const baseComponentUrl = `${base}asserts/image/components/`

const mockToken = 'z2OZe8yh1BCChkB5Z9BGiTQT/7wbJdGztqoXVhz8F/A'
const myMusicPersonality = 'https://www.lizikeji.cn'
// const myMusicPersonality = 'https://mp.weixin.qq.com/'


App({
    onLaunch: async function () {

        try {
            this.globalData$ = Object.assign({ }, this.globalData );
            initHttp(this.globalData)
            // const code = await _wxLogin()
            // console.log('code' , code)
            // this.globalData.code = code
            // return
            // const {authSetting} = await _wxGetSetting()
            // let userInfo = null
            // if(authSetting['scope.userInfo']){
            //     //授权过用户信息
            //     const data = await _wxGetUserInfo()
            //     userInfo = data.userInfo
            // }
            //
            // if(this.globalData.getUserInfoCb){
            //     this.globalData.getUserInfoCb(userInfo)
            // }
        } catch (e) {
            console.log('on lanuch error', e)
            showMsg(e)
        }
    },
    /** 监听函数的对象数组 */
    watchCallBack: {},

    /** 监听列表 */
    watchingKeys: [],
    setGlobalData: function (obj) {
        Object.keys(obj).map(key => {
            this.globalData[key] = obj[key];
        });
    },
    watchData(key, cb) {
        this.watchCallBack = Object.assign({}, this.watchCallBack, {
            [key]: this.watchCallBack[key] || []
        });
        this.watchCallBack[key].push(cb);
        if (!this.watchingKeys.find(x => x === key)) {
            const that = this;
            this.watchingKeys.push(key);
            Object.defineProperty(this.globalData, key, {
                configurable: true,
                enumerable: true,
                set: function (val) {
                    const old = that.globalData$[key];
                    that.globalData$[key] = val;
                    that.watchCallBack[key].map(func => func(val, old));
                },
                get: function () {
                    return that.globalData$[key];
                }
            });
        }
    },
    globalData: {
        userInfo: null,
        base: base,
        baseUrl: baseUrl,
        baseComponentUrl: baseComponentUrl,
        baseAudioUrl: baseAudioUrl,
        myMusicPersonality: myMusicPersonality,
        code: '',
        requestQueue: [],
        token: null,
        uId: null,
        isLocked: false
    }
})
