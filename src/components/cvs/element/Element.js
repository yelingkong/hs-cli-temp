import _ from 'lodash'
import EventTarget from '../event/EventTarget'
import tooltip from '../tooltip'
import createCoord from '../util/coord'

let id = 0

class Element extends EventTarget {
  constructor () {
    super()

    this.type = 'Element'
    this.x = 0
    this.y = 0
    this.scale = 1
    this.rotation = 0
    this.fill = 'rgba(255, 255, 255, 0)'
    this.stroke = 'rgba(255, 255, 255, 0)'
    this.shadowOffsetX = 0
    this.shadowOffsetY = 0
    this.shadowBlur = 0
    this.shadowColor = 'rgba(0, 0, 0, .8)'
    this.lineWidth = 0
    this.lineJoin = 'rect'
    this.lineCap = 'rect'
    this.lineDash = []
    this.lineDashOffset = 0

    Object.defineProperties(this, {
      id: {
        value: 'storeMapElement_' + (id++)
      }
    })
  }

  props (options) {
    _.merge(this, options)
  }

  translate (dx = 0, dy = 0) {
    this.x += dx
    this.y += dy
  }

  tooltip (options) {
    tooltip(options)
  }

  // will be overided by subclass
  render (d) {

  }

  // will be overided by subclass
  contain (x, y) {
    return false
  }

  getRelativeCoord (x, y) {
    const coord = createCoord(x, y)

    coord.translate(-this.x, -this.y)
    coord.rotate(-this.rotation)

    return coord
  }

  getAbsoluteCoord (x, y) {
    const coord = createCoord(x, y)

    coord.rotate(this.rotation)
    coord.scale(this.scale, this.scale)
    coord.translate(this.x, this.y)

    return coord
  }
}

export default Element
