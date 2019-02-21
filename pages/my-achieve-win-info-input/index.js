import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {isEmpty, showMsg} from "../../utils/util";
import {myAchcieveReceivePrize} from "../../http/http-business";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'my-achieve-win-info-input-'
const url = `${baseUrl}${page}`
Page({
    data: {
        url: url,
        name: '',
        phone: '',
        qq: '',
        idCard: '',
        address: '',
        showDialog: false,
        showError: false,
        type:'virtual',
        prizeType:''
    },
    hideerrortap(){
        this.setData({
            showError: false
        })
    },
    onLoad(option){
      const type = option.type
      const prizeType = option.prize
        this.setData({
            type: type,
            prizeType: prizeType
        })
    },
    handleSubmit(e) {
        if (this.verifySubmit()) {
            console.log('handleSubmit ok')
            this.setData({
                showDialog: true
            })
        } else {
            console.log('handleSubmit error')
            this.setData({
                showError: true
            })
        }

    },
    async _receivePrize() {
        try {
            const res = await myAchcieveReceivePrize(
                this.data.prizeType,
                this.data.name,
                this.data.phone,
                this.data.idCard,
                this.data.address,
                this.data.qq)
            console.log(res)
            wx.navigateBack({
                delta: 1
            })
        } catch (e) {
            showMsg(e)
        }
    },
    verifySubmit() {
        const pReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        const qqReg = /^[1-9][0-9]{4,14}$/
        const idReg =
            /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if(this.data.type == 'virtual'){
            return !isEmpty(this.data.name) &&
                pReg.test(this.data.phone) &&
                qqReg.test(this.data.qq) &&
                idReg.test(this.data.idCard)
        }else{
            return !isEmpty(this.data.name) &&
                !isEmpty(this.data.address) &&
                pReg.test(this.data.phone) &&
                idReg.test(this.data.idCard)
        }

    },
    bindNameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindQQInput(e) {
        this.setData({
            qq: e.detail.value
        })
    },
    bindIDCardInput(e) {
        this.setData({
            idCard: e.detail.value
        })
    },
    bindPhoneInput(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    addressInput(e) {
        this.setData({
            address: e.detail.value
        })
    },
    confirmtap() {
        console.log('confirmtap')
        this.setData({
            showDialog: false
        })


        this._receivePrize()

    },
    retrytap() {
        console.log('retrytap')
        this.setData({
            showDialog: false
        })
    },
    hidetap() {
        console.log('hidetap')
        this.setData({
            showDialog: false
        })
    }

})
