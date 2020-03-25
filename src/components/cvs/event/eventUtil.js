const eventHandlerMap = new WeakMap()

export default {
  get (eventTarget, eventName) {
    const handlers = eventHandlerMap.get(eventTarget)

    if (!handlers) {
      return []
    } else {
      return handlers.filter(ev => ev.eventName === eventName)
    }
  },

  add (eventTarget, eventName, eventHandler) {
    let handlers = eventHandlerMap.get(eventTarget)

    if (!handlers) {
      handlers = [{ eventTarget, eventName, eventHandler }]
      eventHandlerMap.set(eventTarget, handlers)
    } else {
      if (!handlers.some(h => h.eventName === eventName && h.eventHandler === eventHandler)) {
        handlers.push({ eventTarget, eventName, eventHandler })
      }
    }
  },

  off (eventTarget, eventName, eventHandler) {
    const handlers = eventHandlerMap.get(eventTarget)

    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        const ev = handlers[i]

        if ((!eventHandler || eventHandler === ev.eventHandler) && (!eventName || eventName === ev.eventName)) {
          handlers.splice(i, 1)
          i--
        }
      }
    }
  }
}
