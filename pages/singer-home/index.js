import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {followMusic, getUser, putfollowMusic, voteMusic} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'singer-home/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        user:null,
        bsMusicEntityList:[],
        mainSong:null
    },
    handlegz(){
        console.log('handlegz')
    },
    handlevote(){
        console.log('handlevote')
    },
    async _getUser(){
        const user = await getUser(this.id)
        const mainSong = user.bsMusicEntityList.find(f=>{
            return f.isMain == 1
        })
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
    async _voteMusic(musicId) {
        try {
            const res = await voteMusic(musicId)
            await this._getUser()
            console.log('voteMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
})
