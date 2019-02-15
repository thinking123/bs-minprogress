import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getUser} from "../../http/http-business";
import {showMsg} from "../../utils/util";
const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'singer-home/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        name: '刘德华',
        school: '北京大学',
        song: '歌曲',
        vote: 100,
        rank: 1021,
        songList:[
            '删丹丹开花红艳艳',
            '删丹丹开花红艳艳',
            '删丹丹开21花红艳艳',
            '删丹丹dsf开花红艳艳',
            '删丹丹开花dsf红艳艳',
            '删丹丹开花红ds艳艳',
            '删丹丹dsf红ds艳艳',
        ],
        user:null
    },
    handlegz(){
        console.log('handlegz')
        wx.navigateTo({
            url:'/pages/attention/index'
        })
    },
    handlevote(){
        console.log('handlevote')
    },
    async onLoad(option) {
        try {
            const id = option ? option.id : ''

            const user = await getUser(id)
            this.setData({
                user:user
            })
            console.log('user' , user)
        }catch (e) {
            showMsg(e)
        }



    },
})
