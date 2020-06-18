import {
  getDepartmentDetail,
  addDepartment,
  deleteDepartment,
  getDepartmentList,
  locateDepartmentLeader,
  updateDepartment
} from '@/api/department'

const state = {
    /**
     * 部门列表
     */
  departmentList: [],
  currentDepartment: {}, //当前行
  loading: false,
}

const mutations = {
    /**
     * 保存部门列表
     * @param {*} state 
     * @param {*} payload 
     */
  SAVE_LIST(state, payload) {
    state.departmentList = payload
  },
  TOGGLE_LOADING(state, current) {
    state.loading = current
  },
  SAVE_DETAIL(state, payload){
      state.currentDepartment = payload
  }

}

const actions = {
    /**
     * 部门详细页
     * @param {*} param0 
     * @param {string} uuid 
     */
  getDepartmentDetail({
    commit
  }, uuid) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getDepartmentDetail(uuid).then(res => {
        commit('SAVE_DETAIL', res)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },
  /**
   * 创建部门
   * @param {*} param0 
   * @param {object} payload 
   */
  addDepartment({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      addDepartment(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },
  /**
   * 删除部门
   * @param {*} param0 
   * @param {object} payload 
   */
  deleteDepartment({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      deleteDepartment(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },
  /**
   * 获取部门列表树
   * @param {object} payload 
   */
  getDepartmentList({
    commit
  },payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getDepartmentList(payload).then(res => {
        commit('SAVE_LIST', res.items)
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },
  /**
   * 分配部门主管
   * @param {*} param0 
   * @param {object} payload 
   */
  locateDepartmentLeader({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      locateDepartmentLeader(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },
  /**
   * 更新部门
   * @param {*} param0 
   * @param {object} payload 
   */
  updateDepartment({
    commit
  }, payload) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      updateDepartment(payload).then(() => {
        commit('TOGGLE_LOADING', false)
        resolve()
      }).catch(err => {
        commit('TOGGLE_LOADING', false)
        console.log(err)
        reject()
      })
    })

  },

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
