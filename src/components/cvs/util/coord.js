class Coord {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  matrix (a, b, c, d, e, f) {
    // a, b, c   x
    // d, e, f   y
    // 0, 0, 1   1
    const x = this.x
    const y = this.y
    this.x = Math.round(a * x + b * y + c)
    this.y = Math.round(d * x + e * y + f)

    return this
  }

  translate (dx, dy) {
    return this.matrix(1, 0, dx, 0, 1, dy)
  }

  scale (kx, ky) {
    return this.matrix(kx, 0, 0, 0, ky, 0)
  }

  rotate (angle) {
    angle = angle / 180 * Math.PI
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return this.matrix(cos, -sin, 0, sin, cos, 0)
  }

  skewX (angle) {
    angle = angle / 180 * Math.PI
    const tan = Math.tan(angle)
    return this.matrix(1, tan, 0, 0, 1, 0)
  }

  skewY (angle) {
    angle = angle / 180 * Math.PI
    const tan = Math.tan(angle)
    return this.matrix(1, 0, 0, tan, 1, 0)
  }
}

export default function (x, y) {
  return new Coord(x, y)
}
