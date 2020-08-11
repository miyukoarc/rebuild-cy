import SockJS from 'sockjs-client'
import isElectron from 'is-electron'
import { getDetail, getListBatchSendTaskResult, sendResultHasSend, batchSendTaskSuspend } from '@/api/batchSendTask'
import { listSelectMobil, batchAddTaskHandleTask } from '@/api/batchAddTask'
import { sendChaoyingMessage, isOnline, sendCustomizeMessage } from '@/api/longRange'
import { getExternalUserDetail } from '@/api/externalUser'
import { Message, MessageBox, Loading } from 'element-ui';

let $ipcRenderer;
if (isElectron()) {
    $ipcRenderer = window.require('electron').ipcRenderer
}

const state = {
    loadingInstance: null,
    sock: null,
    // url: process.env.NODE_ENV == 'development' ? '/ws?clientGroup=MANAGER' : '/api/ws?clientGroup=MANAGER',
    url: '/api/ws?clientGroup=MANAGER',
    batchSendTaskDetail: {
        mediaId: '',
        text: '',
        msgId: '',
        article: ''
    },


    taskList: [],//队列数组
    taskResult: null,//队列中的当前项

    sendMsgContent: null,
    sendMsgContent_autorep_text: null,
    sendMsgContent_autorep_media: null,



    mouseX: null,
    mouseY: null,


    selectMobiles: [],
    selectMobile: null,
    articleLink: null,

    dialog_visible: false,
    countdown: 10,

    isCheckOpenedSidebar: false,// 只需要第一次打开侧边栏检查即可
    isOpenedSidebar: false,// 是否打开侧边栏，如果10秒没反应，则就是未开启侧边栏
    isChangeState: false,// 是否把“待发送”变为“发送中”，只需改一次即可
}

const mutations = {
    TOGGLE_DIALOG_VISIBLE: (state, flag) => {
        state.dialog_visible = flag;
    }
}

