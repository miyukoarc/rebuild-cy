import {getLogListAll} from '@/api/logs'

const state = {
    logListAll: [],
    logListPage: {
        total: 0 ,
        pageSize: 0,
        pageNumber: 0
    },
    loading: false,

}

const mutations = {
    SAVE_LISTALL(state,payload){
        state.logListAll = payload
    },
    SET_LISTALLPAGE(state,payload){
        const {total,
            pageSize,
            pageNumber} = payload
        state.logListPage.total = total                
        state.logListPage.pageSize = pageSize                
        state.logListPage.pageNumber = pageNumber                   
    },
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
}

const actions = {
    /**
     * 标签的批量审核操作
     * @param {*} param0 
     * @param {*} payload 
     */
    getLogListAll({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            getLogListAll(payload).then(res=>{
                commit('SAVE_LISTALL',res.items)
                commit('SET_LISTALLPAGE',res)
                commit('TOGGLE_LOADING',false)
                resolve()
            }).catch(err=>{
                commit('TOGGLE_LOADING',false)
                
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
  