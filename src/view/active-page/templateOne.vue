<template>
  <div class="container">
    <!-- 顶部按钮栏 -->
    <!-- <div class="header">
      <img class="float backImg" src="@/assets/images/activeImg/backBtn.png" alt>
      <span class="float headerCon">第一张卡办什么</span>
    </div>-->
    <!-- 中间内容栏 -->
    <div class="content">
      <!-- 内容上面展示的图片 -->
      <div class="imgTop">
        <img src="@/assets/images/activeImg/big1.jpg" alt>
      </div>

      <!-- 第一种形式的卡片 -->
      <div class="listOne">
        <ul>
          <li class="listOneLi">
            <!-- 左上角的标签盒子 -->
            <div class="titleDiv">平安爱奇艺金卡</div>
            <div class="cardUp">
              <img src="@/assets/images/activeImg/small1.png" alt>
            </div>
            <div class="cardDiV">
              <img src="@/assets/images/activeImg/card.jpg" alt>
            </div>
            <div class="cardCon">
              <h3 class="conTitle">卡神推荐员</h3>

              <ul>
                <li class="lip">追剧党最爱</li>
                <li class="lip">全年爱奇艺VIP黄金会员</li>
                <li class="lip">网络消费可积分</li>
              </ul>
            </div>
            <Button type="error" size="large" class="applyBtn">免费申请</Button>
          </li>

          <li class="listOneLi">
            <!-- 左上角的标签盒子 -->
            <div class="titleDiv">平安爱奇艺金卡</div>
            <div class="cardUp">
              <img src="@/assets/images/activeImg/small1.png" alt>
            </div>
            <div class="cardDiV">
              <img src="@/assets/images/activeImg/card.jpg" alt>
            </div>
            <div class="cardCon">
              <h3 class="conTitle">卡神推荐员</h3>

              <ul>
                <li class="lip">追剧党最爱</li>
                <li class="lip">全年爱奇艺VIP黄金会员</li>
                <li class="lip">网络消费可积分</li>
              </ul>
            </div>
            <Button type="error" size="large" class="applyBtn">免费申请</Button>
          </li>
        </ul>
      </div>
      <!-- 第二种形式的卡片展示 -->
      <div class="listTwo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'templateOne',
  components: {},
  data () {
    return {}
  }
}
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
  right: 5px;
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
  left: 9px;
  bottom: 38%;
  border-radius: 5px;
}
.cardDiV img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.titleDiv {
  width: 100px;
  height: 30px;
  position: absolute;
  left: -5px;
  top: 20px;
  background: url(../../assets/images/activeImg/titleTips.png) no-repeat center
    center;
  background-size: contain;
  line-height: 35px;
  color: #fff;
  text-align: center;
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
  min-height: 90%;
  overflow: auto;
  position: relative;
  left: 0;
  top: 0;
  background: #29a2ff;
}
.container {
  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
