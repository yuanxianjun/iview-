<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
         <FormItem label="banner图片" prop="bannerImg">
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
                style="display: inline-block;">
                <div  style="height:58px;line-height: 58px;">
                    <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="showImg" :src="formValidate.bannerImg" alt="" style="width:200px;height:60px;">
                </div>
            </Upload>
        </FormItem>
        <FormItem label="banner标题" prop="bannerTitle">
            <Input v-model="formValidate.bannerTitle" placeholder="输入banner标题"></Input>
        </FormItem>
             <FormItem label="banner位置" prop="bannerPosition">
            <Input v-model="formValidate.bannerPosition" placeholder="输入banner位置"></Input>
        </FormItem>
         <FormItem label="开始展示时间" prop="bannerStartTime">
            <DatePicker type="date"  v-model="formValidate.bannerStartTime" placeholder="选择开始展示时间" style="width: 200px"></DatePicker>
        </FormItem>
         <FormItem label="结束展示时间" prop="bannerEndTime">
            <DatePicker type="date" v-model="formValidate.bannerEndTime" placeholder="选择结束展示时间" style="width: 200px"></DatePicker>
        </FormItem>
         <FormItem label="是否可用" prop="bannerStatus">
             <RadioGroup v-model="formValidate.bannerStatus">
                <Radio label="1">可用</Radio>
                <Radio label="0">不可用</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="是否可用" prop="deleteStatus">
             <RadioGroup v-model="formValidate.deleteStatus">
                <Radio label="1">有效</Radio>
                <Radio label="2">无效</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="banner类型" prop="bannerType">
            <Input v-model="formValidate.bannerType" placeholder="选择banner类型"></Input>
        </FormItem>
        <FormItem label="banner排序字段" prop="bannerSortNumber">
          <Input v-model="formValidate.bannerSortNumber" placeholder="输入banner排序字段"></Input>
        </FormItem>
          <FormItem label="落地页链接" prop="bannerLink">
            <Input  v-model="formValidate.bannerLink" placeholder="输入banner落地页链接"></Input>
        </FormItem>
         </FormItem>
          <FormItem label="banner小提示" prop="bannerTips">
            <Input  v-model="formValidate.bannerTips" placeholder="输入banner小提示"></Input>
        </FormItem>
         </FormItem>
          <FormItem label="配置点击上报地址" prop="bannerTrackClickUrl">
             <Input  v-model="formValidate.bannerTrackClickUrl" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="输入配置点击上报地址"></Input>
        </FormItem>
         </FormItem>
          <FormItem label="配置曝光上报地址" prop="bannerTrackExposeUrl">
            <Input  v-model="formValidate.bannerTrackExposeUrl" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="输入配置曝光上报地址"></Input>
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
import apiBanner from '@/api/credit-api/apiBanner'
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
        fileType: 'bannerImg'
      },
      showImg: false,
      // 字典查询的列表
      cardOrganization: [],
      purpose: [],
      yearMoney: [],
      bannerLevel: [],
      // form表单的内容
      formValidate: {},
      ruleValidate: {
        bannerTitle: [
          {
            required: true,

            message: 'banner标题不能为空',
            trigger: 'blur'
          }
        ],
        bannerStartTime: [
          {
            required: true,
            type: 'date',
            message: 'banner开始时间不能为空',
            trigger: 'change'
          }
        ],
        bannerEndTime: [
          {
            required: true,
            type: 'date',
            message: 'banner结束时间不能为空',
            trigger: 'change'
          }
        ],
        bannerLink: [
          {
            required: true,
            message: 'banner链接不能为空',
            trigger: 'blur'
          }
        ],
        bannerPosition: [
          {
            required: true,
            message: 'banner位置不能为空',
            trigger: 'blur'
          }
        ],
        bannerSortNumber: [
          {
            required: true,
            message: 'banner排序字段不能为空',
            trigger: 'blur'
          }
        ],
        bannerType: [
          {
            required: true,
            message: 'banner类型不能为空',
            trigger: 'blur'
          }
        ],
        createUser: [
          {
            required: true,
            message: 'banner创建者不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查询所需要的字典
    getDictionarys () {
      var _this = this
      getDatas('bannerOrganization', 'cardOrganization')
      getDatas('bannerPurpose', 'purpose')
      getDatas('bannerAnnualFee', 'yearMoney')
      getDatas('bannerLevel', 'bannerLevel')
      // console.log(this.cardOrganization);
      function getDatas (id, key) {
        return typeList(id).then(res => {
          if (res.status == 0) {
            _this[key] = res.data
            // console.log("查询到的值", _this[key]);
          }
        })
      }
    },
    // 编辑模式的时候初始化数据
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiBanner.bannerIdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data
            this.formValidate.bannerStatus = String(
              this.formValidate.bannerStatus
            )
            this.formValidate.deleteStatus = String(
              this.formValidate.deleteStatus
            )
            this.formValidate.bannerType = String(this.formValidate.bannerType)
            this.formValidate.bannerSortNumber = String(
              this.formValidate.bannerSortNumber
            )
            // console.log(typeof this.formValidate.bannerHotCard);
            // radio的value值必须为String | Numberf 使用typeof 测试String转码后的类型为string
            if (this.formValidate.bannerImg) {
              this.showImg = true
            }
          }
        })
      } else {
        this.formValidate = {
          bannerStatus: '1',
          deleteStatus: '1'
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid && this.formValidate.bannerImg) {
          // 去除空格，制表符并且将
          function detailStr (str) {
            // 将所有的空格转化成换行
            var strBr = ''
            strBr = str.replace(/\s/g, '<br>')
            strBr = strBr.replace(/,/g, '<br>')
            strBr = strBr.replace(/\n/g, '<br>')
            var strArr = strBr.split('<br>')
            strArr = strArr.filter(function (item) {
              return item !== ''
            })
            return strArr.join(',')
          }
          detailStr(this.formValidate.bannerTrackClickUrl)
          this.formValidate.bannerTrackExposeUrl = detailStr(
            this.formValidate.bannerTrackExposeUrl
          )
          this.formValidate.bannerTrackClickUrl = detailStr(
            this.formValidate.bannerTrackClickUrl
          )
          // 向数据库提交数据
          apiBanner.bannerSave(this.formValidate).then(res => {
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
        this.formValidate.bannerImg = res.data.previewFileName
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
    // 查找字典
    // this.getDictionarys();
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
