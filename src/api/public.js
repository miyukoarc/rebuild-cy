/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-08-20 11:16:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 * 公共方法
 */

import request from '@/utils/request'

/**
 * 根据id获取图像或者文件
 * @param {string} payload 
 */
export const getFile = (payload) => {
    return request({
        url: '/public/file/' + payload,
        method: 'get'
    })
}