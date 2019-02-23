import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {followMusic, getUser, putfollowMusic, voteMusic , mainMusic} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const page = 'singer-home-'
const url = `${base}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url:url,
        user:null,
        bsMusicEntityList:[],
        mainSong:null,
        isSelf:false,
        showUploadDialog:false
    },
    handleSubmitDialog(e){
        const uploadType = e.detail
        const url = `/pages/upload-music/index?uploadType=${uploadType}&isTwo=${true}`
        wx.navigateTo({
            url: url
        })
    },
    handleHideDialog(e){
        this.setData({
            showUploadDialog:false
        })
    },
     handlegz(){
        if(!this.data.mainSong){
            showMsg('没有主打歌')
        }
         const id = this.data.mainSong.id.replace(/'/g , '')
         console.log('mainSong' , id)
         this.data.mainSong.followState == 0 ? this._followMusic(id) : this._putfollowMusic(id)
    },
    async handlevote(){
        if(!this.data.mainSong){
            showMsg('没有主打歌')
        }
        const id = this.data.mainSong.id.replace(/'/g , '')
        await this._voteMusic(id)
    },
    async handleSetMainSong(e){
        try {
            const item = e.target.dataset.song
            await mainMusic(item.id)
            await this._getUser()
        }catch (e) {
            showMsg(e)
        }
    },
    async _getUser(){
        const user = await getUser(this.id)
        const mainSong = user.bsMusicEntityList ? user.bsMusicEntityList.find(f=>{
            return f.isMain == 1
        }) : null
        this.setData({
            user:user,
            bsMusicEntityList:user.bsMusicEntityList,
            mainSong:mainSong
        })

    },
    async onLoad(option) {
        try {
            console.log('onload' , option)
            this.id = option && option.id ? option.id : app.globalData.uId
            const isSelf = this.id === app.globalData.uId
            this.setData({
                isSelf:isSelf
            })
            await this._getUser()
        }catch (e) {
            showMsg(e)
        }
    },
    async _followMusic(musicId) {
        try {
            const res = await followMusic(musicId)
            await this._getUser()
            console.log('_followMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _putfollowMusic(musicId) {
        try {
            const res = await putfollowMusic(musicId)
            await this._getUser()
            console.log('_putfollowMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _voteMusic(musicId) {
        try {
            const res = await voteMusic(musicId)
            await this._getUser()
            console.log('voteMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    handleUpload(){
        this.setData({
            showUploadDialog:true
        })
    }
})
