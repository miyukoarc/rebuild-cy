/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-07-23 16:24:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\message.js
 */
import request from '@/utils/request'


/**
 * 群聊留痕
 * @param {object} payload 
 */
export const getListGroupChat = (payload) => {
    return request({
        url: '/message/listGroupChat',
        method: 'get',
        params: payload
    })
}

/**
 * 单聊留痕
 * @param {object} payload 
 */
export const getMessageSingleListAll = (payload) => {
    return request({
        url: '/message/singleListAll',
        method: 'get',
        params: payload
    })
}


/**
 * 单聊留痕 last
 * @param {object} payload 
 */
export const getMessageSingleLastListAll = (payload) => {
    return request({
        url: '/message/singleLastListAll',
        method: 'get',
        params: payload
    })
}


/**
 * 下载文件
 * @param {url} payload 
 */
export const downloadFile = (url) => {
    return request({
        url: url,
        method: 'get',
        responseType: "blob",
    })
}