<template>
  <div>
    <Card>
    <Tabs  @on-click="changeTab">
        <TabPane label="字典类型" name="type">
             <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch"  />
         <div class="pagenation">
          <Page  :total="totalNum" :page-size = 8 show-elevator   @on-change="pageChange"/>
        </div>
          <Button type="primary" @click="modal1 = true;isEdit='添加类型'" >添加类型</Button>
        </TabPane>
    </Tabs>
    <Modal
            v-model="modal1"
            :title="isEdit"
            footer-hide
            width="600"
            >
          <dicForm v-if="modal1" :formData="formData" :CODE="CODE" :ortype="ban" @close-win="closeWin"></dicForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiDic from '@/api/apiDic.js'
import dicForm from './dic-form.vue'
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
      CODE: '',
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
          title: '字典类型名称',
          key: 'text',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '状态',
          key: 'status',
          sortable: true,
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.status,
                'true-value': 1,
                'false-value': 2
              }
            })
          }
        },

        {
          title: 'CODE',
          key: 'code',
          sortable: true,
          // editable: true,
          searchable: true
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
                    console.log(params)
                    this.skipToDetail(params)
                  }
                }
              })
            },
            (h, params, vm) => {
              return h(
                'Upload',
                {
                  props: {
                    action: apiGuideUpload,
                    data: {
                      dictType: params.row.code
                    },
                    format: ['txt', 'text', 'doc'],
                    headers: {
                      token: getToken()
                    },
                    'show-upload-list': false,
                    'on-success': () => {
                      this.$Message.success('上传成功')
                      this.$emit('uploadFile')
                    },
                    'on-error': () => {
                      this.$Message.error('上传失败')
                    }
                  },
                  on: {}
                },
                [h('Button', '导入')]
              )
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 初始化类型数据
    intData (page, rows, searchKey, searchValue) {
      // 查询类型
      apiDic.typeList(page, 8, searchKey, searchValue).then(res => {
        // console.log("查看获取到data", res);
        if (res.status === 0) {
          this.totalNum = res.data.total
          var originalData = JSON.parse(JSON.stringify(res.data.rows))
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
      apiDic.dicTypeDel(delId).then(res => {
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
      this.CODE = params.row.code
      // console.log(changeId, _this.formData);
    },
    // type字段搜索
    handleSearch (searchKey, searchValue) {
      this.searchKey = searchKey
      this.searchValue = searchValue
      apiDic.typeList('', 8, searchKey, searchValue).then(res => {
        if (res.status == 0) {
          this.tableData = res.data.rows
          return res.data.rows
        }
      })
    },
    // 跳转到详情列表页
    skipToDetail (params) {
      var _this = this
      var code = params.row.code
      this.ban = 'item'

      this.CODE = code
      this.currentPage = 1

      this.$router.push({
        name: 'ditItem-list',
        query: { id: code, name: params.row.text }
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
