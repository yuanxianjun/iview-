<template>
  <div class="layout">
    <Layout>
      <Header>{{detailMess.postTitle}}</Header>
      <div>
        <Row class="timeAuth">
          <Col span="12" class="time">时间： {{$moment(detailMess.updateTime).format("YYYY/MM/DD")}}</Col>
          <Col span="10">作者：{{detailMess.authorName}}</Col>
          <Col span="2"></Col>
        </Row>
      </div>
      <Content
        class="content"
        v-html="detailMess.postContent"
      >sdfsfdsfsdf是范德萨发的速度是非得失佛挡杀佛双方都是否是非得失发顺丰撒的发生放散阀发发阿发萨法发顺丰阿发阿发啊发顺丰阿发啊发发暗室逢灯萨法阿发阿发啊啊啊啊</Content>
      <!-- <Footer>{{detailMess.postContent}}</Footer> -->
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'rich-text',
  components: {},
  props: [],
  data () {
    return {
      detailMess: {}
    }
  },
  methods: {}
}
</script>
<style></style>
