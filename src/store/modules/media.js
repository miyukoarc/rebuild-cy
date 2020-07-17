import {
    getArticleList,
    getMediaListAll,
    addMedia,
    updataArticle,
    deleteMedia,
    getArticleDetail,
    addMediaIsAudit,
    addArticleIsAudit,
    deleteMediaIsAudit,
    batchDeleteMedia,
    moveMedieToGroup,
    browsingRecords,
    getArticleListSelect
} from '@/api/media'

import {
    getMediaGroupListAll,
    addGroup,
    rename,
    deleteMediaGroup
} from '@/api/mediaGroup'

import {
    classifyMedia
} from '@/utils/common'
const state = {
    /**
     * 文章列表
     */
    articleList: [],
    loading: false,
    page: {
        pageNumber: 0,
        pageSize: 0,
        total: 0
    },
    /**
     * 所有文章列表无分页
     */
    articleListSelect: [],
    /**
     * 素材组
     */
    mediaGroupListAll: [],
    /**
     * 素材列表 byGroupUuid
     */
    mediaList: [],
    textListAll: [],
    imageListAll: [],
    videoListAll: [],
    articleListAll: [],
    fileListAll: [],

    /**
     * 当前文章详细
     */
    articleDetail: {},

    /**
     * 文章阅读记录
     */
    browsingRecords: []
}

const mutations = {
    /**
     * 保存文章列表
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_ARTICLELIST(state, payload) {
        state.articleList = payload
    },
    /**
     * 保存文章列表分页
     * @param {*} state 
     * @param {*} payload 
     */
    SET_ARTICLEPAGE(state, payload) {
        const {
            pageNumber,
            pageSize,
            total
        } = payload
        state.page.pageNumber = pageNumber
        state.page.pageSize = pageSize
        state.page.total = total
    },
    /**
     * 保存文章列表无分页
     * @param {*} state 
     * @param {*} payload 
     */
    SAVE_ARTICLELISTSELECT(state, payload) {
        state.articleListSelect = payload
        console.log(state.articleListSelect, '8888844')
    },
    /**
     * 切换loading状态
     * @param {*} state 
     * @param {*} payload 
     */
    TOGGLE_LOADING(state, payload) {
        state.loading = payload
    },
    /**
     *  保存素材组 
     */
    SAVE_GROUPLIST(state, payload) {
        state.mediaGroupListAll = payload
    },
    /**
     * 保存mediaList
     */
    SAVE_MEDIALIST(state, payload) {
        state.mediaList = payload
    },
    /**
     * 保存分类后的media
     */
    SAVE_ACCESSEDLIST(state, payload) {
        const {
            texts,
            images,
            videos,
            articles,
            files
        } = payload
        state.textListAll = texts
        state.imageListAll = images
        state.videoListAll = videos
        state.articleListAll = articles
        state.fileListAll = files


    },
    /**
     * 保存文章详细
     */
    SAVE_ARTICLEDETAIL(state, payload) {
        state.articleDetail = payload
    },
    /**
     * 保存阅读记录
     */
    SAVE_RECORDS(state,payload){
        state.browsingRecords = payload
    }

}

const actions = {
    /**
     * 文章列表
     * @param {*} param0 
     * @param {object} payload 
     */
    getArticleList({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getArticleList(payload).then(res => {
                commit('SAVE_ARTICLELIST', res.items)
                commit('SET_ARTICLEPAGE', res)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },

    /**
     * 文章列表 无分页
     * @param {*} param0 
     * @param {object} payload 
     */
    getArticleListSelect({
        commit
    }) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getArticleListSelect().then(res => {
                console.log(res, 'resddddd')
                commit('SAVE_ARTICLELISTSELECT', res.items)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },

    /**
     * 素材组列表
     */
    getMediaGroupListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getMediaGroupListAll(payload).then(res => {
                commit('SAVE_GROUPLIST', res.items)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)

                reject(err)
            })
        })
    },
    /**
     * 添加分组
     *  
     */
    addGroup({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            addGroup(payload).then(res => {
                resolve()
            }).catch(err => {

                reject(err)
            })
        })
    },
    /**
     * 
     * 修改分组
     */
    rename({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            rename(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 删除分组
     * */
    deleteMediaGroup({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            deleteMediaGroup(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 获取素材列表 byGroupUuid
     * 
     */
    getMediaListAll({
        commit
    }, payload) {
        commit('TOGGLE_LOADING', true)
        return new Promise((resolve, reject) => {
            getMediaListAll(payload).then(res => {
                const texts = classifyMedia(res.items, 'TEXT')
                const images = classifyMedia(res.items, 'IMAGE')
                const videos = classifyMedia(res.items, 'VIDEO')
                const articles = classifyMedia(res.items, 'ARTICLE')
                const files = classifyMedia(res.items, 'FILE')
                const payload = {
                    texts,
                    images,
                    videos,
                    articles,
                    files,
                }
                commit('SAVE_MEDIALIST', res.items)
                commit('SAVE_ACCESSEDLIST', payload)
                commit('TOGGLE_LOADING', false)
                resolve()
            }).catch(err => {
                commit('TOGGLE_LOADING', false)
                reject(err)
            })
        })
    },
    /**
     * 添加素材
     */
    addMedia({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            addMedia(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 删除media
     * @param {*} param0 
     * @param {*} payload 
     */
    deleteMedia({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            deleteMedia(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 获取文章详情
     * @param {*} param0 
     * @param {*} payload 
     */
    getArticleDetail({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            getArticleDetail(payload).then(res => {
                commit('SAVE_ARTICLEDETAIL', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 更新文章
     * @param {*} param0 
     * @param {*} payload 
     */
    updataArticle({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            updataArticle(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 新建素材是否包含审核
     * @param {*} param0 
     * @param {*} payload 
     */
    addMediaIsAudit({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            addMediaIsAudit(payload).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 删除素材是否需要审核
     * @param {*} param0 
     * @param {*} payload 
     */
    deleteMediaIsAudit({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            deleteMediaIsAudit(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 批量删除素材是否够需要审核
     * @param {*} param0 
     * @param {*} payload 
     */
    batchDeleteMedia({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            batchDeleteMedia(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 批量移动素材分组
     * @param {*} param0 
     * @param {*} payload 
     */
    moveMedieToGroup({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            moveMedieToGroup(payload).then(res => {
                resolve()
            }).catch(err => {
                reject()
            })
        })
    },
    /**
     * 新建素材包含是否审核
     * @param {*} param0 
     * @param {*} payload 
     */
    addArticleIsAudit({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            addArticleIsAudit(payload).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 文章的浏览记录
     * @param {*} param0 
     * @param {*} payload 
     */
    browsingRecords({commit},payload){
       return new Promise((resolve,reject)=>{
           browsingRecords(payload).then(res=>{
            //    commit('SAVE_')
               resolve()
           }).catch(err=>{
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