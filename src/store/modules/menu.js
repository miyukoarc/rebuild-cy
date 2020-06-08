import {getMenuDetail,
    getAllMenuList,
    getMyMenuList} from '@/api/menu'
const state = {
    menuList: [],
    currentMenuDetail: {}
}

const mutations = {
    SAVE_LIST(state,payload){
        state.menuList = payload
    },
    SAVE_DETAIL(state,payload){
        state.currentMenuDetail = payload
    }
}

const actions = {
    /**
     * 
     * @param {*} param0 
     * @param {string} uuid 
     */
    getMenuDetail({commit},uuid){
        return new Promise((resolve,reject)=>{
            getMenuDetail(uuid).then(res=>{
                commit('SAVE_DETAIL',res.items)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 超管专属
     * @param {*} param0 
     */
    getAllMenuList({commit}){
        return new Promise((resolve,reject)=>{
            getAllMenuList().then(res=>{
                commit('SAVE_LIST',res.items)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 其他role
     * @param {*} param0 
     */
    getMyMenuList({commit}){
        return new Promise((resolve,reject)=>{
            getMyMenuList().then(res=>{
                commit('SAVE_LIST',res.items)
                resolve()
            }).catch(err=>{
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
  