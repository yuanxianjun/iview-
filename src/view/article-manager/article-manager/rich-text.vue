<template>
  <div style="background:#eee;padding: 10px;margin-top:20px;margin-right:18px;">
    <Card :bordered="false">
      <p slot="title" style="height:40px;">标题：
        <Input placeholder="请输入文章标题" style="width: 500px" v-model="detailMess.postTitle"/>
      </p>
      <p slot="title" style="height:40px;">摘要：
        <Input placeholder="请输入摘要" style="width: 500px" v-model="detailMess.postExcerpt"/>
      </p>
      <p slot="title" style="height:40px;">发布状态：
        <RadioGroup v-model="detailMess.postStatus">
          <Radio label="published">已发布</Radio>
          <Radio label="nopublised">未发布</Radio>
          <Radio label="trash">回收站</Radio>
        </RadioGroup>
      </p>
      <p slot="title" style="height:40px;">是否可评论：
        <RadioGroup v-model="detailMess.commentStatus">
          <Radio label="true">是</Radio>
          <Radio label="false">否</Radio>
        </RadioGroup>
      </p>
      <div slot="title" style="height:60px;">
        <div class="setImgtitle" style>上传封面：</div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess"
          type="drag"
          :action="uploadUrl"
          :data="uploadParam"
          style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
            <img class="img" v-if="showImg" :src="detailMess.postThumburls" alt size="50">
          </div>
        </Upload>
      </div>
      <p>
        <!-- use with components - bidirectional data binding（双向数据绑定） -->
        <quill-editor
          ref="myTextEditor"
          v-model="content"
          :config="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        ></quill-editor>
      </p>
      <p style="margin-top:10px;">
        <Button type="primary" @click="saveArticle">保存</Button>
      </p>
    </Card>
  </div>
</template>
<script>
import apiAdmin from "@/api/apiAdmin";

// 引入富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import apiArticle from "@/api/apiArticle.js";

// 上传需要的地址
import { apiUpload } from "@/api/apiUpload";
export default {
  name: "rich-text",
  components: {
    quillEditor
  },
  props: ["formData"],
  data() {
    return {
      // 上传文件
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: "articleCovers"
      },
      showImg: false,
      detailMess: {
        postTitle: "",
        postExcerpt: ""
      },
      content: "<h2>输入文章。。。。。</h2>",
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      }
    };
  },
  methods: {
    //   保存文章
    saveArticle() {
      this.detailMess.postContent = this.content;
      console.log(this.detailMess);
      apiArticle.apiArticleSave(this.detailMess).then(res => {
        if (res.status == 0) {
          this.$Message.success("发布成功");
          this.$emit("close-win");
          this.detailMess = {};
        }
      });
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    // 如果有id传入进来进入编辑模式
    checkData() {
      console.log(this.formData);
      if (
        this.formData !== "" &&
        this.formData !== null &&
        this.formData !== {}
      ) {
        var id = this.formData;

        apiArticle.apiArticleDetail(id).then(res => {
          if (res.status == 0) {
            this.detailMess = res.data;
          }
        });
      } else {
        this.detailMess = {
          postStatus: "published",
          commentStatus: "true",
          postThumburls: ""
        };
      }
    },
    // 上传文件
    handleSuccess(res, file) {
      console.log("文件上传成功", res, file);
      this.detailMess.postThumburls = res.data.previewFileName;
      this.showImg = true;
      console.log(res.previewFileName, this.detailMess.postThumburls);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传的文件格式不正确",
        desc: "文件格式" + file.name + " 是不正确的，请选择jpg或者png格式的图片"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传扥文件大小超过限制",
        desc: "文件  " + file.name + "太大,大小不能超过2M."
      });
    },

    // 重置表单
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    // 获取文章详情
    this.checkData();
    console.log(this.formData);
  }
};
</script>
<style>
.img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.ql-container {
  height: 300px;
}
.setImgtitle {
  font-weight: 600;
  float: left;
  line-height: 60px;
}
/* .ivu-card-body {
  height: 594px;
} */
</style>
