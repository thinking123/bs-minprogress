import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {wxLogin} from "../../http/index";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'home/'
const url = `${baseUrl}${page}`
Page({
    data: {
        baseUrl: url,
        showDialog: false
    },
    handleRegister: function () {
        console.log('handleRegister')
        wx.navigateTo({
            url: '/pages/register/index?from=home'
        })
    },
    handleMyMusic: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url: '/pages/music-journey/index'
        })
    },
    handleListen: function () {
        console.log('handleListen')
    },
    handleRankList: function () {
        console.log('handleRankList')
        wx.navigateTo({
            url: '/pages/rank-list/index'
        })
    },
    handleUserInfo: function () {
        console.log('handleUserInfo')
        wx.navigateTo({
            url: '/pages/user-info/index'
        })
    },
    onLoad: function () {
        const {token, userInfo} = app.globalData
        if (!userInfo) {
            this.setData({
                showDialog: true
            })
        }
    },
    handleGetUserInfo(userInfo) {
        this.getUserInfo()
    },
    async getUserInfo(userInfo) {
        try {
            if (!!userInfo) {
                this.setData({
                    showDialog: false
                })

                app.globalData.userInfo = userInfo
                const res = await wxLogin(code,
                    userInfo.avatarUrl,
                    userInfo.nickName,
                    userInfo.gender)

                const token = res.rows.token
                this.globalData.token = token
            }
        } catch (e) {
            showMsg(e)
        }

    }
})
