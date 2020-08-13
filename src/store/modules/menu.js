import {
    getMenuDetail,
    getAllMenuList,
    getMyMenuList
} from '@/api/menu'
import {
    constantRoutes
} from '@/router'
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
        if (item.children) {
            item.children.map(second => {
                const part = second.component.slice(2).split('/').slice(1).join("/")

                // const url = second.component.split('@/views')[1]
                // console.log(`@/views${url}/index.vue`,part,second.route)
                firstObj.children.push({
                    path: second.route,
                    name: second.code,
                    //   component: resolve => require([`@/views${url}/index.vue`], resolve),
                    component: view(part), // component:()=> import('@/views'+url+'/index.vue'),//why?
                    meta: {
                        title: second.menuTitle,
                        auth: second
                    }
                })
            })
        }
        temp.push(firstObj)
    })
    return temp

}

function view(path) {
    return (resolve) => {
        require([`@/views/${path}/index.vue`], resolve)
    }
}



const state = {
    menuList: [],
    currentMenuDetail: {},
    rebuildMenu: [], //transfer from
    rebuildMenuList: [] //concat with constantRoutes
}

const mutations = {
    SAVE_LIST(state, payload) {
        state.menuList = payload
    },
    SAVE_DETAIL(state, payload) {
        state.currentMenuDetail = payload
    },
    SET_MENU(state, payload) {

        state.rebuildMenu = payload

    },
    SAVE_REBUILDMENULIST(state, payload) {
        state.rebuildMenuList = constantRoutes.concat(payload)
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

                reject(err)
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
                reject(err)
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
                const filted = generateRoutes(res.items)
                commit('SAVE_REBUILDMENULIST', filted)
                commit('SET_MENU', filted)
                commit('SAVE_LIST', res.items)
                resolve()
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