<template>
  <div>
    <Card>
    <Tabs >
        <TabPane label="字典列表" name="item">
              <Tables ref="tables" editable searchable search-place="top" v-model="tableData2" :columns="columns2"
              @on-delete="itemDelete" @on-edit="handleEdit2" @on-search="itemSearch"/>
             <div class="pagenation">
          <Page :total="totalNum2" :page-size = 8 show-elevator  @on-change="pageChange2"/>
        </div>
         <Button type="primary" @click="modal1 = true;isEdit='添加item';" >添加item</Button>
         <Button style="margin-left:10px;" type="primary" @click="backToIndex" >返回</Button>
        </TabPane>
    </Tabs>
    <Modal
            v-model="modal1"
            :title="isEdit"
            footer-hide
            width="600"
            >
          <dicForm v-if="modal1" :formData="formData" :CODE="CODE" :ortype="ban" @close-win="closeWin"></dicForm>
        </Modal>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiDic from '@/api/apiDic.js'
import dicForm from './dic-form.vue'
import { checkTypeStatus } from '@/libs/checkStatus'

export default {
  name: 'dicItem-list',
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
          title: '序号',
          key: 'sort',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '字典内容',
          key: 'text',
          sortable: true,
          // editable: true,
          searchable: true
        },

        {
          title: '类型',
          key: 'typeId',
          sortable: true,
          // editable: true,
          searchable: true
        },
        {
          title: '值',
          key: 'value',
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
      ]
    }
  },
  methods: {
    // 返回
    backToIndex () {
      this.searchKey = ''
      this.searchValue = ''
      this.currentPage = 1
      this.$router.push({ name: 'dictionary-setting', query: {} })
    },
    intItemData (page, rows, searchKey, searchValue) {
      apiDic.dicItemList(page, 8, searchKey, searchValue).then(res => {
        console.log('查看查询到信息', res)
        if (res.status == 0) {
          this.tableData2 = res.data.rows
          this.totalNum2 = res.data.total
        }
      })
    },
    // 删除item
    itemDelete (params) {
      var delId = params.row.id
      apiDic.dicItemDel(delId).then(res => {
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
      this.CODE = this.$route.query.id
      console.log('查看code', this.CODE)
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
    // item分类
    pageChange2 (currentPage) {
      console.log(this.searchKey, this.searchValue)
      this.intItemData(currentPage, 8, this.searchKey, this.searchValue)
      this.currentPage = currentPage
    },
    // 关闭窗口
    closeWin () {
      this.modal1 = false
      this.intItemData(this.currentPage, 8, 'typeId', this.searchValue)
      this.formData = ''
    }
  },
  mounted () {
    console.log('查看item页面', this.$route)
    this.searchValue = this.$route.query.id
    this.CODE = this.$route.query.id
    if (this.searchValue) {
      this.intItemData(this.currentPage2, 8, 'typeId', this.searchValue)
    } else {
      this.intItemData(this.currentPage2, 8)
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
