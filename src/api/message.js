import request from '@/utils/request'


/**
 * 群聊留痕
 * @param {object} payload 
 */
export const getListGroupChat = (payload) => {
    return request({
        url: '/message/listGroupChat',
        method: 'get',
        params: payload
    })
}

/**
 * 单聊留痕
 * @param {object} payload 
 */
export const getListSingle= (payload) => {
    return request({
        url: '/message/listSingle',
        method: 'get',
        params: payload
    })
}