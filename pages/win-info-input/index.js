import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {isEmpty, showMsg} from "../../utils/util";
import {receivePrize} from "../../http/http-business";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'win-info-input-'
const url = `${baseUrl}${page}`
Page({
    data: {
        url: url,
        name: '',
        phone: '',
        idCard: '',
        address: '',
        showDialog: false
    },
    onLoad(option){
      this.id = option.id
    },
    bindIDCardInput(e) {
        this.setData({
            idCard: e.detail.value
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
            showMsg('信息填写错误')
        }

    },
    async _receivePrize() {
        try {
            const res = await receivePrize(this.id,
                this.data.name,
                this.data.phone,
                this.data.address,
                this.data.idCard)
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
        const idReg =
            /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return !isEmpty(this.data.name) &&
            !isEmpty(this.data.address) &&
            pReg.test(this.data.phone) &&
            idReg.test(this.data.idCard)
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
