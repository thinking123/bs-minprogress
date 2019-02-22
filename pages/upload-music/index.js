import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {baseUrl} from "../../utils/constant";
import {isEmpty, showMsg} from "../../utils/util";
import {wx_chooseMessageFile , wx_uploadFile} from "../../utils/wx";
import {coverImg , signMusic} from "../../http/http-business";

const app = getApp()
const base = app.globalData.base
const page = 'upload-music-'
const url = `${base}${page}`
const isLocked = app.globalData.isLocked
const options = {
    //最大录音时长30s
    duration: 30000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'aac',
    frameSize: 50
}

Page({
    data: {
        isLocked:isLocked,
        url: url,
        songName: '',
        checked: false,
        progress: '0',
        isUploaded: false,
        isUploading: false,
        musicBg: '',
        images: [],
        showUploadFail: false,
        showSubmitOk: false,
        showSubmitError: false,
        showDialog: false,
        bg: '',
        uploadType: '',
        tempFilePath: '',
        isRecording: false,
        isUploading: false,
        uploadReturnUrl: '',
        selectedImageIndex:'0',
        type:'',
        showUploadingText:false

    },
    handleCascadeSelected(e){
        const selectedImageIndex = e.detail
        console.log('selectedImageIndex', selectedImageIndex)
        this.setData({
            selectedImageIndex: selectedImageIndex
        })
    },
    async onLoad(option) {

        try {
            const uploadType = option.uploadType ? option.uploadType : 'wx'
            this.setData({
                uploadType: uploadType
                // uploadType: 'dfsd'
            })


            const images = await coverImg()
            // const temp = []
            // for (let i = 0; i < images.length; i++) {
            //     const l = `${i + 1}.jpg`
            //     temp.push({
            //         index:
            //     })
            // }
            this.setData({
                images: images
            })



            if (uploadType != 'wx') {
                this.initRecord()
            }

        }catch (e) {
            showMsg(e)
        }


    },
    onHide() {
        if (this.recorderManager) {
            this.data.isRecording && this.recorderManager.stop()
        }

        if(this.uploadTask){
            this.uploadTask.abort()
        }
    },
    onUnload() {
        if (this.recorderManager) {
            this.recorderManager.stop()
            this.recorderManager = null
        }
        if(this.uploadTask){
            this.uploadTask.abort()
        }
    },

    async _uploadMusic(file) {

    },
    handleRecord(e) {
        console.log('handleRecord' , this.data.isRecording)
        if (this.data.isRecording) {
            this.recorderManager.stop()
        } else {
            //IOS 开始录音的时候不能为静音模式
            //或者开启 播放录音的:obeyMuteSwitch
            this.recorderManager.start(options)
        }
    },
    startRecord() {
        this.setData({
            isRecording: true
        })
    },
    async stopRecord(tempFilePath) {
        try {
            this.setData({
                isRecording: false,
                tempFilePath: tempFilePath,
            })


            await this._uploadFile(tempFilePath)
        }catch (e) {
            // showMsg(e)
            showMsg('上传失败')
            this.setData({
                uploadReturnUrl: '',
                isUploading:false,
                showUploadingText:false
            })
        }

    },
    initRecord() {
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
            songName: e.detail.value
        })
    },
    verifySubmit() {
        return !isEmpty(this.data.songName) &&
            !isEmpty(this.data.uploadReturnUrl) &&
            this.data.selectedImageIndex >= 0 &&
            this.data.selectedImageIndex < this.data.images.length
    },
    async _signMusic(){
        try {
            await signMusic(
                this.data.checked ? '1' : '0',
                this.data.images[this.data.selectedImageIndex].coverUrl,
                this.data.songName,
                this.data.uploadReturnUrl
            )
            this.setData({
                bg: 'submit-ok',
                showDialog: true,
                type:'ok'
            })
        }catch (e) {
            showMsg(e)
        }
    },
    handleSubmit(e) {
        if(this.data.isRecording){
            return showMsg('正在录音')
        }
        if(this.data.isUploading){
            return showMsg('正在上传')
        }
        if (this.verifySubmit()) {
            console.log('handleSubmit ok')

            this._signMusic()

        } else {
            console.log('handleSubmit error')
            this.setData({
                bg: 'submit-error',
                showDialog: true,
                type:'error'
            })
        }
    },
    upload() {
        this.setData({
            bg: 'upload-error',
            showDialog: true
        })
    },
    hidetap() {
        this.setData({
            showDialog: false
        })
    },
    handleOk(){
        this.setData({
            showDialog: false
        })
        console.log('go to home')
        wx.redirectTo({
            url: '/home/index/index'
        })
    },
    handleChecked(e) {
        this.setData({
            checked: true
        })
    },
    handleUnChecked(){
        this.setData({
            checked: false
        })
    },
    uploadFile(file) {
        const url = '/api/misic/uploadQiniuyun'
        const headers = {
            'token':app.globalData.token
        }
        this.uploadTask = wx.uploadFile({
            url: url,
            filePath: file,
            name: 'file',
            header:headers,
            formData: {
                user: 'test'
            },
            success(res) {
                const data = res.data
                this.setData({
                    isUploading: false,
                    progress: 0
                })

                this.uploadTask = null
            }
        })

        this.uploadTask.onProgressUpdate((res) => {

            const p = res.progress + '%'
            this.setData({
                progress: p
            })
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
    },
    async handleUploadFromWx() {
        try {
            const {tempFiles} = await wx_chooseMessageFile(1 , 'file' , ['mp3'])

            console.log('tempFiles' , tempFiles)
            const fileSize = tempFiles[0].size
            if(fileSize > 1024 * 1024){
                showMsg('文件超过1M')
                return
            }
            await this._uploadFile(tempFiles[0].path)
        }catch (e) {
            showMsg('上传失败')
            this.setData({
                uploadReturnUrl: '',
                isUploading:false,
                showUploadingText:false
            })
        }
    },

    async _uploadFile(filePath){
        const url = `${baseUrl}/api/misic/uploadQiniuyun`
        const header = {
            'token':app.globalData.token
        }
        this.setData({
            isUploading:true,
            showUploadingText:false
        })
        let {data} = await wx_uploadFile( url ,filePath ,'file', header , uploadTask => {
            this.uploadTask = uploadTask
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                const progress = res.progress + '%'
                this.setData({
                    progress:progress
                })

                if(res.progress == 100){
                    this.setData({
                        showUploadingText:true
                    })
                }
            })
        })

        data = JSON.parse(data)
        const uploadReturnUrl = data.rows
        this.setData({
            uploadReturnUrl: uploadReturnUrl,
            isUploading:false,
            showUploadingText:false
        })
        console.log('data' , data)
        return data
    }


})
