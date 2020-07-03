import {
  getList,
  getListAll,
  getPermissionListMy,
  getListRole
} from '@/api/permission'

import {
  constantRoutes
} from '@/router'
import {setPermissionMap} from '@/utils/common'
import Layout from '@/layout'

/**
 * 生成权限路由
 * @param {object}} routes 
 */

function generatePermissionRoutes(routes) {
  let temp = []
  for (let key in routes) {

    let firstObj = {
      path: '#' ,
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


        firstObj.children.push({
          path: item.route,
          name: item.code,
          component: view(part),
          meta: {
            title: item.menuTitle
          }

        })

      }

    })
    temp.push(firstObj)
  }
  return temp
}

function view (path) {
    return  (resolve) => {
      require([`@/views/${path}/index.vue`], resolve)
    }
  }

const state = {
  loading: false,
  routes: [],
  permissionList: [],
  permissionMap: {},
  permissionRenderMap: {}

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
  SET_PERMISSIONMAP(state,payload){
    state.permissionMap = payload
  },
  SET_PERMISSIONRENDERMAP(state,payload){
      state.permissionRenderMap = payload
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
        reject()
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
        commit('SET_PERMISSIONRENDERMAP',res.items)
        commit('TOGGLE_LOADING', false)
        resolve(res.items)
      }).catch(err => {
        console.error(err)
        commit('TOGGLE_LOADING', false)
        reject()
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
        reject()
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
        reject()
      })
    })
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
