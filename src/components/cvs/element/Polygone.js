import Element from './Element'
import contain from '../util/isPointInPolygone'

class Polygone extends Element {
  constructor (options) {
    super()

    this.type = 'Polygone'
    this.stroke = 'rgba(0, 0, 0, 1)'
    this.lineWidth = 1
    this.points = []

    this.props(options)
  }

  render (d) {
    if (this.points.length < 2) return
    d.save()
      .mv(this.x, this.y)
      .rotate(this.rotation / 180 * Math.PI)
      .set({
        shadowOffsetX: this.shadowOffsetX,
        shadowOffsetY: this.shadowOffsetY,
        shadowBlur: this.shadowBlur,
        shadowColor: this.shadowColor,
        lineWidth: this.lineWidth,
        lineJoin: this.lineJoin,
        lineCap: this.lineCap,
        strokeStyle: this.stroke,
        fillStyle: this.fill
      })
      .setLineDash(this.lineDash)
      .begin()
    this.points.forEach((p, i) => {
      i === 0
        ? d.mt(...p)
        : d.lt(...p)
    })
    d.close().fill().stroke().restore()
  }

  contain (x, y) {
    return contain(this.points, x - this.x, y - this.y)
  }
}

export default Polygone
