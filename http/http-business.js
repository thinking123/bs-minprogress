import {get, post} from "./http";
import {urlParams} from "../utils/util";

function parseRes(res, errMsg, resolveStatus = []) {
    if (!!res && res.status.indexOf('2') > -1) {
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
        } else {
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


//发布音乐
export function singMusic(isOriginal,
                          musicCover,
                          musicName,
                          musicUrl) {
    const url = '/api/singUp/singMusic'
    const loadingText = '发布音乐...'
    const errMsg = '发布音乐失败'
    const data = {
        isOriginal: isOriginal,
        musicCover: musicCover,
        musicName: musicName,
        musicUrl: musicUrl
    }
    return post(url, data).then(res => parseRes(res, errMsg))
}

//作用: 音乐排行榜
export function getRankingList(pageNum,
                          provinceId,
                          musicPlayerName = '',
                          musicPlayerCode = '') {
    const url = '/api/rankingList/all'
    const loadingText = '获取音乐排行榜...'
    const errMsg = '获取音乐排行榜失败'
    const data = {
        pageNum: pageNum,
        provinceId: provinceId,
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
                               prizeAddress) {
    let url = '/api/prizeRecord/receivePrize'
    const loadingText = '领取奖品...'
    const errMsg = '领取奖品失败'
    const params = {
        id:id,
        prizeName:prizeName,
        prizePhone:prizePhone,
        prizeAddress:prizeAddress,
    }
    url = urlParams(url , params)

    return post(url, {} ,loadingText).then(res => parseRes(res, errMsg))
}
