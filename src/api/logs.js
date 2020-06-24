import request from '@/utils/request'

/**
 * 操作记录
 * @param {object} payload 
 */
export const getLogListAll = (payload) => {
  return request({
    url: '/log/logListAll',
    method: 'get',
    params: payload
  })
}
