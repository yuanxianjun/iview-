<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
          <FormItem label="头像"  prop="avastart">
            <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"

                type="drag"
                :action="uploadUrl"
                :data = "uploadParam"
                style="display: inline-block;width:58px;">

                <div  style="width: 58px;height:58px;line-height: 58px;">
                    <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="showImg" :src="formValidate.avastart" alt="" size = "50">
                </div>
            </Upload>
         </FormItem>
        <FormItem label="管理员名称" prop="username">
            <Input :disabled = "isDisabled" v-model="formValidate.username" placeholder="用户名应以字母开头,用6-20位字母，数字，下划线"></Input>
         </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input :disabled = "isDisabled" v-model="formValidate.nickname" placeholder="输入管理员昵称"></Input>
         </FormItem>
           <FormItem v-if="hiddenPassword" label="密码" prop="password">
            <Input :disabled = "isDisabled" v-model="formValidate.password" placeholder="密码应为用6-20位字母，数字，下划线"></Input>
         </FormItem>
           <FormItem label="手机号" prop="phone">
            <Input :disabled = "isDisabled" v-model="formValidate.phone" placeholder="输入管理员手机号"></Input>
         </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input :disabled = "isDisabled" v-model="formValidate.email" placeholder="输入管理员邮箱"></Input>
         </FormItem>
         <FormItem label="角色选择" prop="roleNames">
            <Select  multiple v-model="formValidate.roleNames" placeholder="请选择相应的角色">
                <Option v-for="item in roleNames" :value="item.id" :key="item.id">{{item.roleName}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">{{formData?"修改":"提交"}}</Button>
            <Button v-if="this.hiddenPassword"  @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin'

import { apiUpload } from '@/api/apiUpload'

import apiRole from '@/api/apiRole'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // 长传图片
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'headImg'
      },
      showImg: false,

      hiddenPassword: true,
      isDisabled: false,
      roleNames: [],
      formValidate: {
        id: '',
        username: '',
        nickname: '',
        avastart: '',
        password: '',
        phone: '',
        email: '',
        roleNames: []
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: 'id不能为空',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '管理员名称不能为空',
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查询信息
    getRoleNames () {
      apiRole.list().then(res => {
        if (res.status == 0) {
          // console.log("查看是否获取到了角色信息", res);
          this.roleNames = res.data.rows
        }
      })
    },
    // 如果有id传入进来进入编辑模式
    checkData () {
      if (
        this.formData !== '' &&
        this.formData !== null &&
        this.formData !== {}
      ) {
        this.hiddenPassword = false
        this.isDisabled = true
        var id = this.formData
        // this.ruleValidate.password[0].required = false;
        apiAdmin.adminIdSearch(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.roleNames = []
            res.data.roles.forEach(res => {
              this.formValidate.roleNames.push(res.id)
            })
          }
          // console.log(
          //   res.data.avastart,
          //   res.data.avastart !== "" && res.data.avastart !== null
          // );
          if (res.data.avastart !== '' && res.data.avastart !== null) {
            this.showImg = true
            // console.log("是否展示图片", this.showImg);
          }
        })
      } else {
        this.formValidate = {}
      }
    },
    // 提交表单信息
    handleSubmit (name) {
      // 还是用formValidate
      // console.log(this.formValidate);
      // delete this.formValidate.password;
      // this.formValidate.password = null;
      console.log(name, this.formValidate, this.isDisabled)

      // 如果是新建模式两次提交否则只能提交角色修改
      if (this.isDisabled === true) {
        var data = {
          roleIds: this.formValidate.roleNames || [],
          userId: this.formValidate.id
        }

        apiAdmin.roleSave(data).then(res => {
          if (res.status == 0) {
            this.$Message.success('修改成功')
            this.$emit('close-win')
          }
        })
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            console.log('查看要提交的数据', this.formValidate)
            apiAdmin.adminSubmit(this.formValidate).then(res => {
              if (res.status == 0) {
                // 保存角色信息
                var data = {
                  roleIds: this.formValidate.roleNames || [],
                  userId: res.data.id
                }

                apiAdmin.roleSave(data).then(res => {
                  if (res.status == 0) {
                    this.$Message.success('添加成功')
                    this.$emit('close-win')
                  }
                })
              }
            })
          } else {
            this.$Message.error('信息没有填写完整！')
          }
        })
      }
    },
    // 上传文件
    handleSuccess (res, file) {
      if (this.isDisabled) {
        this.$Message.success('头像编辑禁用')
      } else {
        console.log('文件上传成功', res, file)
        this.formValidate.avastart = res.data.previewFileName
        this.showImg = true
        console.log(res.previewFileName, this.formValidate.avastart)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '上传的文件格式不正确',
        desc: '文件格式' + file.name + ' 是不正确的，请选择jpg或者png格式的图片'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '上传扥文件大小超过限制',
        desc: '文件  ' + file.name + '太大,大小不能超过2M.'
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.checkData()
    this.getRoleNames()
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
