/*
 * @Author: your name
 * @Date: 2020-07-17 23:18:57
 * @LastEditTime: 2020-07-31 16:52:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\automatic.js
 */
import {
    getListAll,
    add,
    doDelete,
    automaticSwitchReplyInterval,
    automaticAddDefault,
    automaticDefaultDetail,
    automaticSwitchReply
} from '@/api/automatic'

const state = {
    listAll: [],
    loading: false,
    page: {
        total: 0,
        pageSize: 0,
        pageNumber: 0
    },
    replySwitch: false,
    automaticDefaultDetail: null
}

const mutations = {
    SAVE_LISTALL(state, payload) {
        state.listAll = payload
    },
    SET_PAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.page.total = total
        state.page.pageSize = pageSize
        state.page.pageNumber = pageNumber
    },
    SET_REPLYSWITCH(state, payload) {
        state.replySwitch = payload
    },
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    SAVE_AUTOMATICDEFAULTDETAIL(state, payload) {
        state.automaticDefaultDetail = payload
    }
}

const actions = {
    /**
     * 自动回复列表
     * @param {*} param0 
     * @param {*} payload 
     */
    getListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListAll(payload).then(res => {
                commit('SAVE_LISTALL', res.listAll.items)
                commit('SET_REPLYSWITCH', res.replySwitch)
                commit('SET_PAGE', res.listAll)
                resolve()
            }).catch(err => {
                reject(err)
            }).finally(() => {
                commit('TOGGLE_LOADING', false)
            })
        })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} payload 
     */
    add({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            add(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} payload 
     */
    doDelete({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            doDelete(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 自动回复间隔开关
     * @param {*} param0 
     * @param {*} payload 
     */
    automaticSwitchReplyInterval({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            automaticSwitchReplyInterval(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 添加默认自动回复
     * @param {*} param0 
     * @param {*} payload 
     */
    automaticAddDefault({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            automaticAddDefault(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 添加默认自动回复
     * @param {*} param0 
     * @param {*} payload 
     */
    automaticDefaultDetail({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            automaticDefaultDetail(payload).then(res => {
                commit('SAVE_AUTOMATICDEFAULTDETAIL', res)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 自动回复开关
     * @param {*} param0 
     * @param {*} payload 
     */
    automaticSwitchReply({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            automaticSwitchReply(payload).then(res => {
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