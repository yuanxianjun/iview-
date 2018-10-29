<template>
  <div style="background:#eee;padding: 10px;margin-top:20px;margin-right:18px;" >
     <Card style="width:450px"  :bordered="false">
        <p slot="title">
           标题：{{detailMess.messageTitle}}
        </p>
        <!-- <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            Change
        </a> -->
        <p>
          内容：{{detailMess.messageContent}}
        </p>
    </Card>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin'

import apiUpload from '@/api/apiUpload'

import apiMessage from '@/api/apiMessage.js'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      detailMess: []
    }
  },
  methods: {
    getDetail () {
      if (this.formData) {
        apiMessage.getDetails(this.formData).then(res => {
          if (res.status == 0) {
            this.detailMess = res.data
          }
        })
      }
    },
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
        var id = this.formData
        this.ruleValidate.password[0].required = false
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
      this.$refs[name].validate(valid => {
        if (valid) {
          // 还是用formValidate
          // console.log(this.formValidate);
          delete this.formValidate.password
          // this.formValidate.password = null;
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
    },
    // 上传文件
    handleSuccess (res, file) {
      console.log('文件上传成功', res, file)
      this.formValidate.avastart = res.data.previewFileName
      this.showImg = true
      console.log(res.previewFileName, this.formValidate.avastart)
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
    // 获取文章详情
    this.getDetail()
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
