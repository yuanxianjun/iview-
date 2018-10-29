import axios from '@/libs/api.request'
const API_USER_DETAIL_PREFIX = '/api/v1/user/detail'
// 用户详情查询
export const userDetail = () => {
  return axios.post({
    url: API_USER_DETAIL_PREFIX + '/get'
  })
}
// 向后台提交新建的数据
export const updateUser = (data) => {
  return axios.post({
    url: API_USER_DETAIL_PREFIX + '/update',
    data
  })
}
export default {
  userDetail,
  updateUser

}
