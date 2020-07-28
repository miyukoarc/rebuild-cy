/*
 * @Author: your name
 * @Date: 2020-06-27 14:05:27
 * @LastEditTime: 2020-07-28 11:28:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import {
  MessageBox
} from 'element-ui'

import animated from 'animate.css' // npm install animate.css --save安装，在引入

Vue.use(animated)

import '@/styles/index.scss' // global css
import 'default-passive-events'

import App from './App'
import store from './store'
import router from './router'

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import './directive/directives'

import '@/icons' // icon
import '@/permission' // permission control

import isElectron from 'is-electron'
/**
 * 全局组件
 */
import TButton from '@/components/ThrottleButton/index'
import ElSelectTree from 'el-select-tree'

Vue.use(ElSelectTree)

// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)


import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '275c08bcc088407d1818818d913a6b96',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }


/**
 * 
 * @electron环境判断
 */

Vue.prototype.$isElectron = isElectron
if (isElectron()) {
  // const electron = window.require('electron')
  /*
  Vue.prototype.$remote = remote
  const {BrowserWindow} = remote
  Vue.prototype.$BrowserWindow = BrowserWindow
  */

  // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

  // ipcRenderer.on('asynchronous-reply', (event, arg) => {
  //   console.log(arg) // prints "pong"
  // })
  // ipcRenderer.send('asynchronous-message', 'ping')
  // console.log(remote)
}

Vue.component(TButton.name, TButton)

// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: 'small'
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
Vue.prototype.$confirm = MessageBox.confirm;



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
