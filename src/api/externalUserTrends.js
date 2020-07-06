import request from '@/utils/request'

/**
 * 客户所有动态
 * @param {object} payload
 */
export const getExternalUserTrendsListAll = (payload) => {
  return request({
    url: '/externalUserTrends/listAll',
    method: 'get',
    params: payload
  })
}

/**
 * 添加客户动态
 * @param {object} payload
 */
export const addExTrends = (payload) => {
  return request({
    url: '/externalUserTrends/addExTrends',
    method: 'post',
    data: payload
  })
}


/**
 * 删除一条客户动态
 * @param {object} payload
 */
export const deleteExTrends = (payload) => {
  return request({
    url: '/externalUserTrends/deleteExTrends',
    method: 'post',
    data: payload
  })
}

/**
 * 更新一条客户动态
 * @param {object} payload
 */
export const updateExTrends = (payload) => {
  return request({
    url: '/externalUserTrends/updateExTrends',
    method: 'post',
    data: payload
  })
}
