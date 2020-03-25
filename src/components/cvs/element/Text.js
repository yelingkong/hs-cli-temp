import Element from './Element'
import measure from '../util/measureText'
import isPointInRect from '../util/isPointInRect'

class Text extends Element {
  constructor (options) {
    super()

    this.type = 'Text'
    this.content = 'Text'
    this.fontFamily = 'Sanserif'
    this.fontWeight = ''
    this.fontStyle = ''
    this.fontSize = 12
    this.textAlign = 'left'
    this.textBaseline = 'top'
    this.fill = 'rgba(0, 0, 0, 1)'
    this.stroke = 'rgba(0, 0, 0, 1)'

    this.props(options)

    Object.defineProperties(this, {
      type: { value: 'Text' }
    })
  }

  render (d) {
    d.save()
      .set({
        shadowOffsetX: this.shadowOffsetX,
        shadowOffsetY: this.shadowOffsetY,
        shadowBlur: this.shadowBlur,
        shadowColor: this.shadowColor,
        lineWidth: this.lineWidth,
        lineJoin: this.lineJoin,
        lineCap: this.lineCap,
        fillStyle: this.fill
      })
      .setLineDash(this.lineDash)
      .font(`${this.fontSize}px ${this.fontWeight} ${this.fontStyle} ${this.fontFamily}`)
      .align(this.textAlign)
      .valign(this.textBaseline)
      .mv(this.x, this.y)
      .rotate(this.rotation / 180 * Math.PI)
      .fillText(this.content, 0, 0)
      .restore()
  }

  contain (ex, ey) {
    const { x, y } = this.getRelativeCoord(ex, ey)
    const { width, height } = measure(this.content, this)
    const x0 = this.textAlign === 'left' ? 0 : this.textAlign === 'center' ? -width / 2 : -width
    const y0 = this.textBaseline === 'top' ? 0 : this.textBaseline === 'middle' ? -height / 2 : -height

    return isPointInRect(x0, y0, width, height, x, y)
  }
}

export default Text
