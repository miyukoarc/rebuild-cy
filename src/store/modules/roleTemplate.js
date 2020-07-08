import {
  getDetail,
  add,
  getListAll,
  roleLinkPermission
} from '@/api/roleTemplate'
const state = {
  /**
   * 角色模板列表
   */
  loading: false,
  listAll: [],
  permission: []

}

const mutations = {
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  },
  SAVE_LISTALL(state, payload) {
    state.listAll = payload
  }

}

const actions = {
  getDetail({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getDetail(payload).then(res => {
          console.log(res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  add({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      add(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)

    return new Promise((resolve, reject) => {
      getListAll(payload).then(res => {
        // console.log(res)
        commit('SAVE_LISTALL',res.items)
        resolve()
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
      })
    })
  },
  /**
   * 模板角色赋予权限
   * @param {*} param0 
   * @param {*} payload 
   */
  roleLinkPermission({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      roleLinkPermission(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
