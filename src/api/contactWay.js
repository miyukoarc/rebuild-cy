import request from '@/utils/request'

/**
 * 详细页
 * @param {string} uuid 
 */
export const getDetail = (uuid)=>{
    return request({
        url: '/contactWay/'+uuid,
        method: 'get'
    })
}

/**
 * 添加客户渠道
 * @param {object} payload 
 */
export const add = (payload)=>{
    return request({
        url: '/contactWay/add',
        method: 'post',
        data: payload
    })
}

/**
 * 删除客户渠道
 * @param {object} payload 
 */
export const deleteContactWay = (payload)=>{
    return request({
        url: '/contactWay/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 渠道列表
 * @param {string} payload 
 */
export const getList = (payload)=>{
    return request({
        url: '/contactWay/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 更新客户渠道
 * @param {object} payload 
 */
export const update = (payload)=>{
    return request({
        url: '/contactWay/update',
        method: 'post',
        data: payload
    })
}