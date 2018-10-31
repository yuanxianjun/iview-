<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch" />
        <div class="pagenation">
          <Page :total="totalNum"  show-elevator  :page-size=8 @on-change="pageChange" />
        </div>
        <Button type="primary" @click="modal1 = true;isEdit=false;" >添加信用卡</Button>
        <Button style="margin: 8px 8px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        <Modal
            v-model="modal1"
            v-bind:title="isEdit?'修改信用卡信息':'添加信用卡'"
            footer-hide
            width= "800"
            >
          <creditForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></creditForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import apiCredit from '@/api/credit-api/apiCredit.js'
import creditForm from './credit-form.vue'
// 使用字典
import { typeList } from '@/api/apiCom'
export default {
  name: 'credit-managers',
  components: {
    Tables,
    creditForm
  },
  data () {
    return {
      // 控制新建框的显示和隐藏
      modal1: false,
      isEdit: false,
      formData: [],
      totalNum: 0,
      currentPage: 1,
      // 卡组织
      cardOrganizations: [],
      // 搜索内容
      sKey: '',
      sValue: '',
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          searchable: false,
          width: 90
          // editable: true
        },
        {
          title: '信用卡图片',
          sortable: true,
          searchable: false,
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.creditImg
              },
              style: {
                width: '80px',
                height: '40px'
              }
            })
          }
        },
        {
          title: '信用卡名称',
          key: 'creditName',
          sortable: true,
          // editable: true,
          searchable: true,
          width: 90
        },
        {
          title: '申请人数',
          key: 'creditApplyCount',
          sortable: true,
          // editable: true,
          searchable: false,
          width: 66
        },
        {
          title: '所属银行',
          key: 'creditBank',
          sortable: true,
          // editable: true,
          searchable: false,
          width: 80
        },
        {
          title: '卡组织',
          key: 'creditOrganization',
          sortable: true,
          // editable: true,
          searchable: false
        },
        {
          title: '是否推荐',
          sortable: true,
          key: 'creditRecommandCard',
          // editable: true,
          searchable: false,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.creditRecommandCard,
                'true-value': true,
                'false-value': false
              }
            })
          }
        },
        {
          title: '是否热门',
          sortable: true,
          key: 'creditHotCard',
          // editable: true,
          searchable: false,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.creditHotCard,
                'true-value': true,
                'false-value': false
              }
            })
          }
        },
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'edit'],
          button: [],
          width: 200
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
      this.searchList(currentPage, 8, this.sKey, this.sValue)
    },
    // 更新数据
    searchList (pageNum, rows = 8) {
      apiCredit.creditPage(pageNum, rows).then(res => {
        this.tableData = res.data.rows

        this.totalNum = res.data.total
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(apiCredit.apiCreditDelete);
      apiCredit.creditDel(delId).then(res => {
        if (res.status == 0) {
          this.$Message.success('删除成功')
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
    },
    // 字段搜索
    handleSearch (searchKey, searchValue) {
      this.sValue = searchValue
      console.log('查看是否有搜索内容', searchValue)
      apiCredit.creditPage('', 8, searchValue).then(res => {
        if (res.status == 0) {
          // console.log(this.tableData);
          this.tableData = res.data.rows
          this.totalNum = res.data.total
        }
      })
    },
    // 下载表格
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      this.isEdit = false
      this.searchList(this.currentPage, 8)
    }
  },
  mounted () {
    this.searchList()
    // 匹配卡组织
    typeList('creditOrganization').then(res => {
      if (res.status === 0) {
        this.cardOrganization = res.data
      }
    })
  }
}
</script>
<style>
.pagenation {
  margin-top: 8px;
}
</style>
