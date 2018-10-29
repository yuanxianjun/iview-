import axios from '@/libs/api.request'
// 本接口主要是安全设置方面的（绑定手机号，绑定邮箱，更改密码）
const API_USER_SAFE_PREFIX = '/api/v1/user/auth'

// 更新密码
export const updatePassword = (datas) => {
  var data = {
    key: datas.key,
    newnewPassword: datas.newPassword,
    vcode: datas.vcode
  }
  return axios.post({
    url: API_USER_SAFE_PREFIX + '/findPassword',
    data
  })
}

// 绑定手机号
export const bindPhone = (datas) => {
  var data = {
    phone: datas.phone,
    vcode: datas.vcode
  }
  return axios.post({
    url: API_USER_SAFE_PREFIX + '/bindPhone',
    data
  })
}
// 解绑手机号
export const unbindPhone = (datas) => {
  var data = {
    phone: datas.phone,
    vcode: datas.vcode
  }
  return axios.post({
    url: API_USER_SAFE_PREFIX + '/unbindPhone',
    data
  })
}
// 绑定邮箱
export const bindEmail = (datas) => {
  var data = {
    email: datas.email,
    vcode: datas.vcode
  }
  return axios.post({
    url: API_USER_SAFE_PREFIX + '/bindEmail',
    data
  })
}
// 解绑手机号
export const unbindEmail = (datas) => {
  var data = {
    email: datas.email,
    vcode: datas.vcode
  }
  return axios.post({
    url: API_USER_SAFE_PREFIX + '/unbindEmail',
    data
  })
}
// 给手机或者邮箱发送验证码
export const sendVCode = (phone, email) => {
  var data = {}
  console.log(phone, email)
  if (phone) {
    data = {
      phone,
      imageCode: '1233',
      needCheckImageCode: false,
      vcodeType: 1
    }
  } else {
    data = {
      email,
      imageCode: '1233',
      needCheckImageCode: false,
      vcodeType: 1
    }
  }

  return axios.post({
    url: API_USER_SAFE_PREFIX + '/sendVCode',
    data
  })
}
export default {
  updatePassword,
  bindPhone,
  unbindPhone,
  bindEmail,
  unbindEmail,
  sendVCode

}
