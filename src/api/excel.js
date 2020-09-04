import request from '@/utils/request'

/**
 * 导出标签
 * @param {*} payload 
 */
export const downloadTagExcel = (payload)=>{
    return request({
        url: '/tag/downloadTagExcel',
        responseType: 'blob',
        method: 'post',
        data: payload
    })
}

/**
 * 上传标签
 */
export const uploadTagExcell= (payload)=>{
    return request({
        url: '/tag/uploadTagExcell',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: payload
    })
}

