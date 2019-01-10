import axios from '@/libs/api.request'
// 这里是主题管理的相关api
const API_TOPIC_MANAGER_PREFIX = '/api/v1/admin/credit/topic/'

// 管理员添加主题项
export const addItem = (data) => {
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'addItem',
    data
  })
}
// 管理员根据ID删除
export const del = (id) => {
  var data = {
    id: id
  }
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'del',
    data
  })
}

// 管理员删除主题中的item
export const delItem = (id) => {
  var data = {
    'ids': [id]
  }
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'delItem',
    data
  })
}

// 管理员根据ID进行查询
export const IdGet = (id) => {
  var data = {
    id
  }
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'get',
    data
  })
}

// 管理员分页查询
export const pageGet = (data) => {
  //   var data = {
  //     'orderAsc': false,
  //     'orderKey': 1,
  //     'page': 1,
  //     'rows': 10,
  //     'searchKey': 1,
  //     'searchValue': 1
  //   }
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'page',
    data
  })
}

// 管理员保存
export const managerSave = (data) => {
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'save',
    data
  })
}
// 查询某个主题下面的列表详情
export const itemDetail = (id) => {
  var data = {
    topicId: id
  }
  return axios.postForm({
    url: '/api/v1/credit/topic/detail',
    data
  })
}
export default {
  addItem,
  delItem,
  del,
  pageGet,
  IdGet,
  managerSave,
  itemDetail
}
