import {
  getActionListAll,
  getLog,
  getSensitiveListAll,
  getAuditPermissionlistAll,
  getAuditTaglistAll,
  getAuditBatchSendTaklistAll,
  add,
  deleteSensitive,
  updateNoticeUser,
  update,
  setAuditCloseOrOpen,
  auditPropertylistAll,
  setAuditUser,
  auditMediaListAll,
  auditDetail,
} from '@/api/sensitive'

function buildAuditSetting(arr) {
  let temp = {}
  arr.forEach(item => {
    Object.defineProperty(temp, item.moduleCode, {
      value: item.openState,
      writable: true,
      enumerable: true,
      configurable: true
    })
  })

  return temp
}

function regFilter(str) {
  if (str !== null) {
    if (str.includes('span')) {
      const reg = new RegExp("<\s*div[^>]*>(.*?)<\s*/\s*div>", "g")
      let temp = ''
      temp = str.split(reg).find(item => {
        return !item.includes('span') && item !== ''
      })
      if (temp) {

        return temp
      } else {
        return '--'
      }
    } else {

      return str
    }
  } else {
    return '--'
  }
}

function myFilter(arr1, arr2) {
  let arr1Temp = []
  let arr2Temp = []
  let temp = [] //交集
  arr1.forEach(item1 => {
    arr2.forEach(item2 => {
      if (item1.tagId === item2.tagId) {
        temp.push(item1)
      }
    })
  })

  arr1.forEach(item => {
    if (!temp.find(unit => {
        return unit.tagId === item.tagId
      })) {
      arr1Temp.push(item)
    }
  })

  arr2.forEach(item => {
    if (!temp.find(unit => {
        return unit.tagId === item.tagId
      })) {

      arr2Temp.push(item)
    }
  })


  return [
    [...arr1Temp],
    [...arr2Temp],
    [...temp]
  ]
}


const state = {
  /**
   * public state
   */
  loading: false,
  /**
   * 权限审核列表
   */
  auditPermissionlist: [],
  currentRow: [],
  auditPermissionPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0,
  },

  /**
   * 标签审核列表
   */
  auditTaglist: [],
  currentAuditTag: [],
  auditTagPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 敏感词
   */
  sensitiveListAll: [],
  currentWord: {},
  sensitivePage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 敏感词记录
   */
  logListAll: [],
  logListAllPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 敏感动作列表
   */

  actionListAll: [],
  actionPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },


  auditBatchSendTaskListAll: [],
  auditBatchSendTaskPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  propertyListAll: [],
  propertyPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },
  /**
   * 素材审核
   */
  auditMediaList: [],
  auditMediaPage: {
    total: 0,
    pageSize: 0,
    pageNumber: 0
  },

  /**
   * 审核开启状态
   */
  auditSetting: {}




}


const mutations = {
  /**
   * 保存权限审核列表
   */
  SAVE_PERMISSIONLIST(state, payload) {
    state.auditPermissionlist = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SAVE_DETAIL(state, payload) {
    state.currentRow = payload
  },
  SET_PERMISSIONPAGE(state, payload) {

    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.auditPermissionPage.total = total
    state.auditPermissionPage.pageNumber = pageNumber
    state.auditPermissionPage.pageSize = pageSize
  },

  /**
   * 保存标签审核列表
   * @param {*} state 
   * @param {*} payload 
   */
  SAVE_TAGLIST(state, payload) {
    state.auditTaglist = payload
  },
  SAVE_TAGDETAIL(state, payload) {
    state.currentAuditTag = payload
  },
  SET_TAGPAGE(state, payload) {

    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.auditTagPage.total = total
    state.auditTagPage.pageNumber = pageNumber
    state.auditTagPage.pageSize = pageSize
  },

  /**
   * 保存敏感词列表
   */
  SAVE_SENSITIVELIST(state, payload) {
    state.sensitiveListAll = payload
  },
  SET_SENSITIVEPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.sensitivePage.total = total
    state.sensitivePage.pageNumber = pageNumber
    state.sensitivePage.pageSize = pageSize
  },
  SAVE_CURRENTWORD(state, payload) {
    state.currentWord = payload
  },

  /**
   * 保存敏感词记录列表
   */
  SAVE_LOGLIST(state, payload) {
    state.logListAll = payload
  },
  SET_LOGPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.logListAllPage.total = total
    state.logListAllPage.pageNumber = pageNumber
    state.logListAllPage.pageSize = pageSize
  },

  /**
   * 保存敏感操作列表
   */
  SAVE_ACTIONLIST(state, payload) {
    state.actionListAll = payload
  },
  SET_ACTIONPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.actionPage.total = total
    state.actionPage.pageNumber = pageNumber
    state.actionPage.pageSize = pageSize
  },
  /**
   * 保存群发审核列表
   */
  SAVE_BATCHSENDLIST(state, payload) {
    state.auditBatchSendTaskListAll = payload
  },
  SET_BATCHSENDPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.auditBatchSendTaskPage.total = total
    state.auditBatchSendTaskPage.pageNumber = pageNumber
    state.auditBatchSendTaskPage.pageSize = pageSize
  },
  SAVE_PROPERLIST(state, payload) {
    state.propertyListAll = payload
  },
  SET_PROPERPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.propertyPage.total = total
    state.propertyPage.pageNumber = pageNumber
    state.propertyPage.pageSize = pageSize
  },
  SET_AUDITSETTING(state, payload) {
    state.auditSetting = payload
  },
  /**
   * 素材审核
   */
  SAVE_MEDIAAUDIT(state, payload) {
    state.auditMediaList = payload
  },
  SET_MEDIAPAGE(state, payload) {
    const {
      total,
      pageNumber,
      pageSize
    } = payload
    state.auditMediaPage.total = total
    state.auditMediaPage.pageNumber = pageNumber
    state.auditMediaPage.pageSize = pageSize
  },



}


