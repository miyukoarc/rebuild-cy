/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:04:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 客户动态的接口 External User Trends Controller
 */

import request from '@/utils/request'

/**
 * 客户所有动态
 * @param {object} payload
 */
export const getExternalUserTrendsListAll = (payload) => {
    return request({
        url: '/externalUserTrends/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 添加客户动态
 * @param {object} payload
 */
export const addExTrends = (payload) => {
    return request({
        url: '/externalUserTrends/addExTrends',
        method: 'post',
        data: payload
    })
}

/**
 * 删除一条客户动态
 * @param {object} payload
 */
export const deleteExTrends = (payload) => {
    return request({
        url: '/externalUserTrends/deleteExTrends',
        method: 'post',
        data: payload
    })
}

/**
 * 更新一条客户动态
 * @param {object} payload
 */
export const updateExTrends = (payload) => {
    return request({
        url: '/externalUserTrends/updateExTrends',
        method: 'post',
        data: payload
    })
}