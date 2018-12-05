<template>
  <div>
    <div class="btns">
<<<<<<< HEAD
      <Button type="primary" @click="addArticle">添加文章</Button>
    </div>
    <!-- 显示所有的消息 -->
    <div>
      <Card v-for="(item,index) in messageData " :key="index">
        <Row>
          <Col span="6">{{item.postTitle}}</Col>
          <Col span="4">{{item.authorName}}</Col>
          <Col span="4">{{$moment(item.createTime).format("YYYY/MM/DD")}}</Col>

          <Col span="2">
            <Poptip
              confirm
              title="你确定删除这篇文章吗？"
              width="220"
              @on-ok="delArticle(item)"
              @on-cancel="cancel"
            >
              <Button type="warning">删除</Button>
            </Poptip>
          </Col>
          <Col span="2">
            <Button type="primary" @click="editArticle(item)">编辑</Button>
          </Col>
          <Col span="3">
            <Button @click="showDetail(item)">查看全文</Button>
          </Col>
          <Col span="3">
            <Button type="default" id="tagCopy" title="点击复制" @click="copyUrl($event,item)">复制链接</Button>
          </Col>
        </Row>
      </Card>
      <Card v-if="totalNum==0">
        <p style="text-align:center;">暂时没有更多内容</p>
      </Card>
      <div class="pagenation">
        <Page :total="totalNum" show-elevator @on-change="changePage"/>
      </div>
    </div>
    <Modal v-model="modal1" width="900" footer-hide>
      <!-- <conShow v-if="false" :formData="formData" @close-win="closeWin"></conShow> -->
      <richText v-if="modal1" :formData="formData" @close-win="closeWin"></richText>
    </Modal>
=======
        <Button type="primary" @click="addArticle">添加文章</Button>
    </div>
    <!-- 显示所有的消息 -->
    <div>
        <Card v-for="(item,index) in messageData " :key="index" >
                <Row>
                    <Col span="6">{{item.postTitle}}</Col>
                    <Col span="4">{{item.authorName}}</Col>
                    <Col span="4">{{$moment(item.createTime).format("YYYY/MM/DD")}}</Col>

                    <Col span="2">
                     <Poptip
                        confirm
                        title="你确定删除这篇文章吗？"
                        width="220"
                        @on-ok="delArticle(item)"
                        @on-cancel="cancel">
                        <Button type="warning" >删除</Button>
                    </Poptip>
                    </Col>
                    <Col span="2"><Button type="primary" @click="editArticle(item)">编辑</Button></Col>
                    <Col span="3"><Button @click="showDetail(item)">查看全文</Button></Col>
                     <Col span="3">

                      <Button type="default"
                          id="tagCopy"

                        title="点击复制"
                        @click="copyUrl($event,item)"
                      >复制链接</Button>
                    </Col>
                </Row>
        </Card>
        <div class="pagenation">
          <Page :total="totalNum" show-elevator  @on-change = "changePage"/>
        </div>
    </div>
     <Modal
            v-model="modal1"
            width="900"
            footer-hide>
          <!-- <conShow v-if="false" :formData="formData" @close-win="closeWin"></conShow> -->
          <richText v-if="modal1" :formData="formData" @close-win="closeWin"></richText>
        </Modal>
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiArticle from '@/api/apiArticle.js'
import conShow from './con-show.vue'
import richText from './rich-text.vue'
// 引入复制到面板所需要的组件
import Clipboard from 'clipboard'
import { baseUrl } from '@/libs/util.js'

export default {
  name: 'article-manager',
  components: {
    conShow,
    richText
  },
  data () {
    return {
      totalNum: 0,
      currentPage: 0,
      messageData: [],
      // 控制显示模态框
      modal1: false,
      // 控制显示富文本编辑页面
      showRich: false,
      formData: '',
      showTips: false,
      // 复制链接
      copyUrls: '',
      clipboard: ''
    }
  },
  methods: {
    // 复制链接
    copyUrl (event, params) {
      event.preventDefault()
      var _this = this
      this.copyUrls = baseUrl + 'articleHtml?id=' + params.postId

      let clipboard = new Clipboard('#tagCopy', {
        text: function () {
<<<<<<< HEAD
=======
          console.log(_this.copyUrls)
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
          return _this.copyUrls
        }
      })

      clipboard.on('success', e => {
        _this.$Message.success('链接复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        _this.$Message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    // 删除时的气泡提示
    cancel () {
      this.$Message.info('你点击了取消')
    },
    // 删除自己的文章
    delArticle (params) {
      this.messageData = this.messageData.filter((item, index) => {
        return item.postId !== params.postId
      })
      apiArticle.apiArticleDel(params.postId).then(res => {
        if (res.status === 0) {
          this.$messageData.successe('删除成功！')
        }
      })
    },
    // 编辑文章
    editArticle (params) {
      if (params) {
        this.formData = params.postId
        this.modal1 = true
      }
    },
    // 添加文章
    addArticle () {
      this.modal1 = true
      this.showRich = true
      this.formData = ''
    },
    // 切换页面
    changePage (currentPage) {
      this.currentPage = currentPage
      this.searchList(currentPage, 8)
    },
    // 展示每条信息的详情(H5页面)
    showDetail (params) {
      if (params.postId) {
        var id = params.postId
        this.formData = id
        this.$router.push({ path: 'articleHtml', query: { id } })
      }
    },
    // 查看全部信息
    searchList (page, rows, searchKey, searchValue) {
      apiArticle
        .apiArticleList(page, rows, searchKey, searchValue)
        .then(res => {
          if (res.status == 0) {
<<<<<<< HEAD
            this.messageData = res.data.rows || 123123234
            this.totalNum = res.data.total

=======
            this.messageData = res.data.rows
            // console.log(this.messageData);
            this.totalNum = res.data.total
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
            this.noReadMess = res.data.rows.filter(function (item, index, arr) {
              return item.readed === false
            }, this)
            if (this.noReadMess.length == 0) {
              this.noReadMess = [{ messageTitle: '暂时没有未阅消息' }]
            }
          }
        })
    },
    // 关闭详情框
    closeWin () {
      this.modal1 = false
      this.searchList(this.currentPage, 8)
    }
  },
  mounted () {
    this.searchList(this.currentPage, 8)
    // this.copyUrl();
    // this.clipboard = new Clipboard("#tagCopy");
  }
}
</script>
<style>
.pagenation {
  margin-top: 10px;
}
.btns {
  margin-top: 10px;
  margin-bottom: 10px;
}
.ivu-row {
  line-height: 40px;
  border: none;
}
.ivu-modal-content {
  height: 785px;
}
<<<<<<< HEAD
=======

>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
/**
  出现点击两次才能正常使用clipboard的on("success")的方法，这时候的clipboard是已经实例出来了，有了实例之后调用不了on("success")f方法，这个问题的关键在与无法调用方法，为什么无法调用方法。试试在html页面中能够调用该方法吗？
  解决方法

  动态匹配复制内容
    template 中 <Button @click="copyFun">点击复制</Button>
    安装clipboard  npm install clipboard --save

  复选框为什么选不中的解决思路，第一看props 绑定的值和Option中的value的值的类型是否一致，再看值是否一致，如果是是多选props绑定需要是数组，而且数组中的值需要与绑定的value值一样

  moment的使用
  ...mapAction 的使用

*/
</style>
