import request from '@/utils/request'

/**
 * 详细页
 * @param {string} payload
 * @param {string} userId 
 */
export const getDetail = (payload,userId) => {
  return request({
    url: '/externalUser/' + payload,
    method: 'get',
    params: {
        userId
    }
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
    url: '/externalUser/customerStatistics' + payload,
    method: 'post',
    data: payload
  })
}

/**
 * 
 * 所有的客户的列表，管理员可查看
 * @param {object} payload page
 */
export const getList = (payload) => {
  return request({
    url: '/externalUser/list' + payload,
    method: 'post',
    params: payload
  })
}

/**
 * 
 * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
 * @param {object} payload page
 */
export const getListAll = (payload) => {
  return request({
    url: '/externalUser/listAll' + payload,
    method: 'post',
    params: payload
  })
}

 /**
  * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
  * @param {string} tagIds 
  * @param {string} uuid 
  */
export const getlistExUserByUserId = (tagIds,uuid) => {
  return request({
    url: '/externalUser/listExUserByUserId',
    method: 'post',
    params: {
        tagIds,
        uuid
    }
  })
}
