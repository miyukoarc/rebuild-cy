import { login, logout, getInfo, getMyInfo,getUserList } from '@/api/user'
import { getToken, setToken, removeToken} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    roleCode: '',
    avatar: '',


    userListAll: []
  }
}

const state = getDefaultState()

const mutations = {
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
  SET_USERINFO: (state, payload) =>{
      const {name,avatar,roleCode} = payload
      state.name = name
      state.avatar = avatar
      state.roleCode = roleCode
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
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
  getMyInfo({commit}){
      return new Promise((resolve,reject) => {
        getMyInfo().then((res)=>{
            console.log(res)

            commit('SET_USERINFO', res)

            resolve(res)
        }).catch(err => {
            reject()
        })
      })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  getUserList(){
      return new Promise((resolve,reject)=>{
        getUserList().then((res)=>{
            commit('SAVE_LIST',res.items)
            resolve()
        })
        .catch(err=>{
            console.log(err)
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

