
import Vue from 'vue'
import en from './EN'
import cn from './CN'
import VueI18n from 'vue-i18n'
import elEn from 'element-ui/lib/locale/lang/en'
import elCn from 'element-ui/lib/locale/lang/zh-CN'
import elLocale from 'element-ui/lib/locale'

elLocale.i18n((key, value) => i18n.t(key, value))
elLocale.use(elCn)

Vue.use(VueI18n)

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: 'en',
  messages: {
    en: {
      ...en,
      ...elEn
    },
    cn: {
      ...cn,
      ...elCn
    }
  }
})

export const setLang = lang => {
  i18n.locale = lang
}

export default i18n
