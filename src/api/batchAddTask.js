/*
 * @Author: your name
 * @Date: 2020-07-17 23:18:57
 * @LastEditTime: 2020-08-20 10:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\batchAddTask.js
 * 批量添加好友接口 Batch Add Task Controller
 */

import request from '@/utils/request'

/**
 * 筛选手机号
 * @param {object} payload 
 */
export const listSelectMobil = (payload) => {
    return request({
        url: '/batchAddTask/listSelectMobil',
        method: 'get',
        params: payload
    })
}

/**
 * 处理批量添加好友结果
 * @param {object} payload 
 */
export const batchAddTaskHandleTask = (payload) => {
    return request({
        url: '/batchAddTask/handleTask',
        method: 'post',
        data: payload
    })
}