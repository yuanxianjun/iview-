<template>
  <div>
    <Card>
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100 ">
                     <FormItem label="文章标题" prop="messageTitle">
                        <Input v-model="formValidate.messageTitle" placeholder="请输入文章标题"></Input>
                    </FormItem>
                     <FormItem label="文章类型" prop="messageType">
                          <RadioGroup v-model="formValidate.messageType">
                            <Radio v-for="item in dicTypeList" :key = "item.id" :value="item.value"  :label="item.value">
                              {{item.text}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                     <FormItem label="接收者" prop="receiveUserId">
                        <Select multiple  v-model="formValidate.receiveUserId" style="width:200px" placeholder="请选择文章接收者">
                          <Option v-for="item in adminUsers" :value="item.id" :key="item.id">{{ item.username }}</Option>
                      </Select>
                    </FormItem>
                     <FormItem label="文章内容" prop="messageContent">
                        <Input v-model="formValidate.messageContent" type="textarea" :rows="10" :autosize="{minRows: 10,maxRows: 100}" placeholder="请输入文章内容"></Input>
                    </FormItem>
                     <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">发布通知</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
       </Form>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables' // import { getTableData } from "@/api/data";

import apiMessage from '@/api/apiMessage'
import apiAdmin from '@/api/apiAdmin'
// 查找文章类型
import apiCom from '@/api/apiCom'
export default {
  name: 'inform-manager',
  components: {},
  data () {
    return {
      // 控制新建框的显示和隐藏
      formValidate: {
        messageTitle: '',
        messageType: 'published',
        messageContent: '',
        receiveUserId: []
      },
      ruleValidate: {
        messageTitle: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: 'blur'
          }
        ],
        messageType: [
          {
            required: true,
            message: '文章类型不能为空',
            trigger: 'change'
          }
        ],
        messageContent: [
          {
            required: true,
            message: '文章内容不能为空',
            trigger: 'blur'
          }
        ],
        receiveUserId: [
          {
            type: 'array',
            message: '请输入接收者',
            trigger: 'change'
          }
        ]
      },
      adminUsers: [],
      dicTypeList: []
    }
  },
  methods: {
    // 给select框提供选择的options内容()
    getAdminers () {
      apiAdmin.list().then(res => {
        if (res.status == 0) {
          this.adminUsers = res.data.rows
        }
      })
    },
    // 根据字典列表类型获得字典列表
    getTypeList () {
      apiCom.typeList('postStatus').then(res => {
        if (res.status === 0) {
          this.dicTypeList = res.data
        }
      })
    },
    // 新建通知
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate)

          apiMessage.sendMess(this.formValidate).then(res => {
            if (res.status == 0) {
              this.$Message.success('发布成功!')
              this.formValidate = {}
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.getAdminers()
    this.getTypeList()
    // getTableData().then(res => {
    //   console.log("取得的数据", res);
    //   this.tableData = res.data;
    // });
  }
}
</script>
<style>
.pagenation {
  margin-top: 10px;
}
</style>
