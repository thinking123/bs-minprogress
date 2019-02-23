import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'

import {getSchool} from "../../http/http-business";
import {throttle, debounce, showMsg} from "../../utils/util";
const computedBehavior = require('miniprogram-computed')
const app = getApp()
const baseComponentUrl = app.globalData.baseComponentUrl
const component = 'search-input/'
const url = `${baseComponentUrl}${component}`

Component({
    externalClasses: ['search-input-external'],
    behaviors: [computedBehavior],
    properties: {
        provinceId: String,
        pointId: String,
        showSearchList:{
            type:Boolean,
            value:false
        },
        clear:{
            type:Boolean,
            value:false,
            observer(newVal, oldVal, changedPath) {
                console.log('clear')
                if(newVal){
                    this.setData({
                        inputVal: ''
                    });
                }
            }
        },
        selectedProvince:{
            type:Object,
            value: null
        },
        selectedPoint:{
            type:Object,
            value: null
        },
        selectedSchool:{
            type:Object,
            value: null,
            observer(newVal, oldVal, changedPath) {
                console.log('newVal' , newVal)
                if(newVal === null){
                    this.setData({
                        inputVal: ''
                    });
                }
            }
        },
        inputValOuter:{
            type:String,
            value:'',
            observer(newVal, oldVal, changedPath) {
                console.log('clear')
                if(newVal){
                    this.setData({
                        inputVal: newVal
                    });
                }
            }
        }
    },
    data: {
        url: url,
        inputShowed: false,
        inputVal: "",
        resultList: [],
        showList:false,
        focus:false,
        isInnerTap:false,
        cursorSpacing:'0'
    },
    computed: {
        isSearching() {
            return this.queue && this.queue.length > 0
        }
    },
    attached(){
        const res = wx.getSystemInfoSync()
        const isAndroid = res.platform == "android"

        const screenHeight = parseInt(res.screenHeight)

        const cursorSpacing = 0.3 * screenHeight + 'px'
        console.log('isAndroid' , isAndroid , cursorSpacing)
        this.setData({
            cursorSpacing:isAndroid ? '0' : cursorSpacing
        })
    },
    methods: {
        handleScrollBottom(){
            // this.loadingMorePages()
        },
        // async loadingMorePages() {
        //     try {
        //         if (!this.data.isLoading && this.data.pageNum < this.data.pages) {
        //             const pageNum = this.data.pageNum + 1
        //             this.setData({
        //                 isLoading: true,
        //                 pageNum: pageNum
        //             })
        //
        //             const reg = /\d+/
        //
        //             const key = this.data.searchKey
        //             const isCode = reg.test(this.data.searchKey)
        //             const musicPlayerName = !isCode && this.data.hadSearched ? key : ''
        //             const musicPlayerCode = isCode && this.data.hadSearched ? key : ''
        //
        //             await this._getRankingList(true , musicPlayerName , musicPlayerCode)
        //         }
        //     } catch (e) {
        //         showMsg(e)
        //     }finally {
        //         this.setData({
        //             isLoading: false
        //         })
        //     }
        // },
        handleItemTap(e){
            console.log('handleItemTap')
            const item = e.target.dataset.item
            // console.log('school : ', e.target.dataset.item)
            this.setData({
                inputVal: item && item.schoolName ? item.schoolName : ''
            });


            this.triggerEvent('selected', item)

        },
        handleInput: function (e) {
            this.setData({
                inputVal: e.detail.value
            });
            this.triggerEvent('input', e.detail.value)
            this.throttleGetData()
        },

        async getData() {
            //输入至少四个汉字
            const inputReg = /^[\u4e00-\u9fa5]{4,}$/
            if (this.data.selectedPoint &&
                this.data.selectedProvince &&
                inputReg.test(this.data.inputVal)) {
                this.queue.push({})
                this.lastSearch = this.data.inputVal
                if(!!this.cache[this.data.inputVal]){
                    const cache = this.cache[this.data.inputVal]
                    this.setData({
                        resultList:cache
                    })
                    console.log('get from cache' , cache)
                    return
                }
                try{
                    const res = await getSchool(this.data.selectedProvince.id ,
                        this.data.selectedPoint.id , this.data.inputVal)
                    this.cache[this.data.inputVal] = res
                    if(this.lastSearch === this.data.inputVal){
                        this.setData({
                            resultList:res
                        })
                        console.log('get data' , res)
                    }

                }catch (e) {
                    console.error('get data' , e)
                }finally {
                    this.queue.pop()
                }
            }
        }
    },
    created() {
        this.lastSearch = ''
        this.cache = {}
        this.queue = []
        this.throttleGetData = throttle(this.getData,
            1000)
    }

})
