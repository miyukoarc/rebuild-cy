import {
    getListOwner,
    getListGroup,
    getExternalUserDetail,
    getExternalUserListMy,
    getExternalUserListAll,
    getRunWayList,
    getRunWayListAll,
    getQuitUserRelationExUserList,
    getListExUserByUserId,
    getQuitUserRelationExUserDetail,
    redistributionExUser,
    getGroupDetail,
    externalUserUpdateTag,
    getCustomerStatistics,
    getListMy,
    getResultList,
    externalUserRefreshInfo
} from '@/api/externalUser'

import {
    addExTrends,
    deleteExTrends,
    updateExTrends
} from '@/api/externalUserTrends'

import {
    propertyAdd,
    propertyDelete,
    getPropertyListAll,
    propertyListSelect,
    propertyUpdate,
    propertyUpdatePropertySort,
    propertyUpdateExternalUserProperty
} from '@/api/property'

import {
    dataConversion,
    tagsUuid,
    externalUserDetailConversion
} from '@/utils/externalUser.js'

const state = {
    /**
     * 我的客户
     * 
     */
    list: [],
    loading: false,
    page: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    /**
     * id查找联系客户
     */
    idList: [],
    idPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    /**
     * 获取联系客户统计数据
     */
    customerStatistics: {},

    /**
     * 所有客户
     */
    externalUserListAll: [],
    listAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
    /**
     * 我的流失客户列表
     */
    runWayList: [],
    runWayPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },


    /**
     * 全部流失客户列表
     */
    runWayListAll: [],
    runWayListAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    /**
     * 群聊列表
     */
    listGroup: [],
    listGroupPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
    listOwner: [], //群主列表

    /**
     * 离职员工客户列表(所有)
     */
    quitUserRelationExUserList: [],
    quitListPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
    quitUserCurrentRow: {},
    /**
     * 某个离职员工客户列表
     */
    quitUserRelationExUserListDetail: [],

    /**
     * 群详情
     */
    groupDetail: {},
    /**
     * 用户统计数据
     */
    statistics: {},
    /**
     * 客户详情
     */
    externalUserDetail: {},
    editTagsUuid: [], // 客户详情已有标签 uuid
    /**
     * 客户详情修改客户属性配置
     */
    propertyListAll: [],
    propertyListAllPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    /**
     * 所在群列表
     */
    groupListAll: [],


    batchTaskListmy: [],
    batchTaskListmyPage: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },

    result_list: [],
    result_page: {
        total: 0,
        pageNumber: 0,
        pageSize: 0
    },
}

