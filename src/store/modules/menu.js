import {
  getMenuDetail,
  getAllMenuList,
  getMyMenuList
} from '@/api/menu'
import {constantRoutes} from '@/router'
import Layout from '@/layout'

/**
 * 生成路由表
 * @param {Array} routes 
 */
function generateRoutes(routes) {
    let temp = []
    routes.map(item => {
      let firstObj = {
        path: '#',
        component: Layout,
        name: item.code,
        meta: {
          title: item.menuTitle,
          icon: item.icon
        },
        children: []
      }
      item.children.map(second => {
        const url = second.component.split('@/views')[1]
        firstObj.children.push({
          path: second.route,
          name: second.code,
          component: resolve => require([`@/views${url}/index.vue`], resolve),
        //   component: ()=>{return  (resolve) => require(`${}`) },          // component:()=> import('@/views'+url+'/index.vue'),//why?
          meta: {
            title: second.menuTitle
          }
        })
      })
      temp.push(firstObj)
    })
    return temp
  
  }



const state = {
  menuList: [],
  currentMenuDetail: {},
  rebuildMenu: [], //transfer from
  rebuildMenuList: []//concat with constantRoutes
}

const mutations = {
  SAVE_LIST(state, payload) {
    state.menuList = payload
  },
  SAVE_DETAIL(state, payload) {
    state.currentMenuDetail = payload
  },
  SET_MENU(state, payload) {
      const filted = generateRoutes(payload)
    state.rebuildMenu = filted
    state.rebuildMenuList = constantRoutes.concat(filted)
  }
}

const actions = {
  /**
   * 
   * @param {*} param0 
   * @param {string} uuid 
   */
  getMenuDetail({
    commit
  }, uuid) {
    return new Promise((resolve, reject) => {
      getMenuDetail(uuid).then(res => {
        commit('SAVE_DETAIL', res.items)
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 超管专属
   * @param {*} param0 
   */
  getAllMenuList({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getAllMenuList().then(res => {
        commit('SET_MENU', res.items)
        commit('SAVE_LIST', res.items)
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
      })
    })
  },
  /**
   * 其他role
   * @param {*} param0 
   */
  getMyMenuList({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getMyMenuList().then(res => {
        commit('SET_MENU', res.items)
        commit('SAVE_LIST', res.items)
        resolve()
      }).catch(err => {
        console.log(err)
        reject()
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
