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
        @on-search="handleSearch"
      />

      <div class="pagenation">
        <Page :total="totalNum" :page-size="8" show-elevator @on-change="pageChange"/>
      </div>
      <Modal v-model="modal1" v-bind:title="isEdit?'编辑管理员':'添加管理员'" footer-hide>
        <userForm v-if="modal1" :formData="formData" @close-win="closeWin"></userForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import apiAdmin from '@/api/apiAdmin.js'

import userForm from './user-form.vue'
export default {
  name: 'admin-manager-manager',
  components: {
    Tables,
    userForm
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
          title: 'ID',
          key: 'id',
          sortable: true,
          searchable: true
          // editable: true
        },
        {
          title: '头像',
          key: 'avastart',
          sortable: true,
          searchable: true,
          // editable: true
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.avastart
              },
              style: {
                width: '40px',
                height: '40px'
              }
            })
          }
        },
        {
          title: '管理员名称',
          key: 'username',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '昵称',
          key: 'nickname',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '邮箱',
          key: 'email',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '手机号',
          key: 'phone',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '操作',
          key: 'handle',
          width: 200,
          options: [],
          button: [
            // (h, params, vm) => {
            //   return h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary"
            //       },
            //       on: {
            //         click: () => {
            //           this.toDetialPage(params.row.id);
            //           // console.log(this.toDetialPage);
            //         }
            //       }
            //     },
            //     "详情"
            //   );
            // },
            (h, params, vm) => {
              return h(
                'Button',
                {
                  style: {
                    'margin-left': '10px'
                  },
                  props: {
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.jumpToUserInformation(params.row.id)
                    }
                  }
                },
                '认证信息'
              )
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      this.currentPage = currentPage
      this.searchList(currentPage, 8)
    },
    // 更新数据page
    searchList (page, rows, searchKey, searchValue) {
      // console.log(apiAdmin);
      apiAdmin.generalUseFind(page, rows, searchKey, searchValue).then(res => {
        console.log('向后台请求的数据', res.data.total)
        this.tableData = res.data.rows
        this.totalNum = res.data.total
      })
    },
    // 跳转到用户详情页面
    toDetialPage (paramsId) {
      if (paramsId) {
        this.modal1 = true
        this.formData = paramsId
      }
    },
    // 搜索用户
    handleSearch (searchKey, searchValue) {
      apiAdmin.generalUseFind('', 8, searchKey, searchValue).then(res => {
        if (res.status == 0) {
          this.tableData = res.data.rows
          this.totalNum = res.data.total
          return res.data.rows
        }
      })
    },
    // 查看认证信息
    jumpToUserInformation (id) {
      if (id) {
        console.log(this)
        this.$router.push({
          name: 'approve-manager',
          query: { id }
        })
      }
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      this.isEdit = false
      this.searchList(this.currentPage, 8, this.searchKey, this.searchValue)
    }
  },

  mounted () {
    this.searchList()

    // getTableData().then(res => {
    //   console.log("取得的数据", res);
    //   this.tableData = res.data;
    // });
  }
}
</script>
<style>
.pagenation {
  margin-top: 10px;
}
</style>
