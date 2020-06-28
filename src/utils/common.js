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


 /**
  * 标签分组
  * @param {array} arr 
  */
 export function classifyTag(arr){
    let tempId = ""
    let temp =[]
    
    for(let i=0;i<arr.length;i++){
        if(arr[i].groupId!==tempId){
            temp.push({
                groupName: arr[i].groupName,
                groupId:arr[i].groupId,
                tags: []
            })
            tempId = arr[i].groupId
        }
    }

    arr.forEach(item=>{
        temp.forEach(group=>{
            if(group.groupId===item.groupId){
                group.tags.push(item)
            }
        })
    })

    return temp
 }

 /**
  * 树形表扁平化
  * @param {array} arr 
  */
 export function flatten(data) {

    return data.reduce((arr, {createdAt,deleted, name,parent, sort,updatedAt,users,uuid,version,wxDepartmentId, children = [] }) =>

        arr.concat([{ createdAt,deleted, name,parent, sort,updatedAt,users,uuid,version,wxDepartmentId, }], flatten(children))

        , [])

}

/**
 * 素材分类
 * @param {array} arr 
 * @param {string} target 
 */
export function classifyMedia(arr,target){
    return arr.filter(item => { return item.type === target })
}

