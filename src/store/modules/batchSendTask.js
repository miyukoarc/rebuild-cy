import {getList,getListMy} from '@/api/batchSendTask'

const state = {
    /**
     * 全部群发列表
     */
    list: [],
    loading: state,
    listAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    listMy: [],
    listMyPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    }
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
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    },
    SET_PAGE(state,payload){
        const {total,pageSize,pageNumber} = payload
        state.listAllPage.total = total                
        state.listAllPage.pageNumber = pageNumber            
        state.listAllPage.pageSize = pageSize                
    },

    /**
     * 保存我的列表
     */
    SAVE_LISTMY(state,payload){
        state.listMy = payload
    },
    SET_LISTMYPAGE(state,payload){
        const {total,pageSize,pageNumber} = payload
        state.listMyPage.total = total                
        state.listMyPage.pageNumber = pageNumber            
        state.listMyPage.pageSize = pageSize  
    }
}

const actions = {
    /**
     * 全部群发列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getList({commit},payload){
        commit('TOGGLE_LOADING',true)
        return new Promise((resolve,reject)=>{
            getList(payload).then(res=>{
                commit('SAVE_LIST',res.items)
                commit('SET_PAGE',res)
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
     * 我的群发任务
     * @param {*} param0 
     * @param {*} payload 
     */
    getListMy({commit},payload){
        commit('TOGGLE_LOADING',true)
       return new Promise((resolve,reject)=>{
           getListMy(payload).then(res=>{
               commit('SAVE_LISTMY',res.items)
               commit('SET_LISTMYPAGE',res)
               commit('TOGGLE_LOADING',false)
               resolve()
           }).catch(err=>{
               commit('TOGGLE_LOADING',false)
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
  