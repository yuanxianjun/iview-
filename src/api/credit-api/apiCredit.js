import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_CREDIT_PREFIX = '/api/v1/admin/credit/detail'
// 查询管理员相关的列表
export const creditPage = (page, rows, search, creditState) => {
  const data = {
    page,
    rows,
    search,
    creditState
  }
  return axios.post({
    url: API_CREDIT_PREFIX + '/page',
    data
  })
}
// 根据id删除信用卡
export const creditDel = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_CREDIT_PREFIX + '/del',
    data
  })
}

// 根据id查询信用卡相关信息
export const creditIdGet = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_CREDIT_PREFIX + '/detail',
    data
  })
}

// 管理员创建或更新信用卡信息
export const creditSave = (data) => {
  var datas = {
    'creditAnnualFee': '',
    'creditApplyCount': 0,
    'creditBank': '',
    'creditDescription': '',
    'creditHotCard': false,
    'creditImg': '',
    'creditLevel': '',
    'creditLink': '',
    'creditName': '',
    'creditOrganizations': '',
    'creditPrivileges': '',
    'creditPurposes': '',
    'creditRecommandCard': false,
    'creditTips': '',
    'id': 0
  }
  return axios.post({
    url: API_CREDIT_PREFIX + '/save',
    data
  })
}
export default {
  creditPage,
  creditDel,
  creditIdGet,
  creditSave

}
