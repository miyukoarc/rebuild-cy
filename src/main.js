import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import {MessageBox} from 'element-ui'

import '@/styles/index.scss' // global css
import 'default-passive-events'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import isElectron from 'is-electron'
/**
 * 全局组件
 */
import TButton from '@/components/ThrottleButton/index'


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

if (isElectron()) {
    // console.log('electron')
    const electron = window.require('electron')
    const {
      ipcRenderer,
      remote
    } = electron
    Vue.prototype.$ipcRenderer = ipcRenderer
    Vue.prototype.$remote = remote
    Vue.prototype.$isElectron = isElectron
    const {BrowserWindow} = remote
    Vue.prototype.$BrowserWindow = BrowserWindow
  
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
  
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
    // ipcRenderer.send('asynchronous-message', 'ping')
    // console.log(remote)
  }

Vue.component(TButton.name,TButton)

// set ElementUI lang to EN
Vue.use(ElementUI)
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
