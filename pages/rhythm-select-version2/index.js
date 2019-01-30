// pages/rhythm-select-version2/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        left:'142rpx'
    },
    handleRhythm(e) {
        const data = e.target.dataset.rhythm
        let left = 0

        switch (data) {
            case "0" :
                left = 72 * 2;
                break
            case "1" :
                left = 149 * 2;
                break
            case "2" :
                left = 230 * 2;
                break

        }

        left += 'rpx'

        console.log('handleRhythm', data , left)
       this.setData({
           left:left
       })
    },
    handlePlayRhythm(e) {
        console.log('handlePlayRhythm')
    },
    handleSongRhythm(e) {
        console.log('handleSongRhythm')
    }
})
