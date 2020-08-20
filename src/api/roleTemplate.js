/*
 * @Author: your name
 * @Date: 2020-07-09 18:50:40
 * @LastEditTime: 2020-08-20 11:20:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\roleTemplate.js
 */
import request from '@/utils/request'

/**
 * 获取模板详情
 * @param {string} uuid 
 */
export const getDetail = (uuid) => {
    return request({
        method: 'get',
        url: '/roleTemplate/' + uuid
    })
}

/**
 * 添加角色模板
 * @param {object} payload 
 */
export const add = (payload) => {
    return request({
        method: 'post',
        url: '/roleTemplate/add',
        data: payload
    })
}

/**
 * 获取列表
 * @param {object} payload 
 */
export const getListAll = (payload) => {
    return request({
        method: 'get',
        url: '/roleTemplate/listAll',
        params: payload
    })
}

/**
 * 模板角色赋予权限
 * @param {object} payload 
 */
export const roleLinkPermission = (payload) => {
    return request({
        method: 'post',
        url: '/roleTemplate/roleLinkPermission',
        data: payload
    })
}