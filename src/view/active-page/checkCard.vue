<template>
  <!-- 查询办卡进度 -->
  <div class="container">
    <div class="topTitle">
      <p>建议申请资料提交后7个工作日后查询</p>
    </div>
    <div class="bankDiv">
      <ul>
        <li class="bankLi" v-for="item in bankList" :key="item.bankId" @click="goLink(item)">
          <div class="bankLogo">
            <img :src="item.bankImg" alt class="bankImg">
          </div>
          <div class="bankName">{{item.bankName}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { applyProgressBanks } from '@/api/apiActive/apiProgress.js'
export default {
  name: 'templateOne',
  components: {},
  data () {
    return {
      bankList: []
    }
  },
  methods: {
    goLink (params) {
      console.log('查看传输过来的itme', params)
      window.location.href = params.bankQueryProgressLink
    },
    getBank () {
      applyProgressBanks().then(res => {
        if (res.status == 0) {
          if (res.data.length > 0) {
            this.bankList = res.data
          }
        }
      })
    }
  },
  mounted () {
    this.getBank()
  }
}
</script>
<style lang="less">
.bankLi {
  background: #fff;
  width: 50%;
  height: 58px;
  padding: 10px;
  border-bottom: 2px solid rgba(238, 238, 238, 0.79);
  border-right: 2px solid rgba(238, 238, 238, 0.79);
  float: left;
  list-style: none;
}
.bankName {
  float: left;
  line-height: 35px;
  margin-left: 10px;
}
.bankLogo {
  width: 35px;
  height: 35px;
  float: left;
}
.bankLogo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.bankLi {
  width: 50%;
}
// 排列银行
.topTitle {
  width: 100%;
  height: 20px;
  text-align: center;
  background: #efb81457;
  font-size: 6px;
  line-height: 20px;
}
.topTitle p {
  -webkit-transform: scale(0.75);
  letter-spacing: 2px;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  overflow: auto;
  background: #ffffff;
}
</style>
