<template>
  <div>
    <Menu mode="horizontal"  active-name="noread" @on-select="changeMenu">
        <MenuItem name="noread">
            <Icon type="ios-paper" />
            未读消息
            <Badge  :count="noReadMessNum" >
              <!-- <a href="#" class="demo-badge"></a> -->
            </Badge>
        </MenuItem>
        <MenuItem name="allMess">
            <Icon type="ios-people" />
            全部消息
        </MenuItem>
    </Menu>
    <div v-if="showMess" >
        <Card v-for="(item,index) in noReadMess " :key="index" >
         <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                 <Row >
                      <Col span="1">
                        <Checkbox v-if="showChecked" :label="item.id" >  <span></span></Checkbox>
                      </Col>
                      <Col span="15">{{item.messageTitle}}</Col>
                      <Col span="4">{{$moment(item.createTime).format("YYYY/MM/DD")}}</Col>
                      <!-- <Col span="4">{{item.createUser}}</Col> -->
                  </Row>
        </CheckboxGroup>
        </Card>
        <div v-if="showChecked" style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-top:6px;">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选</Checkbox>
                <Button style="" type="primary" @click="selectIds">设置已阅</Button>
        </div>
    </div>
    <!-- 显示所有的消息 -->
    <div v-if="!showMess">
        <Card v-for="(item,index) in messageData " :key="index" v-on:click.native="showDetail(item)">
                <Row >
                    <Col span="16">{{item.messageTitle}}</Col>
                    <Col span="4">{{$moment(item.createTime).format("YYYY/MM/DD")}}</Col>
                    <!-- <Col span="4">{{item.createUser}}</Col> -->
                </Row>
        </Card>
        <div class="pagenation">
      <Page :total="totalNum" show-elevator  @on-change = "changePage"/>
      </div>
    </div>
     <Modal
            v-model="modal1"
            v-bind:title="detailMess.messageTitle"
            footer-hide
            >
          <conShow v-if="modal1" :formData="formData" @close-win="closeWin"></conShow>
        </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import apiMessage from '@/api/apiMessage.js'
import conShow from './con-show.vue'
export default {
  name: 'admin-system-notice',
  components: {
    conShow
  },
  data () {
    return {
      showMess: true,
      totalNum: 0,
      currentPage: 0,
      messageData: [],
      // 未阅消息
      noReadMess: [],
      noReadMessNum: 0,
      detailMess: [],
      // 设置已阅
      checkAllGroup: [],
      showChecked: false,
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      // 控制显示模态框
      modal1: false
    }
  },
  methods: {
    /**
     * 批阅功能
     **/
    // 全选
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }

      this.indeterminate = false
      if (this.checkAll) {
        this.noReadMess.forEach(ele => {
          this.checkAllGroup.push(ele.id)
        })
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      console.log('查看更改', data)
    },
    // 设置已阅功能
    selectIds () {
      console.log(this.checkAllGroup)
      apiMessage.setRead(this.checkAllGroup).then(res => {
        if (res.status == 0) {
          this.$Message.success('批阅成功')
          this.searchNoreadMess()
          this.searchList()
        }
      })
    },
    // 展示每条信息的详情
    showDetail (params) {
      this.formData = params.id
      if (this.formData) {
        this.modal1 = true
      }
    },
    // 查看全部信息
    searchList (page, rows) {
      apiMessage.list(page, 10).then(res => {
        if (res.status == 0) {
          this.messageData = res.data.rows
          // console.log(this.messageData);
          this.totalNum = res.data.total
          this.noReadMess = res.data.rows.filter(function (item, index, arr) {
            return item.readed === false
          }, this)
          if (this.noReadMess.length == 0) {
            this.noReadMess = [{ messageTitle: '暂时没有未阅消息' }]
          }
        }
      })
    },
    // 查看未读消息
    searchNoreadMess () {
      apiMessage.getNoRead().then(res => {
        console.log(res)
        if (res.status == 0) {
          this.noReadMessNum = res.data
          if (this.noReadMessNum == 0) {
            // 记得改为false
            this.showChecked = false
          } else {
            this.showChecked = true
          }
        }
      })
    },
    // 改变面板
    changeMenu (name) {
      if (name == 'noread') {
        this.showMess = true
      } else {
        this.showMess = false
      }
    },
    // 改变当前显示的页面
    changePage (localPage) {
      this.currentPage = localPage
      this.searchList(localPage, 10)
    },
    // 关闭详情框
    closeWin () {
      this.modal1 = false
      this.searchList()
    }
  },
  mounted () {
    this.searchList()
    // 搜索未阅读的消息
    this.searchNoreadMess()
  }
}
</script>
<style>
.pagenation {
  margin-top: 10px;
}
.messNum {
  /* border: 1px solid red; */
  color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
  text-align: center;
  font-size: 10px;
}
.btns {
  margin-top: 15px;
}
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>
