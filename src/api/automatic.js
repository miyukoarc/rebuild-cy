/*
 * @Author: your name
 * @Date: 2020-07-17 23:18:57
 * @LastEditTime: 2020-07-31 15:17:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\automatic.js
 */
import requset from '@/utils/request'

/**
 * 自动回复列表
 * @param {object} payload 
 */
export const getListAll = (payload) => {
    return requset({
        url: '/automatic/listAll',
        method: 'get',
        params: payload
    })
}


/**
 * 添加自动回复
 * @param {object} payload 
 */
export const add = (payload) => {
    return requset({
        url: '/automatic/add',
        method: 'post',
        data: payload
    })
}


/**
 * 删除自动回复
 * @param {object} payload 
 */
export const doDelete = (payload) => {
    return requset({
        url: '/automatic/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 自动回复间隔开关
 * @param {object} payload 
 */
export const automaticSwitchReplyInterval = (payload) => {
    return requset({
        url: '/automatic/switchReplyInterval',
        method: 'post',
        data: payload
    })
}

/**
 * 添加默认自动回复
 * @param {object} payload 
 */
export const automaticAddDefault = (payload) => {
    return requset({
        url: '/automatic/addDefault',
        method: 'post',
        data: payload
    })
}

/**
 * 默认自动回复详情
 */
export const automaticDefaultDetail = () => {
    return requset({
        url: '/automatic/defaultDetail',
        method: 'get'
    })
}