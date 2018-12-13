import axios from '@/libs/api.request'

// 这里是app管理的相关api
const API_USER_ADMIN_PREFIX = '/api/v1/admin/credit/app/'

// app：管理员分页查询
export const list = (page, rows, searchKey, searchValue, orderKey) => {
  const data = {
    page,
    rows,
    searchKey,
    searchValue,
    orderKey
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + 'page',
    data
  })
}

// app：管理员保存
export const appAdminSubmit = (data) => {
  return axios.post({
    url: API_USER_ADMIN_PREFIX + 'save',
    data
  })
}

// app：管理员根据ID删除
export const appAdminDelete = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + 'del',
    data
  })
}

// app：根据ID查询
export const appAdminIdSearch = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + 'get',
    data
  })
}

// app：设置当前最新app
export const setCurVersion = (id) => {
  var data = {
    id
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + 'setCurVersion',
    data
  })
}

// 文件上传的地址
export const uploadUrl = 'api/v1/storage/upload'
export default {
  list,
  appAdminSubmit,
  appAdminDelete,
  appAdminIdSearch,
  setCurVersion,
  uploadUrl

}
