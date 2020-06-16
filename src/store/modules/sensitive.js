import {getAuditPermissionlist,getAuditTaglist} from '@/api/sensitive'
const state = {
    auditPermissionlist: [],
    loading: false,
    currentRow: [],
    page:{
        total: 0,
        pageSize: 0,
        pageNumber: 0,
    },

    auditTaglist: [],
    currentAuditTag: [],
    auditTagPage: {
        total: 0,
        pageSize: 0,
        pageNumber: 0
    }


}


const mutations ={
    SAVE_LIST(state,payload){
        state.auditPermissionlist = payload
    },
    TOGGLE_LOADING(state,current){
        state.loading = current
    },
    SAVE_DETAIL(state,payload){
        state.currentRow = payload
    },
    SET_PAGE(state,payload){

        const {total,pageNumber,pageSize} = payload
        state.page.total = total
        state.page.pageNumber = pageNumber
        state.page.pageSize = pageSize
    },


    SAVE_TAGLIST(state,payload){
        state.auditTaglist = payload
    },
    SAVE_TAGDETAIL(state,payload){
        state.currentAuditTag = payload
    },
    SET_TAGPAGE(state,payload){

        const {total,pageNumber,pageSize} = payload
        state.auditTagPage.total = total
        state.auditTagPage.pageNumber = pageNumber
        state.auditTagPage.pageSize = pageSize
    }
}


const actions = {
    /**
     * 权限审核列表
     * @param {*} param0 
     * @param {*} payload 
     */
    getAuditPermissionlist({commit},payload){
        return new Promise((resolve,reject)=>{
            getAuditPermissionlist(payload).then(res=>{
                commit('SAVE_LIST',res.items)
                commit('SET_PAGE',res)
                resolve(res)
            }).catch(err=>{
                console.log(err)

                reject()
            })
        })
    },
    /**
     * 标签审核列表
     * @param {*} param0 
     * @param {*} payload 
     */
    getAuditTaglist({commit},payload){
        return new Promise((resolve,reject)=>{
            getAuditTaglist(payload).then(res=>{
                commit('SAVE_TAGLIST',res.items)
                commit('SET_TAGPAGE',res)
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