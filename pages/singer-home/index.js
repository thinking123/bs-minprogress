import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {followMusic, getUser, putfollowMusic, voteMusic , mainMusic} from "../../http/http-business";
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
    async handlegz(){
        try {
            if(this.data.mainSong){

                const id = this.data.mainSong.id.replace(/'/g , '')
                console.log('mainSong' , id)
                await this._followMusic(id)
                await this._getUser()
            }else{
                showMsg('请先设置主打歌')
            }
        }catch (e) {
            showMsg(e)
        }
    },
    async handlevote(){
        try {
            if(this.data.mainSong){
                const id = this.data.mainSong.id.replace(/'/g , '')
                await this._voteMusic(id)
                await this._getUser()
            }else{
                showMsg('请先设置主打歌')
            }
        }catch (e) {
            showMsg(e)
        }
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
