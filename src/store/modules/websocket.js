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
    url: '/api/ws?clientGroup=MANAGER',
    batchSendTaskDetail: {
        mediaId: '',
        text: '',
        msgId: '',
        article: ''
    },

    taskQueue: null, // 新版任务队列
    currentTask: null, // 当前任务

    sendMsgContent: null,
    sendMsgContent_autorep_text: null,
    sendMsgContent_autorep_media: null,

    mouseX: null,
    mouseY: null,

    selectMobiles: [],
    addTaskCount: 0,

    isCheckOpenedSidebar: false, // 只需要第一次打开侧边栏检查即可
    isOpenedSidebar: null, // 是否打开侧边栏，如果10秒没反应，则就是未开启侧边栏
    isChangeState: false, // 是否把“待发送”变为“发送中”，只需改一次即可

    isInProgress: false, // 当前是否处于任务执行期间：默认否

    isLock: null,
    isLockTemp: false,

    countDown: 5,
    countDownTimer: null,
}

const mutations = {

}

const actions = {
    createWebsocket({ state, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            class Queue extends Array {
                constructor(...args) {
                    super(...args)
                }
                push(...args) {
                    super.push(...args);
                    if (args.length == this.length && !state.isInProgress) {
                        this.shift()
                    }
                }
                shift() {
                    state.currentTask = super.shift();
                    if (typeof state.currentTask == 'undefined') {
                        // 任务是否进行中：否
                        state.isInProgress = false
                        // 任务队列全部执行完成，清空列表
                        console.log('任务队列全部执行完成，清空列表')
                        dispatch('clearTask')
                    } else {
                        if (state.isLock) {
                            $ipcRenderer.send("UnlockScreen", {})
                            state.isLockTemp = true
                        }
                        state.isInProgress = true;
                        // 群发队列
                        if (state.currentTask.automationType == "BatchSendTask") {
                            dispatch('openChat')
                        }
                        // 自动回复队列
                        else if (state.currentTask.automationType == 'AUTOREP') {
                            dispatch('beforeAutoRep')
                        }
                        // 批量添加好友队列
                        else if (state.currentTask.automationType == 'ADDTASK') {
                            $ipcRenderer.send('AddCustomerByMobiles', {
                                mobiles: [state.currentTask.mobile],
                                x: state.mouseX,
                                y: state.mouseY,
                            })
                        }
                        return state.currentTask;
                    }
                }
            }

            state.taskQueue = new Queue()
            state.taskQueue.push = Queue.prototype.push.bind(state.taskQueue)
            state.taskQueue.shift = Queue.prototype.shift.bind(state.taskQueue)

            state.sock = new SockJS(state.url, null, {
                transports: 'websocket'
            })
            state.sock.onopen = function () {
                if (isElectron()) {
                    $ipcRenderer.on('reply-IsLock', (event, arg) => {
                        console.log('reply-IsLock', arg)
                        state.isLock = arg.res
                        sendCustomizeMessage({
                            toUserId: rootState.user.userId,
                            clientGroup: "WORKSPACE",
                            properties: {
                                code: 'ISLOCK',
                                isLock: state.isLock
                            }
                        })
                    })
                    $ipcRenderer.on('reply-LockScreen', (event, arg) => {
                        console.log('reply-LockScreen', arg)
                        state.isLock = true
                    })
                    $ipcRenderer.on('reply-UnlockScreen', (event, arg) => {
                        console.log('reply-UnlockScreen', arg)
                        state.isLock = false
                    })
                    $ipcRenderer.on('reply-openChat', (event, arg) => {
                        console.log('reply-openChat', arg)
                        if (arg.err) {
                            // 群发出错，任务状态设为“中断”
                            if (state.currentTask.automationType == 'BatchSendTask') {
                                batchSendTaskSuspend({
                                    uuids: [state.batchSendTaskDetail.uuid]
                                })
                            }
                            dispatch('clearTask')
                            Message({
                                message: arg.err.message,
                                type: 'error'
                            })
                            return;
                        } else {
                            state.mouseX = arg.res.x
                            state.mouseY = arg.res.y

                            // 自动回复
                            if (arg.val.isOnline_autorep) {
                                if (state.sendMsgContent_autorep_media != null && Object.keys(state.sendMsgContent_autorep_media).length > 0) {
                                    console.log('最新的sendMsgContent_autorep_media')
                                    sendChaoyingMessage({
                                        sendChatMessage: state.sendMsgContent_autorep_media
                                    }).then(() => {
                                        state.sendMsgContent_autorep_media = null
                                    })
                                }
                                if (state.sendMsgContent_autorep_text != null && Object.keys(state.sendMsgContent_autorep_text).length > 0) {
                                    console.log('最新的sendMsgContent_autorep_text')
                                    sendChaoyingMessage({
                                        sendChatMessage: state.sendMsgContent_autorep_text
                                    }).then(() => {
                                        state.sendMsgContent_autorep_text = null
                                    })
                                }
                            }

                            // 群发
                            if (arg.val.isOnline_batchSendTask) {
                                if (state.sendMsgContent != null && Object.keys(state.sendMsgContent).length > 0) {
                                    dispatch('sendChaoyingMessage')
                                }
                            }


                        }
                    })
                    $ipcRenderer.on('reply-inputEnter', (event, arg) => {
                        console.log('reply-inputEnter', arg)
                        if (arg.err) {
                            if (state.currentTask.automationType == 'BatchSendTask') {
                                // 群发出错，任务状态设为“中断”
                                batchSendTaskSuspend({
                                    uuids: [state.batchSendTaskDetail.uuid]
                                })
                            }
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
                        console.log(state.currentTask)
                        if (state.currentTask.automationType == 'BatchSendTask') {
                            // 设置状态为已发送
                            sendResultHasSend({ uuids: [state.currentTask.uuid] }).then(() => {
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
                            })
                        }
                        // 当前任务结束，状态：是否进行中 - 否
                        state.isInProgress = false;
                        // 执行队列中的下一个任务
                        state.taskQueue.shift();
                    })
                    $ipcRenderer.on('reply-AddCustomerByMobiles', (event, arg) => {
                        if (arg.err) {
                            console.log('reply-AddCustomerByMobiles', arg)
                            let payload = state.selectMobiles.slice(0, state.addTaskCount).map(obj => {
                                return {
                                    addResult: "SUCCESS",
                                    uuid: obj.uuid
                                }
                            })
                            batchAddTaskHandleTask(payload)
                            Message({
                                message: arg.err.message,
                                type: 'error'
                            })
                            dispatch('clearTask')
                            return;
                        } else {
                            state.addTaskCount++;
                            if (state.selectMobiles.length == state.addTaskCount) {
                                let payload = state.selectMobiles.map(obj => {
                                    return {
                                        addResult: "SUCCESS",
                                        uuid: obj.uuid
                                    }
                                })
                                batchAddTaskHandleTask(payload)
                                state.selectMobiles = [];
                                state.addTaskCount = 0;
                            }
                            // 当前任务结束，状态：是否进行中-否
                            state.isInProgress = false;
                            // 执行队列中的下一个任务
                            state.taskQueue.shift();
                        }
                    })
                }
            }
            state.sock.onmessage = function (e) {
                const data = JSON.parse(e.data)
                if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTINUE_BATCHSENDTASK') {
                    MessageBox.confirm('检测到有群发任务！任务执行中请勿挪动鼠标。', {
                        title: '即将为您自动群发',
                        cancelButtonText: '放弃',
                        customClass: "auto_close",
                        distinguishCancelAndClose: true
                    }).then(() => {
                        state.loadingInstance = Loading.service({
                            text: "请保持鼠标静止状态，否则任务会中断。"
                        });
                        clearInterval(state.countDownTimer)
                        dispatch('getDetail', data)
                    }).catch(action => {
                        clearInterval(state.countDownTimer);
                        state.countDown = 5;
                        if (action == 'cancel') {
                            Message({
                                message: '您已取消自动群发中...',
                                type: 'error'
                            })
                        }
                        return false
                    })
                    state.countDownTimer = setInterval(() => {
                        console.log(state.countDown)
                        state.countDown--;
                        if (state.countDown <= 0) {
                            clearInterval(state.countDownTimer)
                            dispatch('getDetail', data)
                            state.countDown = 5;
                            // 自动关闭 MessageBox
                            document.querySelector('.auto_close').querySelector('button').click()
                        }
                    }, 1000);
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'READY') {
                    state.isOpenedSidebar = true;// 侧边栏已打开
                    if (state.sendMsgContent != null && Object.keys(state.sendMsgContent).length > 0) {
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
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'CONTENT_READY') {
                    $ipcRenderer.send('inputEnter', {
                        x: state.mouseX,
                        y: state.mouseY
                    })
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'OPENED_WINDOW_USERID') {
                    getExternalUserDetail(data.properties.userId).then(res => {
                        $ipcRenderer.send('openChat', {
                            mobile: state.currentTask.externalUser.mobile.split(',')[0],
                            x: state.mouseX,
                            y: state.mouseY,
                            isOnline_batchSendTask: state.currentTask.externalUser.name == res.externalUserDetail.externalUserName
                        })
                    })
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'OPENED_WINDOW_USERID_AUTOREP') {
                    getExternalUserDetail(data.properties.userId).then(res => {
                        $ipcRenderer.send('openChat', {
                            mobile: state.currentTask.data.properties.mobile.split(',')[0],
                            x: state.mouseX,
                            y: state.mouseY,
                            isOnline_autorep: state.currentTask.data.properties.fromUser == res.externalUserDetail.externalUserId
                        })
                    })
                } else if (data.type == 'ADDTASK') {
                    dispatch('listSelectMobil', data)
                } else if (data.type == 'AUTOREP') {
                    if (data.properties.content) {
                        state.taskQueue.push({
                            automationType: "AUTOREP",
                            data: {
                                toUserId: data.toUserId,
                                properties: {
                                    ...data.properties,
                                    autoReplyType: null,
                                    mediaId: null,
                                },
                                title: data.title,
                                text: data.text,
                            },
                        })
                    }
                    if (data.properties.autoReplyType != 'CONTENT' && data.properties.mediaId) {
                        state.taskQueue.push({
                            automationType: "AUTOREP",
                            data: {
                                toUserId: data.toUserId,
                                properties: {
                                    ...data.properties,
                                    content: null,
                                },
                                title: data.title,
                                text: data.text,
                            },
                        })
                    }
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'LOCKSCREEN') {
                    if (!state.isLock) {
                        $ipcRenderer.send('LockScreen', {})
                    }
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'UNLOCKSCREEN') {
                    if (state.isLock) {
                        $ipcRenderer.send('UnlockScreen', {})
                    }
                } else if (data.type == 'CUSTOMIZE' && Object.keys(data.properties).length && data.properties.code == 'ISLOCK') {
                    $ipcRenderer.send('IsLock', {})
                }
            }
            state.sock.onclose = function () {
                console.log('websocket关闭')
                dispatch('clearTask')
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
        let newList = list.map(obj => {
            return {
                ...obj,
                automationType: 'BatchSendTask'
            }
        })
        state.taskQueue.push(...newList)
    },

    openChat({ state, dispatch }) {
        if (!state.currentTask.externalUser.mobile) {
            Message({
                message: '请为客户设置手机号后重试',
                type: 'error'
            })
            dispatch('clearTask')
            return false
        }

        // 每次群发只需判断当前聊天框状态(即只需判断一次)
        if (!state.isCheckOpenedSidebar) {
            isOnline('SIDEBAR').then(res => {
                console.log('是否在线：' + res)
                state.isCheckOpenedSidebar = true;
                state.isOpenedSidebar = res;
                if (isElectron()) {
                    if (res) {
                        sendCustomizeMessage({
                            toUserId: state.batchSendTaskDetail.sender.userId,
                            clientGroup: "SIDEBAR",
                            properties: {
                                code: 'WHOSE_WINDOW_DO_YO_OPEN'
                            }
                        })
                    } else {
                        $ipcRenderer.send('openChat', {
                            mobile: state.currentTask.externalUser.mobile.split(',')[0],
                            x: state.mouseX,
                            y: state.mouseY,
                            isOnline_batchSendTask: false
                        })

                        console.log('开始倒计时')
                        setTimeout(() => {
                            if (state.isOpenedSidebar == false) {
                                Message({
                                    message: '请打开侧边栏后重试',
                                    type: 'error'
                                })
                                dispatch('clearTask')
                            }
                        }, 10000);
                    }
                }
            })
        } else {
            if (isElectron() && state.currentTask.externalUser.mobile) {
                $ipcRenderer.send('openChat', {
                    mobile: state.currentTask.externalUser.mobile.split(',')[0],
                    x: state.mouseX,
                    y: state.mouseY,
                })
            } else {
                Message({
                    message: '请为客户设置手机号后重试',
                    type: 'error'
                })
                dispatch('clearTask')
            }
        }
    },
    beforeAutoRep({ state, dispatch }) {
        let data = state.currentTask.data;
        if (!data.properties.mobile) {
            Message({
                message: '请为客户设置手机号后重试',
                type: 'error'
            })
            dispatch('clearTask')
            return false
        }

        if (data.properties.content) {
            state.sendMsgContent_autorep_text = {
                msgtype: "text",
                text: {
                    content: data.properties.content,
                }
            }
        }
        if (data.properties.autoReplyType == 'IMAGE') {
            state.sendMsgContent_autorep_media = {
                msgtype: "image",
                image: {
                    mediaid: data.properties.mediaId,
                }
            }
        } else if (data.properties.autoReplyType == 'FILE') {
            state.sendMsgContent_autorep_media = {
                msgtype: "file",
                file: {
                    mediaid: data.properties.mediaId,
                }
            }
        } else if (data.properties.autoReplyType == 'ARTICLE') {
            state.sendMsgContent_autorep_media = {
                msgtype: "news",
                news: {
                    link: data.properties.link, //H5消息页面url 必填
                    title: data.properties.title, //H5消息标题
                    desc: data.properties.desc, //H5消息摘要
                    imgUrl: data.properties.imgUrl, //H5消息封面图片URL
                }
            }
        }
        dispatch('openChat_autorep')
    },
    openChat_autorep({ state, dispatch }) {
        isOnline('SIDEBAR').then(res => {
            console.log('是否在线：' + res)
            if (isElectron()) {
                state.isOpenedSidebar = res;
                if (res) {
                    console.log('自动回复：你打开的是哪个客户的侧边栏')
                    sendCustomizeMessage({
                        toUserId: state.currentTask.data.toUserId,
                        clientGroup: "SIDEBAR",
                        properties: {
                            code: 'WHOSE_WINDOW_DO_YO_OPEN_AUTOREP'
                        }
                    })
                } else {
                    $ipcRenderer.send('openChat', {
                        mobile: state.currentTask.data.properties.mobile.split(',')[0],
                        x: state.mouseX,
                        y: state.mouseY,
                        isOnline_autorep: false
                    })

                    setTimeout(() => {
                        if (state.isOpenedSidebar == false) {
                            Message({
                                message: '请打开侧边栏后重试',
                                type: 'error'
                            })
                            dispatch('clearTask')
                        }
                    }, 10000);
                }
            }
        })
    },

    sendChaoyingMessage({ state }) {
        if (state.batchSendTaskDetail.media.type == 'ARTICLE' && state.sendMsgContent) {
            state.sendMsgContent.news.link = state.currentTask.contentUrl
        }
        sendChaoyingMessage({
            sendChatMessage: state.sendMsgContent
        })
    },

    clearTask() {
        console.log('clearTask')
        if (state.isLockTemp) {
            $ipcRenderer.send("LockScreen", {})
        }
        // 初始化数据
        state.taskQueue.length = 0;
        state.currentTask = null
        state.sendMsgContent = null
        state.mouseX = null
        state.mouseY = null
        state.selectMobiles = []
        state.addTaskCount = 0
        state.isCheckOpenedSidebar = false
        state.isOpenedSidebar = null
        state.isChangeState = false
        state.isInProgress = false
        state.isLockTemp = false
        // 清除加载图标
        if (state.loadingInstance) {

            state.loadingInstance.close();
        }
        // 刷新移动端群发页面
        if (state.batchSendTaskDetail && state.batchSendTaskDetail.sender) {
            sendCustomizeMessage({
                toUserId: state.batchSendTaskDetail.sender.userId,
                clientGroup: "WORKSPACE",
                properties: {
                    code: 'REFRESH_TASKLIST'
                }
            })
        }

    },

    listSelectMobil({ dispatch }, data) {
        listSelectMobil({ uuid: data.properties.uuid }).then(res => {
            dispatch("AddCustomerByMobiles", res.items)
        })
    },

    AddCustomerByMobiles({ state }, list) {
        if (isElectron()) {
            state.selectMobiles.push(...list)
            let addTasks = list.map(obj => {
                return {
                    uuid: obj.uuid,
                    mobile: obj.potentialCustomer.mobile,
                    automationType: "ADDTASK"
                }
            })
            state.taskQueue.push(...addTasks)
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}