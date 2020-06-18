import {
  getListAction,
  getLog,
  getList,
  getAuditPermissionlist,
  getAuditTaglist
} from '@/api/sensitive'
const state = {
/**
 * public state
 */
loading: false,
  /**
   * 权限审核列表
   */
  auditPermissionlist: [],
  currentRow: [],
  page: {
    total: 0,
    pageSize: 0,
    pageNumber: 0,
  },

  /**
   * 标签审核列表
   */
  auditTaglist: [],
  currentAuditTag: [],
  auditTagPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 敏感词
   */
  wordsList: [],
  wordsPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 敏感词记录
   */
  logList: [],
  logPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },
  /**
   * 敏感动作列表
   */

   actionList: [],
   actionPage: {
       total: 0,
       pageSize: 0,
       pageNumber: 0
   }




}


const mutations = {
  /**
   * 保存权限审核列表
   */
  SAVE_LIST(state, payload) {
    state.auditPermissionlist = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SAVE_DETAIL(state, payload) {
    state.currentRow = payload
  },
  SET_PAGE(state, payload) {

    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.page.total = total
    state.page.pageNumber = pageNumber
    state.page.pageSize = pageSize
  },

  /**
   * 保存标签审核列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_TAGLIST(state, payload) {
    state.auditTaglist = payload
  },
  SAVE_TAGDETAIL(state, payload) {
    state.currentAuditTag = payload
  },
  SET_TAGPAGE(state, payload) {

    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.auditTagPage.total = total
    state.auditTagPage.pageNumber = pageNumber
    state.auditTagPage.pageSize = pageSize
  },

  /**
   * 保存敏感词列表
   */
  SAVE_WORDSLIST(state, payload) {
    state.wordsList = payload
  },
  SET_WORDSPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.wordsPage.total = total
    state.wordsPage.pageNumber = pageNumber
    state.wordsPage.pageSize = pageSize
  },

  /**
   * 保存敏感词记录列表
   */
  SAVE_LOGLIST(state, payload) {
    state.logList = payload
  },
  SET_LOGPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.logPage.total = total
    state.logPage.pageNumber = pageNumber
    state.logPage.pageSize = pageSize
  },

  /**
   * 保存敏感操作列表
   */
  SAVE_ACTIONLIST(state,payload){
      state.actionList = payload
  },
  SET_ACTIONPAGE(state,payload){
    const {
        total,
        pageNumber,
        pageSize
      } = payload
      state.actionPage.total = total
      state.actionPage.pageNumber = pageNumber
      state.actionPage.pageSize = pageSize
  }

}


const actions = {
  /**
   * 权限审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getAuditPermissionlist({
    commit
  }, payload) {
    commit('TOGGLE_LOADING',true)
    return new Promise((resolve, reject) => {
      getAuditPermissionlist(payload).then(res => {
        commit('SAVE_LIST', res.items)
        commit('SET_PAGE', res)
        commit('TOGGLE_LOADING',false)
        resolve(res)
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING',false)
        reject()
      })
    })
  },
  /**
   * 标签审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getAuditTaglist({
    commit
  }, payload) {
          commit('TOGGLE_LOADING',true)

    return new Promise((resolve, reject) => {
      getAuditTaglist(payload).then(res => {
        commit('SAVE_TAGLIST', res.items)
        commit('SET_TAGPAGE', res)
                commit('TOGGLE_LOADING',false)

        resolve()
      }).catch(err => {
        console.log(err)
                commit('TOGGLE_LOADING',false)

        reject()
      })
    })
  },
  /**
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getList(payload).then(res => {
        commit('SAVE_WORDSLIST', res.items)
        commit('SET_WORDSPAGE', res)
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
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getLog({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
        getLog(payload).then(res => {
        commit('SAVE_LOGLIST', res.items)
        commit('SET_LOGPAGE', res)
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
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getListAction({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
        getListAction(payload).then(res => {
        commit('SAVE_ACTIONLIST', res.items)
        commit('SET_ACTIONPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.log(err)
        commit('TOGGLE_LOADING', false)
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
