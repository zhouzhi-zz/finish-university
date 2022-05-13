import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    setIsLogin: (state, value) => {
      state.isLogin = value
    },
    setUserInfo: (state, value) => {
      state.userInfo = value
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  }
})
