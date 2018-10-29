import { login, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    nickName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setNickName (state, nickName) {
      state.nickName = nickName
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const token = res.data
          if (res.data !== null && res.data !== '') {
            commit('setToken', token)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('setToken', '')
      //     commit('setAccess', [])
      //     resolve()
      //   }).catch(err => {
      //     reject(err)
      //   })
      return new Promise(resolve => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            if (res.status === 0) {
              const data = res.data
              if (data.avarstart === undefined || data.avarstart === '' || avastart === null) {
                commit('setAvator', 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png')
              } else {
                commit('setAvator', data.avastart)
              }
              commit('setUserName', data.username)
              commit('setNickName', data.nickname)
              commit('setUserId', data.id)
              commit('setAccess', [])
              commit('setHasGetInfo', true)
              resolve(data)
            } else {
              reject(res)
            }
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
