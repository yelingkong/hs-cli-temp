<template>
  <div class="indoor-map"></div>
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
        background: '#fff',
        width: 500,
        height: 300,
        roam: true
      })

      this.initIndoorMap()

      this.view.setViewport(0, 0, 600, 400)

      this.view.render()
    },

    initIndoorMap () {
      const elements = [
        {
          type: 'Polygone',
          stroke: 'rgba(255,182,177,.59)',
          lineWidth: 1,
          points: [0, 0, 600, 0, 600, 400, 0, 400]
        },
        {
          type: 'Polygone',
          stroke: '#FFB6B1',
          fill: '#FFFDF6',
          lineWidth: 1,
          points: [8, 8, 592, 8, 592, 392, 8, 392]
        },
        {
          type: 'Polygone',
          stroke: '#979797',
          fill: 'rgba(255,255,255,.6)',
          lineWidth: 1,
          lineDash: [2, 2],
          points: [30, 30, 270, 30, 270, 300, 30, 300]
        },
        {
          x: 300,
          y: 0,
          type: 'Polygone',
          stroke: '#979797',
          fill: 'rgba(255,255,255,.6)',
          lineWidth: 1,
          lineDash: [2, 2],
          points: [30, 30, 270, 30, 270, 300, 30, 300]
        },
        {
          type: 'Text',
          content: '数字营销区域',
          x: 150,
          y: 290,
          fill: '#333333',
          fontSize: 12,
          textAlign: 'center',
          textBaseline: 'middle'
        },
        {
          type: 'Text',
          content: '数字货架区域',
          x: 450,
          y: 290,
          fill: '#333333',
          fontSize: 12,
          textAlign: 'center',
          textBaseline: 'middle'
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [200, 392, 200, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [220, 392, 220, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [280, 392, 280, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [300, 392, 300, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [320, 392, 320, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [380, 392, 380, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [400, 392, 400, 360]
        },
        {
          type: 'Polyline',
          stroke: '#FF7716',
          points: [480, 392, 480, 360]
        },
        {
          type: 'Text',
          content: '收银台',
          x: 250,
          y: 370,
          fill: '#333333',
          textAlign: 'center'
        },
        {
          type: 'Text',
          content: '收银台',
          x: 350,
          y: 370,
          fill: '#333333',
          textAlign: 'center'
        },
        {
          type: 'Text',
          content: '入口',
          x: 440,
          y: 370,
          fill: '#333333',
          textAlign: 'center'
        },
        {
          type: 'Rect',
          x: 280,
          y: 50,
          width: 40,
          height: 40,
          stroke: '#FFB174',
          fill: '#FFDCAB',
          textAlign: 'center'
        },
        {
          type: 'Rect',
          x: 280,
          y: 110,
          width: 40,
          height: 40,
          stroke: '#FFB174',
          fill: '#FFDCAB',
          textAlign: 'center'
        },
        {
          type: 'Rect',
          x: 280,
          y: 170,
          width: 40,
          height: 40,
          stroke: '#FFB174',
          fill: '#FFDCAB',
          textAlign: 'center'
        },
        {
          type: 'Rect',
          x: 280,
          y: 230,
          width: 40,
          height: 40,
          stroke: '#FFB174',
          fill: '#FFDCAB',
          textAlign: 'center'
        },
        {
          type: 'Text',
          content: '堆头',
          x: 300,
          y: 70,
          fill: '#333333',
          textAlign: 'center',
          textBaseline: 'middle'
        },
        {
          type: 'Text',
          content: '堆头',
          x: 300,
          y: 130,
          fill: '#333333',
          textAlign: 'center',
          textBaseline: 'middle'
        },
        {
          type: 'Text',
          content: '堆头',
          x: 300,
          y: 190,
          fill: '#333333',
          textAlign: 'center',
          textBaseline: 'middle'
        },
        {
          type: 'Text',
          content: '堆头',
          x: 300,
          y: 250,
          fill: '#333333',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      ]

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          elements.push({
            type: 'Rect',
            stroke: '#FF9696',
            fill: '#FFD0D0',
            width: 15,
            height: 40,
            x: c * 40 + 50,
            y: r * 60 + 50
          })
        }
      }
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 3; c++) {
          elements.push({
            type: 'Rect',
            stroke: '#FF9696',
            fill: '#FFD0D0',
            width: 40,
            height: 15,
            x: c * 60 + 370,
            y: r * 40 + 50
          })
        }
      }

      elements.forEach(el => {
        this.view.add(new cvs[el.type](el))
      })
    }
  }
}
</script>

<style>

</style>