const mutations = {
    /**
     * 保存我的客户列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_LIST(state, payload) {
        state.list = payload
    },
    SET_PAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.page.total = total
        state.page.pageNumber = pageNumber
        state.page.pageSize = pageSize
    },

    /**
     * 切换loading
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },

    /**
     * 保存ById客户列表
     */
    SAVE_IDLIST(state, payload) {
        state.idList = payload
    },
    SET_IDPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.idPage.total = total
        state.idPage.pageNumber = pageNumber
        state.idPage.pageSize = pageSize
    },

    /**
     * 保存用户联系客户统计数据
     */
    SAVE_DATA(state, payload) {
        state.customerStatistics = payload
    },
    /**
     * 保存所有用户
     */
    SAVE_EXTERNALUSERLISTALL(state, payload) {
        state.externalUserListAll = payload
    },
    SET_LISTALLPAGE(state, payload) {
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
     * 保存我的流失客户列表
     */
    SAVE_RUNWAYLIST(state, payload) {
        state.runWayList = payload
    },
    SET_RUNWAYPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.runWayPage.total = total
        state.runWayPage.pageNumber = pageNumber
        state.runWayPage.pageSize = pageSize
    },

    /**
     * 保存所有流失客户列表
     */
    SAVE_RUNWAYALLLIST(state, payload) {
        state.runWayListAll = payload
    },
    SET_RUNWAYALLPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.runWayListAllPage.total = total
        state.runWayListAllPage.pageNumber = pageNumber
        state.runWayListAllPage.pageSize = pageSize
    },


    /**
     * 保存群聊列表
     */
    SAVE_LISTGROUP(state, payload) {
        state.listGroup = payload
    },
    SAVE_LISTOWNER(state, payload) {
        state.listOwner = payload
    },
    SET_LISTGROUPPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.listGroupPage.total = total
        state.listGroupPage.pageNumber = pageNumber
        state.listGroupPage.pageSize = pageSize
    },

    /**
     * 离职员工的客户（所有）
     */
    SAVE_QUITLIST(state, payload) {
        state.quitUserRelationExUserList = payload
    },
    SET_QUITLISTPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.quitListPage.total = total
        state.quitListPage.pageNumber = pageNumber
        state.quitListPage.pageSize = pageSize
    },
    SAVE_QUITUSERCURRENTROW(state, payload) {
        state.quitUserCurrentRow = payload
    },
    /**
     * 某个离职员工的客户列表
     */
    SAVE_QUITLISTDETAIL(state, payload) {
        state.quitUserRelationExUserListDetail = payload
    },
    SAVE_GROUPDETAIL(state, payload) {
        state.groupDetail = payload
    },
    /**
     * 保存小
     * @param {*} state 
     * @param {*} payload 
     */

    SAVE_STATISTICS(state, payload) {
        state.statstics = payload
    },
    /**
     * 保存客户详情
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_EXTERNALUSERDETAIL(state, payload) {
        state.externalUserDetail = payload
    },
    /**
     * 保存客户详情已有标签 弹框回显
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_EDITTAGSUUID(state, payload) {
        state.editTagsUuid = []
        console.log(payload, 'payload')
        if (payload != null) {
            state.editTagsUuid = tagsUuid(payload)
        } else {
            state.editTagsUuid = []
        }
    },
    /**
     * 保存群列表
     */
    SAVE_GROUPLIST(state, payload) {
        state.groupListAll = payload
    },

    SET_BATCHTASK_PAGE(state, payload) {
        const {
            pageNumber,
            pageSize,
            total
        } = payload
        state.batchTaskListmyPage.total = total
        state.batchTaskListmyPage.pageNumber = pageNumber
        state.batchTaskListmyPage.pageSize = pageSize
    },
    SET_RESULT_PAGE(state, payload) {
        const {
            pageNumber,
            pageSize,
            total
        } = payload
        state.result_page.total = total
        state.result_page.pageNumber = pageNumber
        state.result_page.pageSize = pageSize
    },
    SAVE_BATCHTASK_LISTMY(state, payload) {
        state.batchTaskListmy = payload;
    },
    SAVE_RESULT_LIST(state, payload) {
        state.result_list = payload;
    },
    // 客户详情修改客户属性配置
    SAVE_PROERTYLISTALL(state, payload) {
        state.propertyListAll = payload
    },

    SET_PROERTYLISTALLPAGE(state, payload) {
        const {
            total,
            pageSize,
            pageNumber
        } = payload
        state.propertyListAllPage.total = total
        state.propertyListAllPage.pageNumber = pageNumber
        state.propertyListAllPage.pageSize = pageSize
    },


}

