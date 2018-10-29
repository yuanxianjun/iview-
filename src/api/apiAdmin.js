import axios from '@/libs/api.request'
// 这里是管理员的相关api
const API_USER_ADMIN_PREFIX = 'api/v1/admin/user'
// 查询管理员相关的列表
export const list = (page, rows, searchKey, searchValue) => {
  const data = {
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + '/page',
    data
  })
}
// 添加用户管理员
export const adminSubmit = (data) => {
  return axios.post({
    url: API_USER_ADMIN_PREFIX + '/save',
    data
  })
}
// 通过id删除管理员信息
export const adminDelete = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + '/del',
    data
  })
}
// 使用id进行搜索查询用户信息及其信息
export const adminIdSearch = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ADMIN_PREFIX + '/getDetail',
    data
  })
}
// 修改用户角色
export const roleSave = (data) => {
  return axios.post({
    url: API_USER_ADMIN_PREFIX + '/saveUserRole',
    data
  })
}
// 文件上传的地址
export const uploadUrl = '/api/v1/storage/upload'
export default {
  list,
  adminSubmit,
  adminDelete,
  adminIdSearch,
  roleSave,
  uploadUrl
}
