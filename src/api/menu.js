import request from '@/utils/request'

/**
 * 通过id查询的菜单详细页
 * @param {string} uuid 
 */
export const getMenuDetail = (uuid)=>{
    return request({
        url: '/menu/'+uuid,
        method: 'get',

    })
}

/**
 * 全部菜单列表（超管）
 */
export const getAllMenuList = () => {
    return request({
        url: '/menu/list',
        method: 'get'
    })
}

/**
 * 全部菜单列表（普通角色）
 */
export const getMyMenuList = ()=>{
    return request({
        url: '/menu/listMy',
        method: 'get'
    })
}