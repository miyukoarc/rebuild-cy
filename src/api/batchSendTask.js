/*
 * @Author: your name
 * @Date: 2020-08-10 14:32:48
 * @LastEditTime: 2020-08-20 10:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\api\auth.js
 * 批量发送任务管理 Batch Send Task Controller
 */

import request from '@/utils/request'

/**
 * 任务详情，无权限
 * @param {*} payload 
 */
export const permissionlessDetail = (payload) => {
  return request({
    url: '/batchSendTask/detailNoPermission/' + payload,
    method: 'get',
  })
}


/**
 * 任务详情
 * @param {string} payload 
 */
export const getBatchSendTaskDetail = (payload) => {
  return request({
    url: '/batchSendTask/' + payload,
    method: 'get',
  })
}

/**
 * 改变审查状态
 * @param {object} payload 
 */
export const changeSendTaskReviewed = (payload) => {
  return request({
    url: '/batchSendTask/changeSendTaskReviewed',
    method: 'post',
    data: payload
  })
}

/**
 * 添加企业的群发消息任务
 * @param {object} payload 
 */
export const add = (payload) => {
  return request({
    url: '/batchSendTask/add',
    method: 'get',
    data: payload
  })
}

/**
 * 添加企业的群发消息任务包含是否审核
 * @param {object} payload 
 */
export const addBatchSendTask = (payload) => {
  return request({
    url: '/batchSendTask/addBatchSendTask',
    method: 'post',
    data: payload
  })

}

/**
 * 把一个批量发送任务设为中断
 * @param {object} uuid 
 */
export const batchSendTaskSuspend = (payload) => {
  return request({
    url: '/batchSendTask/batchSendTaskSuspend',
    method: 'post',
    data: payload
  })
}

/**
 * 全部任务
 * @param {object} payload 
 */
export const getBatchSendTaskListAll = (payload) => {
  return request({
    url: '/batchSendTask/listAll',
    method: 'get',
    params: payload
  })
}

/**
 * 群发任务结果列表
 * @param {object} payload 
 */
export const getListBatchSendTaskResult = (payload) => {
  return request({
    url: '/batchSendTask/listBatchSendTaskResult',
    method: 'get',
    params: payload
  })
}

/**
 * 我的群发任务
 * @param {object} payload 
 */
export const getListMy = (payload) => {
  return request({
    url: '/batchSendTask/listMy',
    method: 'get',
    params: payload
  })
}

/**
 * 把一个具体的发送任务设为已发送
 * @param {string} uuid 
 */
export const sendResultHasSend = (payload) => {
  return request({
    url: '/batchSendTask/sendResultHasSend',
    method: 'post',
    data: payload
  })
}

/**
 * 获取详情
 * @param {string} uuid 
 */
export const getDetail = (uuid) => {
  return request({
    url: `/batchSendTask/${uuid}`,
    method: 'get',
  })
}
