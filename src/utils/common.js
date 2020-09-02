/**
 * 建立权限map,通过解析route却定页面内部按钮的权限
 * @param {object} obj 
 */
export function setPermissionMap(obj) {

  let temp = {}

  for (let key in obj) {
    temp[key] = {}
    obj[key].map(item => {
      temp[key][item.code] = item
    })
  }
  return temp
}


/**
 * 标签分组
 * @param {array} arr 
 */
export function classifyTag(arr) {
  let tempId = ""
  let temp = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].groupId !== tempId) {
      temp.push({
        groupName: arr[i].groupName,
        groupId: arr[i].groupId,
        sort: arr[i].sort,
        auditStateForOperation: arr[i].auditStateForOperation,
        tags: []
      })
      tempId = arr[i].groupId
    }
  }

  arr.forEach(item => {
    temp.forEach(group => {
      if (group.groupId === item.groupId) {
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

  return data.reduce((arr, {
      createdAt,
      deleted,
      name,
      parent,
      sort,
      updatedAt,
      users,
      uuid,
      version,
      wxDepartmentId,
      children = []
    }) =>

    arr.concat([{
      createdAt,
      deleted,
      name,
      parent,
      sort,
      updatedAt,
      users,
      uuid,
      version,
      wxDepartmentId,
    }], flatten(children))

    , [])

}

/**
 * 素材分类
 * @param {array} arr 
 * @param {string} target 
 */
export function classifyMedia(arr, target) {
  return arr.filter(item => {
    return item.type === target
  })
}

/**
 * @param {Function} func  函数防抖
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * fan
 */

export function throttle(func, wait = 1000) {
  let timeout;
  let context
  return function (event) {
    console.log(context)
    context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(context, event)
    }, wait)
  }
}
/**
 * 截取树
 * @param {string} key 
 * @param {any} value 
 * @param {array} arr 
 */
export function intercept(key, value, arr) {
  let temp = []
  const deep = (key, value, arr) => {
    arr.forEach(item => {
      if (item[key] === value) {
        temp.push(item)
      } else {
        if (item.children) {
          deep(key, value, item.children)
        }
      }
    })
  }
  deep(key, value, arr)
  return temp
}

/**
 * 去重
 */
export function myFilter(arr) {

  let temp = []
  return arr.reduce((sum, curr) => {
    if (!temp.includes(curr.uuid)) {
      sum.push(curr)
      temp.push(curr.uuid)
    }
    return sum
  }, [])
}

export function toChineseNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}

/**
 * 分组
 * @param {*} obj 
 */
/*
export function modifyListAll(obj) {
    let temp = []

    for (let key in obj) {
        obj[key].map(item => {

            if (Object.keys(item.tags).length) {
                temp.push(item)

            } else {
                temp.push({ ...item,tags:[] })
            }
        })

    }
    let tagsTemp = []

    return temp.reduce((groups, item) => {
        let groupFound = groups.find(arrItem => item.externalUser.uuid === arrItem.externalUser.uuid)
        tagsTemp = tagsTemp.concat(item.tags)
        if (groupFound) {
            groupFound.users.push(item.user)
        } else {

            let newGroup = {
                ...item,
                externalUser: item.externalUser,
                users: [item.user],
                tags: tagsTemp.reduce((groups,item)=>{
                    let groupFound = groups.find(arrItem=>item.groupId===arrItem.groupId)
                    if(groupFound){
                        groupFound.tags.push(item.tags)
                    }else{
                        let newGroup = {
                            groupName:item.groupName,
                            groupId:item.groupId,
                            tags: [item.tags]
                        }
                        groups.push(newGroup)
                    }
                    return groups
                },[])
            }
            
            Reflect.deleteProperty(newGroup,'user')

            groups.push(newGroup)
            tagsTemp = []
        }

        return groups
    }, [])

}
*/

/**
 * 将一维数组以每4个元素为一组，升格为二维数组
 * @param {array} arr 
 */
export const upgrade = (arr) => {

  let _inner = []

  let _temp = []

  for (let i = 0; i < arr.length; i++) {
    _inner.push(arr[i])
    if (_inner.length === 4) {
      _temp.push(JSON.parse(JSON.stringify(_inner)))
      _inner.splice(0, 4)
    } else {
      if (i === arr.length - 1) {
        //   console.log(4-_inner.length)
        const emptyArr = new Array(4 - _inner.length).fill({})
        const __temp = _inner.concat(emptyArr)
        _temp.push(__temp)
      }
    }
  }

  return _temp

}


export const queue = (tasks, callback) => {
  let promise = Promise.resolve()
  tasks.reduce((arr, task) => {
    return arr.then(() => {
      return new Promise((resolve, reject) => {
        // Promise.resolve(task).then(res=>{
        //     if(typeof callback=='function'){
        //         callback(res)                   
        //     }
        //     resolve()
        // })
        setTimeout(() => {

          Promise.resolve(task)
          resolve()
        }, 500)
      })
    })
  }, promise)
}


/**
 *  findtree
 */

export const findTree = (arr, uuid) => {
  if (arr == null) return null
  for (let obj of arr) {
    if (obj.uuid == uuid) {
      return obj
    }
    let ret = findTree(obj.children, uuid)
    if (ret) return ret
  }
  return null
}

export const flattenTree = (data) => {
  return data.reduce((arr, {
    type,
    name,
    uuid,
    children = []
  }) => arr.concat([{
    type,
    name,
    uuid
  }], flattenTree(children)), [])
}

//flatten tree
export const flattenDept = (data) => {
  return data.reduce((arr, {
    uuid,
    name,
    children = []
  }) => {
    return arr.concat([{
      uuid,
      name
    }], flattenDept(children))
  }, [])
}
