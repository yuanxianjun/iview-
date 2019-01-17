<template>
  <div class="container">
    <!-- 顶部按钮栏 -->
    <!-- <div class="header">
      <img class="float backImg" src="@/assets/images/activeImg/backBtn.png" alt>
      <span class="float headerCon">第一张卡办什么</span>
    </div>-->
    <!-- 中间内容栏 -->
    <div class="content" :style="{background:creditDetailList.topicBgColor}">
      <!-- 内容上面展示的图片 -->
      <div class="imgTop">
        <img :src="creditDetailList.topicBg" alt>
      </div>

      <!-- 第一种形式的卡片 -->
      <div class="listOne">
        <ul>
          <li class="listOneLi" v-for="item in this.listRows" :key="item.id">
            <!-- 左上角的标签盒子 -->
            <div class="titleDiv">{{item.detail.creditName}}</div>
            <div class="cardUp">
              <img :src="item.topicItemBg" alt>
            </div>
            <div class="cardDiV">
              <img :src="item.detail.creditImg" alt>
            </div>
            <div class="cardCon">
              <h3 class="conTitle">卡神推荐语</h3>
              <ul>
                <li class="lip">追剧党最爱</li>
                <li class="lip">全年爱奇艺VIP黄金会员</li>
                <li class="lip">网络消费可积分</li>
              </ul>
            </div>
            <a :href="item.detail.creditLink">
              <Button type="error" size="large" class="applyBtn">免费申请</Button>
            </a>
          </li>
        </ul>
      </div>
      <!-- 第二种形式的卡片展示 -->
      <div class="listTwo"></div>
    </div>
  </div>
</template>

<script>
import { itemDetail } from "@/api/apiTopic.js";
const _ = require("lodash");
export default {
  name: "templateOne",
  components: {},
  data() {
    return {
      creditDetailList: [],
      listRows: []
    };
  },
  methods: {
    topicDetail() {
      var id = this.$route.query.topicId;
      if (id)
        itemDetail(id).then(res => {
          if (res.status == 0) {
            this.creditDetailList = res.data;
            this.listRows = res.data.rows;

            var data = _.sortBy(this.listRows, function(o) {
              if (o.detail && o.detail.creditImg !== null) {
                return o.detail.creditImg;
              } else {
                return "";
              }
            });

            this.listRows = data.reverse();
          }
        });
    }
  },
  mounted() {
    this.topicDetail();
  }
};
</script>
<style lang="less">
.lip {
  width: 80%;
  font-size: 12px;
  color: #313031;
  letter-spacing: 1px;
  // line-height: 42px;
}
.backImg {
  width: 23px;
  height: 23px;
  margin-top: 16px;
  margin-left: 10px;
}
.headerCon {
  margin-left: 15px;
  line-height: 55px;
  font-weight: 600;
}
.float {
  float: left;
}
.header {
  width: 100%;
  height: 55px;
  background: #ffffff;
}
.conTitle {
  text-align: left;
}
.cardCon ul {
  width: 100%;
  height: 100%;
  // background: purple;
  // overflow: hidden;
}
.cardCon {
  width: 51%;
  height: auto;
  position: absolute;
  right: 0px;
  top: 47%;
  // background: #000;
}

.cardCon ul li {
  text-align: left;
  list-style-type: disc;
  // margin-left: 16px;
  list-style-position: inside;
}
// 盒子的上半部分
.cardUp {
  width: 100%;
  height: 45%;
  background: skyblue;
  border-radius: 22px 22px 0px 0px;
}
.cardUp img {
  width: 100%;
  height: 100%;
  border-radius: 22px 22px 0px 0px;
}
// 信用卡的大小
.cardDiV {
  width: 117px;
  height: 75px;
  position: absolute;
  left: 15px;
  bottom: 35%;
  border-radius: 5px;
}
.cardDiV img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.titleDiv {
  width: auto;
  height: 30px;
  position: absolute;
  left: -8px;
  top: 20px;
  background: url(../../assets/images/activeImg/titleTips.png) no-repeat center
    center;
  background-size: cover;
  line-height: 35px;
  color: #fff;
  text-align: center;
  padding: 0 10px;
}
.listOneLi {
  width: 90%;
  margin-left: 5%;
  height: 300px;
  background: #ffffff;

  border-radius: 10px;
  position: relative;
  list-style-type: none;
  border-radius: 22px 22px 22px 22px;
  margin-bottom: 20px;
}
.listOne {
  width: 100%;
  height: auto;
  position: absolute;
  top: 38%;
  left: 0;
}
// 按钮的样式
.applyBtn {
  width: 60%;
  height: 40px;
  border-radius: 63px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -30%;
}
.imgTop {
  width: 100%;
  height: 250px;
  background: rebeccapurple;
}
.imgTop img {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: auto;
  position: relative;
  left: 0;
  top: 0;
  // background: #29a2ff;
}
.container {
  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
