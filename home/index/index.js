import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {wxLogin , isSignUp} from "../../http/http-business";
import {showMsg} from "../../utils/util";
import {_wxGetSetting, _wxGetUserInfo} from "../../utils/wx";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'home/'
const url = `${baseUrl}${page}`
Page({
    data: {
        baseUrl: url,
        showDialog: false,
        // showMask:true
    },
    async _isSignUp(){
        try {
            const res = await isSignUp()

            if (res == '9006') {
                showMsg('已经报名')
            } else if (res == '9007') {
                wx.navigateTo({
                    url: '/pages/register/index?from=home'
                })
            } else if (res == '9008') {
                wx.navigateTo({
                    url: '/pages/upload-music/index?from=home'
                })
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
    handleRegister: function () {
        console.log('handleRegister')
        this._isSignUp()
    },
    handleMyMusic: function () {
        console.log('handleMyMusic')
        wx.navigateTo({
            url: '/pages/music-journey/index'
        })
    },
    handleListen: function () {
        console.log('handleListen')
        wx.navigateTo({
            url: '/pages/just-listen/index'
        })
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
    async init(){
        try{
            wx.showLoading({
                title: '获取用户信息',
                mask: true
            })

            const {authSetting} = await _wxGetSetting()
            let userInfo = null
            if(authSetting['scope.userInfo']){
                //授权过用户信息
                const data = await _wxGetUserInfo()
                userInfo = data.userInfo
            }

            await this.getUserInfoCb(userInfo)
        }catch (e) {
            showMsg(e)
        }

    },
    onLoad: function () {
        this.init()
        // wx.showLoading({
        //     title: '获取用户信息',
        //     mask: true
        // })
        // app.globalData.getUserInfoCb = this.getUserInfoCb

        // const {authSetting} = await _wxGetSetting()
        // let userInfo = null
        // if(authSetting['scope.userInfo']){
        //     //授权过用户信息
        //     const data = await _wxGetUserInfo()
        //     userInfo = data.userInfo
        // }

        // if(this.globalData.getUserInfoCb){
        //     this.globalData.getUserInfoCb(userInfo)
        // }
    },

    async getUserInfoCb(userInfo) {
        try {
            wx.hideLoading()
            if (!!userInfo) {
                await this.login(userInfo)
            } else {
                //没有授权过用户信息 , 显示授权dialog
                this.setData({
                    showDialog: true
                })
            }
        } catch (e) {
            showMsg(e)
        }
    },
    handleGetUserInfo(userInfo) {
        //从授权dialog返回
        this.getUserInfo(userInfo)
    },
    async getUserInfo(userInfo) {
        try {
            if (!!userInfo) {
                //获取用户信息
                this.setData({
                    showDialog: false
                })

                await this.login(userInfo)
            }
        } catch (e) {
            showMsg(e)
        }

    },
    async login(userInfo) {
        app.globalData.userInfo = userInfo
        //登入获取 token
        const res = await wxLogin(app.globalData.code,
            userInfo.avatarUrl,
            userInfo.nickName,
            userInfo.gender)

        const {token , uId} = res
        app.globalData.token = token
        app.globalData.uId = uId

        console.log('get usre info' , userInfo, token, app.globalData.code , uId)


        wx.navigateTo({
            url: '/pages/my-achieve/index'
        })
    }
})
