/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-20 11:10:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\contactWay.js
 * 素材管理 Media Controller 素材组相关
 */

import request from '@/utils/request'

/**
 * 添加素材组
 * @param {object} payload 
 */
export const addGroup = (payload) => {
    return request({
        url: '/media/mediaGroup/add',
        method: 'post',
        data: payload

    })
}

/**
 * 删除素材组
 * @param {object} payload 
 */
export const deleteMediaGroup = (payload) => {
    return request({
        url: '/media/mediaGroup/delete',
        method: 'post',
        data: payload

    })
}

/**
 * 素材组列表
 * @param {object} payload 
 */
export const getMediaGroupListAll = (payload) => {
    return request({
        url: '/media/mediaGroup/listAll',
        method: 'get',
        params: payload

    })
}
/**
 * 素材组列表
 * @param {object} payload 
 */
export const getMediaGroupList = (payload) => {
    return request({
        url: '/media/mediaGroup/listMy',
        method: 'get',
        params: payload

    })
}

/**
 * 更改素材组
 * @param {object} payload 
 */
export const rename = (payload) => {
    return request({
        url: '/media/mediaGroup/rename',
        method: 'post',
        data: payload

    })
}