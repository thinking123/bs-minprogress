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
    str = str == null ? '' : str.trim()
    return str.length === 0
}

export function showLoading(title, mask = true) {
    wx.showLoading({
        title: title,
        mask: mask
    })
}

export function hideLoading() {
    wx.hideLoading()
}

export function showMsg(title, showIcon = false) {
    if (!title) {
        return
    }

    let icon = 'success'
    let isError = title instanceof Error ||
        typeof title !== 'string' ||
        //小程序 系统error
        (title.errMsg && title.errMsg.length > 0)

    if (isError) {
        //本地图标
        icon = 'fail'
        title = title.message ? title.message : title.errMsg
        title = title ? title : 'error'
    }

    if(title && title == '您因违规已被永久封禁'){
        console.log('locked ')
        return
    }
    let options = {
        title: title,
        mask: true
    }

    options = Object.assign(options, {icon: showIcon ? icon : 'none'})
    wx.showToast(options)

    console.log(title, icon, isError)
}

export function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

export function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this,
            args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this
        //   function several times, but it will only execute once
        //   [before or after imposing a delay].
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    }
}

export function urlParams(url, params , noEncode = false) {
    let p = ''
    if(noEncode){
        p = Object.keys(params).map(function (key) {
            return [key, params[key]].join("=");
        }).join("&");
    }else{
         p = Object.keys(params).map(function (key) {
            return [key, params[key]].map(encodeURIComponent).join("=");
        }).join("&");
    }

    if (p.length === 0) {
        return url
    }
    return `${url}?${p}`
}

export function secondToMinus(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rand = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('rand', rand)
    return rand
}

export function getRatioSize(viewWidth , viewHeight , originWidth , originHeight) {
    const ratio = originWidth / originHeight
    let viewRatio = viewWidth/viewHeight


    if(originWidth > viewWidth && originHeight > viewHeight){
        if(originWidth > originHeight){

            if(viewWidth/ratio > viewHeight){
                viewWidth = viewHeight*ratio;
            }else{
                viewHeight = viewWidth/ratio;
            }
        }else{
            if(viewHeight*ratio > viewWidth){
                viewHeight = viewWidth/ratio;
            }else{
                viewWidth = viewHeight*ratio;
            }

        }
    }else{
        if(originWidth > originHeight){

            if(viewWidth/ratio > viewHeight){
                viewWidth = viewHeight*ratio;
            }else{
                viewHeight = viewWidth/ratio;
            }

            // viewWidth = viewHeight*ratio;

        }else{
            if(viewHeight*ratio > viewWidth){
                viewHeight = viewWidth/ratio;
            }else{
                viewWidth = viewHeight*ratio;
            }
            // viewHeight = viewWidth/ratio;
        }
    }

    viewWidth = viewWidth
    viewHeight = viewHeight

    console.log(viewWidth , viewHeight  , ratio , viewWidth/viewHeight)


    return {
        width:viewWidth,
        height:viewHeight
    }
}