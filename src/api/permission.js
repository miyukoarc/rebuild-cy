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
    url: '/permission/listSelect',
    method: 'get'
  })
}

/**
 * 我的权限列表
 */
export const getPermissionListMy = () => {
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

/**
 * 角色赋予权限
 * @param {object} payload 
 */
export const roleLinkPermission = (payload) => {
  return request({
    url: '/permission/listRole',
    method: 'get',
    data: payload
  })
}


/**
 * 更新权限
 * @param {object} payload 
 */
export const updatePermission = (payload) => {
  return request({
    url: '/permission/updatePermission',
    method: 'get',
    data: payload
  })
}


/**
 * 角色赋予权限包含是否需要审核
 * @param {object} payload 
 */
export const roleLinkPermissionIsAudit = (payload)=>{
    return request({
        url: '/permission/roleLinkPermissionIsAudit',
        method: 'post',
        data: payload
    })
}

/**
 * 获取角色对应的权限列表
 * @param {*} payload 
 */
export const getRolePermissionList = (payload)=>{
    return request({
        url: '/permission/rolePermissionList',
        method: 'get',
        params: payload
    })
}

/**
 * 获取角色模板对应的权限列表
 * @param {*} payload 
 */
export const getRoleTemplatePermissionList = (payload)=>{
    return request({
        url: '/permission/roleTemplatePermissionList',
        method: 'get',
        params: payload
    })
}
