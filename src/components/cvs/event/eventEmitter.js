/**
 * 事件类
 */
class MapEvent {
  constructor (type, target, e) {
    this.x = 0
    this.y = 0
    this.stop = false
    this.prevent = false
    this.type = type
    this.target = target
    this.originalEvent = e

    if (e.touches) {
      const touch = e.touches[0] || e.changedTouches[0]
      const { left, top } = touch.getBoundingClientRect()

      this.pageX = touch.pageX
      this.pageY = touch.pageY
      this.offsetX = touch.pageX - left
      this.offsetY = touch.pageY - top
      this.clientX = touch.clientX
      this.clientY = touch.clientY
    } else {
      this.pageX = e.pageX
      this.pageY = e.pageY
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
      this.clientX = e.clientX
      this.clientY = e.clientY
    }
  }

  preventDefault () {
    this.prevent = true
  }

  stopPropergation () {
    this.stop = true
  }
}

/**
 * 事件发射器
 * @param {DOMElement} dom 要绑定事件监听的dom对象
 * @param {StoreMap} map 事件过程中的storeMap对象
 */
function eventEmitter (dom, map) {
  let mousedownFlag = false
  let mousemoveFlag = false
  let clickFlag = 0
  let holdFlag = false
  let prevEventTargets = null
  let currentEventTargets = null
  let prevEventTarget = null
  let currentEventTarget = null

  const exec = (targets, type, e) => {
    if (!targets) return

    let stop = false
    const eventTargets = [...targets]
    let ex, ey
    let touch

    if (e.touches) {
      touch = e.touches[0] || e.changedTouches[0]

      ex = touch.clientX
      ey = touch.clientY
    } else {
      ex = e.offsetX
      ey = e.offsetY
    }

    while (!stop && eventTargets.length) {
      const target = eventTargets.pop()
      const ev = new MapEvent(type, target, e)

      ev.x = ex
      ev.y = ey
      target.dispatch(ev)
      stop = ev.stop
    }
  }

  const refreshEventTarget = e => {
    let ex, ey
    if (e.touches) {
      const { left, top } = e.target.getBoundingClientRect()
      ex = e.touches[0].pageX - left
      ey = e.touches[0].pageY - top
    } else {
      ex = e.offsetX
      ey = e.offsetY
    }

    ex = (ex / map.scale) - map.x
    ey = (ey / map.scale) - map.y

    prevEventTargets = currentEventTargets
    prevEventTarget = currentEventTarget
    currentEventTargets = [map, ...map.elements.filter(el => el.contain(ex, ey))]
    currentEventTarget = currentEventTargets[currentEventTargets.length - 1]
  }

  /**
   * 事件处理函数
   */
  const eventHandlers = {
    contextmenu (e) {
      e.preventDefault()
    },
    mousedown (e) {
      mousedownFlag = true
      mousemoveFlag = false

      exec(currentEventTargets, 'mousedown', e)
    },
    mousemove (e) {
      if (mousedownFlag) {
        if (!mousemoveFlag) {
          exec(currentEventTargets, 'dragstart', e)
          mousemoveFlag = true
        } else {
          exec(currentEventTargets, 'drag', e)
        }
      } else {
        // 重新计算当前的事件对象
        refreshEventTarget(e)

        if (prevEventTarget === currentEventTarget) {
          exec(currentEventTargets, 'mousemove', e)
        } else {
          exec(currentEventTargets, 'mouseenter', e)
          exec(prevEventTargets, 'mouseleave', e)
        }
      }
    },
    mouseup (e) {
      if (mousemoveFlag) {
        exec(currentEventTargets, 'dragend', e)
      } else {
        if (e.button === 0) {
          if (clickFlag === 0) {
            setTimeout(() => {
              if (clickFlag === 2) {
                exec(currentEventTargets, 'dblclick', e)
                clickFlag = 0
              }
            }, 300)
          }
          exec(currentEventTargets, 'click', e)
          clickFlag++
        } else if (e.button === 2) {
          exec(currentEventTargets, 'contextmenu', e)
        }
      }
      exec(currentEventTargets, 'mouseup', e)

      mousemoveFlag = false
      mousedownFlag = false
    },
    touchstart (e) {
      e.preventDefault()
      mousemoveFlag = false
      holdFlag = +new Date()

      exec(currentEventTargets, 'touchstart', e)
    },
    touchmove (e) {
      e.preventDefault()
      // 重新计算当前的事件对象
      refreshEventTarget(e)

      if (!mousemoveFlag) {
        exec(currentEventTargets, 'touchstart', e)
        mousemoveFlag = true
      } else {
        exec(currentEventTargets, 'touchmove', e)
      }
    },
    touchend (e) {
      if (mousemoveFlag) {
        exec(currentEventTargets, 'dragend', e)
      } else {
        if (+new Date() - holdFlag >= 500) {
          exec(currentEventTargets, 'longtap', e)
        } else {
          if (clickFlag === 0) {
            setTimeout(() => {
              if (clickFlag === 2) {
                exec(currentEventTargets, 'dbltap', e)
                clickFlag = 0
              }
            }, 300)
          }
          exec(currentEventTargets, 'tap', e)
          clickFlag++
        }
      }
      exec(currentEventTargets, 'touchend', e)

      mousemoveFlag = false
    },
    mouseenter (e) {
      exec(currentEventTargets, 'mouseenter', e)
    },
    mouseleave (e) {
      mousemoveFlag = false
      mousedownFlag = false
      exec(currentEventTargets, 'mouseleave', e)
    },
    mousewheel (e) {
      e.preventDefault()
      exec(currentEventTargets, 'mousewheel', e)
    },
    DOMMouseScroll (e) {
      e.preventDefault()
      exec(currentEventTargets, 'mousewheel', e)
    }
  }

  const eventTypes = Object.keys(eventHandlers)

  map.attachEvent = () => eventTypes.forEach(type => dom.addEventListener(type, eventHandlers[type]))
  map.disposeEvent = () => eventTypes.forEach(type => dom.removeEventListener(type, eventHandlers[type]))
  dom.style.cursor = 'pointer'

  map.attachEvent()
}

export default eventEmitter
