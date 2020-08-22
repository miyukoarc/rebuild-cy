/*
 * @Author: your name
 * @Date: 2020-08-10 14:32:48
 * @LastEditTime: 2020-08-22 17:21:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\auth.js
 * login-controller Login Controller 登录
 */

import request from '@/utils/request'

/**
 * 退出登录
 */
export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

/**
 * 登录机构列表
 */
export const getLoginList = () => {
    return request({
        url: '/loginList',
        method: 'get',
    })
}

/**
 * 微信登录
 */
export function wxLogin(tenantId) {
    return request({
        url: '/login/' + tenantId,
        method: 'get'
    })
}

/**
 * 版本号
 */
export function publicVersion() {
    return request({
        url: 'public/version',
        method: 'get'
    })
}