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
      <Button type="primary" @click="modal1 = true;isEdit=false;">添加banner</Button>
      <Button style="margin: 8px 8px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Modal v-model="modal1" v-bind:title="isEdit?'修改信用卡信息':'添加信用卡'" footer-hide width="800">
        <bannerForm v-if="modal1" :formData="isEdit?formData:''" @close-win="closeWin"></bannerForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiBanner from '@/api/credit-api/apiBanner.js'
import bannerForm from './banner-form.vue'
// 使用字典
import { typeList } from '@/api/apiCom'
export default {
  name: 'banner-managers',
  components: {
    Tables,
    bannerForm
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
          key: 'bannerId',
          sortable: true,
          searchable: true,
          width: 90,
          height: 100
          // editable: true
        },
        {
          title: '图片',
          sortable: true,
          searchable: false,
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.bannerImg
              },
              style: {
                width: '200px',
                height: '40px'
              }
            })
          }
        },
        {
          title: '标题',
          key: 'bannerTitle',
          sortable: true,
          // editable: true,
          searchable: true,
          width: 150
        },

        {
          title: '类型',
          key: 'bannerType',
          // sortable: true,
          // editable: true,
          searchable: true,
          width: 80
        },
        {
          title: '位置',
          key: 'bannerPosition',
          sortable: false,
          // editable: true,
          searchable: true,
          width: 125
        },

        // {
        //   title: "是否有效",
        //   sortable: true,
        //   key: "deleteStatus",
        //   // editable: true,
        //   searchable: true,
        //   width: 100,
        //   render: (h, params) => {
        //     return h("i-switch", {
        //       props: {
        //         value: params.row.deleteStatus,
        //         "true-value": 1,
        //         "false-value": 2
        //       },
        //       on: {
        //         "on-change": () => {
        //           var data = params.row;
        //           data.deleteStatus = data.deleteStatus == 1 ? 2 : 1;
        //           // console.log("查看data.deleteStatus", data);
        //           this.switchUse(data);
        //         }
        //       }
        //     });
        //   }
        // },
        {
          title: '是否可用',
          sortable: true,
          key: 'bannerStatus',
          // editable: true,
          searchable: true,
          width: 100,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.bannerStatus,
                'true-value': 1,
                'false-value': 0
              },
              on: {
                'on-change': () => {
                  var data = params.row
                  data.bannerStatus = data.bannerStatus == 1 ? 0 : 1
                  // console.log("查看data.deleteStatus", data);
                  this.switchUse(data)
                }
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
    // 切换banner是否可用
    switchUse (data) {
      if (data) {
        apiBanner.bannerSave(data).then(res => {
          if (res.status == 0) {
            console.log('修改成功')
          }
        })
      }
    },
    // 点击切换页面的时候的回调函数
    pageChange (currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
      this.searchList(currentPage, 8, this.sKey, this.sValue)
    },
    // 更新数据
    searchList (pageNum, rows = 8) {
      apiBanner.bannerPage(pageNum, rows).then(res => {
        this.tableData = res.data.rows
        this.totalNum = res.data.total
      })
    },
    // 删除数据
    handleDelete (params) {
      var delId = params.row.id
      // console.log(apiBanner.apiBannerDelete);
      apiBanner.bannerDel(delId).then(res => {
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
      this.formData = params.row.bannerId
      var _this = this
    },
    // 字段搜索
    handleSearch (searchKey, searchValue) {
      this.sKey = searchKey

      this.sValue = searchValue
      // console.log("查看是否有搜索内容", searchValue);
      apiBanner.bannerPage('', 8, searchKey, searchValue).then(res => {
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
    typeList('bannerOrganization').then(res => {
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
.ivu-table td {
  height: 70px;
}
</style>
