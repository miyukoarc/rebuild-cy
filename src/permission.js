import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/department/list', '/role/list'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  //   const hasToken = getToken()



  console.log(store.getters.name)

  //judge login state by user na
  if (Boolean(store.getters.name)) {



    if (to.path === '/login') {

      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      //   const hasGetUserInfo = store.getters.name
      //   if (hasGetUserInfo) {
      //     next()
      //   } else {
      // try {
      // get user info
      //   await store.dispatch('user/getMyInfo')






      next()
      //     } catch (error) {
      //       // remove token and go to login page to re-login
      //       await store.dispatch('user/resetToken')
      //       Message.error(error || 'Has Error')
      //       next(`/login?redirect=${to.path}`)
      //       NProgress.done()
      //     // }
      //   }
    }
  } else {
    /* has no token*/

    if (from.path === '/login') {
      //if logged in 
      console.log('login')

      await store.dispatch('user/getMyInfo')

      const roleCode = store.getters.roleCode

      console.log(roleCode)

      await store.dispatch('permission/getListRole', roleCode) //权限列表,注册路由

      if (roleCode === 'super') {//菜单列表,注册菜单
        await store.dispatch('menu/getAllMenuList', roleCode)
      } else {
        await store.dispatch('menu/getMyMenuList', roleCode)
      }

    //   const rebuildRoutes = store.getters.rebuildMenu

      const rebuildRoutes = store.getters.routes

    






      router.addRoutes([...rebuildRoutes], {
        path: '*',
        redirect: '/404'
      })

      console.log(router.options.routes, rebuildRoutes)

      NProgress.done()
    }

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
