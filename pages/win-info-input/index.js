// pages/win-info-input/index.js
import {isEmpty} from "../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: '',
        address: '',
        showDialog:false
    },
    handleSubmit(e) {
        if(this.verifySubmit()){
            console.log('handleSubmit ok')
            this.setData({
                showDialog : true
            })
        }else{
            console.log('handleSubmit error')
        }

    },
    verifySubmit(){
        const pReg=/^[1][3,4,5,7,8][0-9]{9}$/;

        return !isEmpty(this.data.name) ||
            !isEmpty(this.data.address) ||
            !pReg.test(this.data.phone)
    },
    bindNameInput(e){
        this.setData({
            name: e.detail.value
        })
    },
    bindPhoneInput(e){
        this.setData({
            phone: e.detail.value
        })
    },
    addressInput(e){
        this.setData({
            address: e.detail.value
        })
    },
    confirmtap(){
        console.log('confirmtap')
        this.setData({
            showDialog : false
        })
    },
    retrytap(){
        console.log('retrytap')
        this.setData({
            showDialog : false
        })
    },
    hidetap(){
        console.log('hidetap')
        this.setData({
            showDialog : false
        })
    }

})
