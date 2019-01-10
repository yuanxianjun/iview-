<template>
  <div>
    <Card>
      <Tabs @on-click="changeTab">
        <TabPane label="主题分类" name="type">
          <Tables
            ref="tables"
            editable
            searchable
            search-place="top"
            v-model="tableData"
            :columns="columns"
            @on-delete="handleDelete"
            @on-edit="handleEdit"
            @on-search="handleSearch"
          />
          <div class="pagenation">
            <Page :total="totalNum" :page-size="8" show-elevator @on-change="pageChange"/>
          </div>
          <Button type="primary" @click="modal1 = true;isEdit='添加主题'">添加主题</Button>
        </TabPane>
      </Tabs>
      <Modal v-model="modal1" :title="isEdit" footer-hide width="600">
        <dicForm v-if="modal1" :formData="formData" :ortype="ban" @close-win="closeWin"></dicForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiTopic from '@/api/apiTopic.js'
import dicForm from './theme-form.vue'
import { checkTypeStatus } from '@/libs/checkStatus'
import { apiGuideUpload } from '@/api/apiUpload'
import { getToken } from '@/libs/util'
export default {
  name: 'dictionary-setting',
  components: {
    Tables,
    dicForm
  },
  data () {
    return {
      // 是否展示模态框
      modal1: false,
      isEdit: '',
      formData: '',

      // 列表相关
      tableData: [],
      totalNum: 0,
      currentPage: 1,
      // 当前显示面板
      ban: 'type',
      searchKey: '',
      searchValue: '',
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '主题名称',
          key: 'topicName',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '主题卡片的图片',
          key: 'topicLink',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '显示顺序',
          key: 'topicOrder',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '是否有效',
          key: 'deleteStatus',
          sortable: true,
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.status,
                'true-value': 1,
                'false-value': 2
                // disabled: "disabled"
              },
              on: {
                'on-change': () => {
                  var data = params.row
                  data.deleteStatus = data.deleteStatus == 1 ? 2 : 1
                  this.changeStatus(data)
                }
              }
            })
          }
        },
        {
          title: '是否显示',
          key: 'topicDisplay',
          sortable: true,
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.status,
                'true-value': true,
                'false-value': false
                // disabled: "disabled"
              },
              on: {
                'on-change': () => {
                  var data = params.row
                  data.topicDisplay = data.topicDisplay != true
                  this.changeDisplay(data)
                }
              }
            })
          }
        },
        {
          width: 330,
          title: '操作',
          key: 'handle',
          options: ['delete', 'edit', ''],
          button: [
            (h, params, vm) => {
              return h('Button', {
                // DOM 属性
                domProps: {
                  innerHTML: '列表'
                },
                props: {
                  type: 'primary'
                },
                style: {
                  'margin-left': '10px'
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.skipToDetail(params)
                  }
                }
              })
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 更改是否显示的状态
    changeDisplay (status) {
      if (status) {
      }
    },
    // 更改列表状态
    changeStatus (changeData) {
      if (changeData) {
        apiTopic.dicTypeAdd(changeData).then(res => {
          if (res.status == 0) {
            console.log('修改成功')
          }
        })
      }
    },
    // 初始化类型数据
    intData (page, rows, searchKey, searchValue) {
      var data = {
        page,
        rows,
        searchKey,
        searchValue
      }
      // 查询所有主题
      apiTopic.pageGet(data).then(res => {
        // console.log("查看获取到data", res);
        if (res.status === 0) {
          this.totalNum = res.data.total
          // 深度克隆了一下数据当我们改变在赋值之前改变一些数据问题的话是更改从接口中取出来的数据的
          var originalData = JSON.parse(JSON.stringify(res.data.rows))
          // console.log("查看取到的数据", originalData);
          // 匹配状态
          // console.log("查看匹配状态后的结果", checkTypeStatus(originalData));
          this.tableData = originalData
        }
      })
    },
    // 删除type
    handleDelete (params) {
      var delId = params.row.id
      // console.log(admin-manager.admin-managerDelete);
      apiTopic.del(delId).then(res => {
        if (res.status == 0) {
          this.$Message.success('删除成功！')
        }
      })
    },
    // 编辑列表
    handleEdit (params) {
      this.modal1 = true
      this.isEdit = '编辑类型'
      this.formData = params.row.id
      console.log(params)

      // console.log(changeId, _this.formData);
    },
    // type字段搜索
    handleSearch (searchKey, searchValue) {
      this.searchKey = searchKey
      this.searchValue = searchValue
      apiTopic.typeList('', 8, searchKey, searchValue).then(res => {
        if (res.status == 0) {
          this.tableData = res.data.rows
          this.totalNum = res.data.total
          return res.data.rows
        }
      })
    },
    // 跳转到详情列表页
    skipToDetail (params) {
      var _this = this
      var code = params.row.id
      this.ban = 'item'
      this.currentPage = 1

      this.$router.push({
        name: 'themeItemList',
        query: { id: code, name: params.row.topicName }
      })
    },
    uploadFile () {
      console.log('上传文件')
    },
    // 切换面板
    changeTab (value) {
      console.log('面板切换了')
      this.searchKey = ''
      this.searchValue = ''
      this.ban = value
    },
    // 分页点击函数
    pageChange (currentPage) {
      console.log(this.searchKey, this.searchValue)
      this.intData(currentPage, 8, this.searchKey, this.searchValue)
      this.currentPage = currentPage
    },
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      if (this.ban == 'item') {
        this.intItemData(this.currentPage, 8, this.searchKey, this.searchValue)
      } else {
        this.intData(this.currentPage, 8)
      }
      this.formData = ''
    }
  },
  mounted () {
    this.intData()
  }
}
</script>
<style>
.pagenation {
  margin-top: 8px;
  margin-bottom: 8px;
}
.ivu-upload {
  display: inline-block;
  margin-left: 8px;
  margin-top: 8px;
}
</style>
