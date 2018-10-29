<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
           <FormItem v-if="!hiddenPassword" label="新密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="密码应为用6-20位字母，数字，下划线"></Input>
         </FormItem>
          <FormItem v-if="!hiddenPassword" label="确认新密码" prop="againpassword">
            <Input  v-model="formValidate.againpassword" placeholder="密码应为用6-20位字母，数字，下划线"></Input>
         </FormItem>
           <FormItem v-if="!hiddenPassword" label="验证方式">
            <RadioGroup v-model="formValidate.key">
                <Radio label="phone">手机</Radio>
                <Radio label="email">邮箱</Radio>
            </RadioGroup>
          </FormItem>
          <!-- 手机 -->
          <FormItem v-if="!hiddenPhone"  label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="输入管理员手机号"></Input>
         </FormItem>
         <!-- 邮箱 -->
          <FormItem v-if="!hiddenEmail" label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="输入管理员邮箱"></Input>
         </FormItem>
         <FormItem  label="验证码" prop="vcode">
           <Row type="flex"  justify="center" align="middle">
             <Col span = '12' >
                <Input v-model="formValidate.vcode" placeholder="请输入验证码"></Input>
             </Col>
             <Col span = '12' >
              <Button style="margin-left:10px; background-color:#8086955c;" @click='sendAuthCode'>获取验证码</Button>
             </Col>
           </Row>
         </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">{{unbind}}</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin'

import apiSafe from '@/api/apiSafe'
export default {
  name: 'new-list',
  components: {},
  props: ['formData', 'unbind'],
  data () {
    return {
      hiddenPassword: true,
      hiddenPhone: true,
      hiddenEmail: true,
      storageMess: localStorage.getItem('loginObj'),
      formValidate: {
        id: '',
        password: '',
        againpassword: '',
        key: 'phone',
        phone: '',
        email: '',
        vcode: ''
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: 'id不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        againpassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          }
        ],
        vcode: [
          {
            required: true,
            message: '请先输入验证码',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 如果有id传入进来进入编辑模式
    checkData () {
      // console.log("父组件传过来的值", this.formData);
      if (this.formData == 'password') {
        this.hiddenPassword = false
        this.hiddenPhone = true
        this.hiddenEmail = true
      } else if (this.formData == 'phone') {
        this.hiddenPassword = true
        this.hiddenPhone = false
        this.hiddenEmail = true
        this.formValidate.key = ''
        this.formValidate.phone = JSON.parse(this.storageMess).phone
      } else {
        this.hiddenPassword = true
        this.hiddenPhone = true
        this.hiddenEmail = false
        this.formValidate.key = ''
        this.formValidate.email = JSON.parse(this.storageMess).email
      }
      // console.log(this.hiddenPassword, this.hiddenPhone, this.hiddenEmail);
    },
    // 发送验证码
    sendAuthCode () {
      let phone = null
      let email = null

      // 验证是往邮箱还是手机上发验证码
      if (this.formValidate.phone) {
        phone = this.formValidate.phone
      } else if (this.formValidate.email) {
        email = this.formValidate.email
      } else if (this.formValidate.key && this.formValidate.key === 'phone') {
        phone = JSON.parse(this.storageMess).phone
      } else if (this.formValidate.key && this.formValidate.key === 'email') {
        emial = JSON.parse(this.storageMess).email
      }
      if (phone == '' && email == '') {
        this.$Message.error('请先绑定手机号或者是邮箱')
        this.$emit('close-win')
      }
      apiSafe.sendVCode(phone, email).then(res => {
        if (res.status == 0) {
          this.$Message.success('验证码发送成功')
        }
      })
    },
    // 提交表单信息
    handleSubmit (name) {
      var _this = this
      var parseMess = JSON.parse(_this.storageMess)
      // 修改密码
      editData(name)
      var data = _this.formValidate
      console.log('查看要提交的数据', data)

      if (_this.formData == 'password' && data.password) {
        data.key = parseMess.phone || parseMess.email || ''
        if (data.key == '') {
          _this.$Message.error('请先绑定手机号或者是邮箱')
          _this.$emit('close-win')
        } else {
          action('updatePassword', '密码修改成功')
        }
      } else if (_this.formData == 'phone' && data.phone && parseMess.phone) {
        parseMess.phone = ''
        _this.storageMess = action('unbindPhone', '解绑手机号成功')
      } else if (_this.formData == 'phone' && data.phone) {
        parseMess.phone = data.phone
        action('bindPhone', '手机号绑定成功')
      } else if (_this.formData == 'email' && data.email && parseMess.email) {
        parseMess.email = ''
        action('unbindEmail', '解绑邮箱成功')
      } else if (_this.formData == 'email' && data.email) {
        parseMess.email = data.email
        action('bindEmail', '邮箱绑定成功')
      }
      //
      _this.storageMess = parseMess
      // 执行函数
      function action (actionName, message) {
        apiSafe[actionName](data).then(res => {
          if (res.status == 0) {
            localStorage.setItem('loginObj', JSON.stringify(_this.storageMess))
            _this.$Message.success(message)
            _this.$emit('close-win')
          }
        })
      }

      // 产出能够提交的数据
      function editData (name) {
        _this.$refs[name].validate(valid => {
          if (valid) {
            if (data.password !== data.againpassword) {
              _this.$Message.error('确认密码与新密码不符')
              _this.formValidate.againpassword = ''
              _this.formValidate.password = ''
            }
            // 发送验证码的方式
            if (_this.formValidate.key == 'phone') {
              _this.formValidate.key = parseMess.phone
            } else {
              _this.formValidate.key = parseMess.email
            }
            return (data = _this.formValidate)
          } else {
            _this.$Message.error('信息没有填写完整！')
          }
        })
      }
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.checkData()
  }
}
</script>
<style>
.img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
