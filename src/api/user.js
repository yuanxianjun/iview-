import axios from '@/libs/api.request'

const API_USER_AUTH_PREFIX = 'api/v1/user/auth/'
export const login = ({userName, password}) => {
  const data = {
    userName,
    password
  }
  return axios.postForm({
    url: API_USER_AUTH_PREFIX + 'login',
    data
  })
}

export const getUserInfo = () => {
  return axios.postForm({
    url: API_USER_AUTH_PREFIX + 'getDetail'
  })
}
