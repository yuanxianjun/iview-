<template>
  <div class="layout">
    <Layout>
      <Header class="flexHead">
        <Row>
          <Col :xs="6" :sm="6" :md="4" :lg="4" type="flex" justify="end" align="right">
            <img class="logoIcon" src="../../assets/images/iconImg.png" alt>
          </Col>

          <Col :xs="18" :sm="18" :md="20" :lg="20">
            <span class="logoTitle">人人卡包</span>
          </Col>
        </Row>
      </Header>
      <div class="con">
        <Row type="flex" justify="start" align="middle" style="width:100%;height:100%;">
          <Col :xs="0" :sm="0" :md="10" :lg="10" type="flex" justify="center" align="middle">
            <!-- 显示手机 -->
            <div class="phoneDiv">
              <img class="phoneImg" src="../../assets/images/phone.png" alt>
            </div>
          </Col>
          <Col class="phonecol" :xs="4" :sm="4" :md="0" :lg="0"></Col>
          <Col
            class="width100"
            :xs="20"
            :sm="20"
            :md="14"
            :lg="14"
            type="flex"
            justify="start"
            align="top"
          >
            <div class="fontWhite boxRight">
              <h1 class="htitle">审批快，额度高，人人卡包不等"贷"</h1>
              <p class="ptext">
                1天下卡，3天到手，
                <span class="money_text">80000</span>额度轻松得
              </p>
              <div class="downDiv">
                <div class="btnDiv">
                  <a :href="downLink">
                    <img class="downloadBtn" src="../../assets/images/downBtn.png" alt>
                  </a>
                </div>
                <div id="qrcode" ref="qrcode"></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div class="footer">
        <p class="footerp">
          COPYRIGHT 2017 – 2018 CHARM. ALL RIGHTS RESERVED.
          昌荣公司 版权所有
        </p>
      </div>
    </Layout>
  </div>
</template>
<script>
import downDetail from "../../api/apiDown.js";
// 引入生成二维码的库
import QRCode from "qrcodejs2";
// 引入服务器的地址
import base from "@/config";

export default {
  name: "websit",
  components: {
    QRCode
  },
  props: [],
  data() {
    const baseurl = base.baseUrl.pro;
    return {
      detailMess: {},
      // 二维码
      downloadButton: false,
      config: {
        value: "",
        imagePath: "../../assets/images/logo.jpg",
        filter: "color"
      },
      downLink: ""
    };
  },
  mounted() {
    this.qrcode();
  },
  methods: {
    qrcode() {
      downDetail.downDetail().then(res => {
        if (res.status == 0) {
          var text = res.data.wtCreditAppEntity.appDownloadLink;
          text = "http://appdetailh5.vivo.com.cn/detail/2404657?source=7";
          this.downLink = text;
          let qrcode = new QRCode("qrcode", {
            width: 180,
            height: 180, // 高度
            text: text // 二维码内容
            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            // background: "#fff",
            // padding: 10
            // foreground: '#ff0'
          });
        }
      });
    },
    getDetail() {}
  }
};
</script>
<style>
.downDiv {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
}
#qrcode {
  width: 180px;
  height: 180px;
  margin-top: 40px;
  margin-left: 110px;
}
#qrcode img {
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
}
.qrCodeDiv {
  width: 160px;
  height: 160px;
}
.btnDiv {
  width: 255px;
  height: 40px;
  margin-top: 60px;
}
.btnDiv:hover {
  cursor: pointer;
}
.btnDiv img {
  width: 100%;
  height: auto;
}
.htitle {
  font-size: 46px;
  margin-top: 86px;
}
.ptext {
  /* padding: 10px; */
  font-size: 20px;
  color: #cecaca;
  margin-top: 10px;
}
.boxRight {
  height: 100%;
  padding-left: 10px;
}
.fontWhite {
  color: #fff;
}

.footerp {
  text-align: center;
  font-size: 10px;
  margin-top: 10px;
}
.layout {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}
.ivu-layout {
  width: 100%;
  height: 100%;
}
.ivu-layout-header {
  height: 40px;
  line-height: 40px;
  background: #2e384b;
}
.flexHead {
  padding: 0;
}
.logoIcon {
  width: auto;
  height: 32px;
  margin-right: 10px;
}
.logoTitle {
  display: block;
  font-size: 16px;
  color: #fff;
}
.con {
  width: 100%;
  height: 90%;
  background: url("../../assets/images/background.png") no-repeat center center;
  background-size: 100% 100%;
  overflow: auto;
}
/* 手机图片的大小和位置 */
.phoneDiv {
}
.phoneImg {
  display: block;
  width: auto;
  height: 532px;
}
.con-row {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.centerBox {
  /* width: 60%; */
  /* height: 100%; */
}

@media screen and (max-width: 500px) {
  .centerBox {
    display: none;
  }
  #qrcode {
    display: none;
  }
  .phonecol {
    display: none;
  }
  .footer {
    /* display: none; */
  }
  .downDiv {
    height: 100px;
    margin-top: 30px;
  }
  .btnDiv {
    margin: 0;
  }
  .width100 {
    width: 100%;
    height: 100%;
  }
}
</style>
