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
        searchKey:''

    },
    handleCardFollow(e) {
        console.log('handleCardFollow', e)
    },
    handleCardVote(e) {
        console.log('handleCardVote', e)
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

                await this._getRankingList(true)
            }
        } catch (e) {
            showMsg(e)
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
    async _followMusic(musicId) {
        try {
            const res = await followMusic(musicId)
            console.log('_followMusic' ,res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _putfollowMusic(musicId) {
        try {
            const res = await putfollowMusic(musicId)
            console.log('_putfollowMusic' ,res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _voteMusic(musicId) {
        try {
            const res = await voteMusic(musicId)
            console.log('voteMusic' ,res)
        } catch (e) {
            showMsg(e)
        }
    },
    async _getRankingList(nextPage = false ,searchKey = '') {
        if (!this.data.selectedCity) {
            console.log('no selected city')
            return
        }
        const {musicList, pageUtil} = await getRankingList(this.data.pageNum, this.data.selectedCity.id , searchKey)
        const all = nextPage ? [...this.data.musicList, ...musicList] : musicList
        const rankListTopThree = all.slice(0, 3)

        const rankListOther = all.slice(3)


        this.setData({
            musicList: all,
            rankListTopThree: rankListTopThree,
            rankListOther: rankListOther,
            gold: rankListTopThree.length >= 0 ? rankListTopThree[0] : null,
            silver: rankListTopThree.length >= 1 ? rankListTopThree[1] : null,
            cuprum: rankListTopThree.length >= 2 ? rankListTopThree[2] : null,
            pageNum: pageUtil.pageNum,
            pages: pageUtil.pages,
            total: pageUtil.total,
        })
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
    handleSelectCity(e) {
        console.log('handleSelectCity : ', e.target.dataset.city)
        const selectedCity = e.target.dataset.city ? e.target.dataset.city : null
        this.setData({
            selectedCity: selectedCity,
            pageNum: 1
        })

        this._getRankingList()
    },
    handleFollowed(e) {
        console.log('handleFollowed : ', e.target.dataset.rank)
        this._putfollowMusic(e.target.dataset.rank.id)
    },
    handleNotFollowed(e) {
        console.log('handleNotFollowed : ', e.target.dataset.rank)
        this._followMusic(e.target.dataset.rank.id)
    },
    handleVote(e) {
        console.log('handleVote : ', e.target.dataset.rank)
        this._voteMusic(e.target.dataset.rank.id)
    },
    handleSearch(e){
        console.log('handleSearch : ')
        this._getRankingList(false , this.data.searchKey)
    },
    handleSearchKeyInput(e){
        this.setData({
            searchKey: e.detail.value
        })
    }

})
