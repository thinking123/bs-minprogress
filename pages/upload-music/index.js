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
        isUploading:false,
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
    onLoad(option){
        const uploadType = option.uploadType ?  option.uploadType: 'wx'
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
    },
    uploadFile(file , url){

        this.uploadTask = wx.uploadFile({
            url: url,
            filePath: file,
            name: 'file',
            formData: {
                user: 'test'
            },
            success(res) {
                const data = res.data
                this.setData({
                    isUploading:false,
                    progress:0
                })

                this.uploadTask = null
            }
        })

        this.uploadTask.onProgressUpdate((res) => {

            const p = res.progress + '%'
            this.setData({
                progress:p
            })
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
    },
    handleUpload(){
        console.log('upload file')
        wx.chooseVideo({
            success:res=>{
                console.log('res' , res)
            },
            fail:err=>{
                console.log('err' , err)
            }
        })
        // if(this.data.isUploading){
        //     this.uploadTask.abort()
        //     this.uploadTask = null
        // }
        //
        // this.setData({
        //     isUploading:true,
        //     progress:0
        // })
    }

})
