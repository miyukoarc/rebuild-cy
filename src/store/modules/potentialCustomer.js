import {additionFail,getListMy,getList} from '@/api/potentialCustomer'

const state = {
    /**
     * 我的
     */
    listMy: [],
    loading: false,

    /**
     * 所有
     */
    list: []
}

const mutations = {
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
    
}

const actions = {
    /**
     * 分配潜在客户
     * @param {*} param0 
     * @param {object} payload 
     */
    additionFail({commit},payload){
        return new Promise((resolve,reject)=>{
            additionFail(payload).then((res)=>{
                console.log(res)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 我的潜在客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListMy({commit},payload){
        return new Promise((resolve,reject)=>{
            getListMy(payload).then((res)=>{
                console.log(res)
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 所有潜在客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getList({commit},payload){
        return new Promise((resolve,reject)=>{
            getList(payload).then((res)=>{
                console.log(res)
                resolve()
            }).catch(err=>{
                console.log(err)
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