<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
         <FormItem label="信用卡图片" prop="loanImg">
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
                style="display: inline-block;width:200px;">
                <div  style="width: 210px;height:70px;line-height: 70px;">
                    <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="showImg" :src="formValidate.loanImg" alt="" style="width:180px;height:70px;">
                </div>
            </Upload>
        </FormItem>
        <FormItem label="信用卡名称" prop="loanName">
            <Input v-model="formValidate.loanName" placeholder="输入信用卡名称"></Input>
        </FormItem>
        <FormItem label="信用卡办卡描述" prop="loanDescription">
          <Input v-model="formValidate.loanDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入信用卡办卡描述"></Input>
        </FormItem>
        <!-- 写入标签 -->
         <FormItem label="信用卡标签" prop="loanTips">
          <div class="tipsBan" >
               <Tag closable @on-close="handleClose(index)" v-for="(item ,index) in formValidate.loanTips" :key="index">{{item}}</Tag>
          </div>
          <Input style = "margin-top:10px;" v-model="inputIip" placeholder="输入标签使用enter键作为隔断" @on-enter="enterTips"></Input>
        </FormItem>
        <!-- 下拉 -->
          <FormItem label="最高借贷金额" prop="loanMaxLimit">
            <Input  v-model="formValidate.loanMaxLimit"  placeholder="输入最高借贷金额" style="width:120px;"></Input>  万

            <!-- <Select v-model="formValidate.loanAnnualFee" placeholder="选择信用卡年费">
                <Option v-for="item in yearMoney" :key = "item.value" :value="item.value">{{item.text}}</Option>
            </Select> -->
        </FormItem>
         <FormItem label="申请人数" prop="loanApplyCount">
             <Input  v-model="formValidate.loanApplyCount"  placeholder="输入申请人数" style="width:120px;"></Input>  人
        </FormItem>
        <FormItem label="用途" prop="loanPurpose">
            <!-- <Input  v-model="formValidate.loanPurpose" placeholder="输入用途"></Input> -->
            <Select v-model="formValidate.loanPurpose" placeholder="选择用途">
                <Option v-for="item in purpose" :key = "item.id" :value="item.value">{{item.text}}</Option>
            </Select>
        </FormItem>
         <FormItem label="信用卡等级" prop="loanLevel">

             <Select v-model="formValidate.loanLevel" placeholder="选择信用卡等级">
                <Option v-for="item in loanLevel" :key = "item.id" :value="item.value">{{item.text}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否热门" prop="loanHot">
             <RadioGroup v-model="formValidate.loanHot">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
          </RadioGroup>
          </FormItem>

        <FormItem label="是否有效" prop="deleteStatus">
             <RadioGroup v-model="formValidate.deleteStatus">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        <FormItem label="是否为推荐卡片" prop="loanRecommandCard">
             <RadioGroup v-model="formValidate.loanRecommandCard">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
          <FormItem label="是否为审批时间最短的卡" prop="loanShortApprovalTime">
             <RadioGroup v-model="formValidate.loanShortApprovalTime">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="最快放贷时间" prop="loanTimeLimit">
                <Input  v-model="formValidate.loanTimeLimit" style="width:110px" placeholder="最快放贷时间"></Input> 分钟
        </FormItem>
        </FormItem>
          <FormItem label="推荐链接" prop="loanLink">
            <Input  v-model="formValidate.loanLink"  placeholder="输入信用卡推荐链接"></Input>
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
import apiLoan from '@/api/credit-api/apiLoans'
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
        fileType: 'loanImg'
      },
      showImg: false,
      // 字典查询的列表
      purpose: [],
      loanLevel: [],
      // 输入标签的input框
      inputIip: '',
      // form表单的内容
      formValidate: {
        loanDescription: '',
        loanHot: '1',
        deleteStatus: '1',
        loanRecommandCard: 'true',
        // 审计时间最短
        loanShortApprovalTime: '1',
        loanImg: '',
        loanName: '',
        loanLevel: 'VIP',
        loanPurpose: 'WITHDRAW'
      },
      ruleValidate: {
        loanName: [
          {
            required: true,
            message: '信用卡名不能为空',
            trigger: 'blur'
          }
        ],
        loanDescription: [
          { required: true, message: '信用卡描述不能为空', trigger: 'blur' }
        ],

        loanApplyCount: [
          {
            required: true,
            message: '请输入数字申请人数',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '请输入数字格式',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ],
        loanMaxLimit: [
          {
            required: true,
            message: '最高借贷额度不能为空 ',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '请输入数字格式',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ],
        loanLink: [
          {
            required: true,
            message: '信用卡相关联的链接不能为空',
            trigger: 'blur'
          },
          { type: 'url', message: '输入正确的链接', trigger: 'blur' }
        ]
        // loanPrivileges: [
        //   { required: true, message: "特权", trigger: "blur" }
        // ]
      }
    }
  },
  methods: {
    // 当输入完毕按下enter键的时候，将input框中的内容，添加到input为textarea中形成标签，inputarea中的一个个标签是一数组的形式存储的
    enterTips (value) {
      console.log('查看输入框中的内容', this.inputIip.length)
      var regu = '^[ ]+$'
      var re = new RegExp(regu)
      var result = re.test(this.inputIip)
      console.log(result)
      if (this.inputIip && !result) {
        this.formValidate.loanTips.push(this.inputIip)
      } else {
        this.$Message.error('请输入内容')
      }
      this.inputIip = ''
    },
    // 关闭一个标签
    handleClose (index) {
      this.formValidate.loanTips.splice(index, 1)
      console.log(this.formValidate.loanTips)
    },
    // 查询所需要的字典
    getDictionarys () {
      var _this = this
      getDatas('creditPurpose', 'purpose')
      getDatas('creditLevel', 'loanLevel')
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
        apiLoan.loanIdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.loanHotCard = String(
              this.formValidate.loanHotCard
            )
            this.formValidate.deleteStatus = String(
              this.formValidate.deleteStatus
            )
            this.formValidate.loanRecommandCard = String(
              this.formValidate.loanRecommandCard
            )
            this.formValidate.loanTips = this.formValidate.loanTips.split(',')
            // console.log(typeof this.formValidate.loanHotCard);
            // radio的value值必须为String | Numberf 使用typeof 测试String转码后的类型为string
            if (this.formValidate.loanImg) {
              this.showImg = true
            }
          }
        })
      } else {
        this.formValidate = {
          loanDescription: '',
          loanHot: '1',
          deleteStatus: '1',
          loanRecommandCard: 'true',
          loanShortApprovalTime: '1',
          loanImg: '',
          loanName: '',

          loanLevel: 'VIP',
          loanOrganization: 'VISA',
          loanAnnualFee: 'FOREVER_FREE',
          loanPurpose: 'WITHDRAW',
          loanTips: []
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        var inputValue = this.formValidate.loanTips.join(',')
        var commalength = (inputValue.match(/,g/) || []).legnth
        var inputValuelength = inputValue.length - commalength
        console.log('实际字数', inputValuelength)
        if (valid && this.formValidate.loanImg) {
          if (inputValue.length >= 40) {
            this.$Message.error('标签总字数不能超过40个字')
            return
          } else {
            this.formValidate.loanTips = inputValue
          }
          apiLoan.loanSave(this.formValidate).then(res => {
            if (res.status == 0) {
              this.$Message.success('添加成功')
              this.$emit('close-win')
            }
          })
        } else {
          this.$Message.error('请将信用卡图片等信息填写完整')
        }
      })
    },
    // 上传文件
    handleSuccess (res, file) {
      if (this.isDisabled) {
        this.$Message.success('头像编辑禁用')
      } else {
        console.log('文件上传成功', res, file)
        this.formValidate.loanImg = res.data.previewFileName
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
    console.log(this.purpose)
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
