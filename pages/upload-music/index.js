// pages/upload-music/index.js
import {isEmpty} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'upload-music/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        name: '',
        checked: false,
        progress: '20%',
        isUploaded: false,
        musicBg: '',
        images: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "8.jpg"
        ],
        showUploadFail: false,
        showSubmitOk: false,
        showSubmitError: false,
        showDialog: false,
        bg: ''


    },
    bindNameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    verifySubmit() {
        return !(isEmpty(this.data.name))
    },
    handleSubmit(e) {
        if (this.verifySubmit()) {
            console.log('handleSubmit ok')
            this.setData({
                bg: 'submit-ok',
                showDialog: true
            })
        } else {
            console.log('handleSubmit error')
            this.setData({
                bg: 'submit-error',
                showDialog: true
            })
        }
    },
    upload() {
        this.setData({
            bg: 'upload-error',
            showDialog: true
        })
    },
    hidetap(){
        this.setData({
            showDialog: false
        })
    },
    handleChecked(e) {
        switch (e.target.id) {
            case 'checked':
                this.setData({
                    checked: true
                })
                break
            case 'unchecked':
                this.setData({
                    checked: false
                })
                break
        }
    }

})
