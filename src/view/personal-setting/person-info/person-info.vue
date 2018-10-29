<template>
  <div>
    <Card>
       <Form ref="formItem" :model="formItem" :label-width="100" >
         <!-- <FormItem label="id">
          <Input v-model="formItem.id" placeholder=""></Input>
        </FormItem> -->
        <FormItem label="头像："  prop="headimg">
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
                    <Icon v-if="!formItem.headimg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="formItem.headimg" :src="formItem.headimg" alt="" size = "50">
                </div>
            </Upload>
         </FormItem>
         <FormItem label="昵称："  prop="nickName">
          <Input  v-model="formItem.nickName" clearable></Input>
        </FormItem>
        <FormItem label="性别："  prop="gender">
          <RadioGroup v-model="formItem.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="生日："  prop="brithday">
            <Row>
                <Col span="11">
                    <FormItem >
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.brithday" @on-change="changeDate"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>

        <FormItem label="所在地："  prop="location">
          <Input v-model="formItem.location" clearable></Input>
        </FormItem>
        <FormItem label="职业：" prop="occupation">
          <Input v-model="formItem.occupation" clearable></Input>
        </FormItem>
         <FormItem  label="创建时间："  >
          <Input disabled v-model="formItem.createTime" clearable></Input>
        </FormItem>
        <FormItem>
           <Button type="primary" @click="handleSubmit()">提交</Button>
            <Button @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </Card>
  </div>
</template>
<script>
import apiSetting from '@/api/apiSetting.js'

import { apiUpload } from '@/api/apiUpload'
export default {
  name: 'admin-manager-manager',
  components: {},
  data () {
    return {
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'headImg'
      },
      showImg: false,
      formItem: {}
    }
  },
  methods: {
    getUserDetails () {
      apiSetting.userDetail().then(res => {
        if (res.status == 0) {
          let resData = Object.assign(res.data)
          resData.brithday = resData.brithday.slice(0, 10)
          resData.createTime = resData.createTime.slice(0, 10)

          this.formItem = resData
          // this.formItem.nickName = "";
          this.formItem.nickName = JSON.parse(
            localStorage.getItem('loginObj')
          ).nickname
        }
      })
    },
    // 上传文件
    handleSuccess (res, file) {
      if (this.isDisabled) {
        this.$Message.success('头像编辑禁用')
      } else {
        console.log('文件上传成功', res, file)
        this.formItem.headimg = res.data.previewFileName
        this.showImg = true
        console.log(res.previewFileName, this.formItem.headimg)
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
    // 提交表单
    handleSubmit () {
      // 存储更改的昵称
      localStorage.setItem('nickName', this.formItem.nickName)
      apiSetting.updateUser(this.formItem).then(res => {
        if (res.status === 0) {
          this.$Message.success('提交成功')
        }
      })
    },
    // 重置表单
    handleReset (name) {
      console.log(this.$refs[name])
      this.$refs[name].resetFields()
      this.formItem = {
        brithday: '',
        createTime: '',
        createUser: '',
        deleteStatus: '',
        gender: '',
        id: '',
        headimg: '',
        location: '',
        nickName: '',
        occupation: '',
        updateTime: '',
        userId: ''
      }
      console.log(this.formItem)
    },
    // 选择本地时间
    changeDate (date) {
      // console.log(
      //   this.$moment(date)
      //     .format()
      //     .substring(0, 19)
      // );
      this.formItem.brithday = this.$moment(date)
        .format()
        .substring(0, 19)
    }
  },
  mounted () {
    this.getUserDetails()
  }
}
</script>
<style>
.img {
  width: 50px;
  height: 50px;
}
/* .ivu-form .ivu-form-item-label {
  font-size: 18px;
  line-height: 2;
}
.ivu-input {
  height: 50px;
  font-size: 18px;
} */
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  color: black;
}
</style>
