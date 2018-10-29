import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_BANK_PREFIX = '/api/v1/admin/credit/bank'
// 查询管理员相关的列表
export const bankPage = (page, rows, searchKey, searchValue) => {
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
    url: API_BANK_PREFIX + '/page',
    data
  })
}
// 银行删除
export const bankDel = (id) => {
  const data =
  {
    id
  }
  return axios.post({
    url: API_BANK_PREFIX + '/del',
    data
  })
}
// 银行根据id查询
export const bankIdGet = (id) => {
  const data =
  {
    id
  }
  return axios.post({
    url: API_BANK_PREFIX + '/get',
    data
  })
}
// 信用卡银行保存
export const bankSave = (data) => {
  return axios.post({
    url: API_BANK_PREFIX + '/save',
    data
  })
}
export default {
  bankPage,
  bankDel,
  bankIdGet,
  bankSave
}
