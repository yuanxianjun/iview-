<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
      <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
      </FormItem>-->
      <FormItem label="主题卡片背景" prop="topicBg">
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
          style="display: inline-block;width:100px;"
        >
          <div style="width: 100px;height:58px;line-height: 58px;">
            <Icon v-if="!showImg" type="ios-add" size="50"></Icon>
            <img
              class="img"
              v-if="showImg"
              :src="formValidate.topicItemBg"
              alt
              style="width:100px;height:60px;"
            >
          </div>
        </Upload>
      </FormItem>

      <FormItem label="主题卡片ICON" prop="topicIcon">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess2"
          type="drag"
          :action="uploadUrl"
          :data="uploadParam"
          style="display: inline-block;width:100px;"
        >
          <div style="width: 100px;height:58px;line-height: 58px;">
            <Icon v-if="!showImg2" type="ios-add" size="50"></Icon>
            <img
              class="img"
              v-if="showImg2"
              :src="formValidate.topicIcon"
              alt
              style="width:100px;height:60px;"
            >
          </div>
        </Upload>
      </FormItem>

      <!-- 颜色选项 -->
      <FormItem label="主题颜色" prop="topicBgColor">
        <!-- <ColorPicker  :hue="false"/> -->
        <ColorPicker v-model="formValidate.topicBgColor" :colors="color1" :editable="true"/>
      </FormItem>
      <FormItem label="主题名称" prop="topicName">
        <Input v-model="formValidate.topicName" placeholder="输入主题名称"></Input>
      </FormItem>
      <FormItem label="搜索字段名" prop="topicQueryName">
        <Input v-model="formValidate.topicQueryName" placeholder="输入搜索字段名"></Input>
      </FormItem>
      <FormItem label="搜索字段值" prop="topicQueryValue">
        <Input v-model="formValidate.topicQueryValue" placeholder="输入搜索字段值"></Input>
      </FormItem>

      <!-- 写入标签 -->
      <FormItem label="主题小标签" prop="topicTips">
        <div class="tipsBan">
          <Tag
            closable
            @on-close="handleClose(index)"
            v-for="(item ,index) in formValidate.topicTips"
            :key="index"
          >{{item}}</Tag>
        </div>
        <Input
          style="margin-top:10px;"
          v-model="inputIip"
          placeholder="输入标签使用enter键作为隔断"
          @on-enter="enterTips"
        ></Input>
      </FormItem>

      <FormItem label="显示顺序" prop="topicOrder">
        <Input v-model="formValidate.topicOrder" placeholder="输入显示顺序"></Input>
      </FormItem>

      <FormItem label="是否显示" prop="topicDisplay">
        <Checkbox v-model="formValidate.topicDisplay">是</Checkbox>
      </FormItem>
      <FormItem label="跳转地址" prop="topicLink">
        <Input v-model="formValidate.topicLink" placeholder="输入跳转的链接地址"></Input>
      </FormItem>

      <FormItem label="主题类型" prop="topicType">
        <Select v-model="formValidate.topicType" placeholder="选择主题类型">
          <Option v-for="item in topicTypes" :key="item.id" :value="item.text">{{item.text}}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">{{formData?"修改":"提交"}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    <footer></footer>
  </div>
</template>
<script>
import { apiUpload } from "@/api/apiUpload";
import apiTheme from "@/api/apiTopic.js";

// 使用字典
import { typeList } from "@/api/apiCom";
// 引入js库lodash
var _ = require("lodash");

