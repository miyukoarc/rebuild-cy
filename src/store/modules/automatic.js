import {
  getListAll,
  add
} from '@/api/automatic'

const state = {
  listAll: [],
  loading: false,
  page: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  }
}

const mutations = {
  SAVE_LISTALL(state, payload) {
    state.listAll = payload
  },
  SET_PAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.page.total = total
    state.page.pageSize = pageSize
    state.page.pageNumber = pageNumber
  },
  TOGGLE_LOADING(state, payload) {
      state.loading = payload
  }
}

const actions = {
  /**
   * 自动回复列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListAll(payload).then(res => {
        commit('SAVE_LISTALL', res.items)
        commit('SET_PAGE', res)
        resolve()
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
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
  }

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
