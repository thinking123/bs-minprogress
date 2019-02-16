import regeneratorRuntime from '../libs/regenerator-runtime/runtime.js'
import {wx_isExist,wx_mkDir,wx_rmdir,wx_saveFile} from "./wx";

export const saveFile = async function(tempFilePath , dir) {
    console.log(tempFilePath , dir)
    dir = `${wx.env.USER_DATA_PATH}/${dir}`
    console.log('dir' , dir)
    const fs = wx.getFileSystemManager()
    let isExist = await wx_isExist(fs , dir)
    if(isExist){
        await wx_rmdir(fs , dir)
    }

    await wx_mkDir(fs , dir)


    const reg = /\./
    const ext = tempFilePath.split('.').pop()
    dir = `${dir}/record.${ext}`
    const {savedFilePath} = await wx_saveFile(fs , tempFilePath,dir)
    console.log('save file in' , savedFilePath)
    return savedFilePath
}


