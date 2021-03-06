import {
    batchAuditBatchTaskConfirmation,
    batchAuditMediaConfirmation,
    batchAuditPermissionConfirmation,
    batchAuditTagConfirmation,
    getDetail,
} from '@/api/audit'

const state = {

}

const mutations = {

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
                
                reject(err)
            })
        })
    },
    /**
     * 审核详情
     * @param {*} param0 
     * @param {object} payload 
     */
    getDetail({commit},payload){
       return new Promise((resolve,reject)=>{
           getDetail(payload).then(res=>{
               resolve(res)
           }).catch(err=>{
               reject(err)
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
  