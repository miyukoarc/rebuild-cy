import {
  getTagList,
  addTagIsAudit,
  deleteTagIsAudit,
  updateTagIsAudit,
  getListAllTag
} from '@/api/tag'
import {classifyTag} from '@/utils/common'
const state = {
    /**
     * 标签列表
     */
  tagList: [],
  loading: false,
  tagListPage: {
    pageSize: 0,
    pageNumber: 0,
    total: 0
  },

  tagListAll: []


}
const mutations = {
  /**
   * 保存列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_TAGLIST(state, payload) {
    state.tagList = payload
  },
  /**
   * 保存分页信息
   * @param {*} state 
   * @param {*} payload 
   */
  SET_TAGLISTPAGE(state, payload) {
    const {
      pageSize,
      pageNumber,
      total
    } = payload
    state.tagListPage.pageSize = pageSize
    state.tagListPage.pageNumber = pageNumber
    state.tagListPage.total = total
  },
  /**
   * 切换loading状态
   * @param {*} state 
   * @param {*} current 
   */
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  /**
   * 保存所有标签列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_LIST(state,payload){
    state.tagListAll = payload
  }
}

const actions = {
  /**
   * 公共标签列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getTagList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getTagList(payload).then(res => {
          const accessed = classifyTag(res.items)
        commit('SAVE_TAGLIST',accessed)
        commit('SET_TAGLISTPAGE',res.items)
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
   * 添加标签包含是否审核
   * @param {*} param0 
   * @param {object} payload 
   */
  addTagIsAudit({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      addTagIsAudit(payload).then(res => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 删除标签组包含是否审核
   * @param {*} param0 
   * @param {*} payload 
   */
  deleteTagIsAudit({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      deleteTagIsAudit(payload).then(res => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 编辑标签包含是否审核
   * @param {*} param0 
   * @param {*} payload 
   */
  updateTagIsAudit({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      updateTagIsAudit(payload).then(res => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 标签列表页数据
   * @param {*} param0 
   * @param {object} payload 
   */
  getListAllTag({commit},payload){
      return new Promise((resolve, reject)=>{
        getListAllTag(payload).then(res=>{
            commit('SAVE_LIST',res)
            resolve()
        }).catch(err=>{
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
