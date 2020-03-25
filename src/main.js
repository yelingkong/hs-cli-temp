import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import i18n from './i18n'

import './plugins/element-ui'

import './commons/rem'

import theme from './commons/theme'

Vue.config.productionTip = false

// 全局翻译过滤器
Vue.filter('t', (key, payload) => i18n.t(key, payload))

// 时间过滤器
Vue.filter('time', (t, fmt) => {
  const date = new Date(t)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  let H = date.getHours()
  let m = date.getMinutes()
  let S = date.getSeconds()

  H < 10 && (H = '0' + H)
  m < 10 && (m = '0' + m)
  S < 10 && (S = '0' + S)

  let res = `${Y}/${M}/${D} ${H}:${m}:${S}`
  if (fmt === 'date') {
    res = `${Y}/${M}/${D}`
  } else if (fmt === 'time') {
    res = `${H}:${m}:${S}`
  }

  return res
})

i18n.locale = store.state.lang

theme.use(store.state.theme).then(() => {
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
