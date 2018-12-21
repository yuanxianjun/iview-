<template>
  <div class="layout">
    <header>
      <div class="logo">
        <!-- <img src="http://h5.f.vivo.com.cn/appstore/h5/appinfodetail/image/logo.png"> -->
      </div>
      <div class="header-box">
        <!--列表项-->
        <div class="item-content clearfix">
          <div class="item-img ly-fl">
            <img
              src="http://img.wsdl.vivo.com.cn/appstore/developer/icon/20181218/201812181756072944282.jpg"
            >
          </div>
          <div class="item-introduce ly-fl">
            <dl>
              <dt class="item-introduce-title">
                <span>人人卡包</span>
              </dt>
              <dd class="item-introduce-download">
                <span class="yello">
                  <span class="iconfont icon-star"></span>
                  <span class="iconfont icon-star"></span>
                  <span class="iconfont icon-star"></span>
                  <span class="iconfont icon-star"></span>
                  <span class="iconfont icon-star"></span>
                </span>
                &nbsp;&nbsp;
                8.54M &nbsp;&nbsp;
                1000次下载
              </dd>
              <dd class="item-introduce-tags">
                <span class="tag">安全</span>
                <span class="tag no-ad">无广告&nbsp;</span>
              </dd>
            </dl>
          </div>
          <div id="J_download" class="fixed-box">
            <div class="button-box">
              <a :href="downloaLink">
                <button
                  id="J_download_trigger"
                  class="item-operation"
                  type="button"
                  data="http://info.appstore.vivo.com.cn/dl/Mm1rYVNLazJZNkE9?source=7"
                >下 载(8.54MB)</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="main-content">
      <div id="J_content-swipe">
        <div class="tab-content swipe-wrap">
          <div class="tab-page">
            <div id="J_gallery" class="gallery" style="overflow: hidden;">
              <div
                class="img-box"
                style="width: 504px; transform: translate(0px, 0px) translateZ(0px);"
              >
                <img
                  src="http://img.wsdl.vivo.com.cn/appstore/developer/screenshot/20181220/20181220144712946217.jpg"
                >
                <img
                  src="http://img.wsdl.vivo.com.cn/appstore/developer/screenshot/20181220/201812201447174471038.jpg"
                >
                <img
                  src="http://img.wsdl.vivo.com.cn/appstore/developer/screenshot/20181220/2018122014472009436.jpg"
                >
                <img
                  src="http://img.wsdl.vivo.com.cn/appstore/developer/screenshot/20181220/201812201447221666063.png"
                >
              </div>
            </div>
            <div class="wrap">
              <ul class="comment clearfix">
                <li class="ly-fl">
                  <small>版本：1.0.1</small>
                </li>
                <li class="ly-fr">
                  <small>更新时间：2018-12-21 15:31:20</small>
                </li>
              </ul>

              <ul class="item-box detail">
                <li class="item">
                  <dl class="introduce fold">
                    <dt>
                      <span class="iconfont icon-paper"></span>
                      <span class="icon-paper-bg"></span>应用介绍
                      <span id="J_fold" class="iconfont icon-unfold ly-fr"></span>
                    </dt>
                    <dd class="editer-recmd blue">小编推荐：</dd>
                    <dd
                      class="text-content gray"
                    >人人卡包可以快速在线免费申请卡，支持民生银行及多家主流银行卡申请，系统为您匹配推荐适合您的银行卡，成功率高；只需身份证即可在线申请银行卡，不需要任何财务证明，安全可靠有保障，快捷方便，最快1天下卡，3天到手。详细的卡申请攻略帮助你快速申请卡，免费查询卡申请进度。
                      <br>
                      <br>
                      <br>产品特点：
                      <br>
                      <br>【成功率高】系统为您匹配推荐适合您的银行卡，下卡率高。
                      <br>
                      <br>【方便】只需要有身份证号码就能申请卡，不需要提供任何财务证明。
                      <br>
                      <br>【安全】所有资料在所申请的卡银行官网填写，不泄漏任何资料。
                      <br>
                      <br>【快捷】最快1天下卡，3天到手。
                      <br>
                      <br>
                      <br>人人卡包，针对年轻人的使用习惯实现了极简、快速、放心、高效的使用体验；
                      <br>极简：“人人卡包‘经过近10个以上UI方案的的更改，实现了简洁，清新，流畅的操作体验；
                      <br>快速：通过精心的app底层的深层优化及网络优化，为用户提供提供快速的信用还款，取现，管理等操作；
                      <br>放心：精选的合作商，让用户使用起来更加放心，“用户权益及体验”一直以来都是我们的宗旨，我们将一直坚持此宗旨；
                      <br>高效：在这里，你可以获得极致快速安全的卡使用体验，让你一旦上手，就寸不离手；
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="weixin-tip-mask fn-hide" v-if="showGuid">
      <img
        class="guideImg"
        src="http://h5.f.vivo.com.cn/appstore/h5/appinfodetail/image/weixin-tip.png"
      >
    </div>
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
      showGuid: false,
      downloaLink: baseurl + "/api/v1/credit/download/newVersion"
    };
  },

  mounted() {
    this.JudgeBrowser();
  },
  methods: {
    JudgeBrowser() {
      console.log(this.isWeiXin(), "查看是否是微信浏览器");
      if (this.isWeiXin()) {
        this.showGuid = true;
      } else {
        this.showGuid = false;
      }
    },
    //判断是否是微信浏览器的函数
    isWeiXin() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
@import url(./detail.css);
</style>
