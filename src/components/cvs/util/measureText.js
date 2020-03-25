export default function (content, options) {
  const { fontFamily, fontWeight, fontStyle, fontSize } = options
  const d = document.createElement('canvas').getContext('2d')

  d.font = `${fontSize || 12}px ${fontWeight || ''} ${fontStyle || ''} ${fontFamily || 'Sanserif'}`
  const width = d.measureText(content).width

  return {
    width,
    height: fontSize || 12
  }
}
