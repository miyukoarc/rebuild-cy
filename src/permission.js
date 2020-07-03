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
import {
  resolvePlugin
} from '@babel/core'



NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/miniLogin', '/board'] // no redirect whitelist

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

    if (to.path === '/login') {
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
        //   alert('username')



        next()

      } else {

        try {

          let accessed

          await store.dispatch('user/getMyInfo').then(() => {
            //   console.log(res)
            console.log(store.state.user.name)

            // 

          }).catch(err => {
            Message({
              type: 'error',
              message: err || err.message
            })
          })



          await store.dispatch('menu/getMyMenuList')
          accessed = await store.dispatch('permission/getPermissionListMy')









          router.addRoutes(
            //   accessed
            [...accessed,
            {
              path: '*',
              redirect: '/404',
              hidden: true
            }
            ]
          )







          next({
            ...to,
            replace: true
          })

        } catch (error) {
          alert('!')
          Message.error(error || 'Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
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
