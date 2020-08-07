import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  windowHeight: '600px',
  windowWidth: '800px',
  maximumFlag: false,
  
}

const mutations = {
  SAVE_WINDOWSIZE:(state,payload)=>{
      const {windowHeight,windowWidth} = payload
      state.windowHeight = windowHeight 
      state.windowWidth = windowWidth 
  },
  TOGGLE_ISMAXIMUM(state,payload){
      state.maximumFlag = payload
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
