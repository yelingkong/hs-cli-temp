import path from './path'

class Renderer {
  constructor (w, h) {
    this.dom = document.createElement('canvas')
    this.dom.width = w
    this.dom.height = h
    this.dom.style.width = w + 'px'
    this.dom.style.height = h + 'px'
    this.ctx = this.dom.getContext('2d')

    this.origin = [0, 0]
    this.coord = [0, 0]
    this.rotation = 0
  }

  set (options) {
    Object.assign(this.ctx, options)

    return this
  }

  setLineDash (dash) {
    this.ctx.setLineDash(dash)

    return this
  }

  save () {
    this.ctx.save()

    return this
  }

  restore () {
    this.ctx.restore()

    return this
  }

  path (pathData) {
    path.call(this, pathData)

    return this
  }

  font (font) {
    this.ctx.font = font

    return this
  }

  align (alignment) {
    this.ctx.textAlign = alignment

    return this
  }

  valign (alignment) {
    this.ctx.textBaseline = alignment

    return this
  }

  shadow (offsetX = 0, offsetY = 0, blur = 0, color = 'rgba(255, 255, 255, 0)') {
    this.ctx.shadowOffsetX = offsetX
    this.ctx.shadowOffsetY = offsetY
    this.ctx.shadowBlur = blur
    this.ctx.shadowColor = color

    return this
  }

  lineWidth (n) {
    this.ctx.lineWidth = n

    return this
  }

  rect (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.ctx.closePath()

    return this
  }

  arc (x, y, r, d1, d2, anticlockwise) {
    this.ctx.arc(x, y, r, d1, d2, anticlockwise)

    return this
  }

  img (img, x, y) {
    this.ctx.drawImage(img, x, y)

    return this
  }

  fill (fillStyle) {
    fillStyle && (this.ctx.fillStyle = fillStyle)
    this.ctx.fill()

    return this
  }

  stroke (strokeStyle) {
    strokeStyle && (this.ctx.strokeStyle = strokeStyle)
    this.ctx.stroke()

    return this
  }

  fillText (content, x, y, fillStyle) {
    fillStyle && (this.ctx.fillStyle = fillStyle)
    this.ctx.fillText(content, x, y)

    return this
  }

  strokeText (content, x, y, strokeStyle) {
    strokeStyle && (this.ctx.strokeStyle = strokeStyle)
    this.ctx.strokeText(content, x, y)

    return this
  }

  clear (x, y, w, h) {
    this.ctx.clearRect(x, y, w, h)

    return this
  }

  begin () {
    this.ctx.beginPath()

    return this
  }

  close () {
    this.ctx.closePath()

    return this
  }

  mt (x, y) {
    this.ctx.moveTo(x, y)
    this.coord[0] = x
    this.coord[1] = y

    return this
  }

  lt (x, y) {
    this.ctx.lineTo(x, y)
    this.coord[0] = x
    this.coord[1] = y

    return this
  }

  mv (x, y) {
    this.ctx.translate(x, y)
    this.origin[0] += x
    this.origin[1] += y

    return this
  }

  scale (scaleX, scaleY) {
    this.ctx.scale(scaleX, scaleY)

    return this
  }

  rotate (rotation) {
    this.ctx.rotate(rotation)

    return this
  }
}

export default Renderer
