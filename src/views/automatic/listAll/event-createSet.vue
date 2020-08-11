<!--
 * @Author: your name
 * @Date: 2020-07-31 11:00:20
 * @LastEditTime: 2020-08-10 20:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\automatic\event-creatSet.vue
--> 
<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="默认回复">
      <el-t-button
        type="text"
        size="mini"
        :popAuth="true"
        :auth="permissionMap['automatic']['automatic_defaultDetail']"
        @click.stop="setAutoRepaly"
      >配置</el-t-button>
      <!-- <span class="color-primary mr-10 set-auto-replay" ></span> -->
      <span>当未匹配到关键词，小助理将发送此条消息内容</span>
    </el-form-item>
    <el-form-item label="文字消息" v-show="isSetAuto == true">
      <div class="full-w">
        <el-input
          v-model="form.reply"
          type="textarea"
          :rows="6"
          maxlength="500"
          show-word-limit
          placeholder="请输入文字消息"
        ></el-input>
      </div>
    </el-form-item>

    <el-form-item label="图片/文章/链接" v-show="isSetAuto == true">
      <div class="msg-textarea-box full-w">
        <div class="message-box-content">
          <el-radio-group v-model="form.autoReplyType" @change="changeAutoReplyType">
            <el-radio :label="'CONTENT'">文本</el-radio>
            <el-radio :label="'IMAGE'">图片</el-radio>
            <el-radio :label="'FILE'">文件</el-radio>
            <el-radio :label="'ARTICLE'">文章</el-radio>
          </el-radio-group>

          <!-- 上传图片 -->
          <section class="message-content display-flex" v-if="form.autoReplyType == 'IMAGE'">
            <div class="img-warp">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleSetMessageImage"
                :before-upload="beforeUploadImage"
              >
                <el-image fit="contain" class="avatar" v-if="messageImage" :src="messageImage"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i
                class="el-icon-circle-close close"
                v-if="messageImage"
                @click.stop="handleDelMessageImage"
              ></i>
            </div>
          </section>

          <!-- 上传视频 -->
          <!-- <section class="message-content display-flex" v-show="form.tempMediaType == 'VIDEO'">
            <div class="img-warp">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleSetMessageVideo"
                :before-upload="beforeUploadVideo"
              >
                <video v-if="messageVideo" controls="controls" :src="messageVideo" class="avatar"></video>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i
                class="el-icon-circle-close close"
                v-if="messageVideo"
                @click.stop="handleDelMessageVideo"
              ></i>
            </div>
          </section>-->

          <!-- 上传文件 -->
          <section class="message-content display-flex" v-if="form.autoReplyType == 'FILE'">
            <div class="img-warp">
              <el-upload
                action="/api/upload"
                :on-success="handleSetMessageFile"
                :before-upload="beforeUploadFile"
                :before-remove="beforeRemoveFile"
                :on-remove="removeFile"
                multiple
                :show-file-list="true"
                :file-list="fileList"
              >
                <el-button size="small" type="primary" v-show="fileList.length<=0">点击上传</el-button>
              </el-upload>
            </div>
          </section>

          <div class="message-content" v-if="form.autoReplyType == 'ARTICLE'">
            <el-select
              :popper-append-to-body="false"
              v-model="form.mediaId"
              clearable
              placeholder="请选择"
              style="width:100%"
              filterable
              popper-class="selectinfo"
              @change="handleChoseLink"
              @clear="handleClear"
              class="label-warp"
            >
              <div
                class="display-flex align-items-center label-input"
                slot="prefix"
                v-if="form.mediaId"
              >
                <img
                  v-if="welcomecontentT.imgId"
                  style="width:24px;height:24px"
                  :src="'/api/public/file/'+welcomecontentT.imgId"
                  alt
                />
                <div class="input-title">
                  <span>{{welcomecontentT.title}}</span>
                  <div class="input-content text-over">{{welcomecontentT.description}}</div>
                </div>
              </div>
              <el-option
                v-for="(item,index) in articleListSelect"
                :key="index"
                :label="item.title"
                :value="item.uuid"
              >
                <div class="option-warp flex-between-alinecenter">
                  <div class="link-img">
                    <img class="option-img" :src="'/api/public/file/'+item.imgId" />
                  </div>
                  <div class="option-content flex-1">
                    <p>{{ item.title }}</p>
                    <p>{{ item.description}}</p>
                  </div>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </el-form-item>

    <el-form-item label="重复回复" v-show="isSetAuto == false">
      <div class="flex-alinecenter">
        <el-t-button
          type="text"
          size="mini"
          style="padding:0 15px 0 0"
          :popAuth="true"
          :auth="permissionMap['automatic']['automatic_switchReplyInterval']"
        >
          <div class="display-flex align-items-center">
            <span class="font-es mr-15">{{repeat?'开启':'关闭'}}</span>
            <el-switch v-model="repeat" @change="handleChangeRepeatTime"></el-switch>
          </div>
        </el-t-button>
      </div>
    </el-form-item>
    <el-form-item v-show="isSetAuto == false">
      <div class="flex-alinecenter">
        <span class="mr-10">同一内容在</span>
        <el-select
          v-model="repeatTime"
          placeholder="请选择"
          style="width:100px"
          :disabled="!repeat"
          @change="handleChangeRepeatTime"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="ml-10">内对同一客户不再重复回复</span>
      </div>
    </el-form-item>

    <div class="text-align-center" v-show="isSetAuto == true">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
