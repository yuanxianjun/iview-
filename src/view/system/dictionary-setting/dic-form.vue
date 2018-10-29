<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
        <!-- type相关 -->
        <div v-if="ortype=='type'">
          <FormItem  label="字典类型名称" prop="text" >
            <Input v-model="formValidate.text" placeholder="请输入字典类型名称"></Input>
         </FormItem>
          <FormItem label="状态" prop="staus">
             <RadioGroup v-model="formValidate.status">
                <Radio :label=1 :key=1>有效</Radio>
                <Radio :label=2 :key=2>禁用</Radio>
            </RadioGroup>
         </FormItem>
          <FormItem label="code" prop="code">
           <Input  v-model="formValidate.code" placeholder="code码应该为纯字母"></Input>
         </FormItem>
        </div>
         <!-- item相关 -->
        <div v-if="ortype == 'item'">
          <FormItem  label="排序权值" prop="sort" >
           <InputNumber  v-model="formValidate.sort" placeholder="请输入序号为纯数字" ></InputNumber>
         </FormItem>
          <FormItem  label="item名称" prop="text" >
            <Input  v-model="formValidate.text" placeholder="请输入item名称内容"></Input>
         </FormItem>
          <FormItem label="类型" prop="typeId">
            <Select  v-model="formValidate.typeId" placeholder="请选择所选择的类型">
                <Option v-for="item in types" :value="item.code" :key="item.code">{{item.text}}</Option>
            </Select>
         </FormItem>
          <FormItem label="值" prop="value">
           <Input  v-model="formValidate.value" placeholder="请输入级别名称VIP\SVIP "></Input>
         </FormItem>
        </div>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">{{formData?"修改":"保存"}}</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin'

import apiUpload from '@/api/apiUpload'

import apiDic from '@/api/apiDic'
export default {
  name: 'new-list',
  components: {},
  props: ['formData', 'ortype', 'CODE'],
  data () {
    // 自定义验证输入的全是英文
    const validateStrCheck = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('code码不能为空'))
      } else if (/[^\x00-\xff]/g.test(value)) {
        callback(new Error('请输入纯字母'))
      } else {
        callback()
      }
    }
    return {
      isDisabled: false,
      types: [],
      formValidate: {
        id: '',
        text: '',
        status: 1,
        code: '',
        // 以下是item相关的
        sort: 1,
        typeId: '',
        value: ''
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: 'id不能为空',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }
        ],
        code: [{ validator: validateStrCheck, trigger: 'blur' }],
        // 以下是item相关
        // typeId: [
        //   {
        //     required: true,
        //     message: "类型不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // sort: [
        //   // {
        //   //   required: true,
        //   //   type: "number",
        //   //   message: "sort不能为空",
        //   //   trigger: "blur"
        //   // },
        //   {
        //     // required: true,
        //     // type: "number",
        //     // message: "权值必须大于1",
        //     // trigger: "change"
        //     // transform(value) {
        //     //   return Number(value);
        //     // }
        //   }
        // ],
        value: [
          {
            required: true,
            message: '级别不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查询信息
    getType () {
      console.log(this.CODE)

      apiDic.typeList(1, 10, 'code', this.CODE).then(res => {
        if (res.status == 0) {
          console.log('查看是否获取到了type信息', res)
          this.formValidate.typeId = this.CODE
          this.types = res.data.rows
        }
      })
    },
    // 如果有id传入进来进入编辑模式
    checkData () {
      console.log(this.formData)
      if (
        this.formData !== '' &&
        this.formData !== null &&
        this.formData !== {}
      ) {
        var id = this.formData
        // this.ruleValidate.password[0].required = false;
        if (this.ortype == 'type' && id) {
          apiDic.dicIdFind(id).then(res => {
            if (res.status == 0) {
              this.formValidate = res.data
            }
          })
        } else if (this.ortype == 'item' && id) {
          apiDic.dicItemIdFind(id).then(res => {
            if (res.status == 0) {
              this.formValidate = res.data
            }
          })
        }
      } else {
        this.formValidate = {
          id: '',
          text: '',
          status: 1,
          code: '',
          value: ''
        }
      }
    },
    // 提交表单信息
    handleSubmit (name) {
      var _this = this
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.ortype == 'type') {
            save('dicTypeAdd')
          } else {
            save('dicItemIdSave')
          }

          function save (method) {
            console.log(apiDic)
            apiDic[method](_this.formValidate).then(res => {
              if (res.status == 0) {
                _this.$Message.success('保存成功')
                _this.$emit('close-win')
              }
            })
          }
        } else {
          this.$Message.error('信息没有填写完整！')
        }
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.checkData()
    this.getType()
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
