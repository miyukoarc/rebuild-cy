import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
import online from '@/views/signin'
import offline from '@/views/login'
import welcome from '@/views/welcome'
import Qrcode from '@/views/qrcode'
const loginPage = process.env.VUE_APP_WORK === 'offline' ? offline : online
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    }, {
        path: '/login',
        component: loginPage,
        hidden: true
    }, {
        path: '/qrcode',
        component: Qrcode,
        hidden: true
    }, {
        path: '/welcome',
        component: welcome,
        hidden: true,
    },
    {
        path: '#',
        component: Layout,
        // redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }, {
            path: '/board',
            component: () =>
                import ('@/views/board.vue'),
            hidden: true,
        }, {
            path: '/zeness',
            component: () =>
                import ('@/views/zeness.vue'),
            hidden: true,
        }, ]
    },
    {
        path: '/',
        redirect: '/welcome'
    },
    /**
     * local test
     */
    //   {
    //     path: '/department',
    //     component: Layout,
    //     children: [{
    //       path: 'list',
    //       component: () => import('@/views/department/list'),
    //     }]
    //   },
    //   {
    //     path: '/role',
    //     component: Layout,
    //     children: [{
    //       path: 'list',
    //       component: () => import('@/views/role/list'),
    //     }]
    //   },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router({
    mode: 'hash', // require service support
    // scrollBehavior: () => ({
    //   y: 0
    // }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router