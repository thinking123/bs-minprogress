import {getSchool} from "../../http/index";
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
        pointId: String
    },
    data: {
        url: url,
        inputShowed: false,
        inputVal: "",
        resultList: []
    },
    computed: {
        isSearching() {
            return this.data.queue.length > 0
        }
    },
    methods: {
        handleItemTap(e){
            console.log('school : ', e.target.dataset.item)
            this.setData({
                inputVal: item.name
            });

            this.triggerEvent('selected', item)
        },
        handleInput: function (e) {
            this.setData({
                inputVal: e.detail.value
            });

            this.throttleGetData()
        },
        async getData() {
            if (this.data.provinceId && this.data.pointId) {
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
                    const res = await getSchool(this.data.provinceId , this.data.pointId)
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
        this.cache = {'sc' : [{'id':'sd' , name:'北京大学'},{'id':'ssd' , name:'北京s大学'}]}
        this.queue = []
        this.throttleGetData = throttle(this.getData,
            3000)
    }

})
