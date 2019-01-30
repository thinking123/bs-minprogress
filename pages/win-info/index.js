// pages/my-achieve/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
