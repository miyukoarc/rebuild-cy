/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-28 00:35:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\contactWay.js
 */
import {
  getList,
  getContactWayDetail,
  contactWayAdd,
  deleteContactWay
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
  },
  /**
   * 渠道详情弹框数据
   */
  contactWayDetailRow: {
    src: '',
    remark: '',
    createdAt: '',
    name: [],
    tags: [],
    skipVerify: false
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
    console.log(state.list, 'list')
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
  },
  /**
   * 保存渠道详情数据
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_CONTACTWAYDETAILROW(state, payload) {
    state.contactWayDetailRow = payload
    console.log(state.contactWayDetailRow, '99999')
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
        commit('SET_PAGE', res)
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
   * 编辑渠道码
   * @param {*} param0 
   * @param {object} payload 
   */
  getContactWayDetail({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getContactWayDetail(payload).then(res => {
        console.log(res, '666')
        // commit('SAVE_LIST', res.items)
        commit('TOGGLE_LOADING', false)
        resolve(res)
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })
  },

  /**
   * 新建渠道码
   * @param {*} param0 
   * @param {object} payload 
   */
  contactWayAdd({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      contactWayAdd(payload).then(res => {
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
   * 删除渠道码
   * @param {*} param0 
   * @param {object} payload 
   */
  deleteContactWay({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      deleteContactWay(payload).then(res => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
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
