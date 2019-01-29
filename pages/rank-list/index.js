// pages/rank-list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showCityList: [
            '北京',
            '上海',
            '广州',
            '深圳'
        ],
        gold:{
            name:'定积分',
            school:'北京大学',
            region:'北京赛区',
            song:'什么歌曲',
            vote:881,
            followed:false
        },
        rankListTopThree:[
            {
                name:'定积分',
                school:'北京大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:881,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京的赛区',
                song:'什么歌曲',
                vote:822,
                followed:true
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
        ],
        rankListOther:[
            {
                name:'定积分',
                school:'北京大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:881,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京的赛区',
                song:'什么歌曲',
                vote:822,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:881,
                followed:true
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京的赛区',
                song:'什么歌曲',
                vote:822,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:true
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            },
            {
                name:'定积分',
                school:'北京是大学',
                region:'北京赛区',
                song:'什么歌曲',
                vote:821,
                followed:false
            }
        ]
    },
    handleBeforeCity(e) {
        console.log('handleBeforeCity')
    },
    handleBackCity(e) {
        console.log('handleBackCity')
    },
    handleSelectCity(e) {
        console.log('handleSelectCity : ', e.target.dataset.city)
    },
    handleFollowed(e) {
        console.log('handleFollowed : ', e.target.dataset.rank)
    },
    handleNotFollowed(e) {
        console.log('handleNotFollowed : ', e.target.dataset.rank)
    },
    handleVote(e) {
        console.log('handleVote : ', e.target.dataset.rank)
    },

})
