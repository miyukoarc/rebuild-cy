import request from '@/utils/request'

/**
 * 添加素材组
 * @param {object} payload 
 */
export const add = (payload) => {
    return request({
        url: '/mediaGroup/add',
        method: 'post',
        data: payload

    })
}


/**
 * 删除素材组
 * @param {object} payload 
 */
export const deleteMediaGroup = (payload) => {
    return request({
        url: '/mediaGroup/delete',
        method: 'post',
        data: payload

    })
}


/**
 * 素材组列表
 * @param {object} payload 
 */
export const getMediaGroupList = (payload) => {
    return request({
        url: '/mediaGroup/list',
        method: 'get',
        params: payload

    })
}

/**
 * 更改素材组
 * @param {object} payload 
 */
export const rename = (payload) => {
    return request({
        url: '/mediaGroup/rename',
        method: 'post',
        data: payload

    })
}

