import SockJS from 'sockjs-client'
import isElectron from 'is-electron'
// import { getBatchSendTaskResult, getBatchSendTaskDetail, sethassend } from '@/api/operate/index'
import { Message } from 'element-ui'
let $ipcRenderer;
if (isElectron()) {
    $ipcRenderer = window.require('electron').ipcRenderer
}

const state = {
    sock: null,
    url: process.env.NODE_ENV == 'development' ? '/ws?clientGroup=MANAGER' : '/api/ws?clientGroup=MANAGER',
    batchSendTaskDetail: {
        mediaId: '',
        text: '',
        msgId: '',
        article: ''
    }
}

const mutations = {

}

const actions = {
    createWebsocket({ state, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            state.sock = new SockJS(state.url, null, {
                transports: 'websocket'
            })
            state.sock.onopen = function () {
                console.log('websocket开启')
                if (isElectron()) {
                    $ipcRenderer.on('asynchronous-message-reply', (event, arg) => {
                        console.log(arg)
                        if (arg.val == 1) {
                            Message({
                                message: '企业微信调用失败，没打开企业微信，请重新开始任务！'
                            })
                        } else if (arg.val == 2) {
                            Message({
                                message: '窗口置顶失败，请重新开始任务！'
                            })
                        } else if (arg.val == 3) {
                            Message({
                                message: '请勿移动鼠标，请重新开始任务！'
                            })
                        } else if (arg.val == 4) {
                            Message({
                                message: '手机号错误，请重新开始任务！'
                            })
                        } else if (arg.val == 0) {
                            // 发送成功，调用接口将状态更改为“已发送”
                            if (arg.data.receiverUuid) {
                                // sethassend(arg.data.receiverUuid)
                            }
                        }
                    })
                }

            }
            state.sock.onmessage = function (e) {
                // const data = JSON.parse(e.data)
                // dispatch('getBatchSendTaskDetail', data)
            }
            state.sock.onclose = function () {
                console.log('websocket关闭')
                // 登陆的时候再自动重连
                // if (rootState.user.uuid) {
                //     setTimeout(() => {
                //         dispatch('createWebsocket')
                //     }, 5000)
                // }
            }
            resolve()
        })
    },
    // getBatchSendTaskDetail({ state, dispatch }, data) {
    //     getBatchSendTaskDetail(data.properties.batchSendTaskUuid).then(res => {
    //         state.batchSendTaskDetail = res
    //         dispatch('getBatchSendTaskResult', data)
    //     })
    // },
    // getBatchSendTaskResult({ dispatch }, data) {
    //     getBatchSendTaskResult({
    //         batchSendTaskUuid: data.properties.batchSendTaskUuid,
    //         sendResult: 'NOT_SEND'
    //     }).then(res => {
    //         dispatch('sendMessage', res.items)
    //     })
    // },
    // sendMessage({ dispatch }, list) {
    //     if (state.batchSendTaskDetail.mediaId) {
    //         var Img = new Image()
    //         var dataURL = ''
    //         Img.src = 'http://sidebar.cyscrm.com:9000/public/file/' + state.batchSendTaskDetail.mediaId + '?v=' + Math.random() // 处理缓存,fix缓存bug,有缓存，浏览器会报错;
    //         Img.setAttribute('crossOrigin', 'Anonymous') // 解决控制台跨域报错的问题
    //         Img.onload = function () { //  要先确保图片完整获取到，这是个异步事件
    //             var canvas = document.createElement('canvas') // 创建canvas元素
    //             var width = Img.width // 确保canvas的尺寸和图片一样
    //             var height = Img.height
    //             canvas.width = width
    //             canvas.height = height
    //             canvas.getContext('2d').drawImage(Img, 0, 0, width, height) // 将图片绘制到canvas中
    //             dataURL = canvas.toDataURL('image/jpeg') // 转换图片为dataURL
    //             if (isElectron()) {
    //                 $ipcRenderer.send('clipboardBase64Imge', dataURL)
    //                 list.map(obj => {
    //                     if (obj.userExternalUserRelationship.remarkMobiles != '') {
    //                         dispatch('sendmsg', obj)
    //                     }
    //                 })
    //             }

    //         }
    //     } else {
    //         list.map(obj => {
    //             if (obj.userExternalUserRelationship.remarkMobiles != '') {
    //                 dispatch('sendmsg', obj)
    //             }
    //         })
    //     }
    // },

    // sendmsg({ state }, obj) {
    //     let textContent = obj.batchSendTask.textContent
    //     if (Object.keys(state.batchSendTaskDetail.media).length != 0) {
    //         if (state.batchSendTaskDetail.media.type == 'ARTICLE') {
    //             textContent += '文章链接：' + obj.contentUrl
    //         }
    //     }
    //     if (isElectron()) {
    //         $ipcRenderer.send('asynchronous-message', {
    //             type: state.batchSendTaskDetail.mediaId ? 1 : 2,
    //             mobile: obj.userExternalUserRelationship.remarkMobiles.split(',')[0],
    //             textContent: textContent,
    //             receiverUuid: obj.uuid
    //         })
    //     }
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}