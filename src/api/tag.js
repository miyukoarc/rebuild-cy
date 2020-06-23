import request from '@/utils/request'

/**
 * 公共标签列表
 * @param {object} payload
 */
export const getTagList =(payload)=>{
    return request({
        url: '/tag/listAll',
        method: 'get',
        params: payload
    })
}

/**
 * 标签列表页数据
 */
export const getListSelect =()=>{
    return request({
        url: '/tag/listSelect',
        method: 'get',

    })
}

/**
 * 我的标签列表
 * @param {object} payload 
 */
export const getTagListMy =(payload)=>{
    return request({
        url: '/tag/listMy',
        method: 'get',
        params: payload
    })
}

/**
 * 添加标签包含是否审核
 * @param {object} payload 
 */
export const addTagIsAudit=(payload)=>{
    return request({
        url: '/tag/addTagIsAudit',
        method: 'post',
        data: payload
    })
}

/**
 * 删除标签组包含是否审核
 * @param {object} payload 
 */
export const deleteTagIsAudit=(payload)=>{
    return request({
        url: '/tag/deleteTagIsAudit',
        method: 'post',
        data: payload
    })
}

/**
 * 编辑标签包含是否审核
 * @param {object} payload 
 */
export const updateTagIsAudit = (payload)=>{
    return request({
        url: '/tag/updateTagIsAudit',
        method: 'post',
        data: payload
    })
}

// /**
//  * 公共标签列表(未分组)
//  * @param {object} payload 
//  */
// export const getRawTagList = (payload)=>{
//     return request({
//         url: '/tag/tagList',
//         method: 'get',
//         params: payload
//     })
// }
