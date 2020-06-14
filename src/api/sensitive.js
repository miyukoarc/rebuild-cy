import request from '@/utils/request'


/**
 * 添加敏感词
 * @param {object} payload 
 */
export const add = (payload) => {
    return request({
        url: '/sensitive/add',
        method: 'get',
        data: payload
    })
}

/**
 * 删除敏感词
 * @param {object} payload 
 */
export const deleteSensitive = (payload) => {
    return request({
        url: '/sensitive/delete',
        method: 'get',
        data: payload
    })
}

/**
 * 更新敏感词
 * @param {object} payload 
 */
export const update = (payload) => {
    return request({
        url: '/sensitive/update',
        method: 'get',
        data: payload
    })
}



/**
 * 权限审核列表
 * @param {object} payload 
 */
export const getAuditPermissionlist = (payload) => {
    return request({
        url: '/sensitive/auditPermissionlist',
        method: 'get',
        params: payload
    })
}


/**
 * 群发审核列表
 * @param {object} payload 
 */
export const getAuditBatchSendTaklist = (payload) => {
    return request({
        url: '/sensitive/auditBatchSendTaklist',
        method: 'get',
        params: payload
    })
}




/**
 * 审核列表
 * @param {object} payload 
 */
export const getAuditList = (payload) => {
    return request({
        url: '/sensitive/auditList',
        method: 'get',
        params: payload
    })
}


/**
 * 标签审核列表
 * @param {object} payload 
 */
export const getAuditTaglist = (payload) => {
    return request({
        url: '/sensitive/auditTaglist',
        method: 'get',
        params: payload
    })
}

/**
 * 敏感词列表
 * @param {object} payload 
 */
export const getList = (payload) => {
    return request({
        url: '/sensitive/list',
        method: 'get',
        params: payload
    })
}


/**
 * 敏感词行为
 * @param {object} payload 
 */
export const getListAction = (payload) => {
    return request({
        url: '/sensitive/listAction',
        method: 'get',
        params: payload
    })
}


/**
 * 敏感词操作记录
 * @param {object} payload 
 */
export const getLog = (payload) => {
    return request({
        url: '/sensitive/log',
        method: 'get',
        params: payload
    })
}





