import {
  getRoleDetail,
  addRole,
  deleteRole,
  updateRole,
  getRoleList,
  getRoleListSelect
} from '@/api/role'
const state = {
    /**
     * 角色列表
     */
    loading: false,
    roleList: [],
    listSelect:[]
}

const mutations = {
    TOGGLE_LOADING(state,current){
        state.loading = current
    },
    /**
     * 保存角色列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LIST(state, payload){
        state.roleList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentRole = payload
        console.log(state.currentRole,'state.currentRole')
    },
    /**
     * 保存角色列表 select
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LISTSELECT(state,payload){
        state.listSelect = payload
    }
}

const actions = {
    /**
     * 角色详细页
     * @param {string} uuid 
     */
  getRoleDetail({commit},uuid){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          getRoleDetail(uuid).then(res=>{
              commit('SAVE_DETAIL',res)
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              
              commit('TOGGLE_LOADING',false)
              reject(err)
          })
      })
  },
  /**
   * 添加角色
   * @param {*} payload 
   */
  addRole({commit},payload){
      return new Promise((resolve,reject)=>{
          addRole(payload).then(()=>{
              resolve()
          }).catch(err=>{
              
              reject(err)
          })
      })
  },
  /**
   * 删除角色
   * @param {*} payload 
   */
  deleteRole({commit},payload){
      return new Promise((resolve,reject)=>{
          deleteRole(payload).then(()=>{
              resolve()
          }).catch(err=>{
              
              reject(err)
          })
      })
  },
  /**
   * 修改角色
   * @param {object} payload 
   */
  updateRole({commit},payload){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          updateRole(payload).then(()=>{
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              
              commit('TOGGLE_LOADING',false)
              reject(err)
          })
      })
  },
  /**
   * 获取角色列表
   * @param {*} payload 
   *
   */
  getRoleList({commit}){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          getRoleList().then(res=>{
              commit('SAVE_LIST',res.items)
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              
              commit('TOGGLE_LOADING',false)
              reject(err)
          })
      })
  },
  /**
   * 角色列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getRoleListSelect({commit}){
     return new Promise((resolve,reject)=>{
         getRoleListSelect().then(res=>{
             commit('SAVE_LISTSELECT',res.items)
             resolve(res)
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
