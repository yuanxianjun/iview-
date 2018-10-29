<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
        <FormItem label="权限码" prop="permissionCode">
            <Input v-model="formValidate.permissionCode" placeholder="输入权限码"></Input>
        </FormItem>
        <FormItem label="权限名" prop="permissionName">
            <Input v-model="formValidate.permissionName" placeholder="输入权限名"></Input>
        </FormItem>
        <FormItem label="匹配串" prop="permissionPattern">
            <Input v-model="formValidate.permissionPattern" placeholder="输入匹配串"></Input>
        </FormItem>
         <FormItem label="权限类型" prop="permissionType">
            <RadioGroup v-model="formValidate.permissionType">
              <Radio label="api">接口权限</Radio>
              <Radio label="menu">菜单权限</Radio>
          </RadioGroup>
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
import { permissionSubmit } from '@/api/apiPermission'
import { list } from '@/api/apiPermission'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      formValidate: {
        id: '',
        permissionCode: '',
        permissionName: '',
        permissionPattern: '',
        permissionType: ''
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: 'id不能为空',
            trigger: 'blur'
          }
        ],
        permissionCode: [
          {
            required: true,
            message: '权限码不能为空',
            trigeger: 'blur'
          }
        ],
        permissionName: [
          {
            required: true,
            message: '权限名不能为空',
            trigger: 'blur'
          }
        ],
        permissionType: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    checkData () {
      if (this.formData) {
        var id = this.formData
        list('', '', 'id', id).then(res => {
          console.log(res)
          if (res.status == 0) {
            this.formValidate = res.data.rows[0]

            console.log('查看接受到值', this.formData, this.formValidate)
          }
        })
      } else {
        this.formValidate = {}
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 新增的权限设置填写成功，向后天提交，就是把 this.formValidate 通过接口发送给后台使用post的方式看后天返回什么内容如果后台审核并且存储成功就
          // 模态框就可以消失
          // 表格更新一下数据把新增的内容展示出来
          permissionSubmit(this.formValidate).then(res => {
            if (res.status == 0) {
              this.$Message.success(res.message)
              this.$emit('close-win')
            }
          })
        } else {
          this.$Message.error('信息没有填写完整！')
        }
      })
    },
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
</style>
