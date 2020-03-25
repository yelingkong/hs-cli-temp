import _ from 'lodash'

function tooltip (options = 'show') {
  const dom = document.getElementById('store-map-tooltip') || createDom()

  if (options === 'show') {
    dom.style.display = 'block'
  } else if (options === 'hide') {
    dom.style.display = 'none'
  } else {
    const { text, template } = options

    dom.innerHTML = ''
    if (text) dom.textContent = text
    if (template) dom.appendChild(template)
    dom.style.display = 'block'

    mv(dom, options)
  }
}

const mv = _.throttle(function (dom, options) {
  let { x, y } = options
  const { width, height } = dom.getBoundingClientRect()
  const w = window.innerWidth; const h = window.innerHeight
  const delta = 10

  x = x + width + delta <= w ? x + delta : Math.max(0, x - width - delta)
  y = y - height - delta >= 0 ? y - height - delta : Math.max(0, Math.min(y + delta, h - height - delta))

  Object.assign(dom.style, {
    top: y + 'px',
    left: x + 'px'
  })
}, 200)

function createDom () {
  const div = document.createElement('div')
  div.id = 'store-map-tooltip'
  Object.assign(div.style, {
    position: 'fixed',
    display: 'none',
    padding: '6px 10px',
    border: '1px solid #000',
    background: 'rgba(0, 0, 0, .6)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '12px',
    pointerEvents: 'none',
    transition: 'left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s'
  })

  document.body.appendChild(div)

  return div
};

export default tooltip
