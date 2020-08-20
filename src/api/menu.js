/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:11:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 菜单的管理接口 Menu Controller
 */

import request from '@/utils/request'

/**
 * 通过id查询的菜单详细页
 * @param {string} uuid 
 */
export const getMenuDetail = (uuid) => {
    return request({
        url: '/menu/' + uuid,
        method: 'get',

    })
}

/**
 * 全部菜单列表（超管）
 */
export const getAllMenuList = () => {
    return request({
        url: '/menu/list',
        method: 'get'
    })
}

/**
 * 全部菜单列表（普通角色）
 */
export const getMyMenuList = () => {
    return request({
        url: '/menu/listMy',
        method: 'get'
    })
}