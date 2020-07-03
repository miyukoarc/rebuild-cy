import {getLoginList} from '@/api/auth'


const state = {
    loginList: [],
    loggedCorp: ''

}

const mutations = {
    SAVE_LIST(state,payload){
        state.loginList = payload
    },
    SAVE_LOGGEDCORP(state,payload){
        state.loggedCorp = payload
    }
}

const actions = {
    /**
     * 登录列表
     * @param {*} param0 
     *
     */
    getLoginList({commit}){
        return new Promise((resolve,reject)=>{
            getLoginList().then(res=>{
                commit('SAVE_LIST',res)
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
  