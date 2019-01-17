<template>
  <div class="layout">
    <Layout>
      <Header>
        <h1>{{detailMess.postTitle}}</h1>
      </Header>
      <div>
        <Row class="timeAuth">
          <Col span="12" class="time">时间： {{$moment(detailMess.updateTime).format("YYYY/MM/DD")}}</Col>
          <Col span="10">作者：{{detailMess.postSource || detailMess.authorName}}</Col>
          <Col span="2"></Col>
        </Row>
      </div>

      <Content class="content ql-editor" v-html="detailMess.postContent">请输入文章内容...</Content>
      <!-- <Footer>{{detailMess.postContent}}</Footer> -->
    </Layout>
  </div>
</template>
<script>
import articleDetail from "../../../api/apiArticle";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "rich-text",
  components: {},
  props: [],
  data() {
    return {
      detailMess: {},
      articleId: this.$route.query.id
    };
  },
  mounted() {
    this.getArticleMess();
  },
  methods: {
    getArticleMess() {
      articleDetail.apiArticleDetail(this.articleId).then(res => {
        console.log("查看取得的数据", res);

        if (res.status === 0) {
          this.detailMess = res.data;
        }
      });
    }
  }
};
</script>
<style>
.ivu-layout {
  padding: 10px;
  background: #ffffff;
}
.ivu-layout-header {
  background: none;
  text-align: center;
  /* font-size: 20px; */
  overflow: hidden;
}
.timeAuth {
  margin-top: 12px;
  margin-bottom: 20px;
  font-size: 13px;
}
.time {
  text-align: center;
}
.auth {
  text-align: center;
}
.ql-align-center {
  text-align: center;
}
.content {
  line-height: 2;
  font-size: 16px;
}
img {
  width: 100%;
  height: auto;
}
</style>
