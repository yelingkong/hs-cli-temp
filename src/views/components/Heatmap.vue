<template>
  <div class="heatmap"></div>
</template>

<script>
import cvs from '@/components/cvs'

export default {
  data () {
    return {
      view: null
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.view = cvs.init(this.$el, {
        backgroundColor: '#f0f0f0',
        width: 500,
        height: 300,
        onAnimation: false,
        zoomable: false,
        draggable: false
      })

      this.initHeatMap()

      this.view.setViewport(0, 0, 600, 400)

      this.view.render()
    },

    initHeatMap () {
      const heatMapData = []
      for (let i = 0; i < 200; i++) {
        heatMapData.push({
          x: Math.round(Math.random() * 500) + 50,
          y: Math.round(Math.random() * 300) + 50,
          value: Math.round(Math.random() * 100)
        })
      }
      const heatMap = new cvs.HeatMap({ map: this.view, radius: 30, opacity: [0, 0.2] })
      heatMap.setData(heatMapData)
      this.view.heatMap = heatMap
    }
  }
}
</script>

<style>

</style>
