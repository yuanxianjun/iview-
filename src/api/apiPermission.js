import axios from '@/libs/api.request'

const API_USER_PERMISSION_PREFIX = 'api/v1/admin/user/permission'
// 查询列表
export const list = (page, rows, searchKey, searchValue) => {
  const data = {
    page,
    rows,
    searchKey,
    searchValue
  }

  return axios.post({
    url: API_USER_PERMISSION_PREFIX + '/page',
    data
  })
}

// 向后台提交新建的数据
export const permissionSubmit = (data) => {
  return axios.post({
    url: API_USER_PERMISSION_PREFIX + '/save',
    data
  })
}
// 通过id删除数据
export const permissionDelete = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_PERMISSION_PREFIX + '/del',
    data
  })
}

// export const permissionSearch = (value) => {
//   const data = {
//     value
//   }
//   return axios.post({
//     url: API_USER_PERMISSION_PREFIX + '/page',
//     data
//   })
// }
export default {
  list,
  permissionSubmit,
  permissionDelete
}
