import {
  getList,
  getListAll,
  getListMy,
  getListRole
} from '@/api/permission'

import {constantRoutes} from '@/router'

const state = {
  loading: false,
  myList: [],
  routes: [],
  permissionList: []
}

const mutations = {
  SAVE_LIST(state, payload) {
    state.myList = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SET_ROUTES(state, payload) {
    state.routes = constantRoutes.concat(payload)
  }
}

const actions = {
  getList({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getList().then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  /**
   * 权限管理显示全部权限列表
   * @param {*} param0 
   */
  getListAll({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListAll().then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  /**
   * 我的权限列表
   * @param {*} param0 
   */
  getListMy({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListMy().then((res) => {
          console.log(res)
          if(Object.keys(res.items).length){
            commit('SAVE_LIST',res.items)
          }
        
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  /**
   * 
   * @param {*} param0 
   * @param {string} payload 
   */
  getListRole({
    commit
  },payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListRole(payload).then((res) => {
        commit('SAVE_LIST',res.items)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  getRotes({commit}){
      setTimeout(()=>{

      },10)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
