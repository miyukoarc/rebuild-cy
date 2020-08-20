/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-08-20 11:17:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 * 角色的管理接口 Role Controller
 */

import request from '@/utils/request'

/**
 * 角色详细页
 * @param {string} uuid 
 */
export const getRoleDetail = (uuid) => {
    return request({
        url: '/role/' + uuid,
        method: 'get',
    })
}

/**
 * 添加角色
 * @param {object} payload 
 */
export const addRole = (payload) => {
    return request({
        url: '/role/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除角色
 * @param {object} payload 
 */
export const deleteRole = (payload) => {
    return request({
        url: '/role/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 更新角色
 * @param {object} payload 
 */
export const updateRole = (payload) => {
    return request({
        url: '/role/update',
        method: 'post',
        data: payload
    })
}

/**
 * 角色列表
 * @param {}  
 */
export const getRoleList = (payload) => {
    return request({
        url: '/role/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 角色列表
 * @param {}  
 */
export const getRoleListSelect = (payload) => {
    return request({
        url: '/role/listSelect',
        method: 'get',
        params: payload
    })
}