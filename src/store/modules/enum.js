const state ={

    auditState: {
        TO_BE_REVIEWED: '待审核',
        APPROVED:'审核通过',
        AUDIT_FAILED: '审核不通过'
    },
    mediaType: {
        IMAGE: '图片',
        VOICE: '声音',
        FILE: '文件',
        TEXT: '文本',
        ARTICLE: '文章'
    },
    roles:{
        'super':'超级管理员',
        'employee':'员工'
    },
    roleDetail: {
        customerStatistics: '客户统计',
        externalUserTrends:'客户动态',
        quitUserRelationExUserList: '离职成员列表',
        redistributionExUser: '再分配联系人',
        audit: '审核',
        batchSendTask: '群发任务',
        department: '部门',
        externalUser: '客户',
        groupChat:'群聊',
        log: '日志',
        media: '素材',
        mediaGroup: '素材组',
        message: '会话',
        permission: '权限',
        potentialCustomer:'潜在客户',
        role:'角色',
        tag:'标签',
        user: '用户',
        sensitive: '敏感操作',
        menu: '菜单',
        contactWay: '渠道'
    },
}

const mutations={
    
}

const actions= {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}