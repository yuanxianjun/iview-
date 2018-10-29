import axios from '@/libs/api.request'
// 这里是字典的相关api，
const API_USER_TYPE_PREFIX = '/api/v1/admin/common/dictionary/type'
const API_USER_ITEM_PREFIX = '/api/v1/admin/common/dictionary/item'
// 查询字典类型相关的列表
export const typeList = (page, rows, searchKey, searchValue) => {
  const data = {
    'orderAsc': false,
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_USER_TYPE_PREFIX + '/page',
    data
  })
}
// 添加字典类型
export const dicTypeAdd = (data) => {
  return axios.post({
    url: API_USER_TYPE_PREFIX + '/save',
    data
  })
}
// 通过id删除字典信息
export const dicTypeDel = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_TYPE_PREFIX + '/del',
    data
  })
}
// 通过ID查询字典类型
export const dicIdFind = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_TYPE_PREFIX + '/get',
    data
  })
}

/*
    字典的item详情
*/
export const dicItemList = (page, rows, searchKey, searchValue) => {
  const data = {
    'orderAsc': false,
    page,
    rows,
    searchKey,
    searchValue
  }
  // console.log('传进来参数没有', data)
  return axios.post({
    url: API_USER_ITEM_PREFIX + '/page',
    data
  })
}
// 通过id删除字典信息
export const dicItemDel = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ITEM_PREFIX + '/del',
    data
  })
}
// 通过id查找item信息
export const dicItemIdFind = (id) => {
  const data = {
    id
  }
  return axios.post({
    url: API_USER_ITEM_PREFIX + '/get',
    data
  })
}
// 保存item
export const dicItemIdSave = (data) => {
  // var data = {
  //   id: formData.id,
  //   sort: formData.sort,
  //   text: formData.text,
  //   value: formData.text,
  //   typeId: formData.code
  // }
  return axios.post({
    url: API_USER_ITEM_PREFIX + '/save',
    data
  })
}
// 文件上传的地址
export const uploadUrl = '' + API_USER_ITEM_PREFIX + '/insertFile'
export default {
  typeList,
  dicTypeAdd,
  dicTypeDel,
  dicIdFind,
  // item
  dicItemList,
  dicItemDel,
  dicItemIdSave,
  dicItemIdFind,
  uploadUrl
}
