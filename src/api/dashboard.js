import request from '@/utils/request'

export const getDashboard = ()=>{
    return request({
        url: '/index',
        method: 'get'
    })
}