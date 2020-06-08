import request from '@/utils/request'

/**
 * 部门详细页
 * @param {string} payload 
 */

export const getDepartmentDetail = (payload) => {
    return request({
        url: '/department/'+payload,
        method: 'get',

    })
}

/**
 * 创建部门
 * @param {object} payload 
 */

export const addDepartment = (payload) => {
    return request({
        url: '/department/add',
        method: 'post',
        data: payload
    })
}

/**
 * s删除部门
 * @param {string} uuid 
 */
export const deleteDepartment = (uuid)=>{
    return request({
        url: '/department/delete',
        method: 'post',
        data: {
            uuid
        }
    })
}

/**
 * 部门列表
 * @param {object} payload page
 */
export const getDepartmentList = (payload) => {
    return request({
        url: '/department/list',
        method: 'get',
        params: payload
    })
}

/**
 * 分配部门主管
 * @param {object} payload 
 */
export const locateDepartmentLeader = (payload) => {
    return request({
        url: '/department/locateDepartmentLeader',
        method: 'post',
        data: payload
    })
}

/**
 * 更新部门
 * @param {object} payload 
 */
export const updateDepartment = (payload) => {
    return request({
        url: '/department/update',
        method: 'post',
        data: payload
    })
}