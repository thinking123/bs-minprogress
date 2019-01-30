const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'win-info/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        achieveList:[
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:true
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:true
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:true
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            },
            {
                name:'我为原创代言',
                time:"2019.3.2",
                hadGot:false
            }
        ]
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
        })
    },
    handleGetWin(e){
        const data = e.target.dataset.win
        console.log('handleGetWin' , data)
        wx.navigateTo({
            url:'/pages/win-info-input/index'
        })

    }
})
