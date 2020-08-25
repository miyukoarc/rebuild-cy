import store from '@/store'

function checkPermission(el, binding) {
  const {
    value
  } = binding
  //   const roles = store.getters && store.getters.roles
  const permissionMap = store.state.permission.permissionMap
//   console.log(permissionMap)

  const arr = value.split(',')

  const module = arr[0]
  const permission = arr[1]

  if (arr && arr instanceof Array) {
    if (arr.length > 0) {
      const permissionFlag = !!(permissionMap[module] && permissionMap[module][permission])

    //   console.log(permissionFlag)
      //       const permissionRoles = value

      //       const hasPermission = roles.some(role => {
      //         return permissionRoles.includes(role)
      //       })
    //   console.log(permissionFlag)

      if (!permissionFlag) {
        el.parentNode && el.parentNode.removeChild(el)
      }
      //     }
    } else {
      throw new Error(`need permission!`)
    }
  }

}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
