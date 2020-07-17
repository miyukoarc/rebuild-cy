import SockJS from 'sockjs-client'
import isElectron from 'is-electron'
import { getDetail, getListBatchSendTaskResult, sendResultHasSend } from '@/api/batchSendTask'
import { sendChaoyingMessage } from '@/api/longRange'
let $ipcRenderer;
if (isElectron()) {
    $ipcRenderer = window.require('electron').ipcRenderer
}

const state = {
    sock: null,
    // url: process.env.NODE_ENV == 'development' ? '/ws?clientGroup=MANAGER' : '/api/ws?clientGroup=MANAGER',
    url: '/api/ws?clientGroup=MANAGER',
    batchSendTaskDetail: {
        mediaId: '',
        text: '',
        msgId: '',
        article: ''
    },

    sendMsgContent: null,
    sendMsgUuids: null,
    mouseX: null,
    mouseY: null,
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
                    $ipcRenderer.on('reply-openChat', (event, arg) => {

                        console.log(arg)
                        //显不处理，以后再说！！！！！！！！！！！！！！！
                    })
                    $ipcRenderer.on('reply-inputEnter', (event, arg) => {
                        console.log(arg)
                        sendResultHasSend({ uuids: [state.sendMsgUuids] }).then(() => {

                            let taskResult = state.taskList.pop();
                            if (taskResult) {
                                if (taskResult.userExternalUserRelationship.remarkMobiles != '') {
                                    dispatch('openChat', taskResult)
                                }
                            }
                        }).catch(e => {
                            dispatch('clearTask')
                        })
                    })
                }
            }
            state.sock.onmessage = function (e) {
                const data = JSON.parse(e.data)
                if (data.type == 'CONTROL_MANAGER') {
                    dispatch('getDetail', data)
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'READY') {
                    if (state.sendMsgContent != null) {
                        dispatch('sendChaoyingMessage', data)
                    }
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTENT_READY') {
                    $ipcRenderer.send('inputEnter', {
                    })
                }
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
    getDetail({ state, dispatch }, data) {
        getDetail(data.properties.batchSendTaskUuid).then(res => {
            state.batchSendTaskDetail = res
            dispatch('getListBatchSendTaskResult', data)
        })
    },
    getListBatchSendTaskResult({ dispatch }, data) {
        getListBatchSendTaskResult({
            batchSendTaskUuid: data.properties.batchSendTaskUuid,
            sendResult: 'NOT_SEND'
        }).then(res => {
            dispatch('sendMessage', res.items)
        })
    },
    sendMessage({ dispatch }, list) {
        if (state.batchSendTaskDetail.media.type == 'IMAGE') {
            state.sendMsgContent = {
                msgtype: "image",
                image:
                {
                    mediaid: state.batchSendTaskDetail.media.mediaId, //图片的素材id
                }
            }
        } else if (state.batchSendTaskDetail.media.type == 'ARTICLE') {
            state.sendMsgContent = {
                msgtype: "news",
                news:
                {
                    link: state.batchSendTaskDetail.media.url, //H5消息页面url 必填
                    title: state.batchSendTaskDetail.media.title, //H5消息标题
                    desc: state.batchSendTaskDetail.media.description, //H5消息摘要
                    imgUrl: state.batchSendTaskDetail.media.imgUrl, //H5消息封面图片URL
                }
            }
        } else if (state.batchSendTaskDetail.textContent) {
            state.sendMsgContent = {
                msgtype: "text", //消息类型，必填
                text: {
                    content: state.batchSendTaskDetail.textContent, //文本内容
                },
            }
        }

        state.taskList = list;

        let taskResult = state.taskList.pop();
        if (taskResult) {
            if (taskResult.userExternalUserRelationship.remarkMobiles != '') {
                dispatch('openChat', taskResult)
            }
        }
        // list.map(obj => {
        //     if (obj.userExternalUserRelationship.remarkMobiles != '') {
        //         dispatch('openChat', obj)
        //     }
        // })


    },

    openChat({ }, obj) {
        if (isElectron()) {
            state.sendMsgUuids = obj.uuid
            $ipcRenderer.send('openChat', {
                mobile: obj.userExternalUserRelationship.remarkMobiles.split(',')[0],
            })
        }
    },

    sendChaoyingMessage({ state }, obj) {
        sendChaoyingMessage({
            sendChatMessage: state.sendMsgContent
        }).then(res => {

        })
    },

    clearTask() {
        state.taskList = null
        state.sendMsgUuids = null
        state.sendMsgContent = null
        state.mouseX = null
        state.mouseY = null
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}