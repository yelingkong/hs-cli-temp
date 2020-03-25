import Element from './Element'

class Path extends Element {
  constructor (options) {
    super()

    this.type = 'Path'
    this.stroke = 'rgba(0, 0, 0, 1)'
    this.lineWidth = 1
    this.data = ''

    this.props(options)
  }

  render (d) {
    if (!this.data) return

    d.set({
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
      shadowBlur: this.shadowBlur,
      shadowColor: this.shadowColor,
      lineWidth: this.lineWidth,
      lineJoin: this.lineJoin,
      lineCap: this.lineCap,
      lineDashOffset: this.lineDashOffset
    })
      .setLineDash(this.lineDash)
      .begin()
      .path(this.data)
      .stroke(this.stroke)
      .close()
  }

  contain (x, y) {
    // TODO path contain
    return false
  }
}

export default Path