export default {
  name: "new-list",
  components: {},
  props: ["formData"],
  data() {
    return {
      color1: ["#19be6b"],
      // 上传头像的地址
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: "topicBg"
      },
      showImg: false,
      showImg2: false,
      // 字典查询的列表
      topicTypes: [],
      // 输入标签的input框
      inputIip: "",
      // form表单的内容
      formValidate: {
        topicBgColor: "#19be6b"
      },
      ruleValidate: {
        topicName: [
          {
            required: true,
            message: "主题名称不能为空",
            trigger: "blur"
          }
        ],
        topicLink: [
          {
            required: true,
            message: "主题相关联的链接地址不能为空",
            trigger: "blur"
          }
        ],
        topicType: [
          {
            required: true,
            message: "主题相关联的链接地址不能为空",
            trigger: "chagne"
          }
        ]
      }
    };
  },
  methods: {
    // 查询所需要的字典
    getDictionarys() {
      var _this = this;
      getDatas("topicType", "topicTypes");
      function getDatas(id, key) {
        return typeList(id).then(res => {
          if (res.status == 0) {
            _this[key] = res.data;
            // console.log("查询到的值", _this[key]);
          }
        });
      }
    },
    // 当输入完毕按下enter键的时候，将input框中的内容，添加到input为textarea中形成标签，inputarea中的一个个标签是一数组的形式存储的
    enterTips(value) {
      // console.log("查看输入框中的内容", this.inputIip.length);
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      var result = re.test(this.inputIip);
      // console.log(result);
      if (this.inputIip && !result) {
        this.formValidate.topicTips.push(this.inputIip);
      } else {
        this.$Message.error("请输入内容");
      }
      this.inputIip = "";
    },
    // 关闭一个标签
    handleClose(index) {
      this.formValidate.topicTips.splice(index, 1);
      // console.log(this.formValidate.topicTips);
    },
    // 编辑模式的时候初始化数据
    checkData() {
      if (this.formData) {
        var id = this.formData;

        apiTheme.IdGet(id).then(res => {
          if (res.status == 0) {
            this.formValidate = res.data;

            // 将获取的标签字符串替换成可以正常显示的数组形式
            if (this.formValidate.topicTips.length > 0) {
              this.formValidate.topicTips = this.formValidate.topicTips.split(
                ","
              );
            } else {
              this.formValidate.topicTips = [];
            }

            // radio的value值必须为String | Number 使用typeof 测试String转码后的类型为string
            if (this.formValidate.topicBg) {
              this.showImg = true;
            }

            // 展示内容
            if (this.formValidate.topicIcon) {
              this.showImg2 = true;
            }
            if (!this.formValidate.topicBgColor) {
              this.formValidate.topicBgColor = "#19BE6B";
            }
          }
        });
      } else {
        this.formValidate = {
          topicDisplay: true,
          id: 0,
          topicBg: "",
          topicIcon: "",
          topicLink: "",
          topicName: "",
          topicOrder: 0,
          topicQueryName: "",
          topicQueryValue: "",
          topicTips: [],
          topicType: "",
          topicBgColor: "#19be6b"
        };
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        var data = _.cloneDeep(this.formValidate);

        var inputValue = "";
        if (data.topicTips && data.topicTips.length > 0) {
          inputValue = data.topicTips.join(",");
        }
        var commalength = (inputValue.match(/,g/) || []).legnth;
        var inputValuelength = inputValue.length - commalength;
        if (valid) {
          if (inputValuelength >= 40) {
            this.$Message.error("标签总字数不能超过40个字");
            return;
          } else {
            data.topicTips = inputValue;
          }

          apiTheme.managerSave(data).then(res => {
            if (res.status == 0) {
              this.$Message.success("提交成功");
              this.$emit("close-win");
            }
          });
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    // 上传文件
    handleSuccess(res, file) {
      // #endregion
      console.log("文件上传成功", res, file);
      this.formValidate.topicItemBg = res.data.previewFileName;
      this.showImg = true;
    },

    // 上传Icon
    handleSuccess2(res, file) {
      // #endregion
      this.formValidate.topicIcon = res.data.previewFileName;
      console.log("文件2上传成功", res, this.formValidate.topicIcon);
      this.showImg2 = true;
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
        desc: "文件" + file.name + "太大,大小不能超过2M"
      });
    },
    // 重置表单
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getDictionarys();
    this.checkData();
  }
};
</script>
<style>
.img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.tipsBan {
  min-height: 40px;
  height: auto;
  border: 1px solid #80869559;
  padding: 4px;
}
</style>
