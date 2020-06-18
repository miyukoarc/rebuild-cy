import {
  login,
  logout,
  getInfo,
  getMyInfo,
  getUserList,
  getAllUserList,
  getDetail
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    roleCode: '',
    avatar: '',

    /**
     * 所有员工列表 无分页
     */
    userListAll: [],

    /**
     * 员工列表 有分页
     */
    userList: [],
    loading: false,
    currentRowUserList: {},
    userPage: {
      total: 0,
      pageNumber: 0,
      pageSize: 0
    },

    /**
     * show off userdetail
     */
    userDetail:{}
  }
}

const state = getDefaultState()

const mutations = {
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, payload) => {
    const {
      name,
      avatar,
      roleCode
    } = payload
    state.name = name
    state.avatar = avatar
    state.roleCode = roleCode
  },
  /**
   * 保存无分页员工列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_USERLISTALL(state, payload) {
    state.payload = payload
  },


  /**
   * 保存员工列表 有分页
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_USERLIST(state, payload) {
    state.userList = payload
  },
  SAVE_CURRENTROW(state,payload){
    state.currentRowUserList = payload
  },
  SET_USERPAGE(state, payload) {
    const {
      pageNumber,
      pageSize,
      total
    } = payload
    state.userPage.total = total
    state.userPage.pageNumber = pageNumber
    state.userPage.pageSize = pageSize
  },

  /**
   * 保存user详细byID
   */
  
  SAVE_SHOWOFFUSER(state,payload){
      state.userDetail = payload
  }

}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMyInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getMyInfo().then((res) => {
        console.log(res)

        commit('SET_USERINFO', res)

        resolve(res)
      }).catch(err => {
        reject()
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  /**
   * 所有员工列表无分页
   * @param {*} param0 
   * @param {*} payload 
   */
  getAllUserList({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getAllUserList(payload).then(res => {
        commit('SAVE_USERLISTALL', res)
        resolve()
      }).catch(err => {
        reject()
      })
    })
  },
  /**
   * 员工列表 有分页
   * @param {*} param0 
   * @param {object} payload 
   */
  getUserList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getUserList(payload).then(res => {
        commit('SAVE_USERLIST', res.items)
        commit('SET_USERPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  /**
   * 获取user详细
   * @param {*} param0 
   * @param {*} payload 
   */
  getDetail({commit},payload){
     return new Promise((resolve,reject)=>{
         getDetail(payload).then(res=>{
             commit('SAVE_SHOWOFFUSER',res)
             resolve()
         }).catch(err=>{
             reject()
         })
     })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
