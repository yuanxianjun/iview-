<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="115">
      <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
      </FormItem>-->
      <FormItem label="上传包" prop="avastart">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['apk','jpg']"
          :max-size="102400"
          :before-upload="handleBeforeUpload"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess"
          type="drag"
          :action="uploadUrl"
          :data="uploadParam"
          style="display: inline-block;"
        >
          <Button icon="ios-cloud-upload-outline" :loading="loadingStatus">上传文件</Button>
        </Upload>
      </FormItem>
      <FormItem label="包大小" prop="appSize">
        <InputNumber readonly :max="1000" :min="1" v-model="formValidate.appSize"></InputNumber>
        <span style="margin-left:5px;">M</span>
      </FormItem>
      <FormItem label="APP下载地址" prop="appDownloadLink">
        <Input v-model="formValidate.appDownloadLink" placeholder="输入APP下载地址"></Input>
      </FormItem>
      <FormItem label="包标题" prop="appTitle">
        <Input v-model="formValidate.appTitle" placeholder="请输入包标题"></Input>
      </FormItem>
      <FormItem label="APP版本号" prop="appVersion">
        <Input v-model="formValidate.appVersion" placeholder="输入APP版本号"></Input>
      </FormItem>
      <FormItem
        v-if="this.formData"
        label="是否最新"
        prop="appNew"
      >{{formValidate.appNew == true ? "是" : "否"}}</FormItem>

      <FormItem label="更新内容描述" prop="appDescription">
        <Input
          type="textarea"
          v-model="formValidate.appDescription"
          placeholder="密码应为用6-20位字母，数字，下划线"
        ></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">{{formData?"修改":"提交"}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import apiAppAdmin from '@/api/apiAppAdmin'

import { apiUpload } from '@/api/apiUpload'

import apiRole from '@/api/apiRole'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // 上传文件的地址
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'app'
      },
      loadingStatus: false,

      formValidate: {},
      ruleValidate: {
        appTitle: [
          {
            required: true,
            message: '包标题不能为空',
            trigger: 'blur'
          }
        ],
        appDownloadLink: [
          {
            required: true,
            message: 'APP下载地址不能为空',
            trigger: 'blur'
          }
        ],
        appDescription: [
          {
            required: true,
            message: '更新内容描述不能为空',
            trigger: 'blur'
          }
        ],
        appVersion: [
          {
            required: true,
            message: 'APP版本号不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 如果有id传入进来进入编辑模式
    checkData () {
      if (
        this.formData !== '' &&
        this.formData !== null &&
        this.formData !== {}
      ) {
        var id = this.formData
        // this.ruleValidate.password[0].required = false;
        apiAppAdmin.appAdminIdSearch(id).then(res => {
          if (res.status == 0) {
            console.log('查看是否获取到了', res)

            this.formValidate = res.data
            this.formValidate.appSize = Number(
              (res.data.appSize / 1024 / 1024).toFixed(2)
            )
          }
        })
      } else {
        this.formValidate = {
          appNew: 'true',
          appSize: 1
        }
      }
    },
    // 提交表单信息
    handleSubmit (name) {
      // 如果是新建模式两次提交否则只能提交角色修改
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log('查看要提交的数据', this.formValidate)
          this.formValidate.appSize = this.formValidate.appSize * 1024 * 1024
          apiAppAdmin.appAdminSubmit(this.formValidate).then(res => {
            if (res.status == 0) {
              this.$Message.success('提交成功')
              this.$emit('close-win')
            }
          })
        } else {
          this.$Message.error('信息没有填写完整！')
        }
      })
    },
    // 上传文件
    handleSuccess (res, file, fileList) {
      console.log('文件上传成功', res)
      // this.formValidate.appDownloadLink = res.data.previewFileName
      if (res.status == 0) {
        this.loadingStatus = false
        this.formValidate.appSize = Number(
          (fileList[0].size / 1024 / 1024).toFixed(2)
        )
        this.formValidate.appDownloadLink = res.data.previewFileName
        this.$Message.success('上传成功')
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
    handleBeforeUpload () {
      console.log('上传之前')
      this.loadingStatus = true
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
