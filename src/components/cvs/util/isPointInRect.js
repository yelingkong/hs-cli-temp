export default function (rx, ry, width, height, x, y) {
  return rx <= x && rx + width >= x && ry <= y && ry + height >= y
}
