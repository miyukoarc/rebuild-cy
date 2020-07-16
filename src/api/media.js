import request from '@/utils/request'
import qs from 'qs'
/**
 * 查看素材详情
 * @param {string} uuid 
 */
export const getMediaDetail = (uuid) => {
  return request({
    url: '/media/' + uuid,
    method: 'get'
  })
}

/**
 * 添加临时素材
 * @param {object} payload 
 */
export const addMedia = (payload) => {
  return request({
    url: '/media/add',
    method: 'post',
    data: payload.data,
    params: payload.params
  })
}


/**
 * 新建素材包含是否审核
 * @param {object} payload 
 */
export const addMediaIsAudit = (payload) => {
  return request({
    url: '/media/addMediaIsAudit',
    method: 'post',
    data: payload.data,
    params: payload.params
  })
}

/**
 * 新建素材包含是否审核
 * @param {object} payload 
 */
export const addArticleIsAudit = (payload) => {
  return request({
    url: '/media/addMediaIsAudit',
    method: 'post',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({...payload.data,...payload.params}),
  })
}


/**
 * 通过id查询的文章详情页
 * @param {string} uuid
 */
export const getArticleDetail = (uuid) => {
  return request({
    url: '/media/article/' + uuid,
    method: 'get'
  })
}


// /**
//  * 通过id查询的文章详情页
//  * @param {string} uuid
//  */
// export const getArticleDetail = (uuid)=>{
//     return request({
//         url: '/media/article/'+uuid,
//         method: 'get'
//     })
// }


/**
 * 添加文章
 * @param {string} payload
 */
export const addArticle = (payload) => {
  return request({
    url: '/media/article/add',
    method: 'post',
    data: payload
  })
}


// /**
//  * 添加文章包含是否需要审核
//  * @param {string} payload
//  */
// export const addArticleIsAudit = (payload) => {
//   return request({
//     url: '/media/article/addArticleIsAudit',
//     method: 'post',
//     data: payload
//   })
// }


/**
 * 删除文章
 * @param {string} payload
 */
export const deleteArticle = (payload) => {
  return request({
    url: '/media/article/delete',
    method: 'post',
    data: payload
  })
}


/**
 * 文章列表
 * @param {string} payload
 */
export const getArticleList = (payload) => {
  return request({
    url: '/media/article/listAll',
    method: 'get',
    params: payload
  })
}

/**
 * 更新文章
 * @param {string} payload
 */
export const updataArticle = (payload) => {
  return request({
    url: '/media/article/update',
    method: 'post',
    data: payload.data,
    params: payload.params
  })
}

/**
 * 文章的浏览记录
 * @param {string} uuid
 */
export const articleLog = (uuid) => {
  return request({
    url: '/media/browsingRecords/' + uuid,
    method: 'get',
  })
}



/**
 * 删除
 * @param {string} payload
 */
export const deleteMedia = (payload) => {
  return request({
    url: '/media/delete',
    method: 'post',
    data: payload
  })
}



/**
 * 获取图片文件url
 * @param {string} payload
 */
// export const getImgUrl = (payload)=>{
//     return request({
//         url: '/media/getImgUrl',
//         method: 'get',
//         data: payload
//     })
// }


/**
 * 素材列表
 * @param {string} payload
 */
export const getMediaListAll = (payload) => {
  return request({
    url: '/media/listAll',
    method: 'get',
    params: payload
  })
}

/**
 * 文章列表
 * @param {string} payload
 */
export const getArticleListAll = (payload) => {
  return request({
    url: '/media/article/listAll',
    method: 'get',
    params: payload
  })
}


/**
 * 删除素材是否够需要审核
 * @param {string} payload
 */
export const deleteMediaIsAudit = (payload) => {
  return request({
    url: '/media/deleteMediaIsAudit',
    method: 'post',
    data: payload
  })
}


/**
 * 批量删除素材是否够需要审核
 * @param {string} payload
 */
export const batchDeleteMedia = (payload) => {
  return request({
    url: '/media/batchDeleteMedia',
    method: 'post',
    // headers: {
    //     'content-type': 'application/x-www-form-urlencoded'
    // },
    data: payload
  })
}

/**
 * 批量移动素材分组
 * @param {string} payload
 */
export const moveMedieToGroup = (payload) => {
  return request({
    url: '/media/moveMedieToGroup',
    method: 'post',
    data: payload
  })
}
