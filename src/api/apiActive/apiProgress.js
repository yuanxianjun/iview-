import axios from '@/libs/api.request'
// 这里是主题管理的相关api
const API_TOPIC_MANAGER_PREFIX = '/api/v1/credit/bank/'

// 查找可查询进度的所有银行
export const applyProgressBanks = () => {
  return axios.get({
    url: API_TOPIC_MANAGER_PREFIX + 'applyProgressBanks'
  })
}

export default {
  applyProgressBanks
}
