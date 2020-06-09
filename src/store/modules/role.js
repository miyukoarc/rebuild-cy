import {
  getRoleDetail,
  addRole,
  deleteRole,
  updateRole,
  getRoleList
} from '@/api/role'
const state = {
    loading: false,
    roleList: []
}

const mutations = {
    TOGGLE_LOADING(state,current){
        state.loading = current
    },
    SAVE_LIST(state, payload){
        state.roleList = payload
    },
    SAVE_DETAIL(state, payload){
        state.currentRole = payload
    }
}

const actions = {
  getRoleDetail({commit}){
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
  addRole({commit}){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          addRole().then(()=>{
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              console.log(err)
              commit('TOGGLE_LOADING',false)
              reject()
          })
      })
  },
  deleteRole({commit}){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          deleteRole().then(()=>{
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              console.log(err)
              commit('TOGGLE_LOADING',false)
              reject()
          })
      })
  },
  updateRole({commit}){
      commit('TOGGLE_LOADING',true)
      return new Promise((resolve,reject)=>{
          updateRole().then(()=>{
              commit('TOGGLE_LOADING',false)
              resolve()
          }).catch(err=>{
              console.log(err)
              commit('TOGGLE_LOADING',false)
              reject()
          })
      })
  },
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
