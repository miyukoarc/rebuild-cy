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
 * @param {string} payload 
 */
export const deleteDepartment = (payload)=>{
    return request({
        url: '/department/delete',
        method: 'post',
        data: payload
    })
}

/**
 * 部门列表
 * @param {object} payload page
 */
export const getDepartmentListAll = (payload) => {
    return request({
        url: '/department/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 部门列表 筛选
 * @param {object} payload page
 */
export const getDepartmentListSelect = (payload) => {
    return request({
        url: '/department/listSelect',
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



/**
 * 更新部门
 * 
 */
export const getDepartments = () => {
    return request({
        url: '/department/listDep',
        method: 'get',
    })
}


/**
 * 分配部门
 * @param {*} payload 
 */
export const allocation = (payload) => {
    return request({
        url: '/department/allocation',
        method: 'post',
        data: payload
    })
}




