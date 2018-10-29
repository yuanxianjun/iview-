<template>
  <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
        </FormItem> -->
        <FormItem label="角色名" prop="roleName">
            <Input v-model="formValidate.roleName" placeholder="输入角色名"></Input>
         </FormItem>
        <FormItem label="角色权限" prop="permissions">
           <Select multiple style="width:260px" v-model="formValidate.permissions" >
              <Option v-for="item in permissions" :value="item.id" :key="item.id">{{item.permissionName}}</Option>
          </Select>
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
import apiRole from '@/api/apiRole'

import permissionList from '@/api/apiPermission'
export default {
  name: 'new-list',
  components: {},
  props: ['formData'],
  data () {
    return {
      permissions: [],
      formValidate: {
        id: '',
        roleName: '',
        permissions: []
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: 'id不能为空',
            trigger: 'blur'
          }
        ],
        roleName: [
          {
            required: true,
            message: '角色名不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查询权限信息
    getPermission () {
      // console.log("查看是否获取到了permission", permissionList);
      permissionList.list().then(res => {
        if (res.status == 0) {
          this.permissions = res.data.rows
        }
      })
    },
    checkData () {
      if (this.formData) {
        var id = this.formData
        apiRole.roleIdSearch(id).then(res => {
          console.log(res)
          if (res.status == 0) {
            this.formValidate.id = res.data.id
            this.formValidate.roleName = res.data.roleName
            res.data.permissions.forEach(res => {
              this.formValidate.permissions.push(res.id)
            })
            console.log('查看permissions', this.formValidate.permissions)
          }
        })
      } else {
        this.formValidate = {}
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 新增的角色设置填写成功，向后天提交，就是把 this.formValidate 通过接口发送给后台使用post的方式看后天返回什么内容如果后台审核并且存储成功就
          // 模态框就可以消失
          // 表格更新一下数据把新增的内容展示出来
          // let form = {
          // id: this.formValidate.id,
          //   roleName: this.formValidate.roleName
          // };
          var _this = this
          // 还是用formValidate
          apiRole.roleSubmit(this.formValidate).then(res => {
            if (res.status == 0) {
              var data = {
                permissionIds: this.formValidate.permissions,
                roleId: res.data.id
              }
              apiRole.permissionSave(data).then(res => {
                if (res.status == 0) {
                  _this.$Message.success(res.message)
                  _this.$emit('close-win')
                }
              })
            }
          })
          // 保存权限
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
    this.getPermission()
  }
}
</script>
<style>
</style>
