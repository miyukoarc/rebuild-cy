/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:06:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 远距离控制 Long Range Controller
 */

import request from '@/utils/request'

/**
 * 判断自己的某个websocket客户端是否在线
 * @param {object} uuid 
 */
export const isOnline = (uuid) => {
    return request({
        url: '/longRangeControl/isOnline/' + uuid,
        method: 'get'
    })
}

/**
 * 控制管理端发送批量任务
 * @param {object} payload 
 */
export const sendBatchTask = (payload) => {
    return request({
        url: '/longRangeControl/sendBatchTask',
        method: 'post',
        data: payload
    })
}

/**
 * 控制管理端发送批量任务
 * @param {object} payload 
 */
export const sendChaoyingMessage = (payload) => {
    return request({
        url: '/longRangeControl/sendChaoyingMessage',
        method: 'post',
        data: payload
    })
}

/**
 * 发送自定义消息
 * @param {object} payload 
 */
export const sendCustomizeMessage = (payload) => {
    return request({
        url: '/longRangeControl/sendCustomizeMessage',
        method: 'post',
        data: payload
    })
}