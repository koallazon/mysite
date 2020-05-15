import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: false
  },
  mutations: {
    setEdit (state, payload) {
      state.editable = payload
    }
  },
  actions: {
    initSetEdit ({ commit }, payload) {
      console.log('여긴 액션: ', payload)
      commit('setEdit', payload)
    }
  },
  modules: {
  }
})