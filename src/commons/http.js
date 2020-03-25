import axios from 'axios'
import { Notification } from 'element-ui'
import i18n from '@/i18n'

let ErrorTipFlag = false

const config = {
  timeout: 30000
}

const http = axios.create(config)

const errTip = msg => {
  if (!ErrorTipFlag) {
    Notification.error({
      duration: 2000,
      title: i18n.t('tip'),
      message: i18n.t(msg)
    })

    ErrorTipFlag = true
    setTimeout(() => {
      ErrorTipFlag = false
    }, 2000)
  }
}

// 请求拦截
http.interceptors.request.use(config => {
  return config
}, error => {
  errTip('request failed')
  Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(
  response => {
    const data = response.data
    const { code } = data

    if (code === 'NO_PERMISSION') {
      errTip('session expired')
      window.location.href = 'https://cas.hanshow.com:8443/cas/login?service=http%3A%2F%2F192.168.13.13%3A8080%2Flogin%2Fcas'
    } else if (code && code !== 'SUC') {
      errTip(data.responseMsg)
    }
    return data
  },
  error => {
    errTip('request failed')
    Promise.reject(error)
  }
)

export default http
