import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_APPROVE_PREFIX = '/api/v1/admin/credit/user-certification'

// 根据id查询用户认证相关信息
export const approveIdGet = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_APPROVE_PREFIX + '/get',
    data
  })
}

export default {
  approveIdGet
}
