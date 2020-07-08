import {
  getDepartmentDetail,
  addDepartment,
  addWxDepartment,
  deleteDepartment,
  getDepartmentListAll,
  locateDepartmentLeader,
  updateDepartment,
  getDepartments,
  getDepartmentListSelect,
  allocation
} from '@/api/department'
import {flatten} from '@/utils/common'

const state = {
    /**
     * 部门列表
     */
  departmentList: [],//tree
  departments: [],//list
  currentDepartment: {}, //当前行
  loading: false,

  listSelect: []//筛选列表
}

const mutations = {
    /**
     * 保存部门列表 树
     * @param {*} state 
     * @param {*} payload 
     */
  SAVE_LIST(state, payload) {
    state.departmentList = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SAVE_DETAIL(state, payload){
      state.currentDepartment = payload
  },

  /**
   * 保存部门列表 flatten
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_FLATTENLIST(state,payload){
      state.departments = payload
  },

  /**
   * 保存部门列表 筛选
   */
  SAVE_LISTSELECT(state,payload){
    state.listSelect = payload
  }

}

const actions = {
    /**
     * 部门详细页
     * @param {*} param0 
     * @param {string} uuid 
     */
  getDepartmentDetail({
    commit
  }, uuid) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getDepartmentDetail(uuid).then(res => {
        commit('SAVE_DETAIL', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 创建部门
   * @param {*} param0 
   * @param {object} payload 
   */
  addDepartment({
    commit
  }, payload) {
    // commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      addDepartment(payload).then(() => {
        // commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        // commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 删除部门
   * @param {*} param0 
   * @param {object} payload 
   */
  deleteDepartment({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      deleteDepartment(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 获取部门列表树
   * @param {object} payload 
   */
  getDepartmentListAll({
    commit
  },payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getDepartmentListAll(payload).then(res => {
        //   const accessed = flatten(res.items)
        commit('SAVE_LIST', res.items)
        // commit('SAVE_FLATTENLIST',accessed)
        commit('TOGGLE_LOADING', false)
        resolve(res)
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 分配部门主管
   * @param {*} param0 
   * @param {object} payload 
   */
  locateDepartmentLeader({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      locateDepartmentLeader(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 更新部门
   * @param {*} param0 
   * @param {object} payload 
   */
  updateDepartment({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      updateDepartment(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        
        reject(err)
      })
    })

  },
  /**
   * 获取所有部门（列表）
   * @param {*} param0 
   * @param {*} payload 
   */
  getDepartments({commit},payload){
     return new Promise((resolve,reject)=>{
         getDepartments(payload).then(res=>{
             commit('SAVE_FLATTENLIST',res.items)
             resolve()
         }).catch(err=>{
             reject(err)
         })
     })
  },
  /**
   * 部门列表 筛选
   */
  getDepartmentListSelect({commit},payload){
    return new Promise((resolve,reject)=>{
        getDepartmentListSelect(payload).then(res=>{
            commit('SAVE_LISTSELECT',res.items)
            resolve()
        }).catch(err=>{
            reject(err)
        })
    })
 },
 /**
  * 分配部门
  */
 allocation({commit},payload){
    return new Promise((resolve,reject)=>{
        allocation(payload).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
 },
 /**
  * 创建组织
  * @param {*} param0 
  * @param {*} payload 
  */
 addWxDepartment({commit},payload){
    return new Promise((resolve,reject)=>{
        addWxDepartment(payload).then(res=>{
            resolve()
        }).catch(err=>{
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
