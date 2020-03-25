<template>
  <div
    class="hs-progress"
    :style='{
      borderColor: color,
      width,
      height,
      "line-height": height,
      color
    }'
  >
    <div
      class="hs-progress-bar"
      ref='progressBar'
      :style='{
        backgroundColor: color,
        width: value + "%"
      }'
    ></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default () { return '#409EFF' }
    },
    width: {
      type: [String, Number],
      default () { return '100%' }
    },
    height: {
      type: String,
      default () { return '4px' }
    },
    value: {
      type: Number,
      default () { return 0 }
    }
  }
}
</script>

<style scoped lang='scss'>
.hs-progress {
  position: relative;
  border-radius: 5px;
  border: 1px solid transparent;
  margin: 10px 0;
  text-align: right;
  padding-right: 4px;

  &-bar {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    height: 100%;
    max-width: 100%;
  }
}
</style>