const actions = {
    /**
     * 我的客户的列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getExternalUserListMy({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getExternalUserListMy(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                commit('SAVE_LIST', res.items)
                commit('SET_PAGE', res)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 所有的客户的列表包含标签筛选,用户筛选，管理员可查看
     * @param {*} param0 
     * @param {object} payload 
     */
    getExternalUserListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getExternalUserListAll(payload).then(res => {
                commit('SAVE_EXTERNALUSERLISTALL', res.items)
                commit('SET_LISTALLPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve(res.items)
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 我的流失客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getRunWayList({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getRunWayList(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                commit('SAVE_RUNWAYLIST', res.items)
                commit('SET_RUNWAYPAGE', res)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 所有流失客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getRunWayListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getRunWayListAll(payload).then(res => {
                commit('SAVE_RUNWAYALLLIST', res.items)
                commit('SET_RUNWAYALLPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 获取离职成员的客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getQuitUserRelationExUserList({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getQuitUserRelationExUserList(payload).then(res => {
                commit('SAVE_QUITLIST', res.items)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 获取离职成员的客户列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getQuitUserRelationExUserDetail({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getQuitUserRelationExUserDetail(payload).then(res => {
                commit('SAVE_QUITLISTDETAIL', res.items)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 离职成员的外部联系人再分配
     * @param {object} payload 
     */
    redistributionExUser({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            redistributionExUser(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 获取群列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListGroup({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getListGroup(payload).then(res => {
                commit('SET_LISTGROUPPAGE', res)
                commit('SAVE_LISTGROUP', res.items)
                resolve()
            }).catch(err => {

                reject(err)
            })
        })
    },
    /**
     * 获取所有人列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getListOwner({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListOwner(payload).then(res => {
                commit('SAVE_LISTOWNER', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 根据用户uuid查询对应的客户
     * @param {*} param0 
     * @param {*} payload 
     */
    getListExUserByUserId({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListExUserByUserId(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                commit('SAVE_IDLIST', res.items)
                commit('SET_IDPAGE', res)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 获取联系客户统计数据
     * @param {*} param0 
     * @param {*} payload 
     */
    getCustomerStatistics({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getCustomerStatistics(payload).then(res => {
                commit('SAVE_DATA', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 群详情
     * @param {*} param0 
     * @param {*} payload 
     */
    getGroupDetail({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getGroupDetail(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                commit('SAVE_GROUPDETAIL', res)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 客户详情
     */
    getExternalUserDetail({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getExternalUserDetail(payload).then(res => {
                commit('SAVE_EXTERNALUSERDETAIL', res)
                commit('TOGGLE_LOADING', false)
                resolve(res)
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 客户详情标签编辑
     */
    externalUserUpdateTag({
        commit
    }, payload) {
        console.log(payload, 'payload')
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            externalUserUpdateTag(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 客户详情修改客户属性配置
     */
    propertyUpdateExternalUserProperty({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            propertyUpdateExternalUserProperty(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 获取客户属性配置列表
     */
    getPropertyListAll({
        commit
    }) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getPropertyListAll().then(res => {
                commit('TOGGLE_LOADING', false)
                commit('SAVE_PROERTYLISTALL', res.items)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 客户配置新增
     * @param {*} param 
     * @param {*} payload 
     */
    propertyAdd({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            propertyAdd(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 客户配置修改
     * @param {*} param 
     * @param {*} payload 
     */
    propertyUpdate({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            propertyUpdate(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 客户配置删除
     * @param {*} param 
     * @param {*} payload 
     */
    propertyDelete({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            propertyDelete(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 客户配置上下移动
     * @param {*} param 
     * @param {*} payload 
     */
    propertyUpdatePropertySort({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            propertyUpdatePropertySort(payload).then(res => {
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 添加动态
     */
    addExTrends({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            addExTrends(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 删除动态
     */
    deleteExTrends({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            deleteExTrends(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 更新动态
     */
    updateExTrends({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            updateExTrends(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 批量添加好友接口，获取list列表
     */
    getListMy({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getListMy(payload).then(res => {
                commit('SAVE_BATCHTASK_LISTMY', res.items)
                commit('SET_BATCHTASK_PAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 批量添加好友接口，获取Result list列表
     */
    getResultList({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getResultList(payload).then(res => {
                commit('SAVE_RESULT_LIST', res.items)
                commit('SET_RESULT_PAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },

    /**
     * 批量添加好友接口，获取list列表
     */
    externalUserRefreshInfo({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            externalUserRefreshInfo(payload).then(res => {
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