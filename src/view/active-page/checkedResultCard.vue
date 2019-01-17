<template>
  <!-- 帮您选卡的界面 -->
  <div class="container2">
    <div class="header" v-if="cloneData.length <= 0">
      <h2 class="bigheader">暂时没有推荐的卡片</h2>
    </div>
    <div v-if="cloneData.length>0">
      <div class="header">
        <h2 class="bigheader">按你需求，为你推荐</h2>
        <div class="headerDiv">
          <p class="headaerTitle">推荐理由</p>
          <div class="tips2">
            <span class="tipSpan">购物优惠</span>
            <span class="tipSpan">大额取现</span>
          </div>
        </div>
      </div>
      <div class="conten2">
        <Carousel v-model="value1" :height="340" :radius-dot="true" trigger="hover">
          <CarouselItem v-for="item in cloneData" :key="item.id">
            <div class="demo-carouse demo-carouse1">
              <div class="cardDiv">
                <img :src="item.creditImg" alt>
              </div>
              <div class="sundry">
                <div class="cardName">{{item.creditName}}</div>
                <div class="tips2">
                  <div class="one2 bgOne">{{item.creditLevel}}</div>
                  <div class="one2">{{item.creditAnnualFee}}</div>
                  <div class="one2 currenyStyle">
                    <span v-for="item in item.creditCurrency">{{item}}</span>
                  </div>
                </div>

                <div class="hint">
                  <p>{{item.creditTips[0]}}</p>
                  <p>{{item.creditTips[1]}}</p>
                </div>
              </div>
              <div class="btn2Divs">
                <a class="btn2" :href="item.creditLink">
                  <span class="btn2">立即申请</span>
                </a>
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { chooseCard } from "@/api/apiActive/apiAppChoose.js";
// 使用字典
import { typeList } from "@/api/apiCom";
const _ = require("lodash");
export default {
  name: "templateOne",
  props: ["data"],
  compone2nts: {},
  data() {
    return {
      value1: 0,
      cardType: {},
      yearMoney: {},
      curreny: {},
      cloneData: []
    };
  },
  methods: {
    getAllDiction(callback) {
      var that = this;
      typeList("creditLevel").then(res => {
        if (res.status == 0) {
          this.cardType = _.keyBy(res.data, i => i.value);
        }
        typeList("creditAnnualFee").then(res => {
          if (res.status == 0) {
            this.yearMoney = _.keyBy(res.data, i => i.value);
            typeList("creditCurrency").then(res => {
              if (res.status == 0) {
                this.curreny = _.keyBy(res.data, i => i.value);
              }
              if (callback !== null) {
                callback();
              }
            });
          }
        });
      });
    }
  },
  watch: {
    // activeLi1: function(item) {
    //   console.log("activeLi1已经被改变了", item);
    //   this.activeLi1 = item;
    // }
  },
  mounted() {
    this.getAllDiction(() => {
      this.cloneData = _.cloneDeep(this.data);

      //console.log(this.cardType);
      // // 处理数组
      this.cloneData = this.cloneData.map(item => {
        if (item.creditLevel) {
          item.creditLevel = this.cardType[item.creditLevel].text;
        }

        if (item.creditAnnualFee) {
          item.creditAnnualFee = this.yearMoney[item.creditAnnualFee].text;
        }

        if (item.creditCurrency) {
          var arr = item.creditCurrency.split(",");
          item.creditCurrency = arr.map((i, index) => {
            if (index > 0) {
              return "，" + this.curreny[i].text;
            }
            return this.curreny[i].text;
          });
        }

        if (item.creditTips) {
          item.creditTips = item.creditTips.split(",");
        }
        return item;
      });
    });
  }
};
</script>
<style lang="less">
// 更改了原本的样式
.ivu-carousel-arrow.left {
  left: 5px;
}
.ivu-carousel-arrow.right {
  right: 5px;
}
.ivu-carousel-dots li button.radius {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.ivu-carousel-dots li button {
  background: #eae6d7;
}
.ivu-carousel-dots li.ivu-carousel-active > button.radius {
  width: 8px;
  height: 8px;
}
.currenyStyle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.currenyStyle span {
}
.bgOne {
  background: linear-gradient(left, rgb(57, 164, 251), rgb(98, 82, 248));
  color: #fff !important;
}
.hint {
  font-size: 10px;
  letter-spacing: 0.5px;
  color: rgb(80, 80, 80);
}
.btn2 {
  color: #fff;
  font-size: 15px;
}
.btn2Divs {
  width: 80%;
  height: 40px;
  background: linear-gradient(left, rgb(55, 166, 255), rgb(104, 89, 240));
  border-radius: 30px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 20px;
}
.sundry {
  width: 70%;
  height: auto;
  margin: 0 auto;
}
.cardName {
  text-align: center;
  letter-spacing: 1px;
  color: #000;
}
.cardDiv {
  width: 70%;
  height: 128px;
  margin: 0 auto;
  margin-top: 20px;
}
.cardDiv img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.demo-carouse {
  color: #000;
}
.one2 {
  color: rgb(137, 124, 202);
  padding: 0px 5px;
  border: 1px solid rgb(127, 110, 206);
  margin-left: 3px;
  border-radius: 3px;
}
.tips2 {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  // padding: 7px;
  font-size: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
}
.tipSpan {
  padding: 4px 10px;
  background: rgba(202, 202, 202, 0.5);
  border-radius: 15px;
  margin-right: 10px;
}
.headaerTitle {
  letter-spacing: 2px;
  width: 100%;
  height: 30px;
  //   line-height: 60px;
}
.headerDiv {
  width: 100%;
  height: 128px;
  padding: 20px;
}
.container2 {
  width: 100%;
  height: 100%;
  background: linear-gradient(top, rgb(105, 90, 245), rgb(57, 163, 254));
  color: #fff;
}
.conten2 {
  width: 80%;
  height: 310px;
  background: #fff;
  margin: 0 auto;
  border-radius: 10px;
}
.bigheader {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
