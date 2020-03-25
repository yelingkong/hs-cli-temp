<template>
  <el-select
    :value="valueTitle"
    :clearable="clearable"
    :multiple="multiple"
    :collapse-tags='true'
    :placeholder="placeholder | t"
    @remove-tag='onRemoveTag'
    @clear="clearHandle"
    @visible-change='onVisibleChange'>
    <el-input
      v-if='filterable'
      class="selectInput"
      :placeholder="keywordPlaceholder | t"
      v-model="filterText">
    </el-input>

    <el-option value='0' :label='1' class="options">
      <el-tree
        v-if='treeVisible'
        id="tree-option"
        ref="selectTree"
        :show-checkbox='true'
        :accordion="accordion"
        :data="data"
        :props="props"
        :node-key="props.id"
        :check-strictly="true"
        :default-checked-keys="selectedKeys"
        :default-expanded-keys="selectedKeys"
        :filter-node-method="filterNode"
        :expand-on-click-node="true"
        :check-on-click-node='true'
        @check="handleCheck">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'el-tree-select',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          id: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    data: {
      type: Array,
      default: () => { return [] }
    },
    /* 初始值 */
    value: {
      type: [Number, String, Array],
      default: () => { return null }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    },
    placeholder: {
      type: String,
      default: () => { return 'Select' }
    },
    keywordPlaceholder: {
      type: String,
      default: () => { return 'Keyword' }
    },
    multiple: {
      type: Boolean,
      default () { return false }
    },
    filterable: {
      type: Boolean,
      default () { return false }
    }
  },
  data () {
    return {
      filterText: '',
      valueId: this.value, // 初始值
      valueTitle: this.multiple ? [] : null,
      selectedKeys: [],
      treeVisible: false
    }
  },

  mounted () {
    this.valueId = this.value
    this.selectedKeys = this.multiple ? this.valueId : [this.valueId]
  },

  methods: {
    // 初始化滚动条
    initScroll () {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => {
          ele.style.width = 0
        })
      })
    },
    // 切换选项
    handleCheck (data, checked) {
      if (this.multiple) {
        this.valueId = checked.checkedKeys
        this.valueTitle = checked.checkedNodes.map(n => {
          return n[this.props.label]
        })
      } else {
        if (checked.checkedKeys.length > 0) {
          this.valueId = data[this.props.id]
          this.valueTitle = data[this.props.label]
          this.$refs.selectTree.setCheckedKeys([this.valueId])
        } else {
          this.valueId = null
          this.valueTitle = null
        }
      }
      this.$emit('input', this.valueId)
      this.$emit('change', this.valueId)
    },
    // 清除选中
    clearHandle () {
      this.valueTitle = this.multiple ? [] : ''
      this.valueId = this.multiple ? [] : null
      this.clearSelected()
      this.$emit('input', this.valueId)
      this.$emit('change', this.valueId)
    },
    /* 清空选中样式 */
    clearSelected () {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    filterNode (value, data) {
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    },
    onVisibleChange (visible) {
      this.treeVisible = visible
    },
    onRemoveTag (tag) {
      const index = this.valueTitle.indexOf(tag)
      this.valueTitle.splice(index, 1)
      this.valueId.splice(index, 1)
      this.$refs.selectTree.setCheckedKeys(this.valueId)
    }
  },
  watch: {
    value () {
      this.valueId = this.value
      this.selectedKeys = this.multiple ? this.valueId : [this.valueId]
    },
    filterText (val) {
      this.$refs.selectTree.filter(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
  .selectInput{
    padding: 0 5px;
    box-sizing: border-box;
  }
</style>
