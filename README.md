# 主题

## 定义主题
在 /src/styles/ 目录下添加[themeName].them.scss样式文件，定义主题变量，文件末尾引入样式主文件。

## 使用主题

在 /src/commons/theme.js 中引入样式，在切换主题的下拉菜单里增加该主题项

```js
// 在 /src/commons/theme.js 中引入主题
const themes = {
  default: () => import('@/styles/default.theme.scss'),
  dark: () => import('@/styles/dark.theme.scss'),
  yourThemeName: () => import('@/styles/yourThemeName.theme.scss') // 你的主题
}
```

```html
<!-- 切换主题的下拉菜单里增加主题项 -->
<el-dropdown>
    <span class="el-dropdown-link">
        {{ 'Theme' | t }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='default'>{{ 'Default' | t }}</el-dropdown-item>
        <el-dropdown-item command='dark'>{{ 'Dark' | t }}</el-dropdown-item>
        <el-dropdown-item command='yourThemeName'>{{ 'Your theme name' | t }}</el-dropdown-item> <!-- 你的主题 -->
    </el-dropdown-menu>
</el-dropdown>
```

# Echart 图表

[echarts 配置项手册](https://www.echartsjs.com/zh/option.html 'echart')

# 树形选择器

参考 [element-ui](https://element.eleme.cn/#/zh-CN/component) 组件：[select](https://element.eleme.cn/#/zh-CN/component/select)、[tree](https://element.eleme.cn/#/zh-CN/component/tree)