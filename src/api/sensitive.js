/*
 * @Author: your name
 * @Date: 2020-07-06 17:42:41
 * @LastEditTime: 2020-08-20 11:21:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\property.js
 * 风控管理 Sensitive Controller
 */

import request from '@/utils/request'

/**
 * 添加敏感词
 * @param {object} payload 
 */
export const add = (payload) => {
    return request({
        url: '/riskManagement/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除敏感词
 * @param {object} payload 
 */
export const deleteSensitive = (payload) => {
    return request({
        url: '/riskManagement/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 更新敏感词
 * @param {object} payload 
 */
export const update = (payload) => {
    return request({
        url: '/riskManagement/update',
        method: 'post',
        data: payload
    })
}

/**
 * 权限审核列表
 * @param {object} payload 
 */
export const getAuditPermissionlistAll = (payload) => {
    return request({
        url: '/riskManagement/auditPermissionlistAll',
        method: 'get',
        params: payload
    })
}

/**
 * 群发审核列表
 * @param {object} payload 
 */
export const getAuditBatchSendTaklistAll = (payload) => {
    return request({
        url: '/riskManagement/auditBatchSendTaklistAll',
        method: 'get',
        params: payload
    })
}

/**
 * 审核列表
 * @param {object} payload 
 */
export const getAuditList = (payload) => {
    return request({
        url: '/riskManagement/auditList',
        method: 'get',
        params: payload
    })
}

/**
 * 标签审核列表
 * @param {object} payload 
 */
export const getAuditTaglistAll = (payload) => {
    return request({
        url: '/riskManagement/auditTaglistAll',
        method: 'get',
        params: payload
    })
}

/**
 * 敏感词列表
 * @param {object} payload 
 */
export const getSensitiveListAll = (payload) => {
    return request({
        url: '/riskManagement/sensitiveListAll',
        method: 'get',
        params: payload
    })
}

/**
 * 敏感词行为
 * @param {object} payload 
 */
export const getActionListAll = (payload) => {
    return request({
        url: '/riskManagement/actionListAll',
        method: 'get',
        params: payload
    })
}

/**
 * 敏感词操作记录
 * @param {object} payload 
 */
export const getLog = (payload) => {
    return request({
        url: '/riskManagement/sensitiveLogListAll',
        method: 'get',
        params: payload
    })
}

/**
 * 批量设置通知人
 * @param {object} payload 
 */
export const updateNoticeUser = (payload) => {
    return request({
        url: '/riskManagement/updateNoticeUser',
        method: 'post',
        data: payload
    })
}

/**
 * 设置审核开启关闭
 * @param {object} payload 
 */
export const setAuditCloseOrOpen = (payload) => {
    return request({
        url: '/riskManagement/setAuditCloseOrOpen',
        method: 'post',
        data: payload
    })
}

/**
 * 审核配置列表
 * @param {object} payload 
 */
export const auditPropertylistAll = (payload) => {
    return request({
        url: '/riskManagement/auditPropertylistAll',
        method: 'get',
        params: payload
    })
}

/**
 * 设置审核人
 * @param {object} payload 
 */
export const setAuditUser = (payload) => {
    return request({
        url: '/riskManagement/setAuditUser',
        method: 'post',
        data: payload
    })
}

/**
 * 素材审核列表
 * @param {object} payload 
 */
export const auditMediaListAll = (payload) => {
    return request({
        url: '/riskManagement/auditMediaListAll',
        method: 'get',
        params: payload
    })
}

/**
 * 审核配置详情
 * @param {string} uuid 
 */
export const auditDetail = (uuid) => {
    return request({
        url: '/riskManagement/' + uuid,
        method: 'get'
    })
}

/**
 * 审核配置详情
 * @param {string} uuid 
 */
export const batchAuditPermissionConfirmation = (payload) => {
    return request({
        url: '/riskManagement/batchAuditPermissionConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 无权限获取权限列表
 */
export const auditPropertylistSelect = () => {
    return request({
        url: '/riskManagement/auditPropertylistSelect',
        method: 'get'
    })
}