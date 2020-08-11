import request from '@/utils/request'

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

/**
 * 登录机构列表
 */
export const getLoginList = () => {
  return request({
    url: '/loginList',
    method: 'get',
  })
}

export function wxLogin(tenantId) {
  return request({
    url: '/login/' + tenantId,
    method: 'get'
  })
}
