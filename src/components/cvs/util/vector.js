const vector = {
  add (...vs) {
    var res = []
    vs.forEach(v => {
      v.forEach((d, i) => {
        res[i] = res[i] ? res[i] + d : d
      })
    })
  },

  deduct (v1, v2) {
    const v = [...v1]
    v2.forEach((d, i) => {
      v[i] = (v[i] || 0) - d
    })

    return v
  },

  norm (v) {
    if (v.length === 0) return
    return Math.pow(v.reduce((res, n) => res + n * n, 0), 1 / v.length)
  },

  dot (v1, v2) {
    const len = Math.min(v1.length, v2.length)
    let res = 0
    let i = -1

    while (++i < len) {
      res += v1[i] * v2[i]
    }

    return res
  },

  crossNorm (v1, v2) {
    return Math.abs(v1[0] * v2[1] - v1[1] * v2[0])
  },

  multiply (v, n) {
    return v.map(d => d * n)
  },

  cos (v1, v2) {
    return this.dot(v1, v2) / this.norm(v1) / this.norm(v2)
  },

  angle (v1, v2) {
    return Math.acos(this.cos(v1, v2))
  }
}

export default vector
