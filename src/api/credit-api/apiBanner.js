import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_BANNER_PREFIX = '/api/v1/admin/credit/banner'
// 管理员banner查询
export const bannerPage = (page, rows, searchKey, searchValue) => {
  const data =
    {
      page,
      rows,
      'orderAsc': false,
      'orderKey': 1,
      searchKey,
      searchValue
    }
  return axios.post({
    url: API_BANNER_PREFIX + '/page',
    data
  })
}
// 管理员删除
export const bannerDel = (id) => {
  const data =
    {
      id
    }
  return axios.post({
    url: API_BANNER_PREFIX + '/del',
    data
  })
}
// 管理员根据id查询banner信息
export const bannerIdGet = (id) => {
  const data =
    {
      id
    }
  return axios.post({
    url: API_BANNER_PREFIX + '/get',
    data
  })
}
// banner创建
export const bannerSave = (data) => {
  var Datas = {
    'bannerEndTime': '',
    'bannerId': 0,
    'bannerImg': '',
    'bannerLink': '',
    'bannerPosition': '',
    'bannerSortNumber': 0,
    'bannerStartTime': '',
    'bannerStatus': 0,
    'bannerTitle': '',
    'bannerType': 0
  }
  return axios.post({
    url: API_BANNER_PREFIX + '/save',
    data
  })
}
export default {
  bannerPage,
  bannerDel,
  bannerIdGet,
  bannerSave
}
