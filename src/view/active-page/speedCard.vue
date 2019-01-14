<template>
  <!-- 极速办卡的页面 -->
  <div class="container">
    <!-- 资料完成度 -->
    <div class="topDiv">
      <div class="topLeft">
        <div class="topTitle">
          <h4>
            资料完成度
            <span>{{percent}}%</span>
          </h4>
        </div>
        <div class="topCon">资料完成度越高越有助于批核卡片</div>
      </div>
      <div class="topRight">
        <div class="continueBtn">继续填写</div>
      </div>
    </div>

    <!-- 为您推荐 -->
    <div class="partition">为您推荐</div>
    <div class="cardCon">
      <ul>
        <li class="cardLi">
          <div class="yelloDiv"></div>
          <div class="cardImg">
            <img src="../../assets/images/login-bg.jpg" alt>
          </div>
          <div class="cardRight">
            <p class="cardpOne">平安爱奇艺金卡</p>
            <p class="cardp">全年爱奇艺VIP会员</p>
            <p class="cardp">秒批下卡额度高</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部的链接按钮 -->
    <div class="cardFooter">
      <a href="http://localhost:8080/#/speedCard">查看更多选择</a>
    </div>
  </div>
</template>

<script>
import { percent } from "@/api/apiActive/apiPersonApprove.js";

export default {
  name: "speedCard",
  components: {},
  data() {
    return {
      percent: 0
    };
  },
  methods: {
    getPercent() {
      percent().then(res => {
        if (res.status == 0) {
          this.percent = res.data;
        }
      });
    }
  },
  mounted() {
    this.getPercent();
  }
};
</script>
<style lang="less">
// 最底部的盒子
.cardFooter {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  front-size: 8px;
  //   -webkit-text-size-adjust: none;
  transform: scale(0.8);
}
// 标签
.yelloDiv {
  background: goldenrod;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 30px;
  top: 0;
}
.cardpOne {
  font-size: 12px;
  font-weight: 500;
  color: #000;
}
.cardp {
  font-size: 10px;
  -webkit-transform: scale(0.75);
  display: block;
  margin-left: -10px;
  color: grey;
}
.cardRight {
  float: left;
  margin-left: 10px;
}
.cardImg {
  width: 34%;
  height: 100%;
  float: left;
}
.cardImg img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.cardLi {
  width: 100%;
  height: 80px;
  padding: 10px;
  background: #fff;
  position: relative;
}
.cardCon {
  width: 100%;
  height: auto;
}
// 每个卡片
.container {
  width: 100%;
  height: 100%;
  background: #9e9e9e1a;
}
.topDiv {
  padding: 10px;
  width: 100%;
  height: 60px;
  background: #fff;
}
.topLeft {
  float: left;
}
.topCon {
  color: grey;
}
.topTitle {
  background: #fff;
  text-align: left;
}
.topTitle h4 {
  color: #000;
  font-size: 15px;
}
.topRight {
  float: right;
}
.continueBtn {
  background: #ff9800;
  color: #fff;
  padding: 5px 8px 5px 8px;
  border-radius: 4px;
}
.partition {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #000;
}
</style>
