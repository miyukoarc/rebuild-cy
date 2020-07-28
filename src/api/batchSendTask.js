import request from '@/utils/request'


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
export const batchSendTaskSuspend = (uuid) => {
    return request({
        url: '/batchSendTask/batchSendTaskSuspend/' + uuid,
        method: 'get',
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