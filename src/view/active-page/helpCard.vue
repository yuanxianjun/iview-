<template>
  <div class="big">
    <!-- 帮您选卡的界面 -->
    <div class="container" v-if="!showCarousel">
      <div class="imgTop">
        <img src="@/assets/images/activeImg/checkCardTitle.png" alt>
      </div>
      <div class="checkTitle">
        <p class="titleOne">
          <span class="oneFont">{{bossJson.num}}</span>
          {{bossJson.title}}
        </p>
        <p class="titleTwo">为最精准的推荐，选择不要超过3个哦</p>
      </div>
      <!-- 第一页 -->
      <div class="tips" v-if="bossJson.num == 1">
        <ul>
          <li
            v-for="(item ,index) in bossJson.tips"
            :key="index"
            :class="activeLi1.indexOf(item.value) >= 0 ? liStyle : 'tipCom tipsLi'"
            @click="checkedLi1(item.value,index)"
          >{{item.text}}</li>
        </ul>
      </div>
      <div class="btnDiv" v-if="bossJson.num == 1">
        <div
          :class="activeLi1.length>0?'nextBtnCom nextBtnChecked':'nextBtnCom nextBtn' "
          @click="nextPage"
        >{{btnCon}}</div>
      </div>
      <!-- 第二页 -->
      <div class="tips" v-if="bossJson.num == 2">
        <ul>
          <li
            v-for="(item ,index) in bossJson.tips"
            :key="item.id"
            :class="activeLi2.indexOf(item.value) >= 0 ? liStyle : 'tipCom tipsLi'"
            @click="checkedLi2(item.value,index)"
          >{{item.text}}</li>
        </ul>
      </div>

      <div class="btnDiv" v-if="bossJson.num == 2">
        <div class="nextBtnCom nextBtnChecked" @click="nextPage">{{btnCon}}</div>
        <div
          :class="activeLi2.length>0?'nextBtnCom nextBtnChecked':'nextBtnCom nextBtn' "
          @click="handleSubmit"
        >提交</div>
      </div>
    </div>
    <carousel v-if="showCarousel" :data="resultList"></carousel>
  </div>
</template>

<script>
import { chooseCard } from "@/api/apiActive/apiAppChoose.js";
// 使用字典
import { typeList } from "@/api/apiCom";
// 引入信用卡页面滑动组件
import carousel from "./checkedResultCard.vue";
export default {
  name: "templateOne",
  components: {
    carousel
  },
  data() {
    return {
      liStyle: "tipCom tipsLiChecked",
      activeLi1: [],
      activeLi2: [],
      // 提交所需要的数组
      submitArr: [],
      // 筛选到的信用卡片list
      resultList: [],
      showCarousel: false,
      // 展示第二项拼写
      showPage2: false,
      btnCon: "下一步",
      jsonOne: {
        num: 1,
        title: "/2:你最关注的信用卡特色？",
        tips: []
      },
      jsonTwo: {
        num: 2,
        title: "/2:你最常进行消费?",
        tips: []
      },
      bossJson: {}
    };
  },
  methods: {
    // 获取列表信息
    getConsume() {
      var that = this;
      getList("jsonOne", "creditTrait");
      getList("jsonTwo", "creditPurpose");
      function getList(name, code) {
        typeList(code).then(res => {
          if (res.status === 0) {
            that[name].tips = res.data;
          }
        });
      }
    },
    // 向后台提交选卡
    handleSubmit() {
      this.submitArr = this.activeLi1.concat(this.activeLi2);
      chooseCard(this.submitArr).then(res => {
        if (res.status === 0) {
          this.showCarousel = true;
          if (res.data.rows.length > 0) {
            this.resultList = res.data.rows;
          } else {
          }
        }
      });
    },
    checkedLi1(value, index) {
      // console.log(value, index);
      if (this.activeLi1.indexOf(value) == -1 && this.activeLi1.length < 3) {
        this.activeLi1.push(value);
      } else {
        var delIndex = this.activeLi1.indexOf(value);
        if (delIndex >= 0) this.activeLi1.splice(delIndex, 1);
      }
    },
    checkedLi2(value, index) {
      if (this.activeLi2.indexOf(value) == -1 && this.activeLi2.length < 3) {
        this.activeLi2.push(value);
      } else {
        var delIndex = this.activeLi2.indexOf(value);
        if (delIndex >= 0) this.activeLi2.splice(delIndex, 1);
      }
    },
    nextPage() {
      if (this.activeLi1.length > 0 && !this.showPage2) {
        this.btnCon = "上一步";
        this.bossJson = this.jsonTwo;
        this.showPage2 = !this.showPage2;
      } else {
        this.btnCon = "下一步";
        this.bossJson = this.jsonOne;
        this.showPage2 = false;
      }
    }
  },
  watch: {
    // activeLi1: function(item) {
    //   console.log("activeLi1已经被改变了", item);
    //   this.activeLi1 = item;
    // }
  },
  mounted() {
    this.getConsume();
    this.bossJson = this.jsonOne;
  }
};
</script>
<style lang="less">
.big {
  width: 100%;
  height: 100%;
}
.oneFont {
  font-size: 34px;
  // font-weight: 600;
}
.tipsLiChecked {
  color: #fff;
  border-radius: 20px;
  background: linear-gradient(to right, rgb(40, 175, 253), rgb(105, 84, 255));
  border: 1px solid transparent;
}
.tipCom {
  text-align: center;
  display: block;
  border-radius: 18px;
  padding: 10px 30px;
  height: 40px;
  margin-left: 10px;
  margin-top: 15px;
}
.titleOne {
  width: 100%;
  height: 50px;
  text-align: center;
  color: rgb(109, 86, 253);
  font-size: 22px;
  line-height: 50px;
}
.titleTwo {
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: rgb(157, 157, 157);
  text-align: center;
}
.checkTitle {
  margin-top: 20px;
}
.tipsLi {
  color: black;
  border-radius: 20px;
  border: 1px solid rgb(107, 74, 255);
  color: rgb(107, 85, 248);
}
.tips ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-right: 10px;
}
.tips {
  width: 100%;
  height: auto;
  margin-top: 25px;
}
.btnDiv {
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.nextBtnCom {
  width: 120px;
  height: 45px;
  border-radius: 25px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  margin: 0 auto;
  font-size: 14px;
  margin-bottom: 15px;
}
.nextBtnChecked {
  background: linear-gradient(to right, rgb(40, 175, 253), rgb(105, 84, 255));
}
.nextBtn {
  background: rgb(181, 193, 255);
}
.imgTop img {
  width: 100%;
  height: 100%;
}
.imgTop {
  width: 100%;
  height: 30%;
  // background: rebeccapurple;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  overflow: auto;
  background: #fff;
}
</style>
