import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENICATED: 'SET_AUTHENICATED',
  SET_USER: 'SET_USER'
}

const state = {
  isAuthenicated: false,
  user: {}
}

const getters = {
  isAuthenicated: state => state.isAuthenicated,
  user: state => state.user,
}

const mutations = {
  [types.SET_AUTHENICATED](state, isAuthenicated) {
    if (isAuthenicated) state.isAuthenicated = isAuthenicated;
    else state.isAuthenicated = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  }
}

const actions = {
  setIsAutnenticated: ({commit}, isAuthenicated) => {
    commit(types.SET_AUTHENICATED, isAuthenicated);
  },
  setUser: ({commit}, user) => {
    commit(types.SET_USER, user);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
