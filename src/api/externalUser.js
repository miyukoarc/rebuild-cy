import request from '@/utils/request'

/**
 * 详细页
 * 
 * @param {string} uuid 
 */
export const getExternalUserDetail = (uuid) => {
    return request({
        url: '/externalUser/' + uuid,
        method: 'get',
    })
}



/**
 * 添加客户标签
 * @param {string} payload
 */
export const addTag = (payload) => {
    return request({
        url: '/externalUser/addTag' + payload,
        method: 'post',
        data: payload
    })
}

/**
 * 获取联系客户统计数据
 * @param {string} payload
 */
export const getCustomerStatistics = (payload) => {
    return request({
        url: '/externalUser/customerStatistics',
        method: 'post',
        data: payload
    })
}

/**
 * 
 * 所有的客户的列表，管理员可查看
 * @param {object} payload
 */
export const getList = (payload) => {
    return request({
        url: '/externalUser/list',
        method: 'get',
        params: payload
    })
}

/**
 * 
 * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
 * @param {object} payload
 */
export const getExternalUserListAll = (payload) => {
    return request({
        url: '/externalUser/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 根据用户uuid查询对应的客户
 * @param {object} payload 
 */
export const getListExUserByUserId = (payload) => {
    return request({
        url: '/externalUser/listExUserByUserId',
        method: 'get',
        params: payload
    })
}

/**
 * 我的客户的列表
 * @param {object} payload 
 */
export const getExternalUserListMy = (payload) => {
    return request({
        url: '/externalUser/listMy',
        method: 'get',
        params: payload
    })
}

/**
 * 获取离职成员的客户列表
 * @param {object} payload 
 */
export const getQuitUserRelationExUserList = (payload) => {
    return request({
        url: '/externalUser/quitUserRelationExUserList',
        method: 'get',
        params: payload
    })
}

/**
 * 离职成员的外部联系人再分配
 * @param {object} payload 
 */
export const redistributionExUser = (payload) => {
    return request({
        url: '/externalUser/redistributionExUser',
        method: 'post',
        data: payload
    })
}

/**
 * 修改客户备注
 * @param {object} payload 
 */
export const remark = (payload) => {
    return request({
        url: '/externalUser/remark',
        method: 'post',
        data: payload
    })
}

/**
 * 删除客户标签
 * @param {object} payload 
 */
export const removeTag = (payload) => {
    return request({
        url: '/externalUser/removeTag',
        method: 'post',
        data: payload
    })
}

/**
 * 我的流失客户列表
 * @param {object} payload 
 */
export const getRunWayList = (payload) => {
    return request({
        url: '/externalUser/runWayListMy',
        method: 'get',
        params: payload
    })
}


/**
 * 所有流失客户列表
 * @param {object} payload 
 */
export const getRunWayListAll = (payload) => {
    return request({
        url: '/externalUser/runWayListAll',
        method: 'get',
        params: payload
    })
}

/**
 * 更新客户资料
 * @param {object} payload 
 */
export const update = (payload) => {
    return request({
        url: '/externalUser/update',
        method: 'post',
        data: payload
    })
}



/**
 * 获取群列表
 * @param {object} payload 
 */
export const getListGroup = (payload) => {
    return request({
        url: '/groupChat/groupChatListAll',
        method: 'get',
        params: payload
    })
}


/**
 * 获取所有人列表
 * @param {object} payload 
 */
export const getListOwner = (payload) => {
    return request({
        url: '/groupChat/groupChatOwnerListSelect',
        method: 'get',
        params: payload
    })
}


/**
 * 敏感词列表
 * @param {object} payload 
 */
export const getSensitiveListAll = (payload) => {
    return request({
        url: '/externalUser/sensitiveListAll',
        method: 'get',
        params: payload
    })
}


/**
 * 离职员工的客户列表
 * @param {object} payload 
 */
export const getQuitUserRelationExUserDetail = (payload) => {
    return request({
        url: '/externalUser/quitUserRelationExUserDetail',
        method: 'get',
        params: payload
    })
}

/**
 * 群详情
 * @param {object} payload 
 */
export const getGroupDetail = (payload) => {
    return request({
        url: '/groupChat/' + payload,
        method: 'get',
    })
}

/**
 * 编辑标签
 * @param {object} payload 
 */
export const externalUserUpdateTag = (payload) => {
        return request({
            url: '/externalUser/updateTag',
            method: 'post',
            data: payload
        })
    }
    /**
     * 批量添加好友listMy
     * @param {object} payload 
     */
export const getListMy = (payload) => {
    return request({
        url: '/batchAddTask/listMy',
        method: 'get',
        params: payload
    })
}

/**
 * 查看批量添加好友任务详情
 * @param {object} payload 
 */
export const getResultList = (payload) => {
    return request({
        url: `/batchAddTask/result/${payload.uuid}`,
        method: 'get',
        params: payload
    })
}