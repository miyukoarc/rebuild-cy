import requset from '@/utils/request'

/**
 * 自动回复列表
 * @param {object} payload 
 */
export const getListAll = (payload)=>{
    return requset({
        url: '/automatic/listAll',
        method: 'get',
        params: payload
    })
}


/**
 * 添加自动回复
 * @param {object} payload 
 */
export const add = (payload)=>{
    return requset({
        url: '/automatic/add',
        method: 'post',
        data: payload
    })
}