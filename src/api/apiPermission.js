import axios from '@/libs/api.request'

const API_USER_PERMISSION_PREFIX = 'api/v1/admin/permission'
export const list = ({page, rows, searchKey,searchValue}) => {
  const data = {
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.postForm({
    url: API_USER_PERMISSION_PREFIX + 'page',
    data
  })
}
