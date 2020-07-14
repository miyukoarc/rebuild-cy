import {
    additionFail,
    getListMy,
    getList,
    batchAdd,
    potentialCustomerUpdate,
    allocation,
    deletePotentialCustomer
} from '@/api/potentialCustomer'

const state = {
    /**
     * 我的
     */
    listMy: [],
    loading: false,
    listMyPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0,
    },

    /**
     * 所有
     */
    listAll: [],
    listAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0,
    }
}

const mutations = {
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    /**
     * 保存我的潜在客户列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LISTMY(state, payload) {
        state.listMy = payload
    },
    SET_LISTMYPAGE(state, payload) {
        const {
            total,
            pageNumber,
            pageSize
        } = payload
        state.listMyPage.total = total
        state.listMyPage.pageNumber = pageNumber
        state.listMyPage.pageSize = pageSize
    },
    /**
     * 保存所有列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LISTALL(state, payload) {
        state.listAll = payload
    },
    SET_LISTALLPAGE(state, payload) {
        const {
            total,
            pageNumber,
            pageSize
        } = payload
        state.listAllPage.total = total
        state.listAllPage.pageNumber = pageNumber
        state.listAllPage.pageSize = pageSize
    }

}

const actions = {
    /**
     * 分配潜在客户
     * @param {*} param0 
     * @param {object} payload 
     */
    additionFail({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            additionFail(payload).then((res) => {
                console.log(res)
                resolve()
            }).catch(err => {

                reject(err)
            })
        })
    },
    /**
     * 我的潜在客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListMy({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListMy(payload).then((res) => {
                commit('SAVE_LISTMY', res.items)
                commit('SET_LISTMYPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                console.error(err)
                reject(err)
            })
        })
    },

    /**
     * 编辑潜在客户
     * @param {*} param0 
     * @param {object} payload 
     */
    potentialCustomerUpdate({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            potentialCustomerUpdate(payload).then((res) => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                console.error(err)
                reject(err)
            })
        })
    },
    /**
     * 所有潜在客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getList({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getList(payload).then((res) => {
                commit('SAVE_LISTALL', res.items)
                commit('SET_LISTALLPAGE', res)
                console.log(res)
                resolve()
            }).catch(err => {

                reject(err)
            })
        })
    },
    /**
     * 批量添加潜在客户，根据手机号
     * @param {*} param0 
     * @param {*} payload 
     */
    batchAdd({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            batchAdd(payload).then(res => {
                resolve()
            }).catch(err => {
                console.error(err)
                reject(err)
            })
        })
    },
    /**
     * 删除潜在客户
     * @param {*} param0 
     * @param {*} payload 
     */
    deletePotentialCustomer({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            deletePotentialCustomer(payload).then(res => {
                resolve()
            }).catch(err => {
                console.error(err)
                reject(err)
            })
        })
    },
    /**
     * 分配潜在用户
     * @param {*} param0 
     * @param {*} payload 
     */
    allocation({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            allocation(payload).then(res => {
                resolve(res)
            }).catch(err => {
                console.error(err)
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