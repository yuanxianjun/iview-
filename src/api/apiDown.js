import axios from '@/libs/api.request'
// 这里是字典的相关api
const API_USER_COM_PREFIX = 'api/v1/credit/app/newVersion'

// 根据字典类型查询字典列表
export const downDetail = () => {
  return axios.get({
    url: API_USER_COM_PREFIX
  })
}
export default {
  downDetail
}
