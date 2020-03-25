
import View from './view'
import Element from './element/Element'
import Text from './element/Text'
import Polyline from './element/Polyline'
import Polygone from './element/Polygone'
import Path from './element/Path'
import HeatMap from './element/HeatMap'
import Rect from './element/Rect'

import util from './util'
import animate from './animate'

function allowDraggable (map) {
  let prevX = 0
  let prevY = 0

  map.on('dragstart', e => {
    map.animate()
    prevX = e.x
    prevY = e.y
  }).on('drag', e => {
    map.translate(e.x - prevX, e.y - prevY)
    prevX = e.x
    prevY = e.y
  }).on('dragend', () => {
    map.onAnimation = false
  })
}

function allowZoomable (map) {
  let timer = null

  map.on('mousewheel', e => {
    if (!map.onAnimation) {
      map.animate()
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      map.onAnimation = false
    }, 100)

    const _e = e.originalEvent
    const delta = _e.wheelDelta || _e.detail
    const s = map.scale

    map.zoom(delta > 0)

    const s2 = map.scale
    const dx = (e.x - map.x) * (1 - s2 / s)
    const dy = (e.y - map.y) * (1 - s2 / s)

    map.translate(dx, dy)
  })
}

const cvs = {
  // 组件构造函数
  Element,
  Text,
  Polyline,
  Polygone,
  Path,
  HeatMap,
  Rect,

  // 工具类
  util,

  // 动画
  animate,

  init (dom, options) {
    const { zoomable, draggable, ...otherOpts } = options
    const view = new View(otherOpts)

    if (zoomable !== false) {
      allowZoomable(view)
    }

    if (draggable !== false) {
      allowDraggable(view)
    }

    dom.appendChild(view.renderer.dom)

    return view
  }
}

export default cvs
