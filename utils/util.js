const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export function isEmpty(str) {
    // if(typeof str !== 'string' || !str){
    //   return false
    // }
    str = str.trim()
    return str.length === 0
}

export function showMsg(title , showIcon = false) {
    if(!title){
        return
    }

    let icon = 'success'
    let isError = title instanceof Error || typeof title !== 'string'

    if (isError) {
        //本地图标
        icon = 'fail'
        title = title.message ? title.message : Object.prototype.toString.call(title)
    }

    let options = {
        title:title,
        mask:true
    }

    options = Object.assign(options , {icon : showIcon ? icon : 'none'})
    wx.showToast(options)

    console.log(title , icon , isError)
}
