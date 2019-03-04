import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {baseUrl} from "../../utils/constant";
import {isEmpty, showMsg, urlParams} from "../../utils/util";
import {wx_chooseMessageFile , wx_uploadFile , wx_chooseImage} from "../../utils/wx";
import {coverImg , signMusic , signUp , singMusicUdate} from "../../http/http-business";

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
        checked: '',
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
        isPlayingRecord:false,
        isUploading: false,
        uploadReturnUrl: '',
        selectedImageIndex:'0',
        type:'',
        showUploadingText:false,
        uploadReturnImageUrl:'',

        userPhone:'',
        userProvinceId:'',
        userPointId:'',
        userSchoolId:'',
        checkState:'',
        musicId:'',
        singName:'',
        showNoMusicNameErrorDialog:false,
        showNotOriginDialog:false,
        showOriginDialog:false,

        isTwo:false,
        uploadTip:'录制音乐'
    },
    handleRestart(){
        if(this.data.isUploading){
            showMsg('正在上传')
            return
        }
        if(this.data.isRecording){
            showMsg('正在录音')
            return
        }
        if(this.data.isPlayingRecord){
            showMsg('正在播放录音')
            return
        }

        this.setData({
            uploadTip:this.data.uploadType == 'wx' ? '导入我的音乐' : '录制音乐',
            tempFilePath:null,
            uploadReturnUrl:null
        })
    },
    hideNotOriginDialog(){
        this.setData({
            showNotOriginDialog: false
        })
    },
    handleNotOriginAgree(e){
        const agree = e.detail
        console.log('handleNotOriginAgree' ,agree )
        if(agree){
            this.setData({
                checked: false,
            })
        }
        this.setData({
            showNotOriginDialog: false
        })
    },
    handleOriginAgree(e){
        const agree = e.detail
        console.log('handleOriginAgree' ,agree )
        if(agree){
            this.setData({
                checked: true,
            })
        }
        this.setData({
            showOriginDialog: false
        })
    },
    hideOriginDialog(){
        this.setData({
            showOriginDialog: false
        })
    },
    handleBack(e){
        console.log('handleBack' , e)
        // let url = '/pages/register/index?from=home'
        // const params = {
        //     userPhone:this.data.userPhone,
        //     userProvinceId:this.data.userProvinceId,
        //     userPointId:this.data.userPointId,
        //     userSchoolId:this.data.userSchoolId,
        //     singName:this.data.singName,
        //     checkState:'back'
        // }
        // url = urlParams(url , params , true)
        //
        //
        // wx.redirectTo({
        //     url: url
        // })
        //
        if(e.target.id == 'container-mask' || e.target.id == 'music-wrap'){
            wx.navigateBack({
                delta: 1
            })
        }


    },
    hideNoMusicNameErrorDialog(){
        this.setData({
            showNoMusicNameErrorDialog: false
        })
    },
    handleCascadeSelected(e){
        const selectedImageIndex = e.detail
        console.log('selectedImageIndex', selectedImageIndex)
        this.setData({
            selectedImageIndex: selectedImageIndex
        })
    },
    async handleTapUploadBtn(){
        try {
            if(this.data.isUploading){
                return showMsg('正在上传')
            }
            console.log('handleTapUploadBtn')
            const {tempFiles} = await wx_chooseImage(1)
            const path = tempFiles[0].path
            await this._uploadFile(path , true)
        }catch (e) {
            console.log('wx_chooseImage' , e)
        }
    },
    async onLoad(option) {

        try {
            const uploadType = option.uploadType ? option.uploadType : 'wx'

            this.setData({
                uploadType: uploadType,
                uploadTip:uploadType == 'wx' ? '导入我的音乐' : '录制音乐'
            })

            if(option.isTwo){
                const isTwo = option.isTwo
                this.setData({
                    isTwo: isTwo
                })
                //上传第二首歌曲
            }else{
                if(option.userPointId){
                    //from register
                    const {
                        userPointId ,
                        userProvinceId ,
                        userSchoolId ,
                        userPhone,
                        singName
                    } = option
                    this.setData({
                        userPointId: userPointId,
                        userProvinceId: userProvinceId,
                        userSchoolId: userSchoolId,
                        userPhone: userPhone,
                        singName:singName
                    })
                }else{
                    //from update music info
                    const {
                        checkState ,
                        musicId
                    } = option

                    this.setData({
                        checkState: checkState,
                        musicId: musicId,
                    })

                }
            }







            const images = await coverImg()
            // const temp = []
            // for (let i = 0; i < images.length; i++) {
            //     const l = `${i + 1}.jpg`
            //     temp.push({
            //         index:
            //     })
            // }
            const uploadBtn = {
                coverUrl:`${url}upload-btn.png`
            }
            images.push(uploadBtn)
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
        if(this.ctx){
            this.data.isPlayingRecord && this.ctx.stop()
        }
        if(this.recordTime){
            clearInterval(this.recordTime)
            this.recordTime = null
        }
        if(this.uploadTask){
            this.uploadTask.abort()
        }
    },
    onUnload() {
        if (this.recorderManager) {
            this.data.isRecording && this.recorderManager.stop()
            this.recorderManager = null
        }
        if(this.uploadTask){
            this.uploadTask.abort()
        }
        if(this.recordTime){
            clearInterval(this.recordTime)
            this.recordTime = null
        }
        if(this.ctx){
            this.ctx.stop()
            this.ctx.destroy()
            this.ctx = null
        }
    },

    async _uploadMusic(file) {

    },
    stopPlayRecord(){
        this.ctx.stop()
        this.setData({
            isPlayingRecord: false,
            uploadTip:'播放'
        })
    },
    startPlayRecord(){
        this.ctx.src = this.data.tempFilePath
        this.ctx.play()
        this.setData({
            isPlayingRecord: true,
            uploadTip:'暂停'
        })
    },
    handlePlayingRecord(){
        if (this.data.isPlayingRecord) {
            this.stopPlayRecord()
        } else {
            this.startPlayRecord()
        }
    },
    handleRecord(e) {
        console.log('handleRecord' , this.data.isRecording)
        if (this.data.isRecording) {
            //录制完30s
            // this.recorderManager.stop()
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
        this.maxTime = 30
        this.recordTime = setInterval(()=>{
            this.maxTime--
            let str = this.maxTime.toString()
            str = str.length == 1 ? `0${str}` : str
                this.setData({
                    uploadTip: `00:${str}`
                })
            },
            1000)
    },
    async stopRecord(tempFilePath) {
        try {

            clearInterval(this.recordTime)
            this.recordTime = null
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

        this.ctx = wx.createInnerAudioContext()

        // this.ctx.autoplay = true
        /*
        * obeyMuteSwitch	boolean	true	否
        * （仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音
        * */
        wx.setInnerAudioOption({
            obeyMuteSwitch: false
        })
        this.ctx.onPlay(() => {
            console.log('开始播放')
        })
        this.ctx.onEnded(() => {
            console.log('播放结束')
           this.stopPlayRecord()
        })
        this.ctx.onError((res) => {
            this.stopPlayRecord()
        })
    },
    bindNameInput(e) {
        this.setData({
            songName: e.detail.value
        })
    },
    verifySubmit() {
        let imageOk = false
        if(this.data.selectedImageIndex == this.data.images.length - 1){
            imageOk = !isEmpty(this.data.uploadReturnImageUrl)
        }else{
            imageOk = this.data.selectedImageIndex >= 0 &&
                this.data.selectedImageIndex < this.data.images.length
        }
        return !isEmpty(this.data.songName) &&
            !isEmpty(this.data.uploadReturnUrl) &&
            typeof this.data.checked == 'boolean' &&
            imageOk
    },
    async _signMusic(){
        try {
            console.log('提交注册信息')
            if(this.data.userPointId){
                await this._signUp()
            }


            let imageUrl = ''
            if(this.data.selectedImageIndex == this.data.images.length - 1){
                imageUrl = this.data.uploadReturnImageUrl
            }else{
                imageUrl = this.data.images[this.data.selectedImageIndex].coverUrl
            }

            if(this.data.checkState == 6){
                await singMusicUdate(
                    this.data.checked ? '1' : '0',
                    imageUrl,
                    this.data.songName,
                    this.data.uploadReturnUrl,
                    this.data.musicId
                )
            }else{
                await signMusic(
                    this.data.checked ? '1' : '0',
                    imageUrl,
                    this.data.songName,
                    this.data.uploadReturnUrl
                )
            }


            this.setData({
                bg: 'submit-ok',
                showDialog: true,
                type:'ok'
            })
        }catch (e) {
            showMsg(e)
        }
    },
    async _signUp(){
        const res = await signUp(
            this.data.singName ,
            this.data.userPhone ,
            this.data.userProvinceId,
            this.data.userPointId,
            this.data.userSchoolId,
        )
    },
    handleSubmit(e) {
        if(this.data.isRecording){
            return showMsg('正在录音')
        }
        if(this.data.isUploading){
            return showMsg('正在上传')
        }
        if(this.data.isPlayingRecord){
            return showMsg('正在播放录音')
        }

        if (this.verifySubmit()) {
            console.log('handleSubmit ok')

            this._signMusic()

        } else {
            console.log('handleSubmit error')
            this.setData({
                showNoMusicNameErrorDialog: true
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
        wx.redirectTo({
            url: '/home/index/index'
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
        // this.setData({
        //     checked: true
        // })

        this.setData({
            showOriginDialog: true
        })
    },
    handleUnChecked(){
        // this.setData({
        //     checked: false
        // })
        this.setData({
            showNotOriginDialog: true
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
            if(this.data.isUploading){
                return showMsg('正在上传')
            }
            const res = await wx_chooseMessageFile(1 , 'file' , ['mp3'])

            console.log('res',res)
            if(!res || !res.tempFiles){
                console.log('取消文件上传')
                return
            }
            const {tempFiles} = res
            console.log('tempFiles' , tempFiles)
            const fileSize = tempFiles[0].size
            if(fileSize > 1024 * 1024 * 2){
                showMsg('文件超过2M')
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

    async _uploadFile(filePath , isUploadImage = false){
        const url = `${baseUrl}/api/misic/uploadQiniuyun`
        const header = {
            'token':app.globalData.token
        }
        this.setData({
            isUploading:true,
            showUploadingText:false,
            uploadReturnUrl: ''
        })
        if(!isUploadImage){
            this.setData({
                uploadTip:this.data.uploadType == 'wx' ? '导入中......' : '上传中'
            })
        }
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
        if(isUploadImage){
            this.setData({
                uploadReturnImageUrl: uploadReturnUrl,
                isUploading:false,
                showUploadingText:false
            })

            const images = this.data.images
            images.pop()

            this.setData({
                images: [...images , {coverUrl:uploadReturnUrl}]
            })
        }else{
            this.setData({
                uploadReturnUrl: uploadReturnUrl,

                showUploadingText:false,
                uploadTip:this.data.uploadType == 'wx' ? '导入完成' : '上传成功'
            })

            setTimeout(()=>{
                this.setData({
                    uploadTip:this.data.uploadType == 'wx' ? '导入完成' : '播放',
                    isUploading:false,
                })
            } , 100)
        }








        console.log('data' , data)
        return data
    }


})
