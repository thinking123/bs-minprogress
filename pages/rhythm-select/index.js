const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'rhythm-select/'
const url = `${baseUrl}${page}`
// const url = './'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        left:'136rpx',
        url:url,
        isPlaying:false,
        isRecording:false,
    },
    handleDev(e) {
        const data = e.target.dataset.dev
        let left = 0

        switch (data) {
            case "0" :
                left = 68 * 2;
                break
            case "1" :
                left = 149 * 2;
                break
            case "2" :
                left = 230 * 2;
                break

        }

        left += 'rpx'

        console.log('handleDev', data , left)
        this.setData({
            left:left
        })

    },
    handleRecord(e) {
        console.log('handleRecord')
        this.setData({
            isRecording:!this.data.isRecording
        })
    },
    handlePlay(e) {
        console.log('handlePlay' , this.data.isPlaying)
        this.setData({
            isPlaying:!this.data.isPlaying
        })
    },
    handleSave(e) {
        console.log('handleSave')
    },
    handleMusicPerson(e) {
        console.log('handleMusicPerson')
        wx.navigateTo({
            url:'/pages/rhythm-share/index'
        })
    },
    handleTapMusicBtn(e) {
        const {index , key} = e.target.dataset
        console.log('handleTapMusicBtn' , index , key)
    },
    handleTouching(e){
        const key = e.detail
        console.log('handleTouching' , key)
    }
})
