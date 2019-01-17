import axios from '@/libs/api.request'
// 个人认证的接口
const API_TOPIC_MANAGER_PREFIX = '/api/v1/credit/user-certification/'

// 查看进度
export const percent = () => {
  return axios.get({
    url: API_TOPIC_MANAGER_PREFIX + 'percent'
  })
}
// 获取进度查询页面中为您推荐的卡片列表
export const getRecommondList = () => {
  var data = {
    'creditShorterCard': 1,
    'creditState': 1
  }
  return axios.get({
    url: '/api/v1/credit/detail/page',
    data
  })
}
// 从后台获取token
export const getToken = () => {
  // 如果window下面存在WebViewJavasciptBridge
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('authToken', {}, function (responseData) {
      console.log('查看获取到的token内容')
    })
    window.WebViewJavascriptBridge.callHandler('fillCardApplyInfo', {}, function (responseData) { })
  }
}

/**
 * window.WebViewJavascriptBridge.callHandler('authToken', {}, function (responseData) { });
 * window.WebViewJavascriptBridge.callHandler('fillCardApplyInfo', {}, function (responseData) { });
 * authToken   返回结果{ code: -1 }  表示请求失败  软件跳转到了登录页面
 * { code: 0, token: 'token' }      表示成功
 *  */

export default {
  percent,
  getRecommondList
}
