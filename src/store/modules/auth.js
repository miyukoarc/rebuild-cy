/*
 * @Author: your name
 * @Date: 2020-08-10 14:32:48
 * @LastEditTime: 2020-08-22 17:32:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\auth.js
 */
import {
    getLoginList,
    logout,
    publicVersion
} from '@/api/auth'


const state = {
    loginList: [],
    loggedCorp: '',
    corpInfo: {},
    publicVersion: ''
}

const mutations = {
    SAVE_LIST(state, payload) {
        state.loginList = payload
    },
    SAVE_LOGGEDCORP(state, payload) {
        state.loggedCorp = payload
    },
    SAVE_CORPINFO(state, payload) {
        state.corpInfo = payload
    },
    SAVE_PUBLICVERSION(state, payload) {
        state.publicVersion = payload
    },
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
    getLoginList({
        commit
    }) {
        return new Promise((resolve, reject) => {
            getLoginList().then(res => {
                commit('SAVE_LIST', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 版本号
     *
     */
    publicVersion({
        commit
    }) {
        return new Promise((resolve, reject) => {
            publicVersion().then(res => {
                commit('SAVE_PUBLICVERSION', res)
                resolve()
            }).catch(err => {
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