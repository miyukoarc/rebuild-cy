/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:05:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 群管理接口 Group Chat Controller
 */

import request from '@/utils/request'


/**
 * 客户群详细页
 * @param {object} uuid 
 */
export const getGroupChartDetail = (uuid) => {
    return request({
        url: '/groupChart/' + uuid,
        method: 'get',
    })
}

/**
 * 所有客户群列表
 * @param {object} payload 
 */
export const getGroupChartList = (payload) => {
    return request({
        url: '/groupChart/list',
        method: 'get',
        params: payload
    })
}

/**
 * 我创建的客户群
 * @param {object} payload 
 */
export const getGroupChartListMy = (payload) => {
    return request({
        url: '/groupChart/listMy',
        method: 'get',
        params: payload
    })
}

/**
 * 我参与的客户群
 * @param {object} payload 
 */
export const getGroupChartListMyJoin = (payload) => {
    return request({
        url: '/groupChart/listMyJoin',
        method: 'get',
        params: payload
    })
}