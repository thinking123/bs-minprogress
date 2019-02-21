import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import { isSignUp , getCheckMsg} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const page = 'user-info-'
const url = `${base}${page}`
Page({
    data: {
        url:url,
        showNoMusicDialog:false,
        showCheckErrorDialog:false,
        showCheckIngDialog:false,
        showCheckSuccessDialog:false,
        showCheckSuccessButMusicDialog:false,


        errorMsg:'很遗憾，您未通过审核，请详细阅读报名规则后重新报名！'
    },
    handleHideNoMusicDialog(){
      this.setData({
          showNoMusicDialog:false
      })
    },
    handleCheckErrorDialog(){
        this.setData({
            showCheckErrorDialog:false
        })


        // 跳转到上传音乐page

        wx.navigateTo({
            url:'/pages/upload-music/index'
        })
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
            const res = await isSignUp()

            if (res == '9006') {
                wx.navigateTo({
                    url:'/pages/singer-home/index'
                })
            } else{
                // showMsg('请先注册')
                this.setData({
                    showNoMusicDialog:true
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
    handleReWrite(){
        wx.chooseMessageFile({
            count:10,
            complete:res =>{
                console.log('res' , res)
            }
        })
    },
    async handleReviewInfo(){
        console.log('handleReviewInfo')
        try {
            //状态 1 正常 0 审核中 2 失败
            //10 用户审核通过，未提交音乐 11 第一首音乐审核通过
            const {checkMsg,state} = await getCheckMsg()
            if(state == 1){

            }else{

            }
            switch (state) {
                case 1:
                case 11:
                    this.setData({
                        showCheckIngDialog:true
                    })
                    break
                case 0:
                    this.setData({
                        showCheckIngDialog:true
                    })
                    break
                 case 2:
                    this.setData({
                        showCheckErrorDialog:true,
                        errorMsg:checkMsg
                    })
                    break
                 case 10:
                    this.setData({
                        showCheckSuccessButMusicDialog:true
                    })
                    break
            }
        }catch (e) {
            showMsg(e)
        }
    }
})
