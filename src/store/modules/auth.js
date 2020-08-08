import {getLoginList,logout} from '@/api/auth'


const state = {
    loginList: [],
    loggedCorp: '',
    corpInfo: {}

}

const mutations = {
    SAVE_LIST(state,payload){
        state.loginList = payload
    },
    SAVE_LOGGEDCORP(state,payload){
        state.loggedCorp = payload
    },
    SAVE_CORPINFO(state,payload){
        state.corpInfo = payload
    }
}

const actions = {
        // user logout
        logout({
            commit,
        }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                     // must remove  token  first
                    // commit('RESET_STATE')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
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
  