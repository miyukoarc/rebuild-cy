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
