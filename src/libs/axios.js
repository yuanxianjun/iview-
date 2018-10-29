import axios from 'axios'
import { getToken } from '@/libs/util'
// import { Spin } from 'iview'
import { Message } from 'iview'
import qs from 'qs'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
    this.tokenHead = 'token'
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      const token = getToken()
      if (token !== false) {
        config.headers[this.tokenHead] = getToken()
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status, message } = res.data
      if (status !== 0) {
        Message.error(message)
      }
      return { data, status, message }
    }, error => {
      this.destroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
  postForm ({ url, data }) {
    if (data == null || data === '' || data === null) {
      data = ''
    }
    const option = {
      url: url,
      data: qs.stringify(data),
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    }
    return this.request(option)
  }
  post ({ url, data }) {
    if (data == null || data === '' || data === null) {
      data = ''
    }
    const option = {
      url: url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }
    return this.request(option)
  }
  get ({ url, data }) {
    if (data == null || data === '' || data === null) {
      data = ''
    }
    const option = {
      url: url,
      params: data,
      method: 'get',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    }
    return this.request(option)
  }
}
export default HttpRequest
