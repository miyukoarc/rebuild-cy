import {
  getArticleList
} from '@/api/media'

const state = {
  /**
   * 文章列表
   */
  articleList: [],
  loading: false,
  page: {
    pageNumber: 0,
    pageSize: 0,
    total: 0
  }
}

const mutations = {
  /**
   * 保存文章列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_ARTICLELIST(state, payload) {
    state.list = payload
  },
  /**
   * 保存文章列表分页
   * @param {*} state 
   * @param {*} payload 
   */
  SET_ARTICLEPAGE(state, payload) {
    const {
      pageNumber,
      pageSize,
      total
    } = payload
    state.page.pageNumber = pageNumber
    state.page.pageSize = pageSize
    state.page.total = total
  },
  /**
   * 切换loading状态
   * @param {*} state 
   * @param {*} payload 
   */
  TOGGLE_LIST(state, payload) {
    state.loading = payload
  }

}

const actions = {
  /**
   * 文章列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getArticleList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getArticleList(payload).then(res => {
        commit('SAVE_ARTICLELIST', res.items)
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
