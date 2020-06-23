import {
  getListOwner,
  getListGroup,
  getExternalUserListMy,
  getListAll,
  getRunWayList,
  getRunWayListAll,
  getQuitUserRelationExUserList,
  getListExUserByUserId,
  getCustomerStatistics,
  getQuitUserRelationExUserDetail
} from '@/api/externalUser'

const state = {
  /**
   * 我的客户
   * 
   */
  list: [],
  loading: false,
  page: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },

  /**
   * id查找联系客户
   */
  idList: [],
  idPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },

  /**
   * 获取联系客户统计数据
   */
  customerStatistics: {},

  /**
   * 所有客户
   */
  listAll: [],
  listAllPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },
  /**
   * 我的流失客户列表
   */
  runWayList: [],
  runWayPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },


  /**
   * 全部流失客户列表
   */
  runWayListAll: [],
  runWayListAllPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },

  /**
   * 群聊列表
   */
  listGroup: [],
  listGroupPage: {
    total: 0,
    pageNumber: 0,
    pageSize: 0
  },
  listOwner: [], //群主列表

  /**
   * 离职员工客户列表(所有)
   */
  quitUserRelationExUserList:[],
  /**
   * 某个离职员工客户列表
   */
  quitUserRelationExUserListDetail:[]


}

const mutations = {
  /**
   * 保存我的客户列表
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
    state.page.total = total
    state.page.pageNumber = pageNumber
    state.page.pageSize = pageSize
  },
  /**
   * 切换loading
   * @param {*} state 
   * @param {*} payload 
   */
  TOGGLE_LOADING(state, payload) {
    state.loading = payload
  },

  /**
   * 保存ById客户列表
   */
  SAVE_IDLIST(state, payload) {
    state.idList = payload
  },
  SET_IDPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.idPage.total = total
    state.idPage.pageNumber = pageNumber
    state.idPage.pageSize = pageSize
  },

  /**
   * 保存用户联系客户统计数据
   */
  SAVE_DATA(state, payload) {
    state.customerStatistics = payload
  },
  /**
   * 保存所有用户
   */
  SAVE_LISTALL(state, payload) {
    state.listAll = payload
  },
  SET_LISTALLPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.listAllPage.total = total
    state.listAllPage.pageNumber = pageNumber
    state.listAllPage.pageSize = pageSize
  },

  /**
   * 保存我的流失客户列表
   */
  SAVE_RUNWAYLIST(state, payload) {
    state.runWayList = payload
  },
  SET_RUNWAYPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.runWayPage.total = total
    state.runWayPage.pageNumber = pageNumber
    state.runWayPage.pageSize = pageSize
  },

  /**
   * 保存所有流失客户列表
   */
  SAVE_RUNWAYALLLIST(state, payload) {
    state.runWayListAll = payload
  },
  SET_RUNWAYALLPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.runWayListAllPage.total = total
    state.runWayListAllPage.pageNumber = pageNumber
    state.runWayListAllPage.pageSize = pageSize
  },

  /**
   * 保存群聊列表
   */
  SAVE_LISTGROUP(state, payload) {
    state.listGroup = payload
  },
  SAVE_LISTOWNER(state,payload){
      state.listOwner = payload
  },
  SET_LISTGROUPPAGE(state, payload) {
    const {
      total,
      pageSize,
      pageNumber
    } = payload
    state.listGroupPage.total = total
    state.listGroupPage.pageNumber = pageNumber
    state.listGroupPage.pageSize = pageSize
  },

  /**
   * 离职员工的客户（所有）
   */
  SAVE_QUITLIST(state,payload){
    state.quitUserRelationExUserList = payload
  },

  /**
   * 某个离职员工的客户列表
   */
  SAVE_QUITLISTDETAIL(state,payload){
      state.quitUserRelationExUserListDetail = payload
  }




}

const actions = {
  /**
   * 我的客户的列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getExternalUserListMy({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getExternalUserListMy(payload).then(res => {
        commit('TOGGLE_LOADING', false)
        commit('SAVE_LIST', res.items)
        commit('SET_PAGE', res)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
   * @param {*} param0 
   * @param {object} payload 
   */
  getListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListAll(payload).then(res => {
        commit('SAVE_LISTALL', res.items)
        commit('SET_LISTALLPAGE', res)
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
   * 我的流失客户列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getRunWayList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getRunWayList(payload).then(res => {
        commit('TOGGLE_LOADING', false)
        commit('SAVE_RUNWAYLIST', res.items)
        commit('SET_RUNWAYPAGE', res)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 所有流失客户列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getRunWayListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getRunWayListAll(payload).then(res => {
        commit('SAVE_RUNWAYALLLIST', res.items)
        commit('SET_RUNWAYALLPAGE', res)
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
   * 获取离职成员的客户列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getQuitUserRelationExUserList({
    commit
  }, payload) {
      commit('TOGGLE_LOADING',true)
    return new Promise((resolve, reject) => {
      getQuitUserRelationExUserList(payload).then(res => {
          commit('SAVE_QUITLIST',res)
          commit('TOGGLE_LOADING',false)
        resolve()
      }).catch(err => {
          commit('TOGGLE_LOADING',false)
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 获取群列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getListGroup({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getListGroup(payload).then(res => {
        commit('SET_LISTGROUPPAGE', res)
        commit('SAVE_LISTGROUP', res.items)
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 获取所有人列表
   * @param {*} param0 
   * @param {object} payload 
   */
  getListOwner({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListOwner(payload).then(res => {
        commit('SAVE_LISTOWNER',res)
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
   * 根据用户uuid查询对应的客户
   * @param {*} param0 
   * @param {*} payload 
   */
  getListExUserByUserId({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListExUserByUserId(payload).then(res => {
        commit('TOGGLE_LOADING', false)
        commit('SAVE_IDLIST', res.items)
        commit('SET_IDPAGE', res)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        reject()
      })
    })
  },
  /**
   * 获取联系客户统计数据
   * @param {*} param0 
   * @param {*} payload 
   */
  getCustomerStatistics({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getCustomerStatistics(payload).then(res => {
        commit('SAVE_DATA', res)
        resolve()
      }).catch(err => {
        reject()
      })
    })
  },
  /**
   * 离职员工的客户列表
   */
  getQuitUserRelationExUserDetail({commit},payload){
     return new Promise((resolve,reject)=>{
         getQuitUserRelationExUserDetail(payload).then(res=>{
             commit('SAVE_QUITLISTDETAIL',res)
             resolve()
         }).catch(err=>{
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
