<template>
  <div class="heatmap"></div>
</template>

<script>
import cvs from '@yukun.bao/cvs'

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
      this.view = new cvs.View(this.$el, {
        background: '#f0f0f0',
        width: 500,
        height: 300,
        roam: true
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
      const heatMap = new cvs.HeatMapLayer({ radius: 30, opacity: [0, 0.2] })
      heatMap.setData(heatMapData)
      this.view.addLayer(heatMap)
    }
  }
}
</script>

<style>

</style>
