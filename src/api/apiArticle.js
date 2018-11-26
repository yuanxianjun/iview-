import axios from '@/libs/api.request'
// 这里是文章管理的相关api
const API_ADMIN_ARTICLE_PREFIX = '/api/v1/admin/common/post/content'
const API_ARTICLE_PREFIX = '/api/v1/common/post/content'
// 查询所有文章
export const apiArticleList = (page, rows, searchKey, searchValue) => {
  var data =
  {
    'orderAsc': false,
    'orderKey': 1,
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_ADMIN_ARTICLE_PREFIX + '/page',
    data
  })
}
// 删除自己的文章
export const apiArticleDel = (id) => {
  var data = {
    id
  }
  return axios.post({
    url: API_ARTICLE_PREFIX + '/delete',
    data
  })
}
// 查看文章内容
export const apiArticleDetail = (id) => {
  var data = {
    id
  }
  return axios.get({
    url: API_ARTICLE_PREFIX + '/detail',
    data
  })
}
// 查看自己的文章内容
export const apiArticlePage = (page, rows, searchKey, searchValue) => {
  var data =
  {
    'orderAsc': false,
    'orderKey': 1,
    page,
    rows,
    searchKey,
    searchValue
  }
  return axios.post({
    url: API_ARTICLE_PREFIX + '/page',
    data
  })
}

// 保存文章内容
export const apiArticleSave = (data) => {
  var datas =
  {
    'commentStatus': true,
    'createDate': '',
    'postContent': '',
    'postExcerpt': '我是摘要',
    'postId': 0,
    'postParent': 0,
    'postStatus': 'publish',
    'postTitle': '我是标题',
    'postType': '',
    'updateTime': ''
  }
  return axios.post({
    url: API_ARTICLE_PREFIX + '/savePost',
    data
  })
}
// 根据文章id和评论id查询评论
export const apiArticleSearch = (page, rows, postId, parentId) => {
  var data =
  {
    rows,
    page,
    postId,
    parentId
  }
  return axios.post({
    url: API_ARTICLE_PREFIX + '/searchPage',
    data
  })
}
export default {
  apiArticleList,
  apiArticleDel,
  apiArticleDetail,
  apiArticlePage,
  apiArticleSearch,
  apiArticleSave
}
