const WIDTH = document.documentElement.clientWidth

// const REM = Math.max(WIDTH / 1366 * 100, 100)
const REM = WIDTH / 1366 * 100

document.documentElement.style.fontSize = REM + 'px'
document.body.style.fontSize = '12px'
