<template>
  <div>
    <Card>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch" />

        <div class="pagenation">
          <Page :total="totalNum" :page-size = 8 show-elevator @on-change="pageChange" />
        </div>
        <Button type="primary" @click="modal1 = true;isEdit=false;" >添加管理员</Button>
        <Button style="margin: 10px 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        <Modal
            v-model="modal1"
            v-bind:title="isEdit?'编辑管理员':'添加管理员'"
            footer-hide
            >
          <adminForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></adminForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import apiAdmin from '@/api/apiAdmin.js'

import adminForm from './admin-form.vue'
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
          options: ['delete', 'edit'],
          button: []
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      this.searchList(currentPage, 8)
    },
    // 更新数据page
    searchList (pageNum, rows = 8) {
      // console.log(apiAdmin);

      apiAdmin.list(pageNum, rows).then(res => {
        console.log('向后台请求的数据', res.data.total)
        this.tableData = res.data.rows
        this.totalNum = res.data.total
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(admin-manager.admin-managerDelete);
      apiAdmin.adminDelete(delId).then(res => {
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
      admin -
        manager.list('', '', searchKey, searchValue).then(res => {
          if (res.status == 0) {
            this.tableData = res.data.rows
            return res.data.rows
          }
        })
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
      this.searchList()
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
