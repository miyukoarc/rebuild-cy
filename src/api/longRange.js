import request from '@/utils/request'

/**
 * 判断自己的某个websocket客户端是否在线
 * @param {object} uuid 
 */
export const isOnline = (uuid) => {
    return request({
        url: '/longRangeControl/isOnline/'+uuid,
        method: 'get'
    })
}


/**
 * 控制管理端发送批量任务
 * @param {object} payload 
 */
export const sendBatchTask = (payload) => {
    return request({
        url: '/longRangeControl/sendBatchTask',
        method: 'post',
        data: payload
    })
}

/**
 * 控制管理端发送批量任务
 * @param {object} payload 
 */
export const sendChaoyingMessage = (payload) => {
    return request({
        url: '/longRangeControl/sendChaoyingMessage',
        method: 'post',
        data: payload
    })
}

