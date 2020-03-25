const themes = {
  default: () => import('@/styles/default.theme.scss'),
  dark: () => import('@/styles/dark.theme.scss')
}

const cache = {}

let currentTheme = null

const theme = {
  name: null,

  /**
   * 应用指定的皮肤
   * @param {*} theme 皮肤名称
   */
  async use (name) {
    // 从缓存中获取皮肤
    let themeModule = cache[name]

    // 如果没有缓存过，加载并缓存皮肤模块
    if (!themeModule) {
      if (!themes[name]) {
        console.log(`未找到皮肤！Theme name: ${name}`)
        return
      }

      this.name = name
      themeModule = cache[name] = await themes[name]()
    }

    // 如果是要加载的是当前使用的皮肤则直接退出
    if (currentTheme === themeModule) {
      return
    }

    // 卸载当前皮肤
    if (currentTheme) {
      currentTheme.unref()
    }

    // 应用新皮肤
    themeModule.ref()
    currentTheme = themeModule
  }
}

export default theme
