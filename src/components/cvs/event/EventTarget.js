import eventUtil from './eventUtil'

/**
 * 事件对象类
 */
class TopoEventTarget {
  on (eventName, eventHandler) {
    if (!eventName) return
    if (typeof eventHandler !== 'function') return

    eventUtil.add(this, eventName, eventHandler)

    return this
  }

  once (eventName, eventHandler) {
    if (!eventName) return
    if (typeof eventHandler !== 'function') return

    const handler = function (e) {
      eventHandler.call(this, e)
      eventUtil.off(this, eventName, handler)
    }

    eventUtil.add(this, eventName, handler)

    return this
  }

  off (eventName, eventHandler) {
    eventUtil.off(this, eventName, eventHandler)

    return this
  }

  dispatch (event) {
    eventUtil.get(this, event.type).forEach(ev => ev.eventHandler.call(this, event))

    return this
  }
}

export default TopoEventTarget
