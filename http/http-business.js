import {get, post} from "./http";


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


    // return new Promise((res , rej) => {
    //     let r = []
    //     for(let i = 0 ; i< 20 ; i++){
    //         r.push({
    //             id:`key${i}`,
    //             name:`schoolName${i}`
    //         })
    //     }
    //     res(r)
    // })
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
