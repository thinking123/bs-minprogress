// pages/my-achieve/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        achieveList:[
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"80%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"60%",
                text:'上传原创歌曲'
            },
            {
                name:'我为原创代言',
                progress:"20%",
                text:'上传原创歌曲'
            }
        ]
        // ,
        // testShow:true
    },
    handleReturn() {
        wx.navigateBack({
            delta: 1
        })
    }
})
