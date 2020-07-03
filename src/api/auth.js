import request from '@/utils/request'

/**
 * 登录机构列表
 */
export const getLoginList = () => {
    return request({
      url: '/loginList',
      method: 'get',
    })
  }