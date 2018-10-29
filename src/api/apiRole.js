import axios from '@/libs/api.request'
// 这里是角色的相关api
const API_USER_ROLE_PREFIX = 'api/v1/admin/user/role'
// 查询角色相关的列表
export const list = (page, rows, searchKey, searchValue) => {
  const data = {
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_USER_ROLE_PREFIX + '/page',
    data
  })
}
// 新建角色
export const roleSubmit = (data) => {
  return axios.post({
    url: API_USER_ROLE_PREFIX + '/save',
    data
  })
}
// 通过id删除角色信息
export const roleDelete = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ROLE_PREFIX + '/del',
    data
  })
}
// 使用id进行搜索 getdetail
export const roleIdSearch = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ROLE_PREFIX + '/getDetail',
    data
  })
}
// 保存权限
export const permissionSave = (data) => {
  return axios.post({
    url: API_USER_ROLE_PREFIX + '/saveRoleAndPermission',
    data
  })
}
export default {
  list,
  roleSubmit,
  roleDelete,
  roleIdSearch,
  permissionSave
}
