import {
    login,
    logout,
    getInfo,
    getMyInfo,
    getUserList,
    getAllUserList,
    getDetail,
    getUserListSelect,
    postUserUpdate,
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    resetRouter
} from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        roleCode: '',
        avatar: '',
        userId: '',
        uuid: '',
        /**
         * 所有员工列表 无分页
         */
        userListAll: [], //user/listAll
        listSelect: [],

        /**
         * 员工列表 有分页
         */
        userList: [],
        loading: false,
        currentRowUserList: {},
        currentRowUsers: [],
        userPage: {
            total: 0,
            pageNumber: 0,
            pageSize: 0
        },

        /**
         * show off userdetail
         */
        userDetail: {}
    }
}

const state = getDefaultState()

const mutations = {
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERINFO: (state, payload) => {
        const {
            name,
            avatar,
            roleCode,
            userId,
            uuid
        } = payload
        state.name = name
        state.avatar = avatar
        state.roleCode = roleCode
        state.userId = userId
        state.uuid = uuid
    },
    /**
     * 保存无分页员工列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_USERLISTALL(state, payload) {
        state.userListAll = payload
    },


    /**
     * 保存员工列表 有分页
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_USERLIST(state, payload) {
        state.userList = payload
    },
    SAVE_CURRENTROW(state, payload) {
        state.currentRowUserList = payload
    },
    // 用于批量分配角色和部门
    SAVE_CURRENTROWS(state, payload) {
        state.currentRowUsers = payload
    },
    SET_USERPAGE(state, payload) {
        const {
            pageNumber,
            pageSize,
            total
        } = payload
        state.userPage.total = total
        state.userPage.pageNumber = pageNumber
        state.userPage.pageSize = pageSize
    },

    /**
     * 保存user详细byID
     */

    SAVE_SHOWOFFUSER(state, payload) {
        state.userDetail = payload
    },
    /**
     * 保存员工列表 无分页(筛选)
     */
    SAVE_LISTSELECT(state, payload) {
        state.listSelect = payload
    }

}

const actions = {

    // user logout
    logout({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getMyInfo({
        commit
    }) {
        return new Promise((resolve, reject) => {
            getMyInfo().then((res) => {
                // console.log(res)

                commit('SET_USERINFO', res)

                resolve(res)
            }).catch(err => {
                console.error(err)
                reject(err)
            })
        })
    },

    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },
    /**
     * 所有员工列表无分页
     * @param {*} param0 
     * @param {*} payload 
     */
    getAllUserList({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getAllUserList(payload).then(res => {
                commit('SAVE_USERLISTALL', res.items)
                    // console.log(res)
                resolve(res.items)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 员工列表 有分页
     * @param {*} param0 
     * @param {object} payload 
     */
    getUserList({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getUserList(payload).then(res => {
                commit('SAVE_USERLIST', res.items)
                commit('SET_USERPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 获取user详细
     * @param {*} param0 
     * @param {*} payload 
     */
    getDetail({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getDetail(payload).then(res => {
                commit('SAVE_SHOWOFFUSER', res)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 员工列表 筛选
     * @param {*} param0 
     * @param {*} payload 
     */
    getUserListSelect({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getUserListSelect(payload).then(res => {
                commit('SAVE_LISTSELECT', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    user_update({}, payload) {
        return new Promise((resolve, reject) => {
            postUserUpdate(payload).then((res) => {
                resolve()
            }).catch(err => {
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