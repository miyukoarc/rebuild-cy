import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

/**
 * 微信登录
 * @param {} 
 */
export const wxLogin = () => {
  return request({
    url: '/login',
    method: 'get'
  })
}
/**
 * 员工详细页
 * @param {string} payload 
 */
export const getDetail = (payload) => {
  return request({
    url: '/user/' + payload,
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
 * 员工列表
 * @param {object} payload 
 */
export const getUserList = (payload) => {
  return request({
    url: '/user/list',
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
