/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:05:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 操作记录管理 Log Controller
 */

import request from '@/utils/request'

/**
 * 操作记录
 * @param {object} payload 
 */
export const getLogListAll = (payload) => {
    return request({
        url: '/log/logListAll',
        method: 'get',
        params: payload
    })
}