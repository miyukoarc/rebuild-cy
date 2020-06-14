/**
 * 建立权限map,通过解析route却定页面内部按钮的权限
 * @param {object} obj 
 */
export function setPermissionMap(obj){

    let temp  = {}

    for(let key in obj){
        temp[key] = {}
        obj[key].map(item=>{
            temp[key][item.code] = item
        })
    }
    return temp
}


