<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
      <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
      </FormItem>-->
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
          :data="uploadParam"
          style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
            <img class="img" v-if="showImg" :src="formValidate.bankImg" alt size="50">
          </div>
        </Upload>
      </FormItem>
      <FormItem label="银行名称" prop="bankName">
        <Input v-model="formValidate.bankName" placeholder="输入银行名称"></Input>
      </FormItem>
      <FormItem label="银行描述" prop="bankDescription">
        <Input
          v-model="formValidate.bankDescription"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="输入银行描述"
        ></Input>
      </FormItem>

      <FormItem label="银行攻略" prop="bankGuide">
        <Input
          v-model="formValidate.bankGuide"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请粘贴攻略地址"
        ></Input>
      </FormItem>

      <FormItem label="银行标签" prop="bankLabels">
        <div class="tipsBan">
          <Tag
            closable
            @on-close="handleClose('label',index)"
            v-for="(item ,index) in formValidate.bankLabels"
            :key="index"
          >{{item}}</Tag>
        </div>
        <Input
          style="margin-top:10px;"
          v-model="inputbankTip"
          placeholder="输入标签使用enter键作为隔断"
          @on-enter="enterBankTips"
        ></Input>
      </FormItem>

      <FormItem label="小提示" prop="bankTips">
        <div class="tipsBan">
          <Tag
            closable
            @on-close="handleClose('tip',index)"
            v-for="(item ,index) in formValidate.bankTips"
            :key="index"
          >{{item}}</Tag>
          <Input
            style="margin-top:10px;"
            v-model="inputIip"
            placeholder="输入小提示使用enter键作为隔断"
            @on-enter="enterTips"
          ></Input>
        </div>
      </FormItem>

      <FormItem label="是否热门" prop="bankHot">
        <RadioGroup v-model="formValidate.bankHot">
          <Radio label="true">是</Radio>
          <Radio label="false">否</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="银行编码" prop="bankCode">
        <Input v-model="formValidate.bankCode" placeholder="输入银行编码"></Input>
      </FormItem>

      <FormItem label="进度查询链接" prop="bankQueryProgressLink">
        <Input v-model="formValidate.bankQueryProgressLink" placeholder="请输入银行进度查询链接"></Input>
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
const _ = require('lodash')
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // 输入标签的input框
      inputIip: '',
      inputbankTip: '',
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
        bankHot: 'true',
        bankId: '',
        bankImg: '',
        bankName: '',
        bankLabels: []
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
    // 输入银行卡的小提示
    enterTips () {
      console.log('查看输入框中的内容', this.inputbankTip.length)
      var regu = '^[ ]+$'
      var re = new RegExp(regu)
      if (this.inputIip) {
        var result = re.test(this.inputbankTip)
        if (!result) {
          this.formValidate.bankTips.push(this.inputIip)
        }
      } else {
        this.$Message.error('请输入内容')
      }
      this.inputIip = ''
    },
    // 输入银行标签
    enterBankTips (value) {
      console.log(
        '查看输入框中的内容',
        this.inputIip.length,
        this.inputbankTip.length
      )
      var regu = '^[ ]+$'
      var re = new RegExp(regu)

      if (this.inputbankTip) {
        var result = re.test(this.inputIip)
        if (!result) {
          // console.log(this.formValidate.bankLabels.push);
          this.formValidate.bankLabels.push(this.inputbankTip)
        }
      } else {
        this.$Message.error('请输入内容')
      }
      this.inputbankTip = ''
    },
    // 关闭一个标签
    handleClose (type, index) {
      if (type === 'tip') {
        this.formValidate.bankTips.splice(index, 1)
      } else {
        this.formValidate.bankLabels.splice(index, 1)
      }
      console.log(this.formValidate.bankLabels)
    },
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiBank.bankIdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.bankHot = String(this.formValidate.bankHot)

            if (this.formValidate.bankLabels.length > 0) {
              this.formValidate.bankLabels = res.data.bankLabels.split(',')
            } else {
              this.formValidate.bankLabels = []
            }
            if (this.formValidate.bankTips.length > 0) {
              this.formValidate.bankTips = res.data.bankTips.split(',')
            } else {
              this.formValidate.bankTips = []
            }
            // console.log(typeof this.formValidate.bankHot);
            // radio的value值必须为String | Numberf 使用typeof 测试String转码后的类型为string

            console.log('查看接受到值', this.formData, this.formValidate)
          }
        })
      } else {
        this.formValidate = {}
        // 设置单选框的默认值
        this.formValidate.bankHot = 'true'
        this.formValidate.bankLabels = []
        this.formValidate.bankTips = []
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid && this.formValidate.bankImg) {
          var data = _.cloneDeep(this.formValidate)

          console.log(data.bankTips.length > 0)

          if (data.bankLabels.length > 0) {
            data.bankLabels = data.bankLabels.join(',')
          } else {
            data.bankLabels = ''
          }
          if (data.bankTips.length > 0) {
            data.bankTips = data.bankTips.join(',')
          } else {
            data.bankTips = ''
          }
          apiBank.bankSave(data).then(res => {
            if (res.status == 0) {
              this.$Message.success('提交成功')
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
.tipsBan {
  min-height: 40px;
  height: auto;
  border: 1px solid #80869559;
  padding: 4px;
}
</style>