const actions = {
  /**
   * 权限审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getAuditPermissionlistAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getAuditPermissionlistAll(payload).then(res => {

        const accessed = res.items.map(item => {
          return {
            ...item,
            auditUsers: JSON.parse(item.auditUsers)
          }
        })
        commit('SAVE_PERMISSIONLIST', accessed)
        commit('SET_PERMISSIONPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve(res)
      }).catch(err => {
        console.error(err)

        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 标签审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getAuditTaglistAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)

    return new Promise((resolve, reject) => {
      getAuditTaglistAll(payload).then(res => {
        const accessed = res.items.map(item => {
          const arr1 = JSON.parse(item.tagBeforeChangeContent)||[]
          const arr2 = JSON.parse(item.tagChangeContent)||[]
          const temp = myFilter(arr1, arr2)
        //   console.log(temp)
          return {
            ...item,
            auditUsers: JSON.parse(item.auditUsers),
            tagBeforeChangeContent: temp[0],
            tagChangeContent: temp[1],
          }
        })
        commit('SAVE_TAGLIST', accessed)
        commit('SET_TAGPAGE', res)
        commit('TOGGLE_LOADING', false)

        resolve()
      }).catch(err => {

        commit('TOGGLE_LOADING', false)

        reject(err)
      })
    })
  },
  /**
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getSensitiveListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getSensitiveListAll(payload).then(res => {
        commit('SAVE_SENSITIVELIST', res.items)
        commit('SET_SENSITIVEPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {

        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getLog({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getLog(payload).then(res => {
        commit('SAVE_LOGLIST', res.items)
        commit('SET_LOGPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {

        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 敏感词列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getActionListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getActionListAll(payload).then(res => {
        commit('SAVE_ACTIONLIST', res.items)
        commit('SET_ACTIONPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {

        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 群发审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  getAuditBatchSendTaklistAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getAuditBatchSendTaklistAll(payload).then(res => {
        const accessed = res.items.map(item => {
          return {
            ...item,
            auditUsers: JSON.parse(item.auditUsers),
            textContent: regFilter(item.textContent)
          }
        })
        commit('SAVE_BATCHSENDLIST', accessed)
        commit('SET_BATCHSENDPAGE', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {

        commit('TOGGLE_LOADING', false)
        reject(err)
      })
    })
  },
  /**
   * 添加敏感词
   * @param {*} param0 
   * @param {*} payload 
   */
  add({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      add(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 删除敏感词
   * @param {*} param0 
   * @param {*} payload 
   */
  deleteSensitive({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      deleteSensitive(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 更新敏感词
   * @param {*} param0 
   * @param {*} payload 
   */
  update({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      update(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 批量设置通知人
   * @param {*} param0 
   * @param {*} payload 
   */
  updateNoticeUser({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      updateNoticeUser(payload).then(res => {

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 设置审核开启关闭
   * @param {*} param0 
   * @param {*} payload 
   */
  setAuditCloseOrOpen({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      setAuditCloseOrOpen(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 审核配置列表
   * @param {*} param0 
   * @param {*} payload 
   */
  auditPropertylistAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      auditPropertylistAll(payload).then(res => {
        const accessed = buildAuditSetting(res.items)
        const alter = res.items.map(item => {
          return {
            ...item,
            auditUsers: JSON.parse(item.auditUsers)
          }
        })
        commit('TOGGLE_LOADING', false)
        commit('SAVE_PROPERLIST', alter)
        commit('SET_AUDITSETTING', accessed)
        commit('SET_PROPERPAGE', res)
        resolve()
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
      })
    })
  },
  /**
   * 设置审核人
   * @param {*} param0 
   * @param {*} payload 
   */
  setAuditUser({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      setAuditUser(payload).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 素材审核列表
   * @param {*} param0 
   * @param {*} payload 
   */
  auditMediaListAll({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      auditMediaListAll(payload).then(res => {
        const accessed = res.items.map(item => {
          return {
            ...item,
            auditAddMedia: JSON.parse(item.auditAddMedia),
            auditUsers: JSON.parse(item.auditUsers)
          }
        })
        commit('SAVE_MEDIAAUDIT', accessed)
        commit('SET_MEDIAPAGE', res)
        resolve()
      }).catch(err => {
        reject(err)
      }).finally(() => {
        commit('TOGGLE_LOADING', false)
      })
    })
  },
  /**
   * 审核配置详情
   * @param {*} param0 
   * @param {string} payload 
   */
  auditDetail({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      auditDetail(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }



}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
