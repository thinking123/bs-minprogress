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
        base: baseUrl,
        showDialog: false,

        showCheckErrorDialog: false,
        showCheckIngDialog: false,
        showCheckSuccessDialog: false,
        showCheckSuccessButMusicDialog: false,
        isLocked: isLocked,

        errorMsg: '',

        showUploadDialog: false,
        isUseX: false,
        top:'2.3%',
        checkState: '',
        musicId:''
    },
    handleSubmitDialog(e) {
        const uploadType = e.detail
        // const url = `/pages/upload-music/index?uploadType=${uploadType}`
        // wx.navigateTo({
        //     url: url
        // })


        const url = `/pages/upload-music/index?checkState=${this.data.checkState}&musicId=${this.data.musicId}&uploadType=${uploadType}`
        wx.navigateTo({
            url: url
        })
    },
    handleHideDialog(e) {
        this.setData({
            showUploadDialog: false
        })

        // const url = `/pages/upload-music/index?checkState=${this.data.checkState}&musicId=${this.data.musicId}`
        // wx.navigateTo({
        //     url: url
        // })
    },
    async _getCheckMsg() {
        console.log('handleReviewInfo')
        try {
            //0音乐信息审核中 1 音乐审核通过 3 未报名
            // 4报名信息审核失败 5用户审核通过，未提交音乐 6音乐审核失败
            const {checkMsg, state, musicId} = await getCheckMsg(1)
            this.setData({
                checkState: state
            })
            switch (state) {
                case 0:
                    //0音乐信息审核中 dialog
                    this.setData({
                        showCheckIngDialog: true
                    })
                    break
                case 1:
                    //1 音乐审核通过
                    this.setData({
                        showCheckSuccessDialog: true
                    })
                    break
                // case 2:
                //     //go to upload music ,select upload type dialog
                //     //and goto upload page
                //     this.setData({
                //         showCheckErrorDialog: true,
                //         errorMsg: checkMsg
                //     })
                //     break
                case 3:
                    //go to register
                    wx.navigateTo({
                        url: '/pages/register/index?from=home'
                    })
                    break
                // this.setData({
                //     showCheckErrorDialog: true,
                //     errorMsg: checkMsg
                // })
                // break
                case 4:
                    // 4报名信息审核失败 , 显示错误信息 ，进入register page
                    //此时要先获取上次填写的信息，并显示

                    this.setData({
                        showCheckErrorDialog: true,
                        errorMsg: checkMsg
                    })
                    break
                case 6:
                    //go to upload music ,select upload type dialog
                    //and goto upload page
                    //这里提交信息用新修改的接口
                    this.setData({
                        showCheckErrorDialog: true,
                        errorMsg: checkMsg,
                        musicId:musicId
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

        // wx.navigateTo({
        //     url: '/pages/upload-music/index'
        // })
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

        if (this.data.checkState == 4) {
            const url = `/pages/register/index?checkState=${this.data.checkState}`
            wx.navigateTo({
                url: url
            })

        } else if (this.data.checkState == 6) {

            //选择上传类型
            this.setData({
                showUploadDialog: true
            })

            // const url = `/pages/upload-music/index?checkState=${this.data.checkState}&musicId=${this.data.musicId}`
            // wx.navigateTo({
            //     url: url
            // })
        }

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

            await this._getCheckMsg()

            // const res = await isSignUp()
            // if(res){
            //     //已经报名
            //
            //     await this._getCheckMsg()
            // }else{
            //     wx.navigateTo({
            //         url: '/pages/register/index?from=home'
            //     })
            // }
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
            console.log('code', code)
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
    ininBgSize(){
        let res = wx.getSystemInfoSync();
        /*top:2.4%; 1.78*/
        /*top:13.4%;2.17  off:0.385*/
        //
        let iphone6 = 667/375
        let dev = res.screenHeight / res.screenWidth
        let off = 0.385


        if(dev > iphone6){

            let top = (dev - 1.78)/0.385 * 11 + '%'
            console.log('tp' ,  top)
            this.setData({
                top:top
            })
        }else{
            // this.setData({
            //     isUseX:false
            // })
        }
    },
    onLoad: function () {
        this.init()
        this.ininBgSize()
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
        this.getUserInfo(userInfo.detail)
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
        //     url: '/pages/just-listen/index'
        // })

        // wx.navigateTo({
        //     url: '/pages/my-achieve-win-info-input/index'
        // })
        // wx.navigateTo({
        //     url: '/pages/my-achieve/index'
        // })
        // wx.navigateTo({
        //     url: '/pages/upload-music/index?uploadType=wx'
        // })
    }
})
