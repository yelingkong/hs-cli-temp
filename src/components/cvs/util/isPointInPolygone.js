function isPointInPolygone (points, x, y) {
  let i = -1
  let n = 0

  points = [...points, points[0]]

  while (++i < points.length - 1) {
    const [x0, y0] = points[i]; const [x1, y1] = points[i + 1]

    if (x0 > x && x1 < x && (y1 - y0) / (x1 - x0) * (x0 - x) > y0 - y) n++
  }

  return n & 1
}

export default isPointInPolygone
