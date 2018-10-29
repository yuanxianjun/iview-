<template>
  <div>
    <Card>

      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch" />
        <div class="pagenation">
          <Page :total="totalNum" :page-size = 5 show-elevator @on-change="pageChange" />
        </div>
        <Button type="primary" @click="modal1 = true;isEdit=false;" >新建角色</Button>
        <Button style="margin: 10px 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        <Modal
            v-model="modal1"
            v-bind:title="isEdit?'编辑角色':'新建角色'"
            footer-hide
            >
          <roleForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></roleForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables' // import { getTableData } from "@/api/data";

import role from '@/api/apiRole.js'

import roleForm from './notice-form.vue'
export default {
  name: 'role-manager',
  components: {
    Tables,
    roleForm
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
          title: '角色名',
          key: 'roleName',
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
      this.searchList(currentPage, 5)
    },
    // 更新数据page
    searchList (pageNum, rows = 5) {
      role.list(pageNum, rows).then(res => {
        console.log('向后台请求的数据', res.data.total)
        this.tableData = res.data.rows
        this.totalNum = res.data.total
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(role.roleDelete);
      role.roleDelete(delId).then(res => {
        if (res.status == 0) {
          this.$Message.success(res.message)
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
      role.list('', '', searchKey, searchValue).then(res => {
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
