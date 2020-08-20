
  const state = {
      dependMap:{

      },
      dependencyMap: {}

  }
  const mutations = {
      SET_DEPENDMAP(state,payload){
          const {code,deps} = payload
          console.log(payload)
          state.dependMap[code] = deps
        //   Object.assign(state,)
          console.log(deps)
      },
      SET_DEPENDENCY(state,payload){
          
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
  