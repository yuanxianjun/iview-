<template>
  <!-- 帮您选卡的界面 -->
  <div class="container">
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

    <div class="tips">
      <ul>
        <li
          v-for="(item ,index) in bossJson.tips"
          :key="index"
          :class="activeLi1.indexOf(index) >= 0 ? liStyle : 'tipCom tipsLi'"
          @click="checkedLi(item,index)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="btnDiv">
      <div
        :class="activeLi1.length>0?'nextBtnCom nextBtnChecked':'nextBtnCom nextBtn' "
        @click="nextPage"
      >{{btnCon}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'templateOne',
  components: {},
  data () {
    return {
      liStyle: 'tipCom tipsLiChecked',
      activeLi1: [],
      AllactiveLi: [],
      // 展示第二项拼写
      showPage2: false,
      btnCon: '下一步',

      jsonOne: {
        num: 1,
        title: '/2:你最关注的信用卡特色？',
        tips: [
          '额度高',
          '易申请',
          '极速发卡',
          '高端白金',
          '大额取现',
          '开卡好礼',
          '权益丰厚',
          '免年费',
          '颜值正义'
        ]
      },
      jsonTwo: {
        num: 2,
        title: '/2:你最常进行消费?',
        tips: [
          '超市',
          '爱车',
          '酒店',
          '高铁航空',
          '境外购物',
          '美食',
          '游戏',
          '追星',
          '追星观影',
          '网购',
          '女性专属'
        ]
      },
      bossJson: {}
    }
  },
  methods: {
    checkedLi (value, index) {
      if (this.activeLi1.indexOf(index) == -1 && this.activeLi1.length < 3) {
        this.activeLi1.push(index)
      } else {
        var delIndex = this.activeLi1.indexOf(index)
        if (delIndex >= 0) this.activeLi1.splice(delIndex, 1)
      }
    },
    nextPage () {
      if (this.activeLi1.length > 0 && !this.showPage2) {
        this.btnCon = '上一步'
        this.bossJson = this.jsonTwo
        this.showPage2 = !this.showPage2
        this.AllactiveLi = this.activeLi1
        this.activeLi1 = []
      } else {
        this.btnCon = '下一步'
        this.bossJson = this.jsonOne
        this.showPage2 = false
        this.activeLi1 = []
      }
    }
  },
  watch: {
    // activeLi1: function(item) {
    //   console.log("activeLi1已经被改变了", item);
    //   this.activeLi1 = item;
    // }
  },
  mounted () {
    this.bossJson = this.jsonOne
  }
}
</script>
<style lang="less">
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
}
.nextBtnCom {
  width: 200px;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
  font-size: 14px;
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
