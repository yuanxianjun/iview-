<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
      <!-- <FormItem label="ID" prop="id">
            <Input v-model="formValidate.id" placeholder="输入ID"></Input>
      </FormItem>-->
      <FormItem label="主题卡背景" prop="topicItemBg">
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

      <FormItem label="主题ID" prop="topicId">
        <Input v-model="formValidate.topicId" placeholder="主题ID" disabled></Input>
      </FormItem>

      <FormItem label="主题卡片" prop="topicItemId">
        <Select v-model="formValidate.topicItemId" filterable>
          <Option class="optionLi" v-for="item in cardList" :value="item.id" :key="item.id">
            {{ item.creditName }}
            <img class="creditImg" :src="item.creditImg">
          </Option>
        </Select>
      </FormItem>

      <FormItem label="显示顺序" prop="topicItemOrder">
        <InputNumber v-model="formValidate.topicItemOrder"></InputNumber>
      </FormItem>

      <FormItem label="是否显示" prop="topicItemDisplay">
        <Checkbox v-model="formValidate.topicItemDisplay">是</Checkbox>
      </FormItem>

      <FormItem label="主题类型" prop="topicItemType">
        <Select v-model="formValidate.topicItemType" placeholder="选择主题类型">
          <Option value="credit">信用卡</Option>
          <Option value="loan">贷款</Option>
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
// 获取信用卡列表的接口
import { creditPage } from "@/api/credit-api/apiCredit.js";
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
      // 信用卡列表
      cardList: [],
      // 上传头像的地址
      uploadUrl: apiUpload,
      uploadParam: {
        fileType: "topicItemBg"
      },
      showImg: false,
      // 字典查询的列表
      topicTypes: [],
      // 输入标签的input框
      inputIip: "",
      // form表单的内容
      formValidate: {
        id: 0,
        topicBg: "",
        topicDisplay: false,
        topicItemBg: "",
        topicType: "",
        topicId: this.$route.query.id
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
        topicItemId: [
          {
            required: true,
            type: "number",
            message: "请至少选择一项",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 查询信用卡列表
    getCardList(searchValue) {
      creditPage("", 300, searchValue, 1).then(res => {
        this.cardList = res.data.rows;
        // console.log("查看信用卡获取情况", this.cardList);
      });
    },
    // 下拉框中进行搜索的时候的方法
    searchCard() {},

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
      console.log("查看传过来的数据", this.formData);
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
            if (this.formValidate.topicItemBg) {
              this.showImg = true;
            }
          }
        });
      } else {
        this.formValidate = {
          topicDisplay: "true",
          topicId: this.$route.query.id,
          topicItemType: "credit"
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

          apiTheme.addItem(data).then(res => {
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
      if (this.isDisabled) {
        this.$Message.success("头像编辑禁用");
      } else {
        console.log("文件上传成功", res, file);
        this.formValidate.topicItemBg = res.data.previewFileName;
        this.showImg = true;
      }
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
    // 获取所有的信用卡信息
    this.getCardList();
    //
    // this.getDictionarys();
    this.checkData();
  }
};
</script>
<style>
.optionLi {
  line-height: 70px;
}
.creditImg {
  width: 100px;
  height: auto;
  float: right;
}
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
