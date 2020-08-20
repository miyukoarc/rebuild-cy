/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-08-20 11:16:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 * 属性配置 Property Controller
 */

import request from '@/utils/request'

/**
 * 客户详情修改客户属性配置
 * @param {object} payload 
 */
export const propertyUpdateExternalUserProperty = (payload) => {
    return request({
        url: '/property/updateExternalUserProperty',
        method: 'post',
        data: payload
    })
}

/**
 * 新增客户属性配置
 * @param {object} payload 
 */
export const propertyAdd = (payload) => {
    return request({
        url: '/property/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除客户属性配置
 * @param {object} payload 
 */
export const propertyDelete = (payload) => {
    return request({
        url: '/property/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 客户属性列表
 * @param {object} payload 
 */
export const getPropertyListAll = () => {
    return request({
        url: '/property/listAll',
        method: 'get'
    })
}

/**
 * 客户全部属性
 * @param {object} payload 
 */
export const propertyListSelect = (payload) => {
    return request({
        url: '/property/listSelect',
        method: 'get',
        params: payload
    })
}

/**
 * 更新客户属性配置
 * @param {object} payload 
 */
export const propertyUpdate = (payload) => {
    return request({
        url: '/property/update',
        method: 'post',
        data: payload
    })
}

/**
 * 客户属性上移下移
 * @param {object} payload 
 */
export const propertyUpdatePropertySort = (payload) => {
    return request({
        url: '/property/updatePropertySort',
        method: 'post',
        data: payload
    })
}