import request from '@/utils/request'

export const listSelectMobil = (payload) => {
    return request({
        url: '/batchAddTask/listSelectMobil',
        method: 'get',
        params: payload
    })
}

export const batchAddTaskHandleTask = (payload) => {
    return request({
        url: '/batchAddTask/handleTask',
        method: 'post',
        data: payload
    })
}