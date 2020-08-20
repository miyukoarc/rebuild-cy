/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-08-20 11:24:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 * 员工管理接口 User Controller
 */

import request from '@/utils/request'

/**
 * 员工详细页
 * @param {string} uuid 
 */
export const getDetail = (uuid) => {
    return request({
        url: '/user/' + uuid,
        method: 'get'
    })
}

/**
 * 删除员工
 * @param {object} payload 
 */
export const deleteUser = (payload) => {
    return request({
        url: '/user/' + payload,
        method: 'post',
        data: payload
    })
}

/**
 * 加入企业的二维码
 * 
 */
export const getQrcode = () => {
    return request({
        url: '/user/joinQrcode',
        method: 'get'
    })
}

/**
 * 员工列表有分页
 * @param {object} payload 
 */
export const getUserList = (payload) => {
    return request({
        url: '/user/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 所有员工列表
 * 
 */
export const getAllUserList = (payload) => {
    return request({
        url: '/user/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 跟新员工信息
 * @param {object} payload
 */
export const updateUser = (payload) => {
    return request({
        url: '/user/listAll',
        method: 'post',
        data: payload
    })
}

/**
 * 30天，用户的活跃状态
 * @param {} 
 */
export const getUserActiveCount = () => {
    return request({
        url: '/user/userActiveCount',
        method: 'get',
    })
}

/**
 * 获取用户幸喜
 */
export const getMyInfo = () => {
    return request({
        url: '/myInfo/detail',
        method: 'get'
    })
}

/**
 * 获取用户列表
 */
export const getUserListSelect = () => {
    return request({
        url: '/user/listSelect',
        method: 'get'
    })
}

/**
 * 更新用户信息
 */
export const postUserUpdate = (payload) => {
    return request({
        url: '/user/update',
        method: 'post',
        data: payload
    })
}

/**
 * 员工数据同步更新
 * @param {object} payload 
 */
export const userMaintain = (payload) => {
    return request({
        url: '/user/userMaintain',
        method: 'get',
        params: payload
    })
}