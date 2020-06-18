import {getLogAll} from '@/api/log'
const state = {
    logList: [],
    loading: false,

}

const mutations = {
    /**
     * 保存操作记录列表
     * @param {} state 
     * @param {*} payload 
     */
    SAVE_LOGLIST(state,payload){
        state.logList = payload
    },
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
}

const actions = {
    /**
     * 操作记录
     * @param {*} param0 
     * @param {object} payload 
     */
    getLogAll({commit},payload){
        commit('TOGGLE_LOADING', true)
       return new Promise((resolve,reject)=>{
           getLogAll(payload).then(res=>{
               commit('TOGGLE_LOADING', false)
               resolve()
           }).catch(err=>{
               commit('TOGGLE_LOADING', false)
               reject()
           })
       })
    }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}