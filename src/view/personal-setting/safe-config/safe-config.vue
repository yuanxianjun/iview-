<template>
  <Card>
      <Divider dashed></Divider>
      <Row>
            <Col span="4">
                <Icon type="md-key" size="70"></Icon>
            </Col>
            <Col span="14" >
              <div class="passAndtip">
                <strong>密码</strong><span v-bind:class='{"color-red":!isSets.setPass.bool,"color-black":isSets.setPass.bool}'>{{isSets.setPass.content}}</span>
              </div>
                <p class="tip">用于保护账号信息与登录安全</p>
          </Col>
            <Col span="4" style="height:80px; line-height:80px;">
            <Button type="primary"@click="handleBinding('password')" >{{isSets.setPass.bool?"修改":"绑定"}}</Button></Col>
        </Row>
  <Divider dashed></Divider>
  <!-- 手机号 -->
     <Row>
        <Col span="4">
            <Icon type="md-phone-portrait" size="70"></Icon>
        </Col>
        <Col span="14" >
          <div class="passAndtip">
            <strong>手机号</strong>
            <span v-bind:class='{"color-red":!isSets.setPhone.bool,"color-black":isSets.setPhone.bool}'>{{isSets.setPhone.content}}</span>
          </div>
            <p class="tip">绑定手机后，可以用手机号码登录系统</p>

      </Col>
        <Col span="4" style="height:80px; line-height:80px;">
        <Button type="primary" @click="handleBinding('phone')" >{{isSets.setPhone.bool?"解绑":"绑定"}}</Button></Col>
         <!--分割线  邮箱-->
    </Row>
  <Divider dashed> </Divider>
   <Row>
        <Col span="4">
            <Icon type="md-mail" size="60"></Icon>
        </Col>
        <Col span="14" >
          <div class="passAndtip">
            <strong>邮箱</strong>
            <span v-bind:class='{"color-red":!isSets.setEmail.bool,"color-black":isSets.setEmail.bool}'>{{isSets.setEmail.content}}</span>
          </div>
            <p class="tip">验证后，账户安全更有保障</p>

      </Col>
        <Col span="4" style="height:80px; line-height:80px;">
        <Button type="primary" @click="handleBinding('email')">{{isSets.setEmail.bool?"解绑":"绑定"}}</Button></Col>
    </Row>
     <Modal
            v-model="modal1"
            v-bind:title="setTittle"
            footer-hide
            >
          <safeForm v-if="modal1" :formData="formData" :unbind = "unbind" @close-win="closeWin"></safeForm>
        </Modal>
  </Card>
</template>
<script>
import apiSafe from '@/api/apiSafe.js'
import safeForm from './safe-form.vue'
export default {
  name: 'admin-manager-manager',
  components: {
    safeForm
  },
  data () {
    return {
      split2: 0.5,
      modal1: false,
      setTittle: '',
      formData: '',
      unbind: '',
      isSets: {
        setPass: {
          content: '已绑定',
          bool: true
        },
        setPhone: {
          content: '未绑定',
          bool: false
        },
        setEmail: {
          content: '未绑定',
          bool: false
        }
      }
    }
  },
  methods: {
    // 判断是否已经绑定了手机号或者是邮箱
    checkData () {
      var safeMess = JSON.parse(localStorage.getItem('loginObj'))
      console.log('检查信息', safeMess)
      if (
        safeMess.phone !== '' &&
        safeMess.phone !== null &&
        safeMess.phone !== undefined
      ) {
        this.isSets.setPhone.content = '已绑定'
        this.isSets.setPhone.bool = true
      }
      // 邮箱
      if (
        safeMess.email !== '' &&
        safeMess.email !== null &&
        safeMess.email !== undefined
      ) {
        this.isSets.setEmail.content = '已绑定'
        this.isSets.setEmail.bool = true
      }
    },

    // 绑定或者是修改安全信息
    handleBinding (name) {
      this.formData = name
      this.unbind = true
      if (name == 'password') {
        this.setTittle = '修改密码'
        this.unbind = '修改'
      } else if (name == 'phone' && this.isSets.setPhone.bool === false) {
        this.setTittle = '绑定手机号'
        this.unbind = '绑定'
      } else if (name == 'phone' && this.isSets.setPhone.bool === true) {
        this.setTittle = '解绑手机号'
        this.unbind = '解绑'
      } else if (name == 'email' && this.isSets.setEmail.bool === true) {
        this.setTittle = '解绑邮箱'
        this.unbind = '解绑'
      } else {
        this.setTittle = '绑定邮箱'
        this.unbind = '绑定'
      }
      this.modal1 = true
      var _this = this
    },
    // 关闭窗口
    closeWin () {
      this.checkData()
      this.modal1 = false
    }
  },
  mounted () {
    this.checkData()
    // getTableData().then(res => {
    //   console.log("取得的数据", res);
    //   this.tableData = res.data;
    // });
  }
}
</script>
<style>
.ivu-divider-dashed {
  background: none;
  border-top: 1px dashed #17233d87;
}
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.passAndtip {
  height: 40px;
  line-height: 40px;
}
.tip {
  color: #808695;
  height: 40px;
  line-height: 40px;
}
.color-black {
  color: rgb(33, 207, 42);
  margin-left: 10px;
}
.color-red {
  color: red;
  margin-left: 10px;
}
</style>
