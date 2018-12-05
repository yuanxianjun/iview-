<template>
<<<<<<< HEAD
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
        <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption"></quill-editor>
      </p>
      <p style="margin-top:10px;">
        <Button type="primary" @click="saveArticle">保存</Button>
      </p>
=======
  <div style="background:#eee;padding: 10px;margin-top:20px;margin-right:18px;" >
     <Card :bordered="false">
        <p slot="title" style="height:40px;">
           标题：<Input placeholder="请输入文章标题" style="width: 500px"  v-model="detailMess.postTitle"/>
        </p>
         <p slot="title" style="height:40px;">
           摘要：<Input placeholder="请输入摘要" style="width: 500px" v-model="detailMess.postExcerpt"/>
        </p>
         <p slot="title" style="height:40px;">
           发布状态：
           <RadioGroup v-model="detailMess.postStatus">
              <Radio  label="published">已发布</Radio>
              <Radio  label="nopublised">未发布</Radio>
              <Radio  label="trash">回收站</Radio>
          </RadioGroup>
        </p>
          <p slot="title" style="height:40px;">
           是否可评论：
           <RadioGroup v-model="detailMess.commentStatus">
              <Radio  label="true">是</Radio>
              <Radio  label="false">否</Radio>
          </RadioGroup>
        </p>
        <div slot="title" style="height:60px;">
          <div class="setImgtitle" style="">上传封面：
            </div>
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
                :data = "uploadParam"
                style="display: inline-block;width:58px;">
                <div  style="width: 58px;height:58px;line-height: 58px;">
                    <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
                    <img class="img" v-if="showImg" :src="detailMess.postThumburls" alt="" size = "50">
                </div>
            </Upload>
        </div>
        <p>
          <!-- use with components - bidirectional data binding（双向数据绑定） -->
            <quill-editor ref="myTextEditor"
                        v-model="content"
                        :config="editorOption"
                         @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        >
            </quill-editor>
        </p>
        <p style="margin-top:10px;">
            <Button type="primary" @click="saveArticle">保存</Button>
        </p>
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
    </Card>
  </div>
</template>
<script>
import apiAdmin from '@/api/apiAdmin'

// 引入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
<<<<<<< HEAD
import { quillRedefine } from 'vue-quill-editor-upload'
=======
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081

import apiArticle from '@/api/apiArticle.js'

// 上传需要的地址
import { apiUpload } from '@/api/apiUpload'
export default {
  name: 'rich-text',
<<<<<<< HEAD
  components: { quillEditor, quillRedefine },
=======
  components: {
    quillEditor
  },
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  props: ['formData'],
  data () {
    return {
      // 上传文件
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: 'articleCovers'
      },
      showImg: false,
      detailMess: {
        postTitle: '',
        postExcerpt: ''
      },
      content: '<h2>输入文章。。。。。</h2>',
<<<<<<< HEAD

      // tuapnk
      editorOption: {} // 必须初始化为对象 init  to Object
    }
  },
  created () {
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: this.uploadUrl, // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: respnse => {
          console.log('查看上传文件的返回结果', respnse)

          return respnse.data.previewFileName
        },
        methods: 'POST', // 可选参数 图片上传方式  默认为post
        // token: sessionStorage.token, // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage

        name: 'file', // 可选参数 文件的参数名 默认为img

        size: 500, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
        accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选参数 可上传的图片格式
        header: (xhr, formData) => {
          // xhr.setRequestHeader('myHeader','myValue');
          formData.append('fileType', 'aritleInImg')
        },
        start: () => {}, // 可选参数 接收一个函数 开始上传数据时会触发
        end: () => {}, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
        success: () => {
          console.log('上传成功')
        }, // 可选参数 接收一个函数 上传数据成功时会触发
        error: () => {
          console.log('上传失败')
        } // 可选参数 接收一个函数 上传数据中断时会触发
      },
      // 以下所有设置都和vue-quill-editor本身所对应
      placeholder: '', // 可选参数 富文本框内的提示语
      theme: '', // 可选参数 富文本编辑器的风格
      toolOptions: [
        [{ size: ['small', false, 'large'] }],
        ['bold', 'italic'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image']
      ], // 可选参数  选择工具栏的需要哪些功能  默认是全部
      handlers: {} // 可选参数 重定义的事件，比如link等事件
    })
    console.log('查看当前的文章内容', this.editorOption)
  },
=======
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  methods: {
    //   保存文章
    saveArticle () {
      this.detailMess.postContent = this.content
<<<<<<< HEAD
=======
      console.log(this.detailMess)
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
      apiArticle.apiArticleSave(this.detailMess).then(res => {
        if (res.status == 0) {
          this.$Message.success('发布成功')
          this.$emit('close-win')
          this.detailMess = {}
        }
      })
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    },
    // 如果有id传入进来进入编辑模式
    checkData () {
<<<<<<< HEAD
=======
      console.log(this.formData)
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
      if (
        this.formData !== '' &&
        this.formData !== null &&
        this.formData !== {}
      ) {
        var id = this.formData

        apiArticle.apiArticleDetail(id).then(res => {
          if (res.status == 0) {
<<<<<<< HEAD
            console.log('查看得到的值', res.data)
            this.detailMess = res.data
            this.content = res.data.postContent
=======
            this.detailMess = res.data
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
          }
        })
      } else {
        this.detailMess = {
          postStatus: 'published',
          commentStatus: 'true',
          postThumburls: ''
        }
      }
    },
    // 上传文件
    handleSuccess (res, file) {
      console.log('文件上传成功', res, file)
      this.detailMess.postThumburls = res.data.previewFileName
      this.showImg = true
      console.log(res.previewFileName, this.detailMess.postThumburls)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '上传的文件格式不正确',
        desc: '文件格式' + file.name + ' 是不正确的，请选择jpg或者png格式的图片'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '上传扥文件大小超过限制',
        desc: '文件  ' + file.name + '太大,大小不能超过2M.'
      })
    },

    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    // 获取文章详情
    this.checkData()
    console.log(this.formData)
  }
}
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
