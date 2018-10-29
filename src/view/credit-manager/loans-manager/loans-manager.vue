<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete" @on-edit="handleEdit" @on-search="handleSearch" />
        <div class="pagenation">
          <Page :total="totalNum"  show-elevator  :page-size=8 @on-change="pageChange" />
        </div>
        <Button type="primary" @click="modal1 = true;isEdit=false;" >添加贷款</Button>
        <Button style="margin: 8px 8px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        <Modal
            v-model="modal1"
            v-bind:title="isEdit?'修改贷款信息':'新建贷款'"
            footer-hide
            width= "800"
            >
          <loanForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></loanForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import apiLoans from '@/api/credit-api/apiLoans.js'
import loanForm from './loans-form.vue'
// 使用字典
import { typeList } from '@/api/apiCom'
export default {
  name: 'loan-managers',
  components: {
    Tables,
    loanForm
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
          searchable: true,
          width: 90
          // editable: true
        },
        {
          title: '信用卡图片',
          sortable: true,
          searchable: false,
          width: 200,
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.loanImg
              },
              style: {
                height: '60px'
              }
            })
          }
        },
        {
          title: '信用卡名称',
          key: 'loanName',
          sortable: true,
          // editable: true,
          searchable: true,
          width: 100
        },
        {
          title: '申请人数',
          key: 'loanApplyCount',
          sortable: false,
          // editable: true,
          searchable: true,
          width: 100
        },
        {
          title: '用途',
          key: 'loanPurpose',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '最大可贷金额',
          key: 'loanMaxLimit',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '是否有效',
          sortable: true,
          key: 'deleteStatus',
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.deleteStatus,
                'true-value': 1,
                'false-value': 0
              }
            })
          }
        },
        {
          title: '是否热门',
          sortable: true,
          key: 'loanHot',
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.loanHot,
                'true-value': 1,
                'false-value': 0
              }
            })
          }
        },
        {
          title: '是否推荐',
          sortable: true,
          key: 'loanRecommand',
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.loanRecommand,
                'true-value': 1,
                'false-value': 0
              }
            })
          }
        },
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'edit'],
          button: [],
          width: 180
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      this.currentPage = currentPage
      this.searchList(currentPage, 8, this.sKey, this.sValue)
    },
    // 更新数据
    searchList (pageNum, rows = 8) {
      apiLoans.loanPage(pageNum, rows).then(res => {
        if (res.status === 0) {
          this.tableData = res.data.rows
          this.totalNum = res.data.total
        }
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(apiLoans.apiLoansDelete);
      apiLoans.loanDel(delId).then(res => {
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
      this.sKey = searchKey
      this.sValue = searchValue
      console.log('查看是否有搜索内容', searchKey, searchValue)
      apiLoans.loanPage('', 8, searchKey, searchValue).then(res => {
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
    this.searchList(this.currentPage)
    // 匹配卡组织
    typeList('loanOrganization').then(res => {
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
