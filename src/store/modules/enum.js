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
    }
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