<template>
  <div>
    <Card>
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
      <Button type="primary" @click="modal1 = true;isEdit=false;" style="margin-top:10px;">上传APP</Button>

      <Modal width="500" v-model="modal1" v-bind:title="isEdit?'编辑APP':'上传APP'" footer-hide>
        <adminForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></adminForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import appAppAdmin from '@/api/apiAppAdmin.js'

import adminForm from './appAdmin-form.vue'
// 引入lodash
const _ = require('lodash')
export default {
  name: 'admin-manager-manager',
  components: {
    Tables,
    adminForm
  },
  data () {
    return {
      // 控制新建框的显示和隐藏
      modal1: false,
      isEdit: false,
      formData: [],
      totalNum: 0,
      currentPage: 1,
      columns: [
        {
          title: 'APP标题',
          key: 'appTitle',
          sortable: true,
          searchable: true

          // editable: true
        },
        {
          title: '包大小',
          key: 'appSize',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '是否最新',
          key: 'appNew',
          sortable: true,
          // editable: true,
          searchable: true
        },
        // {
        //   title: "APP下载地址",
        //   key: "appDownloadLink",
        //   sortable: true,
        //   // editable: true,
        //   searchable: true
        // },
        {
          title: 'APP版本号',
          key: 'appVersion',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'edit'],
          width: 350,
          button: [
            (h, params) => {
              return h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: 'margin-left:10px;',
                  on: {
                    click: () => {
                      this.setLatest(params.row.id)
                    }
                  }
                },
                '设置为最新'
              )
            }
          ]
        }
      ],
      tableData: [],
      originalData: []
    }
  },
  methods: {
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      this.searchList(currentPage, 8)
    },
    // 更新数据page
    searchList (page, rows = 8, searchKey, searchValue, orderKey) {
      // console.log(appAppAdmin);
      appAppAdmin
        .list(page, rows, searchKey, searchValue, orderKey)
        .then(res => {
          this.tableData = res.data.rows
          this.originalData = res.data.rows
          var data = _.cloneDeep(this.originalData)

          var tableData = data.map(res => {
            if (res.appNew == true) {
              res.appNew = '是'
            } else {
              res.appNew = '否'
            }
            res.appSize = (res.appSize / 1048576).toFixed(2)
            return res
          })

          this.tableData = data
          this.totalNum = res.data.total
        })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(admin-manager.admin-managerDelete);
      appAppAdmin.appAdminDelete(delId).then(res => {
        if (res.status == 0) {
          this.$Message.success('删除成功！')
          // this.searchList();
        }
      })
    },
    // 编辑列表
    handleEdit (params) {
      this.modal1 = true
      this.isEdit = true
      this.formData = params.row.id
      var _this = this
      // console.log(changeId, _this.formData);
    },
    // 字段搜索
    handleSearch (searchKey, searchValue) {
      console.log(searchKey, searchValue)
      this.searchList(1, 8, searchKey, searchValue)
    },
    // 设置最新的APP点击确定
    setLatest (id) {
      if (id) {
        appAppAdmin.setCurVersion(id).then(res => {
          if (res.status == 0) {
            this.$Message.success('设置成功!')
            this.searchList()
          }
        })
      }
    },
    // 设置最新APP点击取消
    cancel () {},
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      this.isEdit = false
      this.searchList()
    }
  },

  mounted () {
    this.searchList()
  }
}
</script>
<style>
.pagenation {
  margin-top: 10px;
}
</style>
