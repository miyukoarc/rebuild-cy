import SockJS from 'sockjs-client'
import isElectron from 'is-electron'
import { getDetail, getListBatchSendTaskResult, sendResultHasSend } from '@/api/batchSendTask'
import { listSelectMobil, batchAddTaskHandleTask } from '@/api/batchAddTask'
import { sendChaoyingMessage } from '@/api/longRange'
import { Message } from 'element-ui';

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

    taskList: null,
    sendMsgContent: null,
    sendMsgUuids: null,
    mouseX: null,
    mouseY: null,


    selectMobiles: [],
    selectMobile: null,

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
                        console.log('reply-openChat', arg)
                        if (arg.err) {
                            dispatch('clearTask')
                            Message({
                                message: arg.err.message,
                                type: 'error'
                            })
                            return;
                        } else {
                            state.mouseX = arg.res.x
                            state.mouseY = arg.res.y
                        }
                        //显不处理，以后再说！！！！！！！！！！！！！！！
                    })
                    $ipcRenderer.on('reply-inputEnter', (event, arg) => {
                        console.log('reply-inputEnter', arg)
                        if (arg.err) {
                            dispatch('clearTask')
                            Message({
                                message: arg.err.message,
                                type: 'error'
                            })
                            return;
                        } else {
                            state.mouseX = arg.res.x
                            state.mouseY = arg.res.y
                        }
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

                    $ipcRenderer.on('reply-AddCustomerByMobiles', (event, arg) => {
                        console.log('reply-AddCustomerByMobiles', arg)
                        if (arg.err) {
                            dispatch('clearTask')
                            Message({
                                message: arg.err.message,
                                type: 'error'
                            })
                            return;
                        }
                        console.log(state.selectMobiles)

                        let payload = [];
                        state.selectMobiles.map(obj => {
                            payload.push({
                                addResult: "SUCCESS",
                                uuid: obj.uuid
                            })
                        })

                        batchAddTaskHandleTask(payload).then().catch(() => {
                            dispatch('clearTask')
                        })
                    })

                    $ipcRenderer.on('reply-SendMessage', (event, arg) => {
                        console.log('reply-SendMessage', arg)
                    })
                }
            }
            state.sock.onmessage = function (e) {
                const data = JSON.parse(e.data)

                console.log('aaa')
                console.log(data.properties)

                if (data.type == 'CONTROL_MANAGER') {
                    console.log(1)
                    dispatch('getDetail', data)
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'READY') {
                    console.log(2)
                    if (state.sendMsgContent != null && Object.keys(state.sendMsgContent).length > 0) {
                        dispatch('sendChaoyingMessage', data)
                    }
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTENT_READY') {
                    console.log(3)
                    $ipcRenderer.send('inputEnter', {
                        x: state.mouseX,
                        y: state.mouseY
                    })
                } else if (data.type == 'ADDTASK') {
                    console.log(4)
                    dispatch('listSelectMobil', data)
                } else if (data.type == 'AUTOREP') {
                    console.log(5)
                    if (data.properties.mobile) {
                        $ipcRenderer.send('SendMessage', {
                            type: 0,
                            mobile: data.properties.mobile,
                            textContent: data.properties.content
                        })
                    }
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
            console.log('a', state.batchSendTaskDetail)
            console.log('a', data)
            dispatch('getListBatchSendTaskResult', data)
        })
    },
    getListBatchSendTaskResult({ dispatch }, data) {
        getListBatchSendTaskResult({
            batchSendTaskUuid: data.properties.batchSendTaskUuid,
            sendResult: 'NOT_SEND'
        }).then(res => {
            console.log('b', data)
            console.log('b', res.items)
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
        console.log('c', state.batchSendTaskDetail)
        state.taskList = list;
        let taskResult = state.taskList.pop();
        console.log('c', state.taskList)
        console.log('c', state.taskList)
        if (taskResult) {
            if (taskResult.userExternalUserRelationship.remarkMobiles != '') {
                dispatch('openChat', taskResult)
            }
        }
    },

    openChat({ state }, obj) {
        console.log('d', obj)
        if (isElectron()) {
            state.sendMsgUuids = obj.uuid
            console.log('d')
            $ipcRenderer.send('openChat', {
                mobile: obj.userExternalUserRelationship.remarkMobiles.split(',')[0],
                x: state.mouseX,
                y: state.mouseY,
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
        state.selectMobiles = []
        state.selectMobile = null
    },

    listSelectMobil({ state, dispatch }, data) {
        listSelectMobil({ uuid: data.properties.uuid }).then(res => {
            dispatch("AddCustomerByMobiles", res.items)
        })
    },

    // AddCustomerByMobiles({ state }, obj) {
    //     console.log(222)
    //     if (isElectron()) {
    //         state.selectMobile = obj.uuid
    //         $ipcRenderer.send('AddCustomerByMobiles', {
    //             mobiles: obj.potentialCustomer.mobile,
    //             x: state.mouseX,
    //             y: state.mouseY,
    //         })
    //     }
    // },

    AddCustomerByMobiles({ state }, list) {
        console.log(222)
        if (isElectron()) {
            state.selectMobiles = list
            console.log(list)

            let mobiles = [];
            list.map(obj => {
                mobiles.push(obj.potentialCustomer.mobile)
            })

            console.log({
                mobiles: mobiles,
                x: state.mouseX,
                y: state.mouseY,
            })

            $ipcRenderer.send('AddCustomerByMobiles', {
                mobiles: mobiles,
                x: state.mouseX,
                y: state.mouseY,
            })
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}