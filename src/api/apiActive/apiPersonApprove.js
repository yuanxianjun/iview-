import axios from '@/libs/api.request'
// 个人认证的接口
const API_TOPIC_MANAGER_PREFIX = '/api/v1/credit/user-certification/'

// 查找可查询进度的所有银行
export const percent = () => {
  return axios.get({
    url: API_TOPIC_MANAGER_PREFIX + 'percent'
  })
}

export default {
  percent
}
