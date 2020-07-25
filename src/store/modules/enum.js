/*
 * @Author: your name
 * @Date: 2020-07-09 18:50:40
 * @LastEditTime: 2020-07-25 17:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\modules\enum.js
 */
const state = {

    auditState: {
        TO_BE_REVIEWED: '待审核',
        APPROVED: '审核通过',
        AUDIT_FAILED: '审核不通过'
    },
    mediaType: {
        IMAGE: '图片',
        VOICE: '声音',
        FILE: '文件',
        TEXT: '文本',
        ARTICLE: '文章'
    },
    roles: {
        'super': '超级管理员',
        'employee': '员工'
    },
    roleDetail: {
        customerStatistics: '客户统计',
        externalUserTrends: '客户动态',
        quitUserRelationExUserList: '离职成员列表',
        redistributionExUser: '再分配联系人',
        audit: '审核',
        batchSendTask: '群发任务',
        department: '部门',
        externalUser: '客户',
        groupChat: '群聊',
        log: '日志',
        media: '素材',
        mediaGroup: '素材组',
        message: '会话',
        permission: '权限',
        potentialCustomer: '潜在客户',
        role: '角色',
        tag: '标签',
        user: '用户',
        sensitive: '敏感操作',
        menu: '菜单',
        contactWay: '渠道'
    },
    orgType: {
        HEAD: '总公司',
        BRANCH: '分公司',
        BUSINESS: '营业部',
        DEPT: '普通部门'
    },
    quitUserRelationExUserListUserStatus: {
        ALLOCATE: '离职待分配',
        ALLOCATED: '离职已分配'
    },
    mediaType: {
        IMAGE: '图片',
        FILE: '文件',
        VIDEO: '视频',
        ARTICLE: '文章',
        TEXT: '文本'
    },
    batchAddTask: {
        NOTSTARTED: "未开始",
        INTERRUPT: "中断",
        PROCESSING: "进行中",
        CANCELED: "已取消",
        FINISHED: "已完成",
    },
    batchAddTaskState: {
        AUDIT: '临时',
        REJECTED: '审核通过',
        PENDING: '待发送',
        SENDING: '发送中',
        SUSPEND: '发送失败',
        FINISHED: '已发送'
    },
    batchAddTaskSendResult: {
        NOT_SEND: '',
        HAS_SEND: '',
        NOT_FRIEND_FAIL: '',
        HAS_RECEIVED_FAIL: '',
        HAS_RECEIVED: '',
        HAS_READ_ARTICLE: ''
    },
    chatContentType: {
        link: '[链接]',
        file: '[文件]',
        voice: '[语音]',
        image: '[图片]',
        video: '[视频]',
        card: '[名片]',
        weapp: '[小程序]',
        chatrecord: '[会话记录消息]',
        vote: '[投票消息]',
        collect: '[填表消息]',
        redpacket: '[红包消息]',
        meeting: '[会议邀请消息]',
        docmsg: '[在线文档消息]',
        markdown: '[MarkDown格式消息]',
        news: '[图文消息]',
        calendar: '[日程消息]',
        revoke: '[撤回消息]',
        agree: '[同意会话聊天内容]'
    }

}

const mutations = {

}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}