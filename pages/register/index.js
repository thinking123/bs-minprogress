import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {isEmpty, showMsg} from "../../utils/util";
import {getProvince, getSchool, getPoint, signUp} from "../../http/http-business";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const base = app.globalData.base
const page = 'register-'
const url = `${base}${page}`
const isLocked = app.globalData.isLocked
Page({
    data: {
        isLocked:isLocked,
        url: url,
        showError: false,
        schools: [],
        schoolIndex: -1,

        school: '',
        games: [],
        gameIndex: -1,
        regionIndex: -1,
        name: '',
        phone: '',
        provinces: [],
        showSearchList: false,
        clearInput:false,
        selectedProvince: null,
        selectedPoint: null,
        selectedSchool: null,

        uploadType:''
    },
    handleLoadFromWxSubmit(){
      console.log('handleRecord')
        this.setData({
            uploadType: 'wx'
        })
        this.submitData()
    },
    onLoad() {
        this.init()
    },
    async init() {
        try {
            const provinces = await getProvince()
            this.setData({
                provinces: provinces
            })
            console.log(provinces)
        } catch (e) {
            showMsg(e)
        }
    },
    async _getPoint(provinceId) {
        try {
            const games = await getPoint(provinceId)
            this.setData({
                games: games
            })
            console.log('_getPoint', games)
        } catch (e) {
            showMsg(e)
        }

    },
    async _signUp(){
      try {
          const res = await signUp(this.data.name ,
              this.data.phone ,
              this.data.selectedProvince.id,
              this.data.selectedPoint.id,
              this.data.selectedSchool.id,
              )
          console.log(res)
          // wx.navigateTo({
          //     url: '/pages/upload-music/index'
          // })
          const url = `/pages/upload-music/index?uploadType=${this.data.uploadType}`
          wx.redirectTo({
              url: url
          })
      }  catch (e) {
          showMsg(e)
      }
    },
    handleTouchstart(e) {
        let show = e.target.id.indexOf('search') > -1
        console.log('show ', show, e.target.id, e)
        this.setData({
            showSearchList: show
        })
    },
    handleSeletedSchool(item) {
        console.log('select school item', item)
        // this.selectedSchool = item.name

        this.setData({
            selectedSchool: item.detail
        })
    },
    handleInputSchool(v){
        this.setData({
            clearInput: false
        })
    },
    handleSchool(e) {
        console.log('handleSchool')
        this.setData({
            clearInput: false
        })
    },
    handleRegion(e) {
        console.log('handleRegion', e)
        this.setData({
            games: [],
            gameIndex: -1,
            schools: [],
            schoolIndex: -1,
            school: '',
            selectedPoint: null,
            selectedSchool: null,
            clearInput: true
        })

        if (e.detail.value == -1 || this.data.provinces.length === 0) {
            this.setData({
                regionIndex: -1,
                selectedProvince: null
            })
        } else {
            this.setData({
                regionIndex: e.detail.value,
                selectedProvince: this.data.provinces[e.detail.value]
            })

            this._getPoint(this.data.provinces[e.detail.value].id)
        }


    },
    handleGame(e) {
        console.log('handleGame')
        console.log(e.detail.value)

        this.setData({
            schools: [],
            schoolIndex: -1,
            school: '',
            selectedSchool: null,
            clearInput: true
        })

        if (e.detail.value == -1 || this.data.games.length === 0) {
            this.setData({
                gameIndex: -1,
                selectedPoint: null
            })
        } else {
            this.setData({
                gameIndex: e.detail.value,
                selectedPoint: this.data.games[e.detail.value]
            })
        }

    },
    handleRecordSubmit(e) {
        this.setData({
            uploadType: 'record'
        })

    this.submitData()


    },
    submitData(type){
        if (this.verifySubmit()) {
            console.log('handleSubmit ok')
            this._signUp()

        } else {
            console.log('handleSubmit error')
            this.setData({
                showError: true
            })
        }
    },
    verifySubmit() {
        const pReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        console.log(this.data.name,
            this.data.phone,
            this.data.schoolIndex,
            this.data.gameIndex,
            this.data.regionIndex
        )
        return !isEmpty(this.data.name) &&
            pReg.test(this.data.phone) &&
            this.data.selectedProvince &&
            this.data.selectedPoint &&
            this.data.selectedSchool
    },
    hidetap() {
        this.setData({
            showError: false
        })
    },
    bindNameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindPhoneInput(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    bindSchoolInput(e) {
        this.setData({
            school: e.detail.value
        })
    }


})
