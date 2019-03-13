import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getRankingList, followMusic, putfollowMusic, voteMusic, getProvince} from "../../http/http-business";
import {showMsg , getRatioSize} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const page = 'rank-list-'
const url = `${base}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url: url,
        showCityList: [],
        showStartIndex: 0,
        provinces: [],
        selectedCity: null,
        gold: null,
        silver: null,
        cuprum: null,
        musicList: [],
        rankListTopThree: [],
        rankListOther: [],
        pageNum: 1,
        total: 0,
        //每页10条，从1开始页数
        pages: 0,
        isLoading: false,
        searchKey: '',
        hadSearched:false,
        selectedZone:'hx',
        imgSize:{width:'',height:''}
    },
    handleTapHeader(e){
      const music = e.detail
        const url = `/pages/singer-home/index?id=${music.userId}`
        wx.navigateTo({
            url: url
        })

    },
    handleCardFollow(e) {
        const rank = e.detail
        if(rank.followState == 1){
            this._putfollowMusic(rank.id)
        }else{
            this._followMusic(rank.id)
        }

    },
    handleCardVote(e) {
        const rank = e.detail
        if(rank.voteState == 1){
            showMsg('已经投票')
        }else{
            this._voteMusic(e.detail.id)
        }

    },
    handleScrollBottom(e) {
        this.loadingMorePages()
        console.log('scroll bottom')
    },
    async loadingMorePages() {
        try {
            if (!this.data.isLoading && this.data.pageNum < this.data.pages) {
                const pageNum = this.data.pageNum + 1
                this.setData({
                    isLoading: true,
                    pageNum: pageNum
                })

                const reg = /\d+/

                const key = this.data.searchKey
                const isCode = reg.test(this.data.searchKey)
                const musicPlayerName = !isCode && this.data.hadSearched ? key : ''
                const musicPlayerCode = isCode && this.data.hadSearched ? key : ''

                await this._getRankingList(true , musicPlayerName , musicPlayerCode)
            }
        } catch (e) {
            showMsg(e)
        }finally {
            this.setData({
                isLoading: false
            })
        }
    },
    onLoad() {
        const res = wx.getSystemInfoSync()

        this.px2rpx = 750 / res.windowWidth;
        this.winHeight = res.windowHeight;
        this.init()
    },
    async init() {
        try {
            const provinces = await getProvince()
            const showCityList = provinces.slice(this.data.showStartIndex, this.data.showStartIndex + 4)
            const selectedCity = showCityList.length > 0 ? showCityList[0] : null

            this.setData({
                provinces: provinces,
                showCityList: showCityList,
                selectedCity: selectedCity
            })

            await this._getRankingList()

        } catch (e) {
            showMsg(e)
        }
    },
    updateRank(res) {
        const musicList = this.data.musicList.map(m => {
            if (m.id === res.id) {
                return res
            } else {
                return m
            }
        })
        const rankListTopThree = musicList.slice(0, 3)

        const rankListOther = musicList.slice(3)


        this.setData({
            musicList: musicList,
            rankListTopThree: rankListTopThree,
            rankListOther: rankListOther,
            gold: rankListTopThree.length >= 0 ? rankListTopThree[0] : null,
            silver: rankListTopThree.length >= 1 ? rankListTopThree[1] : null,
            cuprum: rankListTopThree.length >= 2 ? rankListTopThree[2] : null,
        })
    },
    async _followMusic(musicId) {
        try {
            const res = await followMusic(musicId)
            this.updateRank(res)
            console.log('_followMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _putfollowMusic(musicId) {
        try {
            const res = await putfollowMusic(musicId)
            this.updateRank(res)
            console.log('_putfollowMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _voteMusic(musicId) {
        try {
            const res = await voteMusic(musicId)
            this.updateRank(res)
            console.log('voteMusic', res)
        } catch (e) {
            showMsg(e)
        }
    },
    /*
    * musicPlayerCode:只有数字,其他是musicPlayerName
    * */
    async _getRankingList(nextPage = false, musicPlayerName = '', musicPlayerCode = '') {
        if (!this.data.selectedCity) {
            console.log('no selected city')
            return
        }
        let rankListOther = [] , all = [] , rankListTopThree = [] , zone = 1

        switch (this.data.selectedZone) {
            case 'hx':
                zone = 1;
                break
            case 'cs':
                zone = 2;
                break
            case 'sq':
                zone = 3;
                break
        }
        let {musicList, pageUtil} = await getRankingList(this.data.pageNum, this.data.selectedCity.id, zone,musicPlayerName, musicPlayerCode)
        if(musicPlayerName.length !== 0 || musicPlayerCode.length !== 0){
            //search from input ，前三名还是显示原来的
            musicList = musicList.filter(f=>{
                return f.rank > 3
            })

            all = nextPage ? [...this.data.musicList, ...musicList] : [...this.data.rankListTopThree , ...musicList]

            rankListOther = all.slice(3)

            this.setData({
                musicList: all,
                rankListOther: rankListOther,
                pageNum: pageUtil.pageNum,
                pages: pageUtil.pages,
                total: pageUtil.total,
            })

        }else{
            all = nextPage ? [...this.data.musicList, ...musicList] : musicList


            rankListTopThree = all.slice(0, 3)
            //todo mock data

            rankListOther = all.slice(3)


            this.setData({
                musicList: all,
                rankListTopThree: rankListTopThree,
                rankListOther: rankListOther,
                gold: rankListTopThree.length >= 1 ? rankListTopThree[0] : null,
                silver: rankListTopThree.length >= 2 ? rankListTopThree[1] : null,
                cuprum: rankListTopThree.length >= 3 ? rankListTopThree[2] : null,
                pageNum: pageUtil.pageNum,
                pages: pageUtil.pages,
                total: pageUtil.total,
            })
        }

    },
    handleBeforeCity(e) {
        if (this.data.showStartIndex > 0) {
            const showStartIndex = this.data.showStartIndex - 1
            const showCityList = this.data.provinces.slice(showStartIndex, showStartIndex + 4)
            this.setData({
                showStartIndex: showStartIndex,
                showCityList: showCityList,
            })
        }
        console.log('handleBeforeCity')
    },
    handleBackCity(e) {
        if (this.data.showStartIndex < this.data.provinces.length - 1 - 4) {
            const showStartIndex = this.data.showStartIndex + 1
            const showCityList = this.data.provinces.slice(showStartIndex, showStartIndex + 4)
            this.setData({
                showStartIndex: showStartIndex,
                showCityList: showCityList,
            })
        }
        console.log('handleBackCity')
    },
    async handleSelectZone(e){
        const zone = e.target.dataset.zone
        console.log('zone' , zone)
        this.setData({
            selectedZone:zone,
            hadSearched: false,
            searchKey: '',
            pageNum:1,
            pages:0,
            total:0,
        })
        try {
            await this._getRankingList()
        } catch (e) {
            showMsg(e)
        }
    },
    async handleSelectCity(e) {
        console.log('handleSelectCity : ', e.target.dataset.city)
        const selectedCity = e.target.dataset.city ? e.target.dataset.city : null
        this.setData({
            selectedCity: selectedCity,
            hadSearched: false,
            searchKey: '',
            pageNum:1,
            pages:0,
            total:0,
        })
        try {
            await this._getRankingList()
        } catch (e) {
            showMsg(e)
        }

    },
    handleFollowed(e) {
        this._putfollowMusic(e.target.dataset.rank.id)
    },
    handleNotFollowed(e) {
        this._followMusic(e.target.dataset.rank.id)
    },
    handleVote(e) {
        const rank = e.target.dataset.rank
        if(rank.voteState == 1){
            showMsg('已经投票')
        }else{
            this._voteMusic(e.target.dataset.rank.id)
        }

    },

    handleBindload(e){
        const originWidth = e.detail.width * this.px2rpx,
                originHeight = e.detail.height * this.px2rpx,
                viewWidth  = 604, viewHeight = this.winHeight * 0.1529* this.px2rpx

        const size = getRatioSize(viewWidth , viewHeight ,originWidth ,  originHeight)

        console.log('adjust size' , size)
        this.setData({
            imgSize:size
        })

    },
    filterSpecWord(str){
        const reg = /[^\u4e00-\u9fa50-9a-fA-F]/g
        str = str.replace(reg , '')
        console.log('str' , str)
        return str
    },
    async handleSearch(e) {
        console.log('handleSearch : ')
        const reg = /\d+/
        const key = this.data.searchKey
        const isCode = reg.test(this.data.searchKey)
        const musicPlayerName = !isCode ? key : ''
        const musicPlayerCode = isCode ? key : ''
        try {
            this.setData({
                hadSearched: true,
                pageNum:1,
                total:0,
                pages:0,
            })
            await this._getRankingList(false, musicPlayerName, musicPlayerCode)
        } catch (e) {
            showMsg(e)
            this.setData({
                hadSearched: false
            })
        }

    },
    handleSearchKeyInput(e) {
        const input = this.filterSpecWord(e.detail.value)
        this.setData({
            searchKey: input
        })
    },
    handleSingerHome(e) {
        const id = e.target.dataset.rank.userId
        this.gotoSingerHome(id)
    },
    handleCardSingerHome(e) {
        console.log('handleCardSingerHome', e)
        this.gotoSingerHome(e.detail.userId)
    },
    gotoSingerHome(id) {
        const url = `/pages/singer-home/index?id=${id}`
        wx.navigateTo({
            url: url
        })
    }

})
