import {batchAuditTagConfirmation} from '@/api/audit'

const state = {
    auditTaglist: [],
    loading: false,

}

const mutations = {
    SAVE_AUDITTAGLIST(state,payload){
        state.auditTaglist = payload
    }
}

const actions = {
    /**
     * 标签的批量审核操作
     * @param {*} param0 
     * @param {*} payload 
     */
    batchAuditTagConfirmation({commit},payload){
        return new Promise((resolve,reject)=>{
            batchAuditTagConfirmation(payload).then(()=>{
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
  