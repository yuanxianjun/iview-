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
        <div class="continueBtn" @click="HandleContinue">继续填写</div>
      </div>
    </div>

    <!-- 为您推荐 -->
    <div class="partition">为您推荐</div>
    <div class="cardCon">
      <ul>
        <a v-for="(item,index) in bankList" :key="item.id" :href="item.creditLink">
          <li class="cardLi">
            <!-- <div class="yelloDiv" v-if="index<3">{{index+1}}</div> -->
            <div class="cardImg">
              <img :src="item.creditImg" alt>
            </div>
            <div class="cardRight">
              <p class="cardpOne">{{item.creditName}}</p>
              <p class="cardp">{{item.creditTips[0]}}</p>
              <p class="cardp">{{item.creditTips[1]}}</p>
            </div>
          </li>
        </a>
      </ul>
    </div>
    <!-- 底部的链接按钮 -->
    <!-- <div class="cardFooter">
      <a href="http://localhost:8080/#/speedCard">查看更多选择</a>
    </div>-->
  </div>
</template>

<script>
import ApiApprove from "@/api/apiActive/apiPersonApprove.js";
import { getAppToken } from "@/libs/tools.js";
const _ = require("lodash");
export default {
  name: "speedCard",
  components: {},
  data() {
    return {
      percent: 0,
      bankList: []
    };
  },
  methods: {
    // 继续填写完善信息
    HandleContinue() {
      if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(
          "fillCardApplyInfo",
          {},
          function(responseData) {}
        );
        alert("调用成功了");
      } else {
        alert("没有WebViewJavascriptBridge");
      }
    },

    // 完成进度查询
    getPercent() {
      ApiApprove.percent().then(res => {
        // alert(JSON.stringify(res));
        if (res.status == 0) {
          this.percent = res.data;
        }
      });
    },
    getRcommondList() {
      var cloneData = [];
      ApiApprove.getRecommondList().then(res => {
        if (res.status == 0) {
          cloneData = _.cloneDeep(res.data.rows);

          // 处理cloneData
          for (var item in cloneData) {
            if (
              cloneData[item].creditTips &&
              cloneData[item].creditTips.length > 0
            ) {
              cloneData[item].creditTips = cloneData[item].creditTips.split(
                ","
              );
            } else {
              // console.log(cloneData[item]);
              cloneData[item].creditTips = [];
            }
          }
          // console.log("查看split之后的数组", cloneData.creditTips);
          this.bankList = cloneData;
        }
      });
    },
    connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          "WebViewJavascriptBridgeReady",
          function() {
            callback(WebViewJavascriptBridge);
          },
          false
        );
      }
    }
  },
  mounted() {
    var that = this;
    // 先进行登录
    setTimeout(function() {
      var state = getAppToken(that.getPercent);
    }, 1000);

    // 获取推荐的卡片
    this.getRcommondList();
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
  text-align: center;
  color: #fff;
  line-height: 20px;
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
  margin-left: -24px;
  color: #ccc;
}
.cardRight {
  width: 60%;
  float: left;
  margin-left: 10px;
}
.cardImg {
  width: 30%;
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
  margin-bottom: 5px;
  list-style-type: none;
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
