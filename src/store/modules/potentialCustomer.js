import {additionFail} from '@/api/potentialCustomer'

const state = {}

const mutations = {
    
}

const actions = {
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}