import axios from '@/libs/api.request'
// 这里是角色的相关api
const API_USER_MESS_PREFIX = '/api/v1/user/message'
// 查看个人用户通知列表
export const list = (page, rows) => {
  const data = {
    page,
    rows
  }
  return axios.get({
    url: API_USER_MESS_PREFIX + '/getUserMessage',
    data
  })
}
// 获得用户通知详情
export const getDetails = (id) => {
  var data = {
    id
  }
  return axios.post({
    url: API_USER_MESS_PREFIX + '/detail',
    data
  })
}

// 获取未读信息数
export const getNoRead = () => {
  return axios.post({
    url: API_USER_MESS_PREFIX + '/getUnReadCount'
  })
}
// 设置批读消息
export const setRead = (ids) => {
  var data = {
    ids
  }
  return axios.post({
    url: API_USER_MESS_PREFIX + '/setReaded',
    data
  })
}
// 管理员用户发消息
export const sendMess = (data) => {
  return axios.post({
    url: API_USER_MESS_PREFIX + '/save',
    data
  })
}
export default {
  list,
  getDetails,
  getNoRead,
  setRead,
  sendMess

}
