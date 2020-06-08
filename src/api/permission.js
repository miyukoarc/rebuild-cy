import request from '@/utils/request'

/**
 * 分组显示全部权限列表
 */
export const getList = () => {
  return request({
    url: '/permission/list',
    method: 'get'
  })
}

/**
 * 权限管理显示全部权限列表
 */
export const getListAll = () => {
  return request({
    url: '/permission/listAll',
    method: 'get'
  })
}

/**
 * 我的权限列表
 */
export const getListMy = () => {
  return request({
    url: '/permission/listMy',
    method: 'get'
  })
}


/**
 * 角色的权限列表
 * @param {string} roleCode 
 */
export const getListRole = (roleCode) => {
  return request({
    url: '/permission/listRole',
    method: 'get',
    params: {
        roleCode
    }
  })
}
