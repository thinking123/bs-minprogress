// pages/rhythm-select-version2/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        left:'136rpx',
        isRecording:false,
        isPlaying:false,
        lyric:'xxxxx\nsdfsdf\nsdfsdfsddsfsd'
    },
    handleLyric(e) {
        const data = e.target.dataset.lyric
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

        console.log('handleLyric', data , left)
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
    handleReRecord(e) {
        console.log('handleReRecord')

        this.setData({
            isRecording:true,
            isPlaying:false,
        })
    },
    handleUploadMusic(e) {
        console.log('handleUploadMusic')
    }
})
