
import EventTarget from './event/EventTarget'
import eventEmitter from './event/eventEmitter'
import Renderer from './renderer'
import tooltip from './tooltip'
import createCoord from './util/coord'

let id = 0
/**
 * View 类
 */
class View extends EventTarget {
  constructor (options) {
    super()

    this.x = 0
    this.y = 0
    this.scale = 1
    this.rotation = 0
    this.width = 500
    this.height = 300
    this.backgroundColor = 'rgba(240, 240, 240, 1)'
    this.onAnimation = true
    this.elements = []

    Object.defineProperties(this, {
      id: { value: 'IndoorMap_' + (id++) }
    })

    Object.assign(this, options)

    this.renderer = new Renderer(this.width, this.height)

    eventEmitter(this.renderer.dom, this)
  }

  destroy () {
    this.onAnimation = false
  }

  render () {
    if (this.onAnimation) window.requestAnimationFrame(() => this.render())

    this.renderer
      .clear(0, 0, this.width, this.height)
      .rect(0, 0, this.width, this.height)
      .fill(this.backgroundColor)
      .save()
      .mv(this.x, this.y)
      .scale(this.scale, this.scale)
    this.elements.forEach(el => el.render(this.renderer))
    this.renderer.restore()

    if (this.heatMap) {
      this.heatMap.render()
    }
  }

  animate () {
    this.onAnimation = true
    this.render()
  }

  add (el) {
    if (!this.elements.includes(el)) {
      this.elements.push(el)
    }
  }

  remove (el) {
    let index
    if ((index = this.elements.indexOf(el)) !== -1) {
      this.elements.splice(index, 1)
    }
  }

  contain () {
    return true
  }

  setSize (width, height) {
    this.width = width
    this.height = height
    this.renderer.dom.width = width
    this.renderer.dom.height = height
    this.renderer.dom.style.width = width + 'px'
    this.renderer.dom.style.height = height + 'px'
  }

  setViewport (x, y, width, height) {
    this.scale = Math.min(this.width / width, this.height / height)

    this.x = (this.width - this.scale * width) / 2 - x * this.scale
    this.y = (this.height - this.scale * height) / 2 - y * this.scale
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
  }

  translate (x = 0, y = 0) {
    this.x += x
    this.y += y
  }

  zoom (isZoomIn) {
    const k = isZoomIn ? 1.1 : 1 / 1.1
    this.scale *= k
  }

  zoomIn () {
    this.scale *= 1.1
  }

  zoomOut () {
    this.scale /= 1.1
  }

  get (id) {
    let res
    if ((res = this.elements.filter(el => el.id === id)).length) { return res[0] }
    return null
  }

  tooltip (options) {
    tooltip(options)
  }

  getRelativeCoord (x, y) {
    const coord = createCoord(x, y)

    coord.translate(-this.x, -this.y)
    coord.scale(1 / this.scale, 1 / this.scale)
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

export default View
