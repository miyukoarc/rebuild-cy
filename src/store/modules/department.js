import {
  getDepartmentDetail,
  addDepartment,
  deleteDepartment,
  getDepartmentList,
  locateDepartmentLeader,
  updateDepartment
} from '@/api/department'

const state = {
  departmentList: [],
  currentDepartment: {}, //当前行
  loading: false,
}

const mutations = {
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
  getDepartmentList({
    commit
  }) {
    commit('TOGGLE_LOADING', true)
    return new Promise((resolve, reject) => {
      getDepartmentList().then(res => {
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
