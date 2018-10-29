import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_LOANS_PREFIX = '/api/v1/admin/credit/loan'
// 查询管理员相关的列表
export const loanPage = (page, rows, searchKey, searchValue) => {
  const data = {
    page,
    rows,
    'orderAsc': false,
    'orderKey': 1,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_LOANS_PREFIX + '/page',
    data
  })
}
// 根据id删除信用卡
export const loanDel = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_LOANS_PREFIX + '/del',
    data
  })
}
// 根据id查询信用卡相关信息
export const loanIdGet = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_LOANS_PREFIX + '/get',
    data
  })
}
// 管理员创建或更新信用卡信息
export const loanSave = (data) => {
  var datas = {
    'id': 0,
    'loanApplyCount': 0,
    'loanDescription': '',
    'loanHot': 0,
    'loanImg': '',
    'loanLevel': '',
    'loanLink': '',
    'loanMaxLimit': 0,
    'loanName': '',
    'loanPurpose': '',
    'loanRecommand': 0,
    'loanShortApprovalTime': 0,
    'loanTimeLimit': 0,
    'loanTips': ''
  }
  return axios.post({
    url: API_LOANS_PREFIX + '/save',
    data
  })
}
export default {
  loanPage,
  loanDel,
  loanIdGet,
  loanSave

}
