/*
 * @Author: your name
 * @Date: 2020-05-13 00:01:31
 * @LastEditTime: 2020-06-11 22:07:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\utils\request.js
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  MessageBox,
  Message,
  Loading
} from 'element-ui'

import {
  removeToken
} from '@/utils/auth'

// var loadinginstace

// create an axios instance
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

const service = axios.create({
  baseURL: process.env.VUE_APP_WORK === 'offline' ? 'http://127.0.0.1:3000/api' : process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
  validateStatus: (status) => {
    return status < 500
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    // TODO
    // store.commit('app/OPEN_LOADING')
    // loadinginstace = Loading.service({
    //   fullscreen: true
    // })

    return config
  },
  error => {
    // do something with request error
    // loadinginstace.close()
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (response.status == 401) {
      // alert('to/login')


      if (res.status === 4000) {
        // Message({
        //   message: res.message || 'Error',
        //   type: 'error',
        //   duration: 5 * 1000
        // })

        removeToken()

        router.push({
          path: '/login'
        })
        // return Promise.reject(new Error(res.message || 'Error'))


      }

      if (res.status === 400) {
        Message({
          message: res.message || 'Error',
          type: 'error',
        })
      }


      return Promise.reject(new Error(res.message || 'Error'))

    } else {
      // if(res.name==null){
      // Message({
      //     message:res.message || 'Error',
      //     type:'error',
      //     duration:5 * 1000
      //   })

      //       removeToken()

      //       router.push({
      //           path: '/login'
      //       })
      //   }

      return res
    }

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    // return res
    // }
  },
  error => {
    // loadinginstace.close()
    // store.commit('app/CLOSE_LOADING')
    // console.log('err' + error.response.status) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
