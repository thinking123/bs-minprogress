import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {wxLogin, isSignUp, getCheckMsg} from "../../http/http-business";
import {showMsg} from "../../utils/util";
import {_wxGetSetting, _wxGetUserInfo, _wxLogin} from "../../utils/wx";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'home-'
const url = `${baseUrl}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        baseUrl: url,
        showDialog: false,

        showCheckErrorDialog: false,
        showCheckIngDialog: false,
        showCheckSuccessDialog: false,
        showCheckSuccessButMusicDialog: false,
        isLocked:isLocked,

        errorMsg: ''
    },
    async _getCheckMsg() {
        console.log('handleReviewInfo')
        try {
            //状态 1 正常 0 审核中 2 失败
            //10 用户审核通过，未提交音乐 11 第一首音乐审核通过
            const {checkMsg, state} = await getCheckMsg()
            if (state == 1) {

            } else {

            }
            switch (state) {
                case 1:
                case 11:
                    this.setData({
                        showCheckSuccessDialog: true
                    })
                    break
                case 0:
                    this.setData({
                        showCheckIngDialog: true
                    })
                    break
                case 2:
                    this.setData({
                        showCheckErrorDialog: true,
                        errorMsg: checkMsg
                    })
                    break
                case 10:
                    this.setData({
                        showCheckSuccessButMusicDialog: true
                    })
                    break
            }
        } catch (e) {
            showMsg(e)
        }
    },

    handleCheckErrorDialog() {
        this.setData({
            showCheckErrorDialog: false
        })


        // 跳转到上传音乐page

        wx.navigateTo({
            url: '/pages/upload-music/index'
        })
    },
    handleCheckIngDialog() {
        this.setData({
            showCheckIngDialog: false
        })
    },
    handleCheckSuccessDialog() {
        this.setData({
            showCheckSuccessDialog: false
        })
    },
    handleCheckSuccessButMusicDialog() {
        this.setData({
            showCheckSuccessButMusicDialog: false
        })
    },
    handleReWrite() {
        wx.navigateTo({
            url: '/pages/register/index?from=home'
        })
    },

    // async _isSignUp() {
    //
    //     const res = await isSignUp()
    //
    //     if(res){
    //         //已经报名
    //
    //     }else{
    //         wx.navigateTo({
    //             url: '/pages/register/index?from=home'
    //         })
    //     }
    //     // if (res == '9006') {
    //     //     showMsg('已经报名')
    //     // } else if (res == '9007') {
    //     //     wx.navigateTo({
    //     //         url: '/pages/register/index?from=home'
    //     //     })
    //     // } else if (res == '9008') {
    //     //     wx.navigateTo({
    //     //         url: '/pages/upload-music/index?from=home'
    //     //     })
    //     // }
    //
    //
    // },
    async checkRegister() {
        try {
            const res = await isSignUp()
            if(res){
                //已经报名

                await this._getCheckMsg()
            }else{
                wx.navigateTo({
                    url: '/pages/register/index?from=home'
                })
            }
        } catch (e) {
            showMsg(e)
        }
    },
    handleRegister: function () {
        console.log('handleRegister')
        this.checkRegister()
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
    async init() {
        try {
            const code = await _wxLogin()
            console.log('code' , code)
            app.globalData.code = code

            wx.showLoading({
                title: '获取用户信息',
                mask: true
            })

            const {authSetting} = await _wxGetSetting()
            let userInfo = null
            if (authSetting['scope.userInfo']) {
                //授权过用户信息
                const data = await _wxGetUserInfo()
                userInfo = data.userInfo
            }

            await this.getUserInfoCb(userInfo)
        } catch (e) {
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

        const {token, uId} = res
        app.globalData.token = token
        app.globalData.uId = uId

        console.log('get usre info', userInfo, token, app.globalData.code, uId)


        // wx.navigateTo({
        //     url: '/pages/user-info/index'
        // })

        wx.navigateTo({
            url: '/pages/upload-music/index?uploadType=wx'
        })
    }
})
