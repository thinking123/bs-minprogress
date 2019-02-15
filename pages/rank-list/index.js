import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {getRankingList, followMusic, putfollowMusic, voteMusic, getProvince} from "../../http/http-business";
import {showMsg} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'rank-list/'
const url = `${baseUrl}${page}`
Page({
    data: {
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
        hadSearched:false

    },
    handleCardFollow(e) {
        this._followMusic(e.detail.id)
    },
    handleCardVote(e) {
        this._voteMusic(e.detail.id)
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
        let rankListOther = [] , all = [] , rankListTopThree = []
        let {musicList, pageUtil} = await getRankingList(this.data.pageNum, this.data.selectedCity.id, musicPlayerName, musicPlayerCode)
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
        this._voteMusic(e.target.dataset.rank.id)
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
        this.setData({
            searchKey: e.detail.value
        })
    },
    handleSingerHome(e) {
        const id = e.target.dataset.rank.id
        this.gotoSingerHome(id)
    },
    handleCardSingerHome(e) {
        console.log('handleCardSingerHome', e)
        this.gotoSingerHome(e.detail.id)
    },
    gotoSingerHome(id) {
        const url = `/pages/singer-home/index?id=${id}`
        wx.navigateTo({
            url: url
        })
    }

})
