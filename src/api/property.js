/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-07-06 17:46:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 */ 
import request from '@/utils/request'

/**
 * 客户详情修改客户属性配置
 * @param {object} payload 
 */
export const propertyUpdateExternalUserProperty = (payload)=>{
    return request({
        url: '/property/updateExternalUserProperty',
        method: 'post',
        data:payload
    })
}
