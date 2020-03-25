import Element from './Element'

class Palette {
  constructor (gradient) {
    this.init(gradient)
  }

  init (gradient) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 256
    canvas.height = 20

    const lg = ctx.createLinearGradient(0, 0, 256, 20)

    for (const k in gradient) {
      lg.addColorStop(k, gradient[k])
    }

    ctx.fillStyle = lg
    ctx.fillRect(0, 0, 256, 20)

    this.canvas = canvas
    this.imageData = ctx.getImageData(0, 0, 256, 20).data
  }

  getColor (offset) {
    return this.imageData.slice(offset * 4, offset * 4 + 3)
  }
}

class HeatMapLayer extends Element {
  constructor (opts) {
    super()
    this.map = null
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.data = new Set()
    this.gradient = {
      0: 'blue',
      0.33: 'green',
      0.66: 'yellow',
      '1.0': 'red'
    }
    this.radius = 100
    this.opacity = [0, 0.8]
    this.min = 0
    this.max = 100
    this.showPalette = false
    Object.assign(this, opts)
  }

  /**
   * 绘制热力图
   */
  render () {
    const radius = this.radius
    const palette = new Palette(this.gradient)

    this.canvas.width = this.map.width
    this.canvas.height = this.map.height

    this.ctx.clearRect(0, 0, this.width, this.height)
    this.data.forEach(p => {
      const { x, y } = this.map.getAbsoluteCoord(p.x, p.y)
      const rg = this.ctx.createRadialGradient(x, y, 0, x, y, radius)
      const alpha = Math.max(Math.min((p.value - this.min) / (this.max - this.min), 1), 0)
      rg.addColorStop(1, 'rgba(0, 0, 0, 0)')
      rg.addColorStop(0, 'rgba(0, 0, 0, ' + alpha + ')')

      this.ctx.fillStyle = rg
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      this.ctx.closePath()
      this.ctx.fill()
    })

    const imageData = this.ctx.getImageData(0, 0, this.map.width, this.map.height)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const offset = imageData.data[i + 3]
      const [r, g, b] = palette.getColor(offset)

      imageData.data[i] = r
      imageData.data[i + 1] = g
      imageData.data[i + 2] = b
    }

    this.ctx.putImageData(imageData, 0, 0)
    if (this.showPalette) this.ctx.drawImage(palette.canvas, 10, 10, 256, 20)
    this.map.renderer.img(this.canvas, 0, 0)
  }

  setData (data) {
    this.data = data
  }
}

export default HeatMapLayer
