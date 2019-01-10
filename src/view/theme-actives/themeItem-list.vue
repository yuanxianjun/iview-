<template>
  <div>
    <Card>
      <Tabs>
        <TabPane label="字典列表" name="item">
          <Tables
            ref="tables"
            editable
            search-place="top"
            v-model="tableData2"
            :columns="columns2"
            @on-delete="itemDelete"
            @on-edit="handleEdit2"
            @on-search="itemSearch"
          />
          <div class="pagenation">
            <Page :total="totalNum2" :page-size="8" show-elevator/>
          </div>
          <Button type="primary" @click="modal1 = true;isEdit='添加item';">添加item</Button>
          <Button style="margin-left:10px;" type="primary" @click="backToIndex">返回</Button>
        </TabPane>
      </Tabs>
      <Modal v-model="modal1" :title="isEdit" footer-hide width="600">
        <dicForm v-if="modal1" :formData="formData" :ortype="ban" @close-win="closeWin"></dicForm>
      </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiTheme from '@/api/apiTopic.js'
import dicForm from './themeItem-form.vue'

const _ = require('lodash')
export default {
  name: 'themeItem-list',
  components: {
    Tables,
    dicForm
  },
  data () {
    return {
      // 是否展示模态框
      modal1: false,
      isEdit: '',
      formData: '',
      CODE: '',
      // 列表相关
      tableData: [],
      tableData2: [],
      totalNum: 0,
      totalNum2: 0,
      currentPage: 1,
      currentPage2: 1,

      // 当前显示面板
      ban: 'item',
      searchKey: '',
      searchValue: '',
      columns2: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '信用卡名称',
          key: 'creditName',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '图片',

          sortable: true,
          // editable: true,
          searchable: true,
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
          title: '所属银行',
          key: 'creditBank',
          sortable: true,
          // editable: true,
          searchable: true
        },

        {
          title: '操作',
          key: 'handle',
          options: ['delete'],
          button: []
        }
      ]
    }
  },
  methods: {
    // 返回
    backToIndex () {
      this.searchKey = ''
      this.searchValue = ''
      this.currentPage = 1
      this.$router.push({ name: 'topicMan', query: {} })
    },
    intItemData (id) {
      apiTheme.itemDetail(id).then(res => {
        if (res.status == 0) {
          this.totalNum2 = res.data.total
          // 处理一下数据以便于能够在表格中更好的展示出来
          var cloneData = _.cloneDeep(res.data.rows)
          cloneData.map(res => {
            for (var key in res.detail) {
              if (key === 'creditName') {
                res[key] = res.detail[key]
              }
              if (key === 'creditImg') {
                res[key] = res.detail[key]
              }
              if (key === 'creditBank') {
                res[key] = res.detail[key]
              }
            }
          })
          console.log('克隆之后的数据', cloneData)
          this.tableData2 = cloneData
        }
      })
    },
    // 删除item
    itemDelete (params) {
      var delId = params.row.id
      apiTheme.delItem(delId).then(res => {
        if (res.status == 0) {
          this.$Message.success('删除成功')
        }
      })
    },
    // 编辑列表
    handleEdit2 (params) {
      this.modal1 = true
      this.isEdit = '编辑item'
      this.formData = params.row.id
    },
    // item字段搜索
    itemSearch (searchKey, searchValue) {
      // console.log(searchKey, searchValue);
      apiDic.dicItemList('', 8, searchKey, searchValue).then(res => {
        if (res.status == 0) {
          this.tableData2 = res.data.rows
          this.totalNum2 = res.data.total
        }
      })
    },
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      this.intItemData(this.searchValue)
      this.formData = ''
    }
  },
  mounted () {
    console.log('查看item页面', this.$route)
    this.searchValue = this.$route.query.id
    if (this.searchValue) {
      this.intItemData(this.searchValue)
    }
  }
}
</script>
<style>
.pagenation {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
