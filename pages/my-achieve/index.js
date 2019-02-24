import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getAchievement , receiveAchievement} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'my-achieve-'
const url = `${baseUrl}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
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
        ],
        showdcjDialog:false,
        achievePrize:null,
        showwwgkDialog:false,
        showycdyDialog:false,
        showyljzDialog:false,
        showyNotEnoughDialog:false,
        // ,
        // testShow:true
    },
    goToPrizePage(prize , type = ''){
        const url = `/pages/my-achieve-win-info-input/index?prize=${prize}&type=${type}`
        wx.navigateTo({
            url: url
        })
    },
    handleHideNotEnough(){
        this.setData({
            showyNotEnoughDialog:false
        })
    },
    handleHidedcj(){
      this.setData({
          showdcjDialog:false
      })
    },
    handleTapdcj(e){
      const prize = e.detail
        this.goToPrizePage(prize.type)
    },

    handleHidewwgk(){
        this.setData({
            showwwgkDialog:false
        })
    },
    handleTapwwgk(e){
        console.log('handleTapwwgk')
        //前往歌手主页上传音乐
        wx.navigateTo({
            url: '/pages/singer-home/index'
        })
        // const prize = e.detail
    },

    handleHideycdy(){
        this.setData({
            showycdyDialog:false
        })
    },
    handleTapycdy(e){
        console.log('handleTapycdy')
        this.setData({
            showycdyDialog:false
        })
    },

    handleHideyljz(){
        this.setData({
            showyljzDialog:false
        })
    },
    handleTapyljz(e){
        console.log('handleTapycdy')

        this.goToPrizePage('yljz' , 'virtual')
        // const prize = e.detail
    },


    handleReturn() {
        wx.navigateBack({
            delta: 1
        })
    },
    async handleGet(e){
        const item = e.target.dataset.item
        console.log('handleGet' , item)
        //0 :未领取 ，
      if(!item.canGet){
            // showMsg('已经领取')
          if(item.hadGot){
              showMsg('已经领取')
          }else{

          }
        }else{
            //
            try {
                const prize = await receiveAchievement(item.type)
                if(prize.notEnough &&
                    (item.type == 'yljz'
                    || item.type == 'dcj'
                    || item.type == 'zazs')){
                    this.setData({
                        showyNotEnoughDialog:true
                    })
                    return
                }
                await this._getAchievement()
                prize.type = item.type
                this.showDialog(prize , item.type)
            }catch (e) {
                showMsg(e)
            }
        }
    },
    async onShow(){
        // try {
        //     await this._getAchievement()
        // }catch (e) {
        //     showMsg(e)
        // }
        this.setData({
            showycdyDialog:false,
            showdcjDialog:false,
            showwwgkDialog:false,
            showyljzDialog:false,
        })
    },
    showDialog(prize ,type){
        switch (type) {
            case 'ycdy':
                this.setData({
                    achievePrize:prize,
                    showycdyDialog:true
                })
                break
            case 'dcj':
            case 'zazs':
                this.setData({
                    achievePrize:prize,
                    showdcjDialog:true
                })
                break
            case 'wwgk':
                this.setData({
                    achievePrize:prize,
                    showwwgkDialog:true
                })
                break
            case 'yljz':
                this.setData({
                    achievePrize:prize,
                    showyljzDialog:true
                })
                break
        }
    },
    async _getAchievement(){
        const res = await getAchievement()
        // const keys = Object.keys(res)
        const list = [...this.data.achieveList]
        console.log(list)
        // const list = res
        //1 已经领取 0 未领取

        //ycdy > 0
        list[0].progress = res.ycdyNum > 0 ? '100%' : '0'
        list[0].canGet = res.ycdy == 0 && res.ycdyNum > 0
        list[0].hadGot = res.ycdy == 1
        list[0].type = 'ycdy'

        list[1].progress = res.zazsNum / 15 * 100 + '%'
        list[1].canGet = res.zazs == 0 && res.zazsNum >= 15
        list[1].hadGot = res.zazs == 1
        list[1].type = 'zazs'

        list[2].progress = res.dcjNum / 66 * 100+ '%'
        list[2].canGet = res.dcj == 0 && res.dcjNum >= 66
        list[2].hadGot = res.dcj == 1
        list[2].type = 'dcj'

        list[3].progress = res.wwgkNum / 6666 * 100+ '%'
        list[3].canGet = res.wwgk == 0 && res.wwgkNum >= 6666
        list[3].hadGot = res.wwgk == 1
        list[3].type = 'wwgk'

        list[4].progress = res.yljzNum / 10 * 100 + '%'
        list[4].canGet = res.yljz == 0 && res.yljzNum >= 10
        list[4].hadGot = res.yljz == 1
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
