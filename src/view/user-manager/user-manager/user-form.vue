<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
         <FormItem label="用户头像" prop="avastart">
                <div  style="width: 58px;height:58px;line-height: 58px;">
                    <img class="img"  :src="formValidate.avastart" alt="" size = "50">
                </div>
        </FormItem>
        <FormItem label="用户名称" prop="bankName">
            <Input v-model="formValidate.bankName" placeholder="输入用户名称"></Input>
        </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input :disabled = "isDisabled" v-model="formValidate.nickname" placeholder="输入用户昵称"></Input>
         </FormItem>
           <FormItem v-if="hiddenPassword" label="密码" prop="password">
            <Input :disabled = "isDisabled" v-model="formValidate.password" placeholder="密码应为用6-20位字母，数字，下划线"></Input>
         </FormItem>
           <FormItem label="手机号" prop="phone">
            <Input :disabled = "isDisabled" v-model="formValidate.phone" placeholder="输入用户手机号"></Input>
         </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input :disabled = "isDisabled" v-model="formValidate.email" placeholder="输入用户邮箱"></Input>
         </FormItem>
         <FormItem label="角色选择" prop="roleNames">
            <Select  multiple v-model="formValidate.roleNames" placeholder="请选择相应的角色">
                <Option v-for="item in roleNames" :value="item.id" :key="item.id">{{item.roleName}}</Option>
            </Select>
        </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin.js'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // form表单的内容
      formValidate: {},
      ruleValidate: {}
    }
  },
  methods: {
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiAdmin.generalUseIdFind(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            console.log('查看接受到值', this.formData, this.formValidate)
          }
        })
      } else {
        this.formValidate = {}
        // 设置单选框的默认值
        this.formValidate.bankHot = 'true'
      }
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
