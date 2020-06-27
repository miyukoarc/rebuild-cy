import {
  getArticleList
} from '@/api/media'

import {
  getMediaGroupListAll,
  addGroup
} from '@/api/mediaGroup'
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
  },

  /**
   * 素材组
   */
  mediaGroupListAll: []
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
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  },
  /**
   *  保存素材组 
   */
  SAVE_GROUPLIST(state, payload) {
    state.mediaGroupListAll = payload
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
  },
  /**
   * 素材组列表
   */
  getMediaGroupListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getMediaGroupListAll(payload).then(res => {
        commit('SAVE_GROUPLIST', res.items)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 添加分组
   *  
   */
  addGroup({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      addGroup(payload).then(res => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
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
