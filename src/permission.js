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

  const hasToken = getToken()

  console.log(hasToken)

  if (hasToken) {

    if (to.path === '/login') {
      //if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {

      const username = store.getters.name

      if (username) {

        next()

      } else {
        try {

          await store.dispatch('user/getMyInfo').then(() => {

          }).catch(err => {

            Message({
              type: 'error',
              message: err || err.message
            })
          })

          const roleCode = store.state.user.roleCode

          console.log(roleCode)

            await store.dispatch('menu/getMyMenuList')


          const accessed = await store.dispatch('permission/getPermissionListMy')

          console.log(accessed)

          router.addRoutes([...accessed
            , 
            {
            path: '*',
            redirect: '/404',
            hidden: true
          }]
          )

          next({
            ...to,
            replace:true
          })

        } catch (error) {

          Message.error(error || 'Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }

  }else{

    if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
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
