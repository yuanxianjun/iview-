<template>
  <div>
    <Card>

      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch" />

        <Button type="primary" @click="modal1 = true;isEdit=false;" >新建权限</Button>
        <Button style="margin: 10px 10px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        <Modal
            v-model="modal1"
            v-bind:title="isEdit?'修改权限':'新建权限'"
            footer-hide
            >
          <roleForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></roleForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables' // import { getTableData } from "@/api/data";

import permission from '@/api/apiPermission.js'
import { list } from '@/api/apiPermission.js'
import { permissionDelete } from '@/api/apiPermission.js'
import roleForm from './role-form.vue'
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
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          searchable: true
          // editable: true
        },
        {
          title: '权限码',
          key: 'permissionCode',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '权限名',
          key: 'permissionName',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '匹配串',
          key: 'permissionPattern',
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
    // 更新数据
    searchList () {
      permission.list().then(res => {
        // console.log("向后台请求的数据", res.data);
        this.tableData = res.data.rows
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(permission.permissionDelete);
      permission.permissionDelete(delId).then(res => {
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
      permission.list('', '', searchKey, searchValue).then(res => {
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
</style>
