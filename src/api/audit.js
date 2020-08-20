/*
 * @Author: your name
 * @Date: 2020-08-10 14:32:48
 * @LastEditTime: 2020-08-20 10:57:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\auth.js
 * 操作审核 Audit Controller
 */

import request from '@/utils/request'

/**
 * 群发审核的详情
 * @param {object} uuid 
 */
export const getDetail = (uuid) => {
    return request({
        url: '/audit/' + uuid,
        method: 'get',
    })
}

/**
 * 群发审核操作
 * @param {object} payload 
 */
export const auditBatchTaskConfirmation = (payload) => {
    return request({
        url: '/audit/auditBatchTaskConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 素材审核操作
 * @param {object} payload 
 */
export const auditMediaConfirmation = (payload) => {
    return request({
        url: '/audit/auditMediaConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 权限审核操作
 * @param {object} payload 
 */
export const auditPermissionConfirmation = (payload) => {
    return request({
        url: '/audit/auditPermissionConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 标签审核操作
 * @param {object} payload 
 */
export const auditTagConfirmation = (payload) => {
    return request({
        url: '/audit/auditTagConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 群发批量审核操作
 * @param {object} payload 
 */
export const batchAuditBatchTaskConfirmation = (payload) => {
    return request({
        url: '/audit/batchAuditBatchTaskConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 素材的批量审核操作
 * @param {object} payload 
 */
export const batchAuditMediaConfirmation = (payload) => {
    return request({
        url: '/audit/batchAuditMediaConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 权限批量审核操作
 * @param {object} payload 
 */
export const batchAuditPermissionConfirmation = (payload) => {
    return request({
        url: '/audit/batchAuditPermissionConfirmation',
        method: 'post',
        data: payload
    })
}

/**
 * 标签的批量审核操作
 * @param {object} payload 
 */
export const batchAuditTagConfirmation = (payload) => {
    return request({
        url: '/audit/batchAuditTagConfirmation',
        method: 'post',
        data: payload
    })
}