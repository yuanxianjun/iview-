import axios from '@/libs/api.request'
// 根据搜索条件，选出符合条件的卡片api

const API_TOPIC_MANAGER_PREFIX = '/api/v1/credit/detail/'

export const chooseCard = (dataArr) => {
  var data = {
    'creditTypes': dataArr
  }
  return axios.post({
    url: API_TOPIC_MANAGER_PREFIX + 'chooseCard',
    data
  })
}

export default {
  chooseCard
}
