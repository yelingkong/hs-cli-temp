import vector from './vector'

function isPointOnLine (x1, y1, x2, y2, x, y) {
  const r = 2 // 容差
  const v1 = [x2 - x1, y2 - y1]
  const v2 = [x - x1, y - y1]
  const n1 = vector.norm(v1)
  const n2 = vector.norm(v2)

  if (n2 <= r) return true
  if (n1 && vector.crossNorm(v1, v2) / n1 <= r) return true

  return false
}

export default isPointOnLine