const actions = {
    createWebsocket({ state, commit, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            state.sock = new SockJS(state.url, null, {
                transports: 'websocket'
            })
            state.sock.onopen = function () {
                if (isElectron()) {
                    $ipcRenderer.on('reply-openChat', (event, arg) => {
                        console.log('reply-openChat', arg)
                        if (arg.err) {

                            // 群发出错，任务状态设为“中断”
                            batchSendTaskSuspend({
                                uuids: [state.batchSendTaskDetail.uuid]
                            })


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
                    })
                    $ipcRenderer.on('reply-inputEnter', (event, arg) => {
                        console.log('reply-inputEnter', arg)
                        if (arg.err) {

                            // 群发出错，任务状态设为“中断”
                            batchSendTaskSuspend({
                                uuids: [state.batchSendTaskDetail.uuid]
                            })


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

                        if (state.taskList.length <= 0) {
                            // state.taskList 中没有任务了
                            state.mouseX = null
                            state.mouseY = null

                            state.loadingInstance.close();
                        }
                        // 发送给下一个人
                        sendResultHasSend({ uuids: [state.taskResult.uuid] }).then(() => {

                            // 告诉工作台刷新一下列表页，只执行一次即可
                            if (!state.isChangeState) {
                                state.isChangeState = true
                                sendCustomizeMessage({
                                    toUserId: state.batchSendTaskDetail.sender.userId,
                                    clientGroup: "WORKSPACE",
                                    properties: {
                                        code: 'REFRESH_TASKLIST'
                                    }
                                })
                            }

                            state.taskResult = state.taskList.shift();
                            state.articleLink = state.taskResult.contentUrl;
                            if (state.taskResult.externalUser.mobile) {
                                dispatch('openChat', state.taskResult)
                            } else {
                                dispatch('clearTask')
                                Message({
                                    message: "请为群发客户设置完手机号后再试",
                                    type: 'error'
                                })
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
                }
            }
            state.sock.onmessage = function (e) {
                const data = JSON.parse(e.data)
                if (data.type == 'CONTROL_MANAGER') {
                    MessageBox.confirm('检测到有群发任务！任务执行中请勿挪动鼠标。', {
                        title: "确认发送",
                        cancelButtonText: '放弃'
                    }).then(() => {
                        state.loadingInstance = Loading.service({
                            text: "请保持鼠标静止状态，否则任务会中断。"
                        });
                        dispatch('getDetail', data)
                    }).catch(err => {
                        return false
                    })
                    // commit('TOGGLE_DIALOG_VISIBLE', true)
                }
                else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTINUE_BATCHSENDTASK') {
                    MessageBox.confirm('检测到有群发任务！任务执行中请勿挪动鼠标。', {
                        title: "确认发送",
                        cancelButtonText: '放弃'
                    }).then(() => {
                        state.loadingInstance = Loading.service({
                            text: "请保持鼠标静止状态，否则任务会中断。"
                        });
                        dispatch('getDetail', data)
                    }).catch(err => {
                        return false
                    })
                }
                else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'READY') {
                    state.isOpenedSidebar = true;
                    if (state.sendMsgContent != null && Object.keys(state.sendMsgContent).length > 0) {
                        console.log('onReady')
                        dispatch('sendChaoyingMessage')
                    }
                    if (state.sendMsgContent_autorep_media != null && Object.keys(state.sendMsgContent_autorep_media).length > 0) {
                        console.log('sendMsgContent_autorep_media')
                        sendChaoyingMessage({
                            sendChatMessage: state.sendMsgContent_autorep_media
                        }).then(() => {
                            state.sendMsgContent_autorep_media = null
                        })
                    }
                    if (state.sendMsgContent_autorep_text != null && Object.keys(state.sendMsgContent_autorep_text).length > 0) {
                        console.log('sendMsgContent_autorep_text')
                        sendChaoyingMessage({
                            sendChatMessage: state.sendMsgContent_autorep_text
                        }).then(() => {
                            state.sendMsgContent_autorep_text = null
                        })
                    }
                }
                else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTENT_READY') {
                    $ipcRenderer.send('inputEnter', {
                        x: state.mouseX,
                        y: state.mouseY
                    })
                }
                else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'OPENED_WINDOW_USERID') {
                    getExternalUserDetail(data.properties.userId).then(res => {
                        console.log(state.taskResult.externalUser.name)
                        if (state.taskResult.externalUser.name == res.externalUserDetail.externalUserName) {
                            console.log('直接发送')

                            dispatch('sendChaoyingMessage')
                        } else {
                            console.log("打开openchat")
                            if (state.taskResult.externalUser.mobile) {
                                $ipcRenderer.send('openChat', {
                                    mobile: state.taskResult.externalUser.mobile.split(',')[0],
                                    x: state.mouseX,
                                    y: state.mouseY,
                                })
                            } else {
                                Message({
                                    message: '请先填写对面手机号便于查找用户',
                                    type: 'error'
                                })
                                dispatch('clearTask')
                            }
                        }
                    })
                }
                else if (data.type == 'ADDTASK') {
                    dispatch('listSelectMobil', data)
                }
                else if (data.type == 'AUTOREP') {
                    if (data.properties.mobile) {
                        if (data.properties.content) {
                            state.sendMsgContent_autorep_text = {
                                msgtype: "text",
                                text:
                                {
                                    content: data.properties.content,
                                }
                            }
                        }
                        if (data.properties.autoReplyType == 'IMAGE') {
                            state.sendMsgContent_autorep_media = {
                                msgtype: "image",
                                image:
                                {
                                    mediaid: data.properties.mediaId,
                                }
                            }
                        } else if (data.properties.autoReplyType == 'FILE') {
                            state.sendMsgContent_autorep_media = {
                                msgtype: "file",
                                file:
                                {
                                    mediaid: data.properties.mediaId,
                                }
                            }
                        } else if (data.properties.autoReplyType == 'ARTICLE') {
                            state.sendMsgContent_autorep_media = {
                                msgtype: "news",
                                news:
                                {
                                    link: data.properties.link, //H5消息页面url 必填
                                    title: data.properties.title, //H5消息标题
                                    desc: data.properties.desc, //H5消息摘要
                                    imgUrl: data.properties.imgUrl, //H5消息封面图片URL
                                }
                            }
                        }

                        if (isElectron()) {
                            $ipcRenderer.send('openChat', {
                                mobile: data.properties.mobile,
                                x: state.mouseX,
                                y: state.mouseY,
                            })
                        }

                    }
                }
            }
            state.sock.onclose = function () {
                console.log('websocket关闭')
                // 登陆的时候再自动重连
                setTimeout(() => {
                    dispatch('createWebsocket')
                }, 5000)
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
            if (res.items.length) {
                dispatch('sendMessage', res.items)
            } else {
                Message({
                    message: '该任务已全部群发完成',
                    type: 'success'
                })
                dispatch('clearTask')
            }

        })
    },
    sendMessage({ state, dispatch }, list) {
        if (state.batchSendTaskDetail.textContent) {
            state.sendMsgContent = {
                msgtype: "text", //消息类型，必填
                text: {
                    content: state.batchSendTaskDetail.textContent, //文本内容
                },
            }
        } else if (state.batchSendTaskDetail.tempMediaType == 'IMAGE') {
            state.sendMsgContent = {
                msgtype: "image",
                image: {
                    mediaid: state.batchSendTaskDetail.tempMediaWx,
                }
            }
        } else if (state.batchSendTaskDetail.tempMediaType == 'VIDEO') {
            state.sendMsgContent = {
                msgtype: "video",
                video: {
                    mediaid: state.batchSendTaskDetail.tempMediaWx,
                }
            }
        } else if (state.batchSendTaskDetail.tempMediaType == 'FILE') {
            state.sendMsgContent = {
                msgtype: "file",
                file: {
                    mediaid: state.batchSendTaskDetail.tempMediaWx,
                }
            }
        } else if (state.batchSendTaskDetail.media.type == 'IMAGE') {
            state.sendMsgContent = {
                msgtype: "image",
                image: {
                    mediaid: state.batchSendTaskDetail.media.mediaId, //图片的素材id
                }
            }
        } else if (state.batchSendTaskDetail.media.type == 'ARTICLE') {
            state.sendMsgContent = {
                msgtype: "news",
                news: {
                    //link: state.batchSendTaskDetail.media.url, //H5消息页面url 必填
                    title: state.batchSendTaskDetail.media.title, //H5消息标题
                    desc: state.batchSendTaskDetail.media.description, //H5消息摘要
                    imgUrl: state.batchSendTaskDetail.media.imgUrl, //H5消息封面图片URL
                }
            }
        }

        // 添加到任务队列中
        // state.taskList = list;
        state.taskList = state.taskList.concat(list);
        state.taskResult = state.taskList.shift();



        if (state.taskResult) {
            state.articleLink = state.taskResult.contentUrl;
            dispatch('openChat')
        }
    },

    openChat({ state, dispatch }) {
        // if (isElectron() && state.taskResult.externalUser.mobile) {
        //     $ipcRenderer.send('openChat', {
        //         mobile: state.taskResult.externalUser.mobile.split(',')[0],
        //         x: state.mouseX,
        //         y: state.mouseY,
        //     })
        // } else {
        //     dispatch('clearTask')
        //     state.loadingInstance.close();
        //     Message({
        //         message: "请为群发客户设置完手机号后再试",
        //         type: 'error'
        //     })
        // }

        // 1:当前选择人不在群发人中，会自动打开侧边栏  正常操作即可
        // 2:当前选择人不在群发人中，不会自动打开侧边栏  提示用户打开侧边栏后操作
        // 3:当前选择人在群发人中，已打开侧边栏  问侧边栏用户信息
        // 4:当前选择人在群发人中，未打开侧边栏  提示用户打开侧边栏后操作

        // 每次群发只需判断当前聊天框状态(即只需判断一次)
        if (!state.isCheckOpenedSidebar) {
            console.log('检查侧边栏是否在线')
            state.isOpenedSidebar = false
            isOnline('SIDEBAR').then(res => {
                console.log('是否在线：' + res)
                state.isCheckOpenedSidebar = true;
                // 这是在线情况
                if (res) {
                    console.log("请问你打开的是谁的页面")
                    sendCustomizeMessage({
                        toUserId: state.batchSendTaskDetail.sender.userId,
                        clientGroup: "SIDEBAR",
                        properties: {
                            code: 'WHOSE_WINDOW_DO_YO_OPEN'
                        }
                    })
                }
                // 不在线
                else {
                    if (isElectron() && state.taskResult.externalUser.mobile) {
                        console.log('打开侧边栏了')
                        $ipcRenderer.send('openChat', {
                            mobile: state.taskResult.externalUser.mobile.split(',')[0],
                            x: state.mouseX,
                            y: state.mouseY,
                        })
                    }

                    console.log('开始倒计时')
                    setTimeout(() => {
                        if (state.isOpenedSidebar == false) {
                            Message({
                                message: '请打开侧边栏后重试',
                                type: 'error'
                            })
                            dispatch('clearTask')
                        } else {
                            console.log('111111')
                        }
                    }, 10000);
                }
            })
        } else {
            if (isElectron() && state.taskResult.externalUser.mobile) {
                $ipcRenderer.send('openChat', {
                    mobile: state.taskResult.externalUser.mobile.split(',')[0],
                    x: state.mouseX,
                    y: state.mouseY,
                })
            }
        }
    },

    sendChaoyingMessage({ state }) {
        console.log(state.batchSendTaskDetail)
        if (state.batchSendTaskDetail.media.type == 'ARTICLE' && state.sendMsgContent) {
            state.sendMsgContent.news.link = state.articleLink;
        }
        sendChaoyingMessage({
            sendChatMessage: state.sendMsgContent
        })
    },

    clearTask() {
        console.log('clearTask')
        state.taskList = [];
        state.taskResult = null
        state.sendMsgContent = null
        state.mouseX = null
        state.mouseY = null
        state.selectMobiles = []
        state.selectMobile = null
        state.articleLink = null
        state.isCheckOpenedSidebar = false
        state.isOpenedSidebar = false
        state.isChangeState = false
        state.loadingInstance.close();

        // 告诉工作台刷新一下列表页
        sendCustomizeMessage({
            toUserId: state.batchSendTaskDetail.sender.userId,
            clientGroup: "WORKSPACE",
            properties: {
                code: 'REFRESH_TASKLIST'
            }
        })
    },

    listSelectMobil({ state, dispatch }, data) {
        listSelectMobil({ uuid: data.properties.uuid }).then(res => {
            dispatch("AddCustomerByMobiles", res.items)
        })
    },

    AddCustomerByMobiles({ state }, list) {
        if (isElectron()) {
            state.selectMobiles = list
            let mobiles = [];
            list.map(obj => {
                mobiles.push(obj.potentialCustomer.mobile)
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