import {get, post} from "./http";
import {urlParams} from "../utils/util";

function parseRes(res, errMsg, resolveStatus = []) {
    if (!!res && res.status && res.status.indexOf('2') > -1) {
        return res.rows ? res.rows : res
    } else {
        const msg = res && res.message ? res.message : errMsg
        throw new Error(msg ? msg : 'error')
    }
}

//登入
export function wxLogin(code, userHead, userName, userSex) {
    const url = '/api/login/wxlogin'
    const loadingText = '正在登入...'
    const errMsg = '登入失败'
    const data = {
        code: code,
        userHead: userHead,
        userName: userName,
        userSex: userSex
    }
    return post(url, data, loadingText).then(res => parseRes(res, errMsg))
}


//是否注册过
export function isSignUp() {
    const url = '/api/singUp/isSingUp'
    const data = {}
    return post(url, data).then(res => {
        console.log('isSignUp', res)
        if (res && res.status == '9006') {
            return true
        } else if (res && res.status == '9007') {
            return false
        }  else {
            throw new Error(res.message ? res.message : '请求失败')
        }
    })
}

//注册
export function signUp(userName,
                       userPhone,
                       userPointId,
                       userProvinceId,
                       userSchoolId) {
    const url = '/api/singUp'
    const loadingText = '正在注册...'
    const errMsg = '注册失败'
    const data = {
        userName: userName,
        userPhone: userPhone,
        userPointId: userPointId,
        userProvinceId: userProvinceId,
        userSchoolId: userSchoolId,
    }
    return post(url, data, loadingText).then(res => parseRes(res, errMsg))

}

//获取省份接口
export function getProvince() {
    const url = '/api/singUp/province'
    const loadingText = '获取省份...'
    const errMsg = '获取省份失败'
    const data = {}
    return get(url, data, loadingText).then(res => parseRes(res, errMsg))
}

//获取赛点接口
export function getPoint(provinceId) {
    const url = '/api/singUp/point'
    const loadingText = '获取赛点...'
    const errMsg = '获取赛点失败'
    const data = {
        provinceId: provinceId
    }
    return get(url, data, loadingText).then(res => parseRes(res, errMsg))
}

//获取学校接口
export function getSchool(provinceId, pointId, name) {
    console.log('get school ', provinceId, pointId, name)
    const url = '/api/singUp/school'
    // const loadingText = '获取学校...'
    const errMsg = '获取学校失败'
    const data = {
        provinceId: provinceId,
        pointId: pointId,
        name: name
    }
    return get(url, data).then(res => parseRes(res, errMsg))
}

//作用: 音乐排行榜
export function getRankingList(pageNum,
                          provinceId,
                               zone,
                          musicPlayerName = '',
                          musicPlayerCode = '') {
    const url = '/api/rankingList/all'
    const loadingText = '获取音乐排行榜...'
    const errMsg = '获取音乐排行榜失败'
    const data = {
        pageNum: pageNum,
        provinceId: provinceId,
        zone:zone,
        musicPlayerName: musicPlayerName,
        musicPlayerCode: musicPlayerCode
    }
    return get(url, data,loadingText).then(res => parseRes(res, errMsg))
}
//关注音乐
export function followMusic(musicId) {
    let url = '/api/rankingList/followMusic'
    const loadingText = '关注音乐...'
    const errMsg = '关注音乐失败'
    const params = {
        musicId: musicId
    }
    url = urlParams(url , params)
    return post(url, {},loadingText).then(res => parseRes(res, errMsg))
}

//取消关注音乐
export function putfollowMusic(musicId) {
    let url = '/api/rankingList/putfollowMusic'
    const loadingText = '取消关注音乐...'
    const errMsg = '取消关注音乐失败'
    const params = {
        musicId: musicId
    }
    url = urlParams(url , params)
    return post(url, {},loadingText).then(res => parseRes(res, errMsg))
}
//投票
export function voteMusic(musicId) {
    let url = '/api/rankingList/voteMusic'
    const loadingText = '投票...'
    const errMsg = '投票失败'
    // const header = {
    //     "Content-Type":"application/x-www-form-urlencoded"
    // }
    // header["Content-Type"] = "application/json"

    const params = {
        musicId: musicId
    }

    url = urlParams(url , params)
    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}


//关注列表
export function getFollow() {
    const url = '/api/follow/getFollow'
    const loadingText = '获取关注列表...'
    const errMsg = '获取关注列表失败'
    const data = {}
    return post(url, data).then(res => parseRes(res, errMsg))
}
//获取用户信息
export function getUser(uId = '') {
    let url = '/api/user/getUser'
    const loadingText = '获取用户信息...'
    const errMsg = '获取用户信息失败'
    const params = {
        uId:uId
    }
    url = urlParams(url , params)
    return post(url, {} , loadingText).then(res => parseRes(res, errMsg))
}

//设置主打歌曲
export function mainMusic(musicId = '') {
    let url = '/api/user/mainMusic'
    const loadingText = '设置主打歌曲...'
    const errMsg = '设置主打歌曲失败'
    const params = {
        musicId:musicId
    }
    url = urlParams(url , params)
    return post(url, {} , loadingText).then(res => parseRes(res, errMsg))
}



