import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'
import {baseUrl} from "../../utils/constant";

import {isEmpty, showMsg, urlParams} from "../../utils/util";
import {
    getProvince,
    getSchool,
    getPoint,
    signUp,
    getRegisterById,
    coverImg,
    singMusicUdate, signMusic,
} from "../../http/http-business";
import {wx_chooseImage, wx_chooseMessageFile, wx_uploadFile} from "../../utils/wx";

const app = getApp()
// const baseUrl = app.globalData.baseUrl
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

    /**
     * 页面的初始数据
     */
    data: {
        showRegister: true,

        isFromRegister:true,

        //register page data
        isLocked: isLocked,
        url: url,
        showError: false,
        schools: [],
        schoolIndex: -1,


        school: '',

        schoolName: '',
        cursorSpacing: '0',
        games: [],
        gameIndex: -1,
        regionIndex: -1,
        name: '',
        phone: '',
        provinces: [],
        showSearchList: false,
        clearInput: false,
        selectedProvince: null,
        selectedPoint: null,
        selectedSchool: null,

        uploadType: '',

        checkState: '',
        inputValOuter: '',
        musicId: '',
        //upload page data

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
        // uploadType: '',
        tempFilePath: '',
        isRecording: false,
        isPlayingRecord: false,
        isUploading: false,
        uploadReturnUrl: '',
        selectedImageIndex: '0',
        type: '',
        showUploadingText: false,
        uploadReturnImageUrl: '',

        userPhone: '',
        userProvinceId: '',
        userPointId: '',
        // schoolName : '',


        // checkState: '',
        // musicId: '',
        singName: '',
        showNoMusicNameErrorDialog: false,
        showNotOriginDialog: false,
        showOriginDialog: false,

        isTwo: false,
        uploadTip: '录制音乐',
        step1: true
    },
    //register page data
    handleLoadFromWxSubmit() {
        console.log('handleRecord')
        this.setData({
            uploadType: 'wx'
        })
        this.submitData()
    },
    onShow() {
        if(this.data.showRegister){
            const res = wx.getSystemInfoSync()
            const isAndroid = res.platform == "android"

            const screenHeight = parseInt(res.screenHeight)

            const cursorSpacing = 0.3 * screenHeight + 'px'
            console.log('isAndroid', isAndroid, cursorSpacing)
            this.setData({
                cursorSpacing: isAndroid ? '0' : cursorSpacing
            })
        }
    },
    // onLoad(options) {
    //     const checkState = options && options.checkState ? options.checkState : ''
    //     this.setData({
    //         checkState:checkState
    //     })
    //     this.initRegister()
    // },
    async initRegister() {
        try {
            const provinces = await getProvince()
            this.setData({
                provinces: provinces
            })
            console.log(provinces)

            // this.setData({
            //     regionIndex:2
            // })
            if (this.data.checkState == 4) {
                //从填信息
                await this.initRewrite()
            } else if (this.data.checkState == 'back') {
                //从上传音乐返回

            }
        } catch (e) {
            showMsg(e)
        }
    },
    async initRewrite() {
        const {
            singName,
            userPointId,
            userProvinceId,
            // userSchoolId ,
            schoolName,
            userPhone,
            musicId
        } = await getRegisterById()
        const name = singName
        const phone = userPhone
        const regionIndex = this.data.provinces.findIndex(f => f.id == userProvinceId)
        const selectedProvince = this.data.provinces[regionIndex]

        const games = await getPoint(selectedProvince.id)
        this.setData({
            games: games
        })
        const gameIndex = this.data.games.findIndex(f => f.id == userPointId)
        const selectedPoint = this.data.games[gameIndex]
        // const inputValOuter = shcoolName
        // const selectedSchool = {
        //     id:userSchoolId
        // }

        this.setData({
            name: name,
            phone: phone,
            regionIndex: regionIndex,
            selectedProvince: selectedProvince,
            gameIndex: gameIndex,
            selectedPoint: selectedPoint,
            schoolName: schoolName,
            // selectedSchool:selectedSchool,
            musicId: musicId
        })

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
    async _signUpRegister() {
        try {

            const images = await coverImg()

            const uploadBtn = {
                coverUrl: `${url}upload-btn.png`
            }
            images.push(uploadBtn)


            const len = images.length
            let centerIndex = parseInt((len + 1) / 2) - 1

            this.setData({
                images: images,
                selectedImageIndex: centerIndex
            })


            if (this.data.uploadType != 'wx') {
                this.initRecord()
            }


            this.setData({
                showRegister: false,

                // uploadType:this.data.uploadType,
                userPhone: this.data.phone,
                userProvinceId: this.data.selectedProvince.id,
                userPointId: this.data.selectedPoint.id,
                // userSchoolId:this.data.selectedSchool.id,
                // schoolName:this.data.schoolName,
                singName: this.data.name,


                //init upload data
                uploadTip: this.data.uploadType == 'wx' ? '导入我的音乐' : '录制音乐',
                step1:true,
                songName: '',
                checked:'',
                progress:'0',
                isUploaded: false,
                isUploading: false,
                tempFilePath: '',
                isRecording: false,
                isPlayingRecord: false,
                isUploading: false,
                uploadReturnUrl: '',
                selectedImageIndex: '0',
                type: '',
                showUploadingText: false,
                uploadReturnImageUrl: '',

            })

        } catch (e) {
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
            selectedSchool: item.detail,
            showSearchList: false
        })
    },
    handleInputSchool(v) {
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
    submitData(type) {
        if (this.verifySubmitRegister()) {
            console.log('handleSubmit ok')
            this._signUpRegister()

        } else {
            console.log('handleSubmit error')
            this.setData({
                showError: true
            })
        }
    },
    verifySubmitRegister() {
        const pReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        const inputReg = /^[\u4e00-\u9fa5]{4,}$/
        // console.log(this.data.name,
        //         //     this.data.phone,
        //         //     this.data.schoolIndex,
        //         //     this.data.gameIndex,
        //         //     this.data.regionIndex
        //         // )
        return !isEmpty(this.data.name) &&
            pReg.test(this.data.phone) &&
            inputReg.test(this.data.schoolName) &&
            this.data.selectedProvince &&
            this.data.selectedPoint
    },
    hidetaperror() {
        this.setData({
            showError: false
        })
    },
    bindUserNameInput(e) {
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
            schoolName: e.detail.value
        })
    },


    /***
     *
     * upload page
     *
     *
     */
    handleRestart() {
        if (this.data.isUploading) {
            showMsg('正在上传')
            return
        }
        if (this.data.isRecording) {
            showMsg('正在录音')
            return
        }
        if (this.data.isPlayingRecord) {
            showMsg('正在播放录音')
            return
        }

        this.setData({
            uploadTip: this.data.uploadType == 'wx' ? '导入我的音乐' : '录制音乐',
            tempFilePath: null,
            uploadReturnUrl: null
        })
    },
    hideNotOriginDialog() {
        this.setData({
            showNotOriginDialog: false
        })
    },
    handleNotOriginAgree(e) {
        const agree = e.detail
        console.log('handleNotOriginAgree', agree)
        if (agree) {
            this.setData({
                checked: false,
            })
        } else {
            if (this.data.checked === false) {
                this.setData({
                    checked: '',
                })
            }

        }
        this.setData({
            showNotOriginDialog: false
        })
    },
    handleOriginAgree(e) {
        const agree = e.detail
        console.log('handleOriginAgree', agree)
        if (agree) {
            this.setData({
                checked: true,
            })
        } else {
            if (this.data.checked === true) {
                this.setData({
                    checked: '',
                })
            }
        }
        this.setData({
            showOriginDialog: false
        })
    },
    hideOriginDialog() {
        this.setData({
            showOriginDialog: false
        })
    },
    handleBack(e) {
        console.log('handleBack', e)
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
        console.log('id', e.target.id)
        if (e.target.id == 'container-mask'
            || e.target.id == 'music-wrap'
            || e.target.id == 'step1'
            || e.target.id == 'step2'
            || e.target.id == 'btn'
        ) {
            if(this.data.isFromRegister){
                this.setData({
                    showRegister: true
                })
            }else{
                // wx.navigateBack({
                //     delta: 1
                // })

                wx.redirectTo({
                    url: '/home/index/index'
                })
            }

        }


    },
    hideNoMusicNameErrorDialog() {
        this.setData({
            showNoMusicNameErrorDialog: false
        })
    },
    handleCascadeSelected(e) {
        const selectedImageIndex = e.detail
        console.log('selectedImageIndex', selectedImageIndex)
        this.setData({
            selectedImageIndex: selectedImageIndex
        })
    },
    async handleTapUploadBtn() {
        try {
            if (this.data.isUploading) {
                return showMsg('正在上传')
            }
            console.log('handleTapUploadBtn')
            const {tempFiles} = await wx_chooseImage(1)
            const path = tempFiles[0].path
            await this._uploadFile(path, true)
        } catch (e) {
            console.log('wx_chooseImage', e)
            showMsg(e)
        }
    },
    async onLoad(option) {

        try {

            //upload code
            let uploadType = option.uploadType

            if (uploadType !== 'wx' || uploadType !== 'record') {
                this.setData({
                    showRegister: true,
                    isFromRegister:true
                })

                //register code
                const checkState = option && option.checkState ? option.checkState : ''
                this.setData({
                    checkState: checkState
                })
                this.initRegister()
            } else {

                this.setData({
                    showRegister: false,
                    isFromRegister:false
                })

                //upload code
                // const uploadType = option.uploadType ? option.uploadType : 'wx'

                this.setData({
                    uploadType: uploadType,
                    uploadTip: uploadType == 'wx' ? '导入我的音乐' : '录制音乐'
                })

                if (option.isTwo) {
                    const isTwo = option.isTwo
                    this.setData({
                        isTwo: isTwo
                    })
                    //上传第二首歌曲
                } else {
                    //from update music info
                    const {
                        checkState,
                        musicId
                    } = option

                    this.setData({
                        checkState: checkState,
                        musicId: musicId,
                    })
                }


                const images = await coverImg()

                const uploadBtn = {
                    coverUrl: `${url}upload-btn.png`
                }
                images.push(uploadBtn)


                const len = images.length
                let centerIndex = parseInt((len + 1) / 2) - 1

                this.setData({
                    images: images,
                    selectedImageIndex: centerIndex
                })


                if (uploadType != 'wx') {
                    this.initRecord()
                }
            }


        } catch (e) {
            showMsg(e)
        }


    },
    onHide() {
        if (this.recorderManager) {
            this.data.isRecording && this.recorderManager.stop()
        }
        if (this.ctx) {
            this.data.isPlayingRecord && this.ctx.stop()
        }
        if (this.recordTime) {
            clearInterval(this.recordTime)
            this.recordTime = null
        }
        if (this.uploadTask) {
            this.uploadTask.abort()
        }
    },
    onUnload() {
        if (this.recorderManager) {
            this.data.isRecording && this.recorderManager.stop()
            this.recorderManager = null
        }
        if (this.uploadTask) {
            this.uploadTask.abort()
        }
        if (this.recordTime) {
            clearInterval(this.recordTime)
            this.recordTime = null
        }
        if (this.ctx) {
            this.ctx.stop()
            this.ctx.destroy()
            this.ctx = null
        }
    },

    async _uploadMusic(file) {

    },
    stopPlayRecord() {
        this.ctx.stop()
        this.setData({
            isPlayingRecord: false,
            uploadTip: '播放'
        })
    },
    startPlayRecord() {
        this.ctx.src = this.data.tempFilePath
        this.ctx.play()
        this.setData({
            isPlayingRecord: true,
            uploadTip: '暂停'
        })
    },
    handlePlayingRecord() {
        if (this.data.isPlayingRecord) {
            this.stopPlayRecord()
        } else {
            this.startPlayRecord()
        }
    },
    handleRecord(e) {
        console.log('handleRecord', this.data.isRecording)
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
        this.recordTime = setInterval(() => {
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


            if (tempFilePath) {
                await this._uploadFile(tempFilePath)
            }

        } catch (e) {
            // showMsg(e)
            showMsg('上传失败')
            this.setData({
                uploadReturnUrl: '',
                isUploading: false,
                showUploadingText: false,
                uploadTip: this.data.uploadType == 'wx' ? '导入我的音乐' : '录制音乐'
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
    handleToStep2() {
        if (this.verifySubmitStep1()) {
            this.setData({
                step1: false
            })
        } else {
            this.setData({
                showNoMusicNameErrorDialog: true
            })
        }
    },
    verifySubmitStep1() {
        let imageOk = false

        return !isEmpty(this.data.songName) &&
            !isEmpty(this.data.uploadReturnUrl) &&
            typeof this.data.checked == 'boolean'
    },
    verifySubmitStep2() {
        let imageOk = false
        if (this.data.selectedImageIndex == this.data.images.length - 1) {
            imageOk = !isEmpty(this.data.uploadReturnImageUrl)
        } else {
            imageOk = this.data.selectedImageIndex >= 0 &&
                this.data.selectedImageIndex < this.data.images.length
        }

        return imageOk
    },
    verifySubmit() {
        let imageOk = false
        if (this.data.selectedImageIndex == this.data.images.length - 1) {
            imageOk = !isEmpty(this.data.uploadReturnImageUrl)
        } else {
            imageOk = this.data.selectedImageIndex >= 0 &&
                this.data.selectedImageIndex < this.data.images.length
        }
        return !isEmpty(this.data.songName) &&
            !isEmpty(this.data.uploadReturnUrl) &&
            typeof this.data.checked == 'boolean' &&
            imageOk
    },
    async _signMusic() {
        try {
            console.log('提交注册信息')
            if (this.data.userPointId) {
                await this._signUp()
            }


            let imageUrl = ''
            if (this.data.selectedImageIndex == this.data.images.length - 1) {
                imageUrl = this.data.uploadReturnImageUrl
            } else {
                imageUrl = this.data.images[this.data.selectedImageIndex].coverUrl
            }

            // return
            if (this.data.checkState == 6 || this.data.checkState == 4) {
                await singMusicUdate(
                    this.data.checked ? '1' : '0',
                    imageUrl,
                    this.data.songName,
                    this.data.uploadReturnUrl,
                    this.data.musicId
                )
            } else {
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
                type: 'ok'
            })
        } catch (e) {
            showMsg(e)
        }
    },
    async _signUp() {
        const res = await signUp(
            this.data.singName,
            this.data.userPhone,
            this.data.userProvinceId,
            this.data.userPointId,
            this.data.schoolName,
        )
    },
    handleSubmit(e) {
        if (this.data.isRecording) {
            return showMsg('正在录音')
        }
        if (this.data.isUploading) {
            return showMsg('正在上传')
        }
        if (this.data.isPlayingRecord) {
            return showMsg('正在播放录音')
        }

        if (this.verifySubmitStep2()) {
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

        // wx.navigateBack({
        //     delta: 1
        // })
    },
    handleOk() {
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
    handleUnChecked() {
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
            'token': app.globalData.token
        }
        this.uploadTask = wx.uploadFile({
            url: url,
            filePath: file,
            name: 'file',
            header: headers,
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
    handleStartRecordOrUpload() {
        if (this.data.uploadType == 'wx' && this.data.uploadTip == '导入我的音乐') {
            this.handleUploadFromWx()
        } else if (
            this.data.uploadType != 'wx' &&
            !this.data.tempFilePath &&
            !this.data.isRecording) {
            this.handleRecord()
        }
    },
    async handleUploadFromWx() {
        try {
            if (this.data.isUploading) {
                return showMsg('正在上传')
            }
            const res = await wx_chooseMessageFile(1, 'file', ['mp3'])

            console.log('res', res)
            if (!res || !res.tempFiles) {
                console.log('取消文件上传')
                return
            }
            const {tempFiles} = res
            console.log('tempFiles', tempFiles)
            const fileSize = tempFiles[0].size
            if (fileSize > 1024 * 1024 * 6) {
                showMsg('文件超过6M')
                return
            }
            await this._uploadFile(tempFiles[0].path)
        } catch (e) {
            showMsg('上传失败')
            this.setData({
                uploadReturnUrl: '',
                isUploading: false,
                showUploadingText: false,
                uploadTip: this.data.uploadType == 'wx' ? '导入我的音乐' : '录制音乐'
            })
        }
    },

    async _uploadFile(filePath, isUploadImage = false) {
        const url = `${baseUrl}/api/misic/uploadQiniuyun`
        const header = {
            'token': app.globalData.token
        }
        this.setData({
            isUploading: true,
            showUploadingText: false,
            // uploadReturnUrl: ''
        })
        if (!isUploadImage) {
            this.setData({
                uploadTip: this.data.uploadType == 'wx' ? '导入中......' : '上传中',
                uploadReturnUrl: ''
            })
        }else{

        }
        let {data} = await wx_uploadFile(url, filePath, 'file', header, uploadTask => {
            this.uploadTask = uploadTask
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                const progress = res.progress + '%'
                this.setData({
                    progress: progress
                })

                if (res.progress == 100) {
                    this.setData({
                        showUploadingText: true
                    })
                }
            })
        })

        data = JSON.parse(data)
        const uploadReturnUrl = data.rows
        if (isUploadImage) {
            this.setData({
                uploadReturnImageUrl: uploadReturnUrl,
                isUploading: false,
                showUploadingText: false
            })

            const images = this.data.images
            images.pop()

            this.setData({
                images: [...images, {coverUrl: uploadReturnUrl}]
            })
        } else {
            this.setData({
                uploadReturnUrl: uploadReturnUrl,

                showUploadingText: false,
                uploadTip: this.data.uploadType == 'wx' ? '导入完成' : '上传成功'
            })

            setTimeout(() => {
                this.setData({
                    uploadTip: this.data.uploadType == 'wx' ? '导入完成' : '播放',
                    isUploading: false,
                })
            }, 100)
        }


        console.log('data', data)
        return data
    }

})