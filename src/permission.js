import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  removeToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {
  resolvePlugin
} from '@babel/core'
import Watermark from '@/utils/watermark'



NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/qrcode', '/board'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  //   const hasToken = getToken()

  const hasToken = getToken()

  console.log(hasToken)

  if (hasToken) {
    if (to.path == '/login') {
      //if is logged in, redirect to the home page
      //   alert('login')
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // alert('hasLogin')


      const username = store.getters.name

      if (username) {




        next()
      } else {
        // try {

        let accessed

        await store.dispatch('user/getMyInfo').then(async (res) => {
          const name = res.name

          if (name) {
            await store.dispatch('menu/getMyMenuList')
            accessed = await store.dispatch('permission/getPermissionListMy')

            // await store.dispatch('permission/getPermissionListTree')

            await store.dispatch('sensitive/auditPropertylistSelect')

            await store.dispatch('websocket/createWebsocket')


            router.addRoutes(
              [...accessed,
                {
                  path: '*',
                  redirect: '/404',
                  hidden: true
                }
              ]
            )
            window.watermark = new Watermark(name)
            window.watermark.create()
            next({
              ...to,
              replace: true
            })
          }

        }).catch(() => {
          removeToken()
          Message({
            type: 'error',
            message: '未登录'
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        })

        // } catch (error) {
        //     Message.error(error || 'Error')
        //     next(`/login?redirect=${to.path}`)
        //     NProgress.done()
        // }
      }
    }

  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //   console.log(router, '1')
      next()
    } else {
      //   console.log(router, '2')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }


  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