import ComplexSelect from "@/components/ComplexSelect";
import AsyncUserTag from "@/components/AsyncUserTag";

import inputEdit from "@/components/inputEdit";

import TagMultiSelect from "@/components/TagMultiSelect";

export default {
  inject: ["reload"],
  components: {
    AsyncUserTag,
    ComplexSelect,
    inputEdit,
    TagMultiSelect,
  },
  data() {
    return {
      repeat: false,
      isSetAuto: false,
      value1: false,
      repeatTime: "30",
      options: [
        {
          value: "30",
          label: "30分钟",
        },
        {
          value: "60",
          label: "60分钟",
        },
        {
          value: "90",
          label: "90分钟",
        },
        {
          value: "120",
          label: "2小时",
        },
        {
          value: "180",
          label: "3小时",
        },
        {
          value: "240",
          label: "4小时",
        },
        {
          value: "300",
          label: "5小时",
        },
        {
          value: "360",
          label: "6小时",
        },
      ],
      // type: "",

      // 回复内容
      form: {
        autoReplyType: "CONTENT",
        mediaId: "",
        reply: "",
        fileName: "",
      },
      fileList: [],
      messageImage: "",
      messageVideo: "",
      messageFile: "",
      welcomecontentT: {},
      rules: {
        rule: [{ required: true, message: "请输入规则名称", trigger: "blur" }],
        keyword: [
          { required: true, message: "请输入关键词", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      // 标签
      selectTags: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      permissionMap: (state) => state.permission.permissionMap,
      articleListSelect: (state) => state.media.articleListSelect,
      automaticDefaultDetail: (state) => state.automatic.automaticDefaultDetail,
    }),
    toUser() {
      return this.form.toUser;
    },
  },
  mounted() {
    this.initData();
    this.initFilter();
  },
  methods: {
    initData() {
      this.$store
        .dispatch("automatic/automaticDefaultDetail")
        .then(() => {})
        .catch((err) => {});
    },
    initFilter() {
      this.$store
        .dispatch("media/getArticleListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    handleConfirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.autoReplyType != "FILE") {
            this.form.fileName = "";
          }
          const payload = this.form;
          this.$store
            .dispatch("automatic/automaticAddDefault", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "新建成功",
              });
              this.isSetAuto = false;
              this.initData();
              // this.handleCancel();
              // this.refresh();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err || "新建失败",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请检查输入",
          });
        }
      });
    },
    changeAutoReplyType(val) {
      this.form.mediaId = "";
    },
    handleChangeRepeatTime(val) {
      let payload = { flag: this.repeat, interval: this.repeatTime };
      this.$store
        .dispatch("automatic/automaticSwitchReplyInterval", payload)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setAutoRepaly() {
      this.isSetAuto = true;
      this.$nextTick(() => {
        if (this.automaticDefaultDetail.autoReplyType == "FILE") {
          this.fileList = [];
          if (this.automaticDefaultDetail.mediaUrl) {
            this.fileList.push({
              name: this.automaticDefaultDetail.fileName,
              url: this.automaticDefaultDetail.mediaUrl,
            });
          }
        }
        if (this.automaticDefaultDetail.autoReplyType == "IMAGE") {
          this.messageImage = this.automaticDefaultDetail.mediaUrl;
        }
        if (this.automaticDefaultDetail.autoReplyType == "ARTICLE") {
          this.form.mediaId = Number(this.automaticDefaultDetail.mediaId);
          this.handleChoseLink(this.form.mediaId);
        } else {
          this.form.mediaId = this.automaticDefaultDetail.mediaId;
        }
        this.form.autoReplyType = this.automaticDefaultDetail.autoReplyType
          ? this.automaticDefaultDetail.autoReplyType
          : "CONTENT";

        this.form.reply = this.automaticDefaultDetail.replyWord;
      });
    },
    // 回复内容 上传
    handleSetMessageImage(res, file) {
      this.messageImage = URL.createObjectURL(file.raw);
      this.form.mediaId = res.id;
    },
    handleSetMessageFile(res, file) {
      console.log(file);
      this.messageFile = URL.createObjectURL(file.raw);
      this.form.mediaId = res.id;
      this.form.fileName = res.name;
    },
    beforeUploadImage(file) {
      // 图片上传
      const types = ["image/jpeg", "image/gif", "image/png"];
      const isJPG = types.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // beforeUploadVideo(file) {
    //   const isMP4 = file.type === "video/mp4";
    //   const isLt50M = file.size / 1024 / 1024 < 50;

    //   if (!isMP4) {
    //     this.$message.error("上传视频只能是 MP4 格式!");
    //   }
    //   if (!isLt50M) {
    //     this.$message.error("上传视频大小不能超过 50MB!");
    //   }
    //   return isMP4 && isLt50M;
    // },
    beforeUploadFile(file) {
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过 50MB!");
      }
      return isLt50M;
    },
    beforeRemoveFile(file) {
      this.messageFile = "";
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClear() {
      this.form.mediaId = "";
      this.welcomecontentT = {};
    },
    removeFile(file) {
      this.messageFile = "";
      this.form.mediaId = null;
    },
    handleDelMessageImage() {
      this.messageImage = "";
      this.form.mediaId = null;
    },
    handleDelMessageVideo() {
      this.messageVideo = "";
      this.form.mediaId = null;
    },
    handleDelMessageFile() {
      this.messageFile = "";
      this.form.mediaId = null;
    },
    handleChoseLink(val) {
      this.welcomecontentT = this.articleListSelect.find((item) => {
        return item.uuid === val;
      });
      if (this.welcomecontentT && this.welcomecontentT.uuid) {
        this.form.mediaId = this.welcomecontentT.uuid;
      }
    },
    // 取消配置默认自动回复
    handleCancel() {
      this.isSetAuto = false;
      // this.$parent.$parent.dialogVisible = false;
    },
    // 标签绑定事件
    handleChange() {},
    // 刷新
    refresh() {
      this.$store
        .dispatch("sensitive/getSensitiveListAll")
        .then(() => {
          this.reload();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.set-auto-replay {
  cursor: pointer;
}
.msg-textarea-box {
  // width: 48%;
  background: #fbfbfb;
  border-radius: 2px;
  border: 1px solid #eee;
  font-size: 14px;
  line-height: 20px;
  -webkit-box-flex: 1;
  flex: 1;
  .re-chose {
    // margin-top: 145px;
    position: absolute;
    right: -60px;
    bottom: 0;
    color: #1890ff;
    cursor: pointer;
  }
  .insert-btn {
    border-bottom: 1px dashed #e9e9e9;
    padding: 6px 15px;
    color: #e8971d;
    .clickable {
      // cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .textarea-box {
    padding: 6px 13px;
    span {
      color: #e8971d;
    }
  }
  .message-box-content {
    padding: 6px 15px;
  }
}
.message-content {
  .el-select-dropdown {
    .el-select-dropdown__item {
      height: auto;
      line-height: 1px;
    }
  }
}
.option-warp {
  img.option-img {
    width: 46px;
    height: 46px;
  }
  .option-content {
    margin-left: 10px;
    color: #8492a6;
    font-size: 13px;
    line-height: 20px;
  }
}

.label-warp {
  .el-input__prefix {
    width: 90%;
  }
  .label-input {
    background-color: #fff;
    color: #606266;
    font-size: 13px;
    height: 30px;
    outline: 0;
    padding: 0px 15px;
    margin-top: 1px;
    width: 95%;
    .input-title {
      margin-left: 5px;
      font-size: 12px;
      line-height: 14px;
      text-align: left;
      width: 95%;
    }
    .input-content {
      width: 450px;
      height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

// .contact-way-detail {
.message-content {
  margin: 20px 0;
  .img-warp {
    position: relative;
    width: 165px;
    height: 165px;
    .close {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 18px;
      cursor: pointer;
      color: #d5d5d5;
    }
  }
}

.el-textarea .el-textarea__inner {
  border: none;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
.contact-way-detail-feature-set {
  .avatar-uploader {
    position: absolute;
    left: 185px;
    bottom: 0px;
    .upload-img {
      width: 66px;
      height: 66px;
      text-align: center;
      vertical-align: middle;
      span {
        font-size: 12px;
        line-height: 20px;
      }
    }
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 18px;
      line-height: 18px;
      color: #8c939d;
      text-align: center;
    }
    .avatar {
      width: 66px;
      height: 66px;
      display: block;
    }
  }
}
</style>

<style lang="scss">
.message-content {
  .el-select-dropdown {
    .el-select-dropdown__item {
      height: auto;
      line-height: 1px;
    }
  }
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 165px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar {
  width: 165px;
  height: 165px;
  display: block;
}
</style>

