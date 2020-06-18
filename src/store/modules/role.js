import {
  getRoleDetail,
  addRole,
  deleteRole,
  updateRole,
  getRoleList
} from '@/api/role'
const state = {
    /**
     * 角色列表
     */
    loading: false,
    roleList: []
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
              console.log(err)
              commit('TOGGLE_LOADING',false)
              reject()
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
              console.log(err)
              reject()
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
              console.log(err)
              reject()
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
              console.log(err)
              commit('TOGGLE_LOADING',false)
              reject()
          })
      })
  },
  /**
   * 获取角色列表
   * @param {*} param0 
   *
   */
  getRoleList({commit}){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          getRoleList().then(()=>{
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              console.log(err)
              commit('TOGGLE_LOADING',false)
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
