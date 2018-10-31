<template>
  <div>
    <Card>
      <Row>
          <Col span="6">证件用户名
:</Col>
          <Col span="12">{{approveData.certificationCertUsername}}</Col>
      </Row>
       <Row>
          <Col span="6">出生日期
:</Col>
          <Col span="12">{{approveData.certificationBrithday}}</Col>
      </Row>
       <Row>
          <Col span="6">性别
:</Col>
          <Col span="12">
          单选框{{approveData.certificationGender}}</Col>
      </Row>
       <Row>
          <Col span="6">证件号码
:</Col>
          <Col span="12">{{approveData.certificationCertNumber}}</Col>
      </Row>
       <Row>
          <Col span="6">证件号码
:</Col>
          <Col span="12">{{approveData.certificationCertNumber}}</Col>
      </Row>
       <Row>
          <Col span="6">婚姻状况 字典表（marital)

:</Col>
          <Col span="12">{{approveData.certificationMaritalStatus}}</Col>
      </Row>
       <Row>
          <Col span="6">最高学历（字典表education）

:</Col>
          <Col span="12">{{approveData.certificationHighestEducation}}</Col>
      </Row>
      <Row>
          <Col span="6">联系人1电话

:</Col>
          <Col span="12">{{approveData.certificationContactsPhone1}}</Col>
      </Row>
      <Row>
          <Col span="6">联系人2电话

:</Col>
          <Col span="12">{{approveData.certificationContactsPhone2}}</Col>
      </Row>
       <Row>
          <Col span="6">联系人1姓名
:</Col>
          <Col span="12">{{approveData.certificationContactsUsername1}}</Col>
          </Row>
          <Row>
          <Col span="6">联系人2姓名
:</Col>
          <Col span="12">{{approveData.certificationContactsUsername2}}</Col>
      </Row>
      <Row>
          <Col span="6">联系人1关系
:</Col>
          <Col span="12">{{approveData.certificationContactsRelationship1}}</Col>
      </Row>
      <Row>
          <Col span="6">联系人2关系
:</Col>
          <Col span="12">{{approveData.certificationContactsRelationship2}}</Col>
      </Row>
       <Row>
          <Col span="6">用户ID
:</Col>
          <Col span="12">{{approveData.certificationUserId}}</Col>
      </Row> <Row>
          <Col span="6">公司名称
:</Col>
          <Col span="12">{{approveData.certificationCompanyName}}</Col>
      </Row> <Row>
          <Col span="6">公司地址
:</Col>
          <Col span="12">{{approveData.certificationCompanyAddress}}</Col>
      </Row> <Row>
          <Col span="6">单位地区编码
:</Col>
          <Col span="12">{{approveData.certificationCompanyAreaId}}</Col>
      </Row>
             <Row>
          <Col span="6">居住状态（字典表）
:</Col>
          <Col span="12">{{approveData.certificationLivingStatus}}</Col>
      </Row>
       <Row>
          <Col span="6">家庭住址
:</Col>
          <Col span="12">{{approveData.certificationHomeAddress}}</Col>
      </Row>
      <Row>
          <Col span="6">家庭住址区域ID
:</Col>
          <Col span="12">{{approveData.certificationHomeAreaId}}</Col>
      </Row> <Row>
          <Col span="6">所在部门名称
:</Col>
          <Col span="12">{{approveData.certificationDepartmentName}}</Col>
      </Row> <Row>
          <Col span="6">职位名称
:</Col>
          <Col span="12">{{approveData.certificationPositionName}}</Col>
      </Row> <Row>
          <Col span="6">开始工作年份
:</Col>
          <Col span="12">{{approveData.certificationStartWorkDate}}年</Col>
      </Row>
      <Row>
          <Col span="6">身份证正面
:</Col>
          <Col span="12">
          <img class="certificationImg" :src="approveData.certificationCertFrontImgUrl" alt="">
          </Col>
      </Row><Row>
          <Col span="6">身份证反面
:</Col>
          <Col span="12">
          <img class="certificationImg" :src="approveData.certificationCertBackImgUrl" alt="">
          </Col>
      </Row><Row>
          <Col span="6">认证邮箱状态
:</Col>
          <Col span="12">{{approveData.certificationEmailStatus}}</Col>
      </Row><Row>
          <Col span="6">认证手机通讯录状态
:</Col>
          <Col span="12">{{approveData.certificationPhoneBookAddressState}}</Col>
      </Row><Row>
          <Col span="6">手机认证状态
:</Col>
          <Col span="12">{{approveData.certificationPhoneStatus}}</Col>
      </Row><Row>
          <Col span="6">认证QQ状态

:</Col>
          <Col span="12">{{approveData.certificationQqStatus}}</Col>
      </Row><Row>
          <Col span="6">认证微信状态

:</Col>
          <Col span="12">{{approveData.certificationWeixinStatus}}</Col>
      </Row>

    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'

import { approveIdGet } from '@/api/credit-api/apiApprove.js'
import creditForm from './credit-form.vue'
export default {
  name: 'credit-managers',
  components: {
    Tables,
    creditForm
  },
  data () {
    return {
      // 登录者的id
      loginId: '',
      approveData: [],
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },
  methods: {
    // 获取登录者的id信息
    getId () {
      this.loginId = JSON.parse(localStorage.getItem('loginObj')).id
      // console.log(this.loginId);
    },
    // 通过当前的id获取认证信息
    getMess () {
      approveIdGet(this.loginId).then(res => {
        if (res.status === 0) {
          this.approveData = res.data
        }
      })
    }
  },
  mounted () {
    this.getId()
    this.getMess()
  }
}
</script>
<style>
.ivu-row {
  line-height: 60px;
  margin-bottom: 10px;
  border-bottom: 1px dashed #808696bd;
}
.certificationImg {
  width: 200px;
  height: 40px;
}
</style>
