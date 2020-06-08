import request from '@/utils/request'


/**
 * 根据id获取图像或者文件
 * @param {string} payload 
 */
export const getFile= (payload)=>{
    return request({
        url: '/public/file/' + payload,
        method: 'get' 
    })
}