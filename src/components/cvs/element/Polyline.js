import Element from './Element'
import contain from '../util/isPointOnLine'
import vector from '../util/vector'

class Polyline extends Element {
  constructor (options) {
    super()

    this.type = 'Polyline'
    this.stroke = 'rgba(0, 0, 0, 1)'
    this.fill = '#000'
    this.lineWidth = 1
    this.points = []
    this.arrow = 0 // 0: no arrow, 1: end arrow, 2: start arrow, 3: both;

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
        lineCap: this.lineCap
      })
      .setLineDash(this.lineDash)
      .begin()

    this.points.forEach((p, i) => {
      i === 0
        ? d.mt(...p)
        : d.lt(...p)
    })
    d.stroke(this.stroke).close()

    this.drawArrow(d)
    d.restore()
  }

  drawArrow (d) {
    const arrow = (x, y, angle) => {
      d.save()
        .mv(x, y)
        .rotate(angle)
        .begin()
        .mt(-10, 5)
        .lt(0, 0)
        .lt(-10, -5)
        .stroke(this.stroke)
        .close()
        .fill(this.fill) // 如果需要填充
        .restore()
    }

    // 起始箭头
    if (this.arrow === 1 || this.arrow === 3) {
      const [x, y] = this.points[0]
      const [x1, y1] = this.points[1]
      const v = [x - x1, y - y1]
      let angle = Math.acos(vector.cos(v, [1, 0]))
      angle = y > y1 ? angle : Math.PI - angle
      arrow(x, y, angle)
    }
    // 结束箭头
    if (this.arrow === 2 || this.arrow === 3) {
      const [x, y] = this.points[this.points.length - 1]
      const [x1, y1] = this.points[this.points.length - 2]
      const v = [x - x1, y - y1]
      let angle = vector.angle([1, 0], v)
      angle = y > y1 ? angle : Math.PI * 2 - angle
      arrow(x, y, angle)
    }
  }

  contain (x, y) {
    let i = -1; const len = this.points.length
    if (len < 2) return false

    while (++i < len - 1) {
      if (contain(...this.points[i], ...this.points[i + 1], x - this.x, y - this.y)) return true
    }

    return false
  }
}

export default Polyline
