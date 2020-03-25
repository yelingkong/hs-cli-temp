
function path (path) {
  getCMDsFromPathString(path).forEach(cmd => {
    CMDs[cmd.type] && CMDs[cmd.type].call(this, ...cmd.payload)
  })
}

function getCMDsFromPathString (path) {
  const reg = /([mlhvcqastMLHVCQAST])([\d,+-.\s]*)/g
  const cmds = []
  let res

  while ((res = reg.exec(path)) !== null) {
    cmds.push({
      type: res[1],
      payload: res[2] ? res[2].trim().split(/\s*,\s*|\s+/g).map(n => Number(n)) : []
    })
  }
  return cmds
}

const CMDs = {
  m (x, y) {
    this.coord[0] += x
    this.coord[1] += y

    this.ctx.moveTo(...this.coord)
  },

  M (x, y) {
    this.coord[0] = x
    this.coord[1] = y
    this.ctx.moveTo(x, y)
  },

  l (x, y) {
    this.coord[0] += x
    this.coord[1] += y

    this.ctx.lineTo(...this.coord)
  },

  L (x, y) {
    this.coord[0] = x
    this.coord[1] = y
    this.ctx.lineTo(x, y)
  },

  h (x) {
    this.coord[0] += x
    this.ctx.lineTo(...this.coord)
  },

  H (x) {
    this.coord[0] = x
    this.ctx.lineTo(...this.coord)
  },

  v (y) {
    this.coord[1] += y
    this.ctx.lineTo(...this.coord)
  },

  V (y) {
    this.coord[1] = y
    this.ctx.lineTo(...this.coord)
  },

  c (cx1, cy1, cx2, cy2, x2, y2) {
    const [x, y] = this.coord
    this.ctx.beizierCurveTo(x + cx1, y + cy1, x + cx2, y + cy2, x + x2, y + y2)

    this.coord[0] = x + x2
    this.coord[1] = y + y2
  },

  C (cx1, cy1, cx2, cy2, x2, y2) {
    this.ctx.beizierCurveTo(cx1, cy1, cx2, cy2, x2, y2)

    this.coord[0] = x2
    this.coord[1] = y2
  },

  q (cx, cy, x2, y2) {
    const [x, y] = this.coord
    this.ctx.quadraticCurveTo(x + cx, y + cy, x + x2, y + y2)

    this.coord[0] = x + x2
    this.coord[1] = y + y2
  },

  Q (cx, cy, x2, y2) {
    this.ctx.beizierCurveTo(cx, cy, x2, y2)

    this.coord[0] = x2
    this.coord[1] = y2
  },

  // TODO s
  s (cx1, cy1, cx2, cy2, x2, y2) {
    const [x, y] = this.coord
    this.ctx.beizierCurveTo(x + cx1, y + cy1, x + cx2, y + cy2, x + x2, y + y2)

    this.coord[0] = x + x2
    this.coord[1] = y + y2
  },

  // TODO S
  S (cx1, cy1, cx2, cy2, x2, y2) {
    this.ctx.beizierCurveTo(cx1, cy1, cx2, cy2, x2, y2)

    this.coord[0] = x2
    this.coord[1] = y2
  },

  // TODO t
  t (cx, cy, x2, y2) {
    const [x, y] = this.coord
    this.ctx.quadraticCurveTo(x + cx, y + cy, x + x2, y + y2)

    this.coord[0] = x + x2
    this.coord[1] = y + y2
  },

  // TODO T
  T (cx, cy, x2, y2) {
    this.ctx.beizierCurveTo(cx, cy, x2, y2)

    this.coord[0] = x2
    this.coord[1] = y2
  },

  a (x, y, r, s, e) {
    this.coord[0] += x
    this.coord[1] += y
    this.ctx.arc(...this.coord, r, s, e)
  },

  A (x, y, r, s, e) {
    this.coord[0] = x
    this.coord[1] = y
    this.ctx.arc(x, y, r, s, e)
  }
}

export default path
