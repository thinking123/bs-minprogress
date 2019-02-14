import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'

import {getSchool} from "../../http/http-business";
import {throttle, debounce} from "../../utils/util";
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
        }
    },
    data: {
        url: url,
        inputShowed: false,
        inputVal: "",
        resultList: [],
        showList:false,
        focus:false,
        isInnerTap:false
    },
    computed: {
        isSearching() {
            return this.queue && this.queue.length > 0
        }
    },
    methods: {
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
