<template>
  <div>
    <Card>
      <tables
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
        <Page :total="totalNum" show-elevator :page-size="8" @on-change="pageChange"/>
      </div>

      <Button type="primary" @click="modal1 = true;isEdit=false;">添加银行</Button>
      <Button style="margin: 8px 8px;" type="primary" @click="exportExcel">导出为Csv文件</Button>

      <Modal v-model="modal1" v-bind:title="isEdit?'修改银行信息':'添加银行'" footer-hide>
        <bankForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></bankForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiBank from '@/api/credit-api/apiBank.js'
import bankForm from './bank-form.vue'
export default {
  name: 'bank-manager',
  components: {
    Tables,
    bankForm
  },
  data () {
    return {
      // 控制新建框的显示和隐藏
      modal1: false,
      isEdit: false,
      formData: [],
      totalNum: 0,
      currentPage: 1,
      // 搜索内容
      sKey: '',
      sValue: '',
      columns: [
        {
          title: 'ID',
          key: 'bankId',
          sortable: true,
          searchable: true,
          width: 130
          // editable: true
        },
        {
          title: '银行图片',
          sortable: true,
          searchable: false,
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.bankImg
              },
              style: {
                width: '60px',
                height: '60px'
              }
            })
          }
        },
        {
          title: '银行名称',
          key: 'bankName',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '银行描述',
          key: 'bankDescription',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '是否热门',
          sortable: true,
          key: 'bankHot',
          // editable: true,
          searchable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.bankHot,
                'true-value': true,
                'false-value': false
              },
              on: {
                'on-change': () => {
                  var data = params.row
                  data.bankHot = !data.bankHot
                  this.changeHot(data)
                }
              }
            })
          }
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
    // 点击开关切换是否热门的状态
    changeHot (singleContent) {
      if (singleContent) {
        apiBank.bankSave(singleContent).then(res => {
          if (res.status == 0) {
            console.log('修改成功')
            // this.$Message.success("");
            // this.$emit("close-win");
          }
        })
      }
    },
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      console.log(currentPage)
      this.searchList(currentPage, 8, this.sKey, this.sValue)
    },
    // 更新数据
    searchList (pageNum, rows = 8) {
      apiBank.bankPage(pageNum, rows).then(res => {
        this.tableData = res.data.rows
        this.totalNum = res.data.total
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.bankId
      // console.log(apiBank.apiBankDelete);
      apiBank.bankDel(delId).then(res => {
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
      this.formData = params.row.bankId
      var _this = this
    },
    // 字段搜索
    handleSearch (searchKey, searchValue) {
      this.sKey = searchKey
      this.sValue = searchValue
      apiBank.bankPage('', 8, searchKey, searchValue).then(res => {
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
    // getTableData().then(res => {
    //   console.log("取得的数据", res);
    //   this.tableData = res.data;
    // });
  }
}
</script>
<style>
.pagenation {
  margin-top: 8px;
}
</style>
