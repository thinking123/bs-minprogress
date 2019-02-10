import {isEmpty} from "../../utils/util";

const app = getApp()
const baseUrl = app.globalData.baseUrl
const page = 'register/'
const url = `${baseUrl}${page}`
Page({
    data: {
        url:url,
        showError:false,
        schools: ['学校', 'xuexiao'],
        schoolIndex: -1,

        school:'',
        games: ['shaidiansdf', 'shaidian'],
        gameIndex: -1,
        regionIndex: -1,
        name:'',
        phone:'',
        provinces: [
            "北京",
            "天津",
            "河北",
            "山西",
            "内蒙古",
            "辽宁",
            "吉林",
            "黑龙江",
            "上海",
            "江苏",
            "浙江省",
            "安徽",
            "福建",
            "江西",
            "山东",
            "河南",
            "湖北",
            "湖南",
            "广东",
            "广西",
            "海南",
            "重庆",
            "四川",
            "贵州",
            "云南",
            "西藏",
            "陕西",
            "甘肃省",
            "青海",
            "宁夏",
            "新疆",
            "台湾",
            "香港",
            "澳门"
        ]
    },

    handleSeleted(item){
        console.log('select school item' , item)
        this.school = item.name
    },
    handleSchool(e) {
        console.log('handleSchool')
        this.setData({
            schoolIndex: e.detail.value
        })
    },
    handleRegion(e) {
        console.log('handleRegion')
        if(e.detail.value == -1){
            return
        }
        this.setData({
            regionIndex: e.detail.value
        })
    },
    handleGame(e) {
        console.log('handleGame')
        console.log(e.detail.value)
        if(e.detail.value == -1){
            return
        }
        this.setData({
            gameIndex: e.detail.value
        })
    },
    handleSubmit(e) {


        if(this.verifySubmit()){
            console.log('handleSubmit ok')
            wx.navigateTo({
                url:'/pages/upload-music/index'
            })
        }else{
            console.log('handleSubmit error')
            this.setData({
                showError : true
            })
        }

    },
    verifySubmit(){
        const pReg=/^[1][3,4,5,7,8][0-9]{9}$/;

        console.log(this.data.name,
            this.data.phone,
            this.data.schoolIndex,
            this.data.gameIndex,
            this.data.regionIndex
            )
        return !(isEmpty(this.data.name) ||
            !pReg.test(this.data.phone) ||
            this.data.schoolIndex === -1 ||
            this.data.gameIndex === -1 ||
            this.data.regionIndex === -1)
    },
    hidetap(){
        this.setData({
            showError : false
        })
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
    bindSchoolInput(e){
        this.setData({
            school: e.detail.value
        })
    }


})
