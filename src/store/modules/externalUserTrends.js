/*
 * @Author: your name
 * @Date: 2020-07-03 14:30:37
 * @LastEditTime: 2020-07-03 17:30:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\externalUserTrends.js
 */

import {
  addExTrends,
  deleteExTrends,
  updateExTrends,
  getExternalUserTrendsListAll
} from '@/api/externalUserTrends'

const state = {
  /**
   * 群聊列表
   */
  externalUserTrendsListAll: [],
  externalUserTrendsListAllPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },
}

const mutations = {
  /**
   * 切换loading
   * @param {*} state 
   * @param {*} payload 
   */
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  },
  /**
   * 保存客户动态数据
   */
  SAVE_EXTERNALUSERTRENDSLISTALL(state, payload) {
    state.externalUserTrendsListAll = payload
  },
  SET_EXTERNALUSERTRENDSPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.externalUserTrendsListAllPage.total = total
    state.externalUserTrendsListAllPage.pageNumber = pageNumber
    state.externalUserTrendsListAllPage.pageSize = pageSize
  },

}

const actions = {
  /**
   * 客户动态
   */
  getExternalUserTrendsListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getExternalUserTrendsListAll(payload).then(res => {
        commit('SAVE_EXTERNALUSERTRENDSLISTALL', res.items)
        commit('SET_EXTERNALUSERTRENDSPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 添加动态
   */
  addExTrends({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      addExTrends(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 删除动态
   */
  deleteExTrends({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      deleteExTrends(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 更新动态
   */
  updateExTrends({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      updateExTrends(payload).then(res => {
        resolve()
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
