<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
         <FormItem label="信用卡图片" prop="creditImg">
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
                style="display: inline-block;width:100px;">

                <div  style="width: 100px;height:58px;line-height: 58px;">
                    <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="showImg" :src="formValidate.creditImg" alt="" style="width:100px;height:60px;">
                </div>
            </Upload>
        </FormItem>
        <FormItem label="信用卡名称" prop="creditName">
            <Input v-model="formValidate.creditName" placeholder="输入信用卡名称"></Input>
        </FormItem>
        <FormItem label="信用卡办卡描述" prop="creditDescription">
          <Input v-model="formValidate.creditDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入信用卡办卡描述"></Input>
        </FormItem>
        <!-- 写入标签 -->
         <FormItem label="信用卡标签" prop="creditTips">
          <Input v-model="formValidate.creditTips" type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="信用卡简单描述，不超过40字
"></Input>
        </FormItem>
        <!-- 下拉 -->
          <FormItem label="年费" prop="creditAnnualFee">
            <!-- <Input  v-model="formValidate.creditAnnualFee" placeholder=""></Input> -->

            <Select v-model="formValidate.creditAnnualFee" placeholder="选择信用卡年费">
                <Option v-for="item in yearMoney" :key = "item.value" :value="item.value">{{item.text}}</Option>
            </Select>
        </FormItem>
         <FormItem label="申请人数" prop="creditApplyCount">
            <Input  v-model="formValidate.creditApplyCount" placeholder="输入申请人数"></Input>
        </FormItem>
        <FormItem label="用途" prop="creditPurpose">
            <!-- <Input  v-model="formValidate.creditPurpose" placeholder="输入用途"></Input> -->
            <Select v-model="formValidate.creditPurpose" placeholder="选择用途">
                <Option v-for="item in purpose" :key = "item.id" :value="item.value">{{item.text}}</Option>
            </Select>
        </FormItem>
         <FormItem label="卡组织" prop="creditOrganization">
            <!-- <Input  v-model="formValidate.creditOrganization" placeholder=""></Input> -->
             <Select v-model="formValidate.creditOrganization" placeholder="选择卡组织">
                <Option v-for="item in cardOrganization" :key = "item.id" :value="item.value">{{item.text}}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否热门" prop="creditHotCard">
             <RadioGroup v-model="formValidate.creditHotCard">
              <Radio label="true">是</Radio>
              <Radio label="false">否</Radio>
          </RadioGroup>
          </FormItem>
        <FormItem label="是否有效" prop="deleteStatus">
             <RadioGroup v-model="formValidate.deleteStatus">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        <FormItem label="是否为推荐卡片" prop="creditRecommandCard">
             <RadioGroup v-model="formValidate.creditRecommandCard">
                <Radio label="true">是</Radio>
                <Radio label="false">否</Radio>
            </RadioGroup>
        </FormItem>

         <FormItem label="信用卡级别" prop="creditLevel">
              <Select v-model="formValidate.creditLevel" placeholder="选择信用卡级别">
                <Option v-for="item in creditLevel" :key = "item.id" :value="item.value">{{item.text}}</Option>
            </Select>
        </FormItem>
         <FormItem label="所属银行" prop="creditBank">
            <Input  v-model="formValidate.creditBank" placeholder="输入信用卡所属银行"></Input>
        </FormItem>
          <FormItem label="推荐链接" prop="creditLink">
            <Input  v-model="formValidate.creditLink" placeholder="输入信用卡推荐链接"></Input>
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
import apiCredit from '@/api/credit-api/apiCredit'
// 使用字典
import { typeList } from '@/api/apiCom'

export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      // 上传头像的地址
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'creditImg'
      },
      showImg: false,
      // 字典查询的列表
      cardOrganization: [],
      purpose: [],
      yearMoney: [],
      creditLevel: [],

      // form表单的内容
      formValidate: {
        creditDescription: '',
        creditHotCard: 'true',
        deleteStatus: '1',
        creditRecommandCard: 'true',
        creditImg: '',
        creditName: '',

        creditLevel: 'VIP',
        creditOrganization: 'VISA',
        creditAnnualFee: 'FOREVER_FREE',
        creditPurpose: 'WITHDRAW'
      },
      ruleValidate: {
        creditName: [
          {
            required: true,
            message: '信用卡名不能为空',
            trigger: 'blur'
          }
        ],
        creditDescription: [
          { required: true, message: '信用卡描述不能为空', trigger: 'blur' }
        ],

        creditApplyCount: [
          { required: true, message: '信用卡描述不能为空', trigger: 'blur' }
        ],
        creditBank: [
          { required: true, message: '信用卡所属不能为空', trigger: 'blur' }
        ],
        creditLink: [
          {
            required: true,
            message: '信用卡相关联的链接不能为空',
            trigger: 'blur'
          }
        ]
        // creditPrivileges: [
        //   { required: true, message: "特权", trigger: "blur" }
        // ]
      }
    }
  },
  methods: {
    // 查询所需要的字典
    getDictionarys () {
      var _this = this
      getDatas('creditOrganization', 'cardOrganization')
      getDatas('creditPurpose', 'purpose')
      getDatas('creditAnnualFee', 'yearMoney')
      getDatas('creditLevel', 'creditLevel')
      console.log(this.cardOrganization)
      function getDatas (id, key) {
        return typeList(id).then(res => {
          if (res.status == 0) {
            _this[key] = res.data
            console.log('查询到的值', _this[key])
          }
        })
      }
    },
    // 编辑模式的时候初始化数据
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiCredit.creditIdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.creditHotCard = String(
              this.formValidate.creditHotCard
            )
            this.formValidate.deleteStatus = String(
              this.formValidate.deleteStatus
            )
            this.formValidate.creditRecommandCard = String(
              this.formValidate.creditRecommandCard
            )
            // console.log(typeof this.formValidate.creditHotCard);
            // radio的value值必须为String | Numberf 使用typeof 测试String转码后的类型为string
            if (this.formValidate.creditImg) {
              this.showImg = true
            }
          }
        })
      } else {
        this.formValidate = {
          creditDescription: '',
          creditHotCard: 'true',
          deleteStatus: '1',
          creditRecommandCard: 'true',
          creditImg: '',
          creditName: '',

          creditLevel: 'VIP',
          creditOrganization: 'VISA',
          creditAnnualFee: 'FOREVER_FREE',
          creditPurpose: 'WITHDRAW'
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid && this.formValidate.creditImg) {
          apiCredit.creditSave(this.formValidate).then(res => {
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
        this.formValidate.creditImg = res.data.previewFileName
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
    this.getDictionarys()
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
