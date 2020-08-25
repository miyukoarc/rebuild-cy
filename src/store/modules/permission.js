import {
  getList,
  getListAll,
  getPermissionListMy,
  getListRole,
  getRolePermissionList,
  getRoleTemplatePermissionList,
  getPermissionListGroup,
  roleLinkPermissionIsAudit
} from '@/api/permission'

import {
  setPermissionMap
} from '@/utils/common'
import Layout from '@/layout'

/**
 * 生成权限路由
 * @param {object}} routes 
 */

function generatePermissionRoutes(routes) {
  let temp = []
  for (let key in routes) {

    let firstObj = {
      path: '#',
      component: Layout,
      name: key,
      meta: {
        title: routes[key][0].menuTitle,
      },

      children: []
    }
    routes[key].map(item => {
      if (item.path) {
        // const url =  item.code.replace('_','/')
        const part = item.component.slice(2).split('/').slice(1).join("/")
        // let path = item.path.toLocaleLowerCase()
        // let isMy = path.indexOf('my')
        let active;
        if (item.route.indexOf('/detail') > 0) {
          active = item.route.split('/detail')[0] + '/listAll'
        } else if (item.route.indexOf('/groupDetail') > 0) {
          active = item.route.split('/groupDetail')[0] + '/groupChatListAll'
        } else {
          active = item.route
        }
        firstObj.children.push({
          path: item.route,
          name: item.code,
          component: view(part),
          meta: {
            title: item.menuTitle,
            activeMenu: `${active}`
          }

        })

      }

    })
    temp.push(firstObj)
  }

  return temp
}

function view(path) {
  return (resolve) => {
    require([`@/views/${path}/index.vue`], resolve)
  }
}

const state = {
  loading: false,
  routes: [],
  permissionList: [],
  permissionMap: {},
  permissionRenderMap: {},

  /**
   * 角色权限列表
   */
  rolePermissionList: [],
  roleTemplatePermissionList: []

}

const mutations = {
  SAVE_LIST(state, payload) {
    state.permissionList = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SET_ROUTES(state, payload) {

    state.routes = payload
  },
  SET_PERMISSIONMAP(state, payload) {
    state.permissionMap = payload
  },
  SET_PERMISSIONRENDERMAP(state, payload) {
    state.permissionRenderMap = payload
  },

  /**
   * 保存角色权限列表
   */
  SAVE_ROLEPERMISSIONLIST(state, payload) {
    state.rolePermissionList = payload
  },
  SAVE_TEMPLATELIST(state, payload) {
    state.roleTemplatePermissionList = payload
  }

}

const actions = {
  getList({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getList().then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        console.error(err)
        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 权限管理显示全部权限列表
   * @param {*} param0 
   */
  getListAll({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListAll().then((res) => {
        // const accessed = setPermissionMap(res.items)
        commit('SET_PERMISSIONRENDERMAP', res.items)
        commit('TOGGLE_LOADING', false)
        resolve(res.items)
      }).catch(err => {
        console.error(err)
        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 我的权限列表
   * @param {*} param0 
   */
  getPermissionListMy({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getPermissionListMy().then((res) => {
        commit('SAVE_LIST', res.items)
        const filted = generatePermissionRoutes(res.items)
        const accessed = setPermissionMap(res.items)
        commit('SET_ROUTES', filted)
        commit('SET_PERMISSIONMAP', accessed)
        commit('TOGGLE_LOADING', false)
        resolve(filted)
      }).catch(err => {
        console.error(err)
        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 
   * @param {*} param0 
   * @param {string} payload 
   */
  getListRole({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getListRole(payload).then((res) => {
        commit('SAVE_LIST', res.items)
        const filted = generatePermissionRoutes(res.items)
        const accessed = setPermissionMap(res.items)
        commit('SET_ROUTES', filted)
        commit('SET_PERMISSIONMAP', accessed)
        commit('TOGGLE_LOADING', false)
        resolve(filted)
      }).catch(err => {
        console.error(err)
        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 获取角色对应的权限列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getRolePermissionList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getRolePermissionList(payload).then(res => {
        commit('SAVE_ROLEPERMISSIONLIST', res.items)
        resolve(res.items)
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
      })
    })
  },
  /**
   * 获取角色模板对应的权限列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getRoleTemplatePermissionList({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getRoleTemplatePermissionList(payload).then(res => {
        commit('SAVE_TEMPLATELIST', res.items)
        resolve(res.items)
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
      })
    })
  },
  /**
   * 角色赋予权限包含是否需要审核
   * @param {*} param0 
   * @param {*} payload 
   */
  roleLinkPermissionIsAudit({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      roleLinkPermissionIsAudit(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getPermissionListGroup({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      getPermissionListGroup(payload).then(res => {

        resolve(res.items)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
