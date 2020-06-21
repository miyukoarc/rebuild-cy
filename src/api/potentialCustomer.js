import request from '@/utils/request'

/**
 * 详细页
 * @param {string} uuid 
 */

export const getDetail = (uuid) => {
    return request({
        url: '/potentialCustomer/'+uuid,
        method: 'get',
    })
}


/**
 * 分配潜在客户
 * @param {object} payload 
 */

export const allocation = (payload) => {
    return request({
        url: '/potentialCustomer/allocation',
        method: 'post',
        data: payload
    })
}


/**
 * 批量添加潜在客户，根据手机号
 * @param {object} payload 
 */

export const batchAdd = (payload) => {
    return request({
        url: '/potentialCustomer/batchAdd',
        method: 'post',
        data: payload
    })
}


/**
 * 删除潜在客户
 * @param {object} payload 
 */

export const deletePotentialCustomer = (payload) => {
    return request({
        url: '/potentialCustomer/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 更新潜在客户
 * @param {object} payload 
 */

export const update = (payload) => {
    return request({
        url: '/potentialCustomer/update',
        method: 'post',
        data: payload
    })
}


/**
 * 所有潜在客户列表
 * @param {object} payload 
 */

export const getList = (payload) => {
    return request({
        url: '/potentialCustomer/listAll',
        method: 'get',
        params: payload
    })
}


/**
 * 我的潜在客户列表
 * @param {object} payload 
 */

export const getListMy = (payload) => {
    return request({
        url: '/potentialCustomer/listMy',
        method: 'get',
        params: payload
    })
}


/**
 * 分配潜在客户
 * @param {object} payload 
 */
export const additionFail = (payload)=>{
    return request({
        url: '/potentialCustomer/additionFail',
        method: 'post',
        data: payload
    })
}
