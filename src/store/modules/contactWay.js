import {getList} from '@/api/contactWay'
const state = {
    /**
     * 渠道列表
     */
    list: [],
    loading: false
}

const mutations = {
    /**
     * 保存列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LIST(state,payload){
        state.list = payload
    },
    /**
     * 切换loading状态
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LIST(state,payload){
        state.loading = payload
    }
}

const actions = {
    /**
     * 渠道列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getList({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            getList(payload).then(res=>{
                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
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
  