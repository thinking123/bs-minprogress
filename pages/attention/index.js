const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'attention/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        attentionList: [
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            },
            {
                name:'历史的',
                num:'007'
            }
        ]
    },
    handleReturn() {
        console.log('handleReturn')
        wx.navigateBack({
            delta: 1
        })
    }
})
