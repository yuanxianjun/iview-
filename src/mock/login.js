import { getParams } from '@/libs/util'

const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  },
  tt: { 'status': 0, 'message': 'success', 'data': 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzkzMzgxNTIsInN1YiI6IjQtUk9MRV9BRE1JTiJ9.t5_CLr2ntP195Z_IzvJDcI0t4_Amb1ma0GmxrFG8yvCR_YKNTY4N9Y7E1klP0xyFaTKDdT3RtRCCXRMUAp16ZQ' },
  userInfo: { 'status': 0, 'message': 'success', 'data': { 'id': 4, 'username': 'admin', 'email': '3163504123@163.com', 'phone': '15652750943', 'nickname': '3163054123', 'avastart': null, 'roles': [] } }
}

export const login = req => {
  req = JSON.parse(req.body)
  return { token: USER_MAP[req.userName].token }
}
export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP['admin']
}
// export const getUserInfo = req => {
//   return USER_MAP['userInfo']
// }
export const logout = req => {
  return null
}
