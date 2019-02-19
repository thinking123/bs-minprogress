export function getInnerAudioContext(src , autoplay = true, volume = 0.5) {
    const ctx = wx.createInnerAudioContext()
    ctx.src = src
    ctx.autoplay = autoplay
    ctx.volume = volume

    return ctx
}

export function getAudioDuration(ctx) {
    return ctx.duration
}
export function getAudioCurrent(ctx) {
    return ctx.currentTime
}

export function getAudioCBuffer(ctx) {
    return ctx.buffered
}
