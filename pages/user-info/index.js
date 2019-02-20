import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import { isSignUp} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'user-info/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    async _isSignUp(){
        try {
            const res = await isSignUp()

            if (res == '9006') {
                wx.navigateTo({
                    url:'/pages/singer-home/index'
                })
            } else{
                showMsg('请先注册')
            }

            // if(res){
            //     showMsg('已经报名')
            // }else{
            //     wx.navigateTo({
            //         url: '/pages/register/index?from=home'
            //     })
            // }
            console.log('_isSignUp' , res)
        }catch (e) {
            showMsg(e)
        }
    },
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    },
    handleSingerHome: function () {
        console.log('handleRegister')
        this._isSignUp()

    },
    handleMyAchieve: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url:'/pages/my-achieve/index'
        })
    },
    handleWinInfo: function () {
        console.log('handleListen')
        wx.navigateTo({
            url:'/pages/win-info/index'
        })
    },
    handleAttentionList: function () {
        console.log('handleRankList')
        wx.navigateTo({
            url:'/pages/attention/index'
        })
    },
    handleReviewInfo: function () {
        console.log('handleReviewInfo')

    }
})
