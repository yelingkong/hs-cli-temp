<template>
  <div :style='{ width, height }'></div>
</template>

<script>
import _ from 'lodash'
import Echarts from 'echarts'

export default {
  props: {
    option: {
      type: Object,
      default () {
        return null
      }
    },

    width: {
      type: [String, Number],
      default () {
        return '100%'
      }
    },

    height: {
      type: [String, Number],
      default () {
        return '100%'
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },

  mounted () {
    this.init()
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    this.chart && this.chart.dispose()
  },

  methods: {
    init () {
      this.chart = Echarts.init(this.$el)
      if (this.option) {
        this.chart.setOption(this.option)
      }
    },

    setOption () {
      this.chart.setOption(...arguments)
    },

    resize: _.debounce(function () {
      this.chart.resize()
    })
  },

  watch: {
    option (v) {
      if (v) {
        this.setOption(v)
      }
    }
  }
}
</script>

<style>
</style>
