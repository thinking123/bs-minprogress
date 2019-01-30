// pages/singer-home/index.js
Page({
    data: {
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
        ]
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
})
