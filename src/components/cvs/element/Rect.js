import Element from './Element'
import contain from '../util/isPointInRect'

class Rect extends Element {
  constructor (options) {
    super()

    this.type = 'Rect'
    this.fill = 'rgba(255, 0, 0, .5)'
    this.stroke = 'rgba(255, 0, 0, .5)'
    this.width = 200
    this.height = 60
    this.props(options)
  }

  render (d) {
    d.set({
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
      shadowBlur: this.shadowBlur,
      shadowColor: this.shadowColor,
      lineWidth: this.lineWidth,
      lineJoin: this.lineJoin,
      lineCap: this.lineCap
    })
      .setLineDash(this.lineDash)
      .save()
      .mv(this.x, this.y)
      .rotate(this.rotation / 180 * Math.PI)
      .rect(0, 0, this.width, this.height)
      .fill(this.fill)
      .restore()
  }

  contain (ex, ey) {
    const { x, y } = this.getRelativeCoord(ex, ey)

    return contain(0, 0, this.width, this.height, x, y)
  }
}

export default Rect
