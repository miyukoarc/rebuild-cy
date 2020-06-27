import {
    auditPermissionConfirmation,
    auditTagConfirmation,
    batchAuditBatchTaskConfirmation,
    batchAuditMediaConfirmation,
    batchAuditPermissionConfirmation,
    batchAuditTagConfirmation,
} from '@/api/audit'

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
                reject(err)
            })
        })
    },
    /**
     * 权限审核操作
     * @param {*} param0 
     * @param {*} payload 
     */
    batchAuditPermissionConfirmation({commit},payload){
        return new Promise((resolve,reject)=>{
            batchAuditPermissionConfirmation(payload).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    /**
     * 素材的批量审核操作
     * @param {*} param0 
     * @param {*} payload 
     */
    batchAuditMediaConfirmation({commit},payload){
        return new Promise((resolve,reject)=>{
            batchAuditMediaConfirmation(payload).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },
    /**
     * 群发批量审核操作
     * @param {*} param0 
     * @param {*} payload 
     */
    batchAuditBatchTaskConfirmation({commit},payload){
        return new Promise((resolve,reject)=>{
            batchAuditBatchTaskConfirmation(payload).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
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
  