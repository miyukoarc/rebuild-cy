const state = {
  dependMap: {

  },
  dependencyMap: {}

}
const mutations = {
  SET_DEPENDMAP(state, payload) {
    const {
      code,
      deps
    } = payload
    state.dependMap[code] = deps
  },
  SET_DEPENDENCY_MODULE(state, payload) {

    state.dependencyMap = Object.assign(state.dependencyMap, payload)
  },
  SET_DEPENDENCY_PERMISSION(state, payload) {
    console.log(payload)
    const {module,code} = payload
    state.dependencyMap[module].push(code)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
