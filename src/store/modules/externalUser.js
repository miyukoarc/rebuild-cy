import {getListOwner,getListGroup,getExternalUserListMy,getListAll,getRunWayList,getRunWayListAll,getQuitUserRelationExUserList} from '@/api/externalUser'

const state = {
    /**
     * 我的客户
     * @param {array} list
     */
    list: [],
    loading: false,

}

const mutations = {
    /**
     * 保存我的客户列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LIST(state,payload){
        state.list = payload
    },
    /**
     * 切换loading
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LOADING(state,payload){
        state.loading = payload
    }
}

const actions = {
    /**
     * 我的客户的列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getExternalUserListMy({commit},payload){
        return new Promise((resolve,reject)=>{
            getExternalUserListMy(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
     * @param {*} param0 
     * @param {object} payload 
     */
    getListAll({commit},payload){
        return new Promise((resolve,reject)=>{
            getListAll(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 我的流失客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getRunWayList({commit},payload){
        return new Promise((resolve,reject)=>{
            getRunWayList(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 所有流失客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getRunWayListAll({commit},payload){
        return new Promise((resolve,reject)=>{
            getRunWayListAll(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 获取离职成员的客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getQuitUserRelationExUserList({commit},payload){
        return new Promise((resolve,reject)=>{
            getQuitUserRelationExUserList(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 获取群列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListGroup({commit},payload){
        return new Promise((resolve,reject)=>{
            getListGroup(payload).then(res=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    },
    /**
     * 获取所有人列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListOwner({commit},payload){
        return new Promise((resolve,reject)=>{
            getListOwner(payload).then(res=>{
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
  