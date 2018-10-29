<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
         <FormItem label="银行logo" prop="bankImg">
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
                    <img class="img" v-if="showImg" :src="formValidate.bankImg" alt="" size = "50">
                </div>
            </Upload>
        </FormItem>
        <FormItem label="银行名称" prop="bankName">
            <Input v-model="formValidate.bankName" placeholder="输入银行名称"></Input>
        </FormItem>
        <FormItem label="银行描述" prop="bankDescription">
          <Input v-model="formValidate.bankDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入银行描述"></Input>
        </FormItem>
        <FormItem label="是否热门" prop="bankHot">
             <RadioGroup v-model="formValidate.bankHot">
              <Radio label="true">是</Radio>
              <Radio label="false">否</Radio>
          </RadioGroup>
        </FormItem>
         <FormItem label="银行编码" prop="bankCode">
            <Input  v-model="formValidate.bankCode" placeholder="输入银行编码"></Input>
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
import { apiUpload } from '@/api/apiUpload'
import apiBank from '@/api/credit-api/apiBank'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // 上传头像的地址
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'bankImg'
      },
      showImg: false,
      // form表单的内容
      formValidate: {
        bankCode: '',
        bankDescription: '',
        bankHot: true,
        bankId: '',
        bankImg: '',
        bankName: ''
      },
      ruleValidate: {
        bankCode: [
          {
            required: true,
            message: '银行代码不能为空',
            trigeger: 'blur'
          }
        ],
        bankName: [
          {
            required: true,
            message: '银行名不能为空',
            trigger: 'blur'
          }
        ],
        bankDescription: [
          { required: true, message: '银行描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiBank.bankIdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.bankHot = String(this.formValidate.bankHot)
            // console.log(typeof this.formValidate.bankHot);
            // radio的value值必须为String | Numberf 使用typeof 测试String转码后的类型为string
            console.log('查看接受到值', this.formData, this.formValidate)
          }
        })
      } else {
        this.formValidate = {}
        // 设置单选框的默认值
        this.formValidate.bankHot = 'true'
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid && this.formValidate.bankImg) {
          apiBank.bankSave(this.formValidate).then(res => {
            if (res.status == 0) {
              this.$Message.success('添加成功')
              this.$emit('close-win')
            }
          })
        } else {
          this.$Message.error('请将信息填写完整')
        }
      })
    },
    // 上传文件
    handleSuccess (res, file) {
      if (this.isDisabled) {
        this.$Message.success('头像编辑禁用')
      } else {
        console.log('文件上传成功', res, file)
        this.formValidate.bankImg = res.data.previewFileName
        this.showImg = true
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
