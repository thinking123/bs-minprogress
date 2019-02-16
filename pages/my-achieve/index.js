import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getAchievement , receiveAchievement} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'my-achieve/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        achieveList:[
            {
                name:'我为原创代言',
                text:'上传原创歌曲并通过',
                progress:'0',
                canGet:0
            },
            {
                name:'真爱至上',
                text:'每天给同一个投票持续15天',
                progress:'0',
                canGet:0
            },
            {
                name:'行走的点唱机',
                text:'打开66个惊喜盒子',
                progress:'0',
                canGet:0
            },
            {
                name:'我为歌狂',
                text:'收到6666票',
                progress:'0',
                canGet:0
            },
            {
                name:'雨露均沾',
                text:'关注人数达到10人',
                progress:'0',
                canGet:0
            },
        ]
        // ,
        // testShow:true
    },
    handleReturn() {
        wx.navigateBack({
            delta: 1
        })
    },
    async handleGet(e){
        const item = e.target.dataset.item
        if(item.canGet == 0){
            showMsg('还未完成')
        }else if(item.canGet == 1){
            showMsg('已经领取')
        }else if(item.canGet == 2){
            //
            try {
                await receiveAchievement(item.type)
                await this._getAchievement()
            }catch (e) {
                showMsg(e)
            }
        }
    },
    async _getAchievement(){
        const res = await getAchievement()
        // const keys = Object.keys(res)
        const list = [...this.data.achieveList]
        //1 已经领取 0 不能领取 2 可领取
        list[0].progress = res.ycdy == 2 ? '100%' : '0'
        list[0].canGet = res.ycdy
        list[0].type = 'ycdy'

        list[1].progress = res.zazsNum / 15
        list[1].canGet = res.zazs
        list[1].type = 'zazs'

        list[2].progress = res.dcjNum / 66
        list[2].canGet = res.dcj
        list[2].type = 'dcj'

        list[3].progress = res.wwgkNum / 6666
        list[3].canGet = res.wwgk
        list[3].type = 'wwgk'

        list[4].progress = res.yljzNum / 10
        list[4].canGet = res.yljz
        list[4].type = 'yljz'
        this.setData({
            achieveList:list
        })
    },
    async onLoad(){
        try {
            await this._getAchievement()
        }catch (e) {
            showMsg(e)
        }
    }
})
