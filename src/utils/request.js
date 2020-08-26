/*
 * @Author: your name
 * @Date: 2020-05-13 00:01:31
 * @LastEditTime: 2020-08-26 17:04:49
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

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken;
const source = CancelToken.source();
// let removeRepeatUrl = (ever) => {
//     for (let p in pending) {
//         if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
//             pending[p].f(); //执行取消操作
//             pending.splice(p, 1); //把这条记录从数组中移除
//         }
//     }
// }

// var loadinginstace

// create an axios instance
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

const service = axios.create({
        baseURL: process.env.VUE_APP_WORK === 'offline' ? 'http://127.0.0.1:3000/api' : process.env.VUE_APP_BASE_API, // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 30000, // request timeout
        validateStatus: (status) => {
            return status < 500
        }
    })
    // request interceptor
service.interceptors.request.use(
    config => {

        // 拦截重复请求(即当前正在进行的相同请求)
        // removeRepeatUrl(config);
        // config.cancelToken = source.token; // 全局添加cancelToken
        // config.cancelToken = new cancelToken((c) => {
        //     // 自定义唯一标识
        //     pending.push({
        //         u: config.url + '&' + config.method,
        //         f: c
        //     });
        // });

        // do something before request is sent
        return config;
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

        // return config
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

        // removeRepeatUrl(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除

        const res = response.data
        if (response.status == 401) {
            // alert('to/login')
            //   if (res.status === 4000) {
            // Message({
            //   message: res.message || 'Error',
            //   type: 'error',
            //   duration: 5 * 1000
            // })

            // removeToken()

            // 登录失效
            // source.cancel(); // 取消其他正在进行的请求

            router.push({
                    path: '/login'
                })
                // return Promise.reject(new Error(res.message || 'Error'))
                //   }
                //   if (res.status === 400) {
                //     Message({
                //       message: res.message || 'Error',
                //       type: 'error',
                //     })
                //   }


            //   return Promise.reject(new Error(res.message || 'Error'))

        } else if (response.status == 400) {

            Message({
                message: res.message || 'Error',
                type: 'error',
            })

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
        // if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
        //     return new Promise(() => {});
        // } else {
        return Promise.reject(error);
        // }
        // loadinginstace.close()
        // store.commit('app/CLOSE_LOADING')
        // console.log('err' + error.response.status) // for debug
        // Message({
        //   message: error.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        // return Promise.reject(error)
    }
)

export default service