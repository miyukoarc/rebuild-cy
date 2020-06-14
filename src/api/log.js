import request from '@/utils/request'

/**
 * 操作记录
 * @param {object} payload 
 */
export const getLogAll = (payload) => {
  return request({
    url: '/log/logAll',
    method: 'post',
    params: payload
  })
}
