import {getList} from '@/api/batchSendTask'

const state = {
    /**
     * 全部群发列表
     */
    list: [],
    loading: state
}

const mutations = {
    /**
     * 保存全部群发列表
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
     * 全部群发列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getList({commit},payload){
        commit('TOGGLE',true)
        return new Promise((resolve,reject)=>{
            getList(payload).then(res=>{
                commit('SAVE_LIST',res.items)
                commit('TOGGLE',false)
                resolve()
            }).catch(err=>{
                console.log(err)
                commit('TOGGLE',false)
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
  