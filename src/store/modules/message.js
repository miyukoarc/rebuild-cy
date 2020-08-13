/*
 * @Author: your name
 * @Date: 2020-06-28 10:57:05
 * @LastEditTime: 2020-08-07 16:22:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\message.js
 */
import {
    getMessageSingleListAll,
    getMessageSingleLastListAll,
    downloadFile,
    getMessageGroupListAll
} from '@/api/message'
const state = {
    loading: false,
    // 单聊数据
    singleListAll: [],
    singleListPage: {
        total: 0,
        pageSize: 0,
        pageNumber: 0
    },
    groupListAll: {
        total: 0,
        pageSize: 0,
        pageNumber: 0
    },
    // 单聊留痕 新
    singleLastListAll: [],
    // singleLastListPage: {
    //     total: 0,
    //     pageSize: 0,
    //     pageNumber: 0
    // },
}

const mutations = {
    /**
     * 切换loading
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    SAVE_SINGLELISTALL(state, payload) {
        state.singleListAll = payload
    },
    SAVE_GROUPLISTPAGE(state, payload) {
        state.groupListAll = payload
    },
    SAVE_SINGLELISTPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.singleListPage.total = total
        state.singleListPage.pageNumber = pageNumber
        state.singleListPage.pageSize = pageSize
    },
    SAVE_SINGLELASTLISTALL(state, payload) {
        state.singleLastListAll = payload
    },
    // SAVE_SINGLELASTLISTPAGE(state, payload) {
    //     const {
    //         total,
    //         pageSize,
    //         pageNumber
    //     } = payload
    //     state.singleLastListPage.total = total
    //     state.singleLastListPage.pageNumber = pageNumber
    //     state.singleLastListPage.pageSize = pageSize
    // },
}

const actions = {
    /**
     * 获取单聊数据
     * @param {*} param0 
     * @param {object} payload 
     */
    getMessageSingleListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getMessageSingleListAll(payload).then(res => {
                commit('SAVE_SINGLELISTALL', res.item)
                commit('SAVE_SINGLELISTPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve(res)
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },

    /**
     * 获取单聊数据 last
     * @param {*} param0 
     * @param {object} payload 
     */
    getMessageSingleLastListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getMessageSingleLastListAll(payload).then(res => {
                commit('SAVE_SINGLELASTLISTALL', res)
                commit('TOGGLE_LOADING', false)
                resolve(res)
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 获取群聊数据
     * @param {*} param0 
     * @param {object} payload 
     */
    getMessageGroupListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getMessageGroupListAll(payload).then(res => {
                // commit('SAVE_SINGLELASTLISTALL', res)
                commit('SAVE_GROUPLISTPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve(res)
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

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