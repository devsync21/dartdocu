import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savepdf: false,
    uploadpdf: false,
    mob: false
  },
  mutations: {
    SaveToPdf(state) {
      state.savepdf = !state.savepdf
    },
    upPdf(state) {
      state.uploadpdf = !state.uploadpdf
    },
    mobcheck(state, payload) {
      state.mob = payload
    }

  },
  actions: {
    SaveToPdf({ commit }) {
      commit("SaveToPdf")
    },
    upPdf({ commit }) {
      commit("upPdf")
    }
  },
  modules: {}
});
