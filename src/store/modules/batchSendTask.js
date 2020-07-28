import {
    getBatchSendTaskListAll,
    getBatchSendTaskDetail,
    getListBatchSendTaskResult,
    getListMy,
    addBatchSendTask
} from '@/api/batchSendTask'

const state = {
    /**
     * 全部群发列表
     */
    batchSendTaskListAll: [],
    loading: state,
    listAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
    /**
     * 全部群发详情
     */
    batchSendTaskListAllDetail: {},
    listMy: [],
    listMyPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
    /**
     * 任务结果
     */
    batchSendTaskResultList: [],
    batchSendTaskResultListPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
}

const mutations = {
    /**
     * 保存全部群发列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_BATCHSENDTASKLISTALL(state, payload) {
        state.batchSendTaskListAll = payload
    },

    /**
     * 保存全部群发详情
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_BATCHSENDTASKLISTALLDETAIL(state, payload) {
        state.batchSendTaskListAllDetail = payload
    },
    /**
     * 保存群发任务结果
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_BATCHSENDTASKRESULTLIST(state, payload) {
        state.batchSendTaskResultList = payload
    },

    SET_BATCHSENDTASKRESULTLISTPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.batchSendTaskResultListPage.total = total
        state.batchSendTaskResultListPage.pageNumber = pageNumber
        state.batchSendTaskResultListPage.pageSize = pageSize
    },
    /**
     * 切换loading状态
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    SET_PAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.listAllPage.total = total
        state.listAllPage.pageNumber = pageNumber
        state.listAllPage.pageSize = pageSize
    },

    /**
     * 保存我的列表
     */
    SAVE_LISTMY(state, payload) {
        state.listMy = payload
    },
    SET_LISTMYPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.listMyPage.total = total
        state.listMyPage.pageNumber = pageNumber
        state.listMyPage.pageSize = pageSize
    }
}

const actions = {
    /**
     * 全部群发列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getBatchSendTaskListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getBatchSendTaskListAll(payload).then(res => {
                commit('SAVE_BATCHSENDTASKLISTALL', res.items)
                commit('SET_PAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {

                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },


    /**
     * 群发列表详情
     * @param {*} param0 
     * @param {object} payload 
     */
    getBatchSendTaskDetail({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getBatchSendTaskDetail(payload).then(res => {
                commit('SAVE_BATCHSENDTASKLISTALLDETAIL', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {

                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    /**
     * 群发任务结果列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListBatchSendTaskResult({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListBatchSendTaskResult(payload).then(res => {
                commit('SAVE_BATCHSENDTASKRESULTLIST', res.items)
                commit('SET_BATCHSENDTASKRESULTLISTPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {

                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    /**
     * 我的群发任务
     * @param {*} param0 
     * @param {*} payload 
     */
    getListMy({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListMy(payload).then(res => {
                commit('SAVE_LISTMY', res.items)
                commit('SET_LISTMYPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject()
            })
        })
    },
    /**
     * 新建群发任务
     * @param {*} payload 
     */
    addBatchSendTask({ commit }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            addBatchSendTask(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
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