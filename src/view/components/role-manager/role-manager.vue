<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-search="handleSearch"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>

import Tables from '_c/tables'
import {getTableData} from '@/api/data'

export default {
  name: 'role-manager',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: 'ID', key: 'id', sortable: true, searchable: true},
        {title: '权限码', key: 'permissionCode', sortable: true},
        {title: '权限名', key: 'permissionName', sortable: true},
        {title: '匹配串', key: 'permissionPattern', sortable: true},
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                // h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: [
        {
          'createTime': '1',
          'createUser': 0,
          'deleteStatus': 0,
          'id': 0,
          'permissionCode': '1',
          'permissionName': '',
          'permissionPattern': '',
          'permissionType': '',
          'updateTime': ''
        },
        {
          'createTime': '2',
          'createUser': 0,
          'deleteStatus': 0,
          'id': 0,
          'permissionCode': '2',
          'permissionName': '',
          'permissionPattern': '',
          'permissionType': '',
          'updateTime': ''
        }
      ]
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleSearch (searchKey, searchValue) {
      console.log(searchKey + searchValue)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