//获取我的成就
export function getAchievement() {
    const url = '/api/achievement/getAchievement'
    const loadingText = '获取获取我的成就...'
    const errMsg = '获取获取我的成就失败'
    const data = {}
    return post(url, data).then(res => parseRes(res, errMsg))
}

//领取成就
export function receiveAchievement(type) {
    let url = '/api/achievement/receiveAchievement'
    const loadingText = '领取成就...'
    const errMsg = '领取成就失败'
    const params = {
        type:type
    }
    url = urlParams(url , params)
    return post(url, {},loadingText).then(res => parseRes(res, errMsg))
}

//获取中奖记录
export function getPrizeRecord() {
    const url = '/api/prizeRecord/getPrizeRecord'
    const loadingText = '获取中奖记录...'
    const errMsg = '获取中奖记录失败'
    const data = {}
    return post(url, data,loadingText).then(res => parseRes(res, errMsg))
}

//领取奖品
export function receivePrize(id,
                               prizeName,
                               prizePhone,
                               prizeAddress,
                                idCard) {
    let url = '/api/prizeRecord/receivePrize'
    const loadingText = '领取奖品...'
    const errMsg = '领取奖品失败'
    const params = {
        id:id,
        prizeName:prizeName,
        prizePhone:prizePhone,
        prizeAddress:prizeAddress,
        idCard:idCard
    }
    url = urlParams(url , params)

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}



//随便听听
export function casualListen(showLoading = false) {
    const url = '/api/casuallisten/all'
    const loadingText = showLoading ? '获取歌曲...' : null
    const errMsg = '获取歌曲失败'
    const data = {
    }
    return get(url, data,loadingText).then(res => parseRes(res, errMsg))
}

//随便听听音乐排行榜 前五
export function casualListenTopFive(schoolId , musicId) {
    const url = '/api/casuallisten/topFive'
    const loadingText = '获取音乐排行榜...'
    const errMsg = '获取音乐排行榜失败'
    const data = {
        schoolId:schoolId,
        musicId:musicId
    }
    return get(url, data,loadingText).then(res => parseRes(res, errMsg))
}

//随便听听历史记录
export function casualListenHistory(musicId) {
    const url = '/api/casuallisten/history'
    const loadingText = '获取随便听听历史记录...'
    const errMsg = '获取随便听听历史记录失败'
    const data = {
        musicId:musicId
    }

    return get(url, data,loadingText).then(res => parseRes(res, errMsg))
}
//新增随便听听历史记录
export function addCasualListenHistory(musicId) {
    let url = '/api/casuallisten/history'
    const loadingText = '新增随便听听历史记录...'
    const errMsg = '新增随便听听历史记录失败'
    const params = {
        musicId:musicId
    }
    url = urlParams(url , params)

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}


//是否可以抽奖
export function isYesPrize() {
    const url = '/api/casuallisten/isYesPrize'
    const errMsg = '获取是否可以抽奖失败'
    const data = {}

    return get(url, data).then(res => parseRes(res, errMsg))
}


//抽奖
export function luckDraw(gid , musicId) {
    let url = '/api/casuallisten/luckDraw'
    const loadingText = '抽奖...'
    const errMsg = '抽奖失败'
    const params = {
        gid:gid,
        musicId:musicId
    }
    url = urlParams(url , params)

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}

//获取奖品图片
export function prizeImg() {
    const url = '/api/casuallisten/prizeImg'
    const errMsg = '获取奖品图片'
    const data = {}

    return get(url, data).then(res => parseRes(res, errMsg))
}

//获取审核信息
export function getCheckMsg() {
    let url = '/api/user/getCheckMsg'
    const loadingText = '获取审核信息...'
    const errMsg = '获取审核信息失败'

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}

//我的成就:领取奖品
export function myAchcieveReceivePrize(prizeType,
                                       receiveName,
                                       receivePhone,
                                       idCard,
                                       receiveAddress,
                                       qq,
                                       ) {
    let url = '/api/achievement/receivePrize'
    const loadingText = '领取奖品...'
    const errMsg = '领取奖品失败'
    const params = {
        prizeType:prizeType,
        receiveName:receiveName,
        receivePhone:receivePhone,
        idCard:idCard,
        receiveAddress:receiveAddress,
        qq:qq,
    }
    url = urlParams(url , params)

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}


//发布音乐
export function signMusic(isOriginal ,
                       musicCover ,
                       musicName ,
                       musicUrl ) {
    const url = '/api/singUp/singMusic'
    const loadingText = '发布音乐...'
    const errMsg = '发布音乐失败'
    const data = {
        isOriginal: isOriginal,
        musicCover: musicCover,
        musicName: musicName,
        musicUrl: musicUrl
    }
    return post(url, data, loadingText).then(res => parseRes(res, errMsg))

}
//作用: 上传音乐 默认封面
export function coverImg() {
    const url = '/api/singUp/coverImg'
    const loadingText = '获取上传音乐封面...'
    const errMsg = '获取上传音乐封面失败'
    const data = {}

    return get(url, data , loadingText).then(res => parseRes(res, errMsg))
}
