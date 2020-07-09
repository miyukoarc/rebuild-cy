/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-28 00:10:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 */ 
import request from '@/utils/request'

/**
 * 详细页
 * @param {string} uuid 
 */
export const getContactWayDetail = (uuid)=>{
    return request({
        url: '/contactWay/'+uuid,
        method: 'get'
    })
}

/**
 * 添加客户渠道
 * @param {object} payload 
 */
export const contactWayAdd = (payload)=>{
    return request({
        url: '/contactWay/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除客户渠道
 * @param {object} payload 
 */
export const deleteContactWay = (payload)=>{
    return request({
        url: '/contactWay/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 渠道列表
 * @param {string} payload 
 */
export const getList = (payload)=>{
    return request({
        url: '/contactWay/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 更新客户渠道
 * @param {object} payload 
 */
export const contactWayUpdate = (payload)=>{
    return request({
        url: '/contactWay/update',
        method: 'post',
        data: payload
    })
}