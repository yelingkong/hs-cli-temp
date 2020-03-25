import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { setLang } from '../i18n'
import theme from '../commons/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en',
    theme: 'default'
  },
  mutations: {
    setLanguage (state, lang) {
      state.lang = lang
      setLang(lang)
    },

    setTheme (state, themeName) {
      state.theme = themeName
      theme.use(themeName)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
