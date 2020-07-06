import request from '@/utils/request'

export function wxLogin(tenantId) {
  return request({
    url: '/login/' + tenantId,
    method: 'get'
  })
}



export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// /**
//  * 微信登录
//  * @param {} 
//  */
// export const wxLogin = () => {
//   return request({
//     url: '/login',
//     method: 'get'
//   })
// }
/**
 * 员工详细页
 * @param {string} uuid 
 */
export const getDetail = (uuid) => {
  return request({
    url: '/user/' + uuid,
    method: 'get'
  })
}

/**
 * 删除员工
 * @param {object} payload 
 */
export const deleteUser = (payload) => {
  return request({
    url: '/user/' + payload,
    method: 'post',
    data: payload
  })
}

/**
 * 加入企业的二维码
 * 
 */
export const getQrcode = () => {
  return request({
    url: '/user/joinQrcode',
    method: 'get'
  })
}

/**
 * 员工列表有分页
 * @param {object} payload 
 */
export const getUserList = (payload) => {
  return request({
    url: '/user/listAll',
    method: 'get',
    params: payload
  })
}


/**
 * 所有员工列表
 * 
 */
export const getAllUserList = () => {
  return request({
    url: '/user/listAll',
    method: 'get'
  })
}


/**
 * 跟新员工信息
 * @param {object} payload
 */
export const updateUser = (payload) => {
  return request({
    url: '/user/listAll',
    method: 'post',
    data: payload
  })
}

/**
 * 30天，用户的活跃状态
 * @param {} 
 */
export const getUserActiveCount = () => {
  return request({
    url: '/user/userActiveCount',
    method: 'get',
  })
}

/**
 * 获取用户幸喜
 */
export const getMyInfo = () => {
  return request({
    url: '/myInfo/detail',
    method: 'get'
  })
}

/**
 * 获取用户列表
 */
export const getUserListSelect = () => {
  return request({
    url: '/user/listSelect',
    method: 'get'
  })
}


/**
 * 更新用户信息
 */
export const postUserUpdate = (payload) => {
  return request({
    url: '/user/update',
    method: 'post',
    data: payload
  })
}