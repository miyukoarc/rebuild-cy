import {
  getList
} from '@/api/contactWay'
const state = {
  /**
   * 渠道列表
   */
  list: [],
  loading: false,
  listPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  }
}

const mutations = {
  /**
   * 保存列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_LIST(state, payload) {
    state.list = payload
  },
  SET_PAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.listPage.total = total
    state.listPage.pageSize = pageSize
    state.listPage.pageNumber = pageNumber

  },
  /**
   * 切换loading状态
   * @param {*} state 
   * @param {*} payload 
   */
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  }
}

const actions = {
  /**
   * 渠道列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getList(payload).then(res => {
        commit('SAVE_LIST', res.items)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
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
