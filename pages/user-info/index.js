import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import { isSignUp , getCheckMsg} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const page = 'user-info-'
const url = `${base}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url:url,
        showNoMusicDialog:false,
        showCheckErrorDialog:false,
        showCheckIngDialog:false,
        showCheckSuccessDialog:false,
        showCheckSuccessButMusicDialog:false,
        showSigninCheckDialog:false,
        showSingerHomeCheckingDialog:false,
        showSingerHomeCheckingErrorDialog:false,
        showNoSingerJoinErrorDialog:true,
        showCheckErrorExDialog:false,
        showUploadDialog:false,
        checkState: '',
        musicId:'',

        errorMsg:''
    },
    handleSubmitDialog(e) {
        const uploadType = e.detail
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
        }

    },
    handleCheckErrorExDialog(){
        this.setData({
            showCheckErrorExDialog:false
        })
    },
    handleNoSingerJoinErrorDialog(){
        this.setData({
            showNoSingerJoinErrorDialog:false
        })
    },
    handleSingerHomeCheckingErrorDialog(){
        this.setData({
            showSingerHomeCheckingErrorDialog:false
        })
    },
    handleSingerHomeCheckingDialog(){
        this.setData({
            showSingerHomeCheckingDialog:false
        })
    },
    handleHideNoMusicDialog(){
      this.setData({
          showNoMusicDialog:false
      })
    },
    handleSigninCheckDialog(){
        this.setData({
            showSigninCheckDialog:false
        })
    },
    handleCheckErrorDialog(){
        this.setData({
            showCheckErrorDialog:false
        })


        // 跳转到上传音乐page
        //
        // wx.navigateTo({
        //     url:'/pages/upload-music/index'
        // })
    },
    handleCheckIngDialog(){
        this.setData({
            showCheckIngDialog:false
        })
    },
    handleCheckSuccessDialog(){
        this.setData({
            showCheckSuccessDialog:false
        })
    },
    handleCheckSuccessButMusicDialog(){
        this.setData({
            showCheckSuccessButMusicDialog:false
        })
    },
    async _isSignUp(){
        try {

            const {checkMsg,state} = await getCheckMsg()

            if(state == 1){
                        wx.navigateTo({
                            url:'/pages/singer-home/index'
                        })
            }else{

            }
            // const res = await isSignUp()
            //
            // if (res == '9006') {
            //     const {checkMsg,state} = await getCheckMsg()
            //     if(state == 0){
            //         this.setData({
            //             showSingerHomeCheckingDialog:true
            //         })
            //     }else if(state == 2){
            //         this.setData({
            //             showSingerHomeCheckingErrorDialog:true
            //         })
            //     }else{
            //         wx.navigateTo({
            //             url:'/pages/singer-home/index'
            //         })
            //     }
            //
            // } else{
            //     // showMsg('请先注册')
            //     this.setData({
            //         showNoMusicDialog:true
            //     })
            // }

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
    async _checkSingerHome(){
      try {
          //0音乐信息审核中 1 音乐审核通过 3 未报名
          // 4报名信息审核失败 5用户审核通过，未提交音乐 6音乐审核失败
          const {state} = await getCheckMsg(1)
          if(state == 1){
              wx.navigateTo({
                  url:'/pages/singer-home/index'
              })
          }else{
              this.setData({
                  showNoSingerJoinErrorDialog:true
              })
          }
      }  catch (e) {
          showMsg(e)
      }
    },
    handleSingerHome: function () {
        console.log('handleRegister')
        this._checkSingerHome()

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
    // handleReWrite(){
    //     wx.navigateTo({
    //         url:'/pages/register/index'
    //     })
    //     // wx.chooseMessageFile({
    //     //     count:10,
    //     //     complete:res =>{
    //     //         console.log('res' , res)
    //     //     }
    //     // })
    // },
    async handleReviewInfo(){
        console.log('handleReviewInfo')
        try {

            //0音乐信息审核中 1 音乐审核通过 3 未报名
            // 4报名信息审核失败 5用户审核通过，未提交音乐 6音乐审核失败
            const {checkMsg, state, musicId} = await getCheckMsg(2)
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
                case 3:
                   //弹未报名dialog
                    this.setData({
                        showSigninCheckDialog:false
                    })
                    break
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
        }catch (e) {
            showMsg(e)
        }
    }
})
