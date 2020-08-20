
  const state = {
      dependMap:{

      }

  }
  const mutations = {
      SET_DEPENDMAP(state,payload){
          const {code,deps} = payload
          console.log(payload)
          state.dependMap[code] = deps
      }
  }
  
  const actions = {
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  