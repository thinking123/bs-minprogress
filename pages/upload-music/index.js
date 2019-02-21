import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {isEmpty} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.base
const page = 'upload-music-'
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
        bg: '',
        uploadType:'',
        tempFilePath:'',
        isRecording:false,
        isUploading:false,

    },
    onLoad(option){
        const uploadType = option.uploadType ?  option.uploadType: 'wx'
        this.setData({
            uploadType: uploadType
            // uploadType: 'dfsd'
        })

        if(uploadType != 'wx'){
            this.initRecord()
        }
    },
    onHide(){
        if(this.recorderManager){
            this.data.isRecording && this.recorderManager.stop()
        }
    },
    onUnload(){
        if(this.recorderManager){
            this.recorderManager.stop()
            this.recorderManager = null
        }
    },

    async _uploadMusic(file){

    },
    handleRecord(e) {
        if (this.data.isRecording) {
            this.recorderManager.stop()
        } else {
            //IOS 开始录音的时候不能为静音模式
            //或者开启 播放录音的:obeyMuteSwitch
            this.recorderManager.start(options)
        }
    },
    startRecord(){
        this.setData({
            isRecording:true
        })
    },
    stopRecord(tempFilePath){
        this.setData({
            isRecording: false,
            tempFilePath:tempFilePath,
        })
    },
    initRecord(){
        this.recorderManager = wx.getRecorderManager()

        this.recorderManager.onStart(() => {
            this.startRecord()
        })
        this.recorderManager.onPause(() => {
            console.log('recorder pause')
        })
        this.recorderManager.onStop((res) => {
            const {tempFilePath} = res
            this.stopRecord(res.tempFilePath)
        })
        this.recorderManager.onFrameRecorded((res) => {
            const {frameBuffer} = res
            console.log('frameBuffer.byteLength', frameBuffer.byteLength)
        })
        this.recorderManager.onError((err) => {
            console.log('onError', err.errMsg)
            this.stopRecord(null)
        })

        this.recorderManager.onInterruptionBegin((err) => {
            console.log('onInterruptionBegin', err)
        })

        this.recorderManager.onInterruptionEnd((err) => {
            console.log('onInterruptionEnd', err)
        })
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
