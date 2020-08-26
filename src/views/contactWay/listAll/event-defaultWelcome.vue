<!--
 * @Author: your name
 * @Date: 2020-07-31 11:00:20
 * @LastEditTime: 2020-08-11 11:23:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\automatic\event-creatSet.vue
--> 
<template>
  <el-form :model="form" ref="form" label-width="100px" label-position="left">
    <div class="set-welcome-message">
      <el-form-item label="欢迎语1:">
        <div class="msg-textarea-box full-w">
          <div class="insert-btn">
            <el-button
              type="text"
              class="clickable no-select"
              :disabled="!insertName"
              @click="insertionMemberName(memberNick)"
            >[插入客户昵称]</el-button>
          </div>
          <inputEdit ref="chatInput" v-model="form.welcomeContent" style="height:200px" />
          <!-- <el-input
                  contenteditable="true"
                  type="textarea"
                  :rows="6"
                  maxlength="1000"
                  show-word-limit
                  placeholder="请输入内容"
                  v-model="form.welcomeContent"
          ></el-input>-->
        </div>
      </el-form-item>
      <el-form-item label="欢迎语2:">
        <div class="msg-textarea-box full-w">
          <div class="message-box-content">
            <el-radio-group v-model="form.welComeMediaType" @change="changeWelComeMediaType">
              <el-radio :label="'IMG'">图片</el-radio>
              <el-radio :label="'LINK'">链接</el-radio>
            </el-radio-group>
            <section class="message-content display-flex" v-if="form.welComeMediaType == 'IMG'">
              <div class="img-warp">
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleSetMessageImage"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="messageImage" :src="messageImage" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <el-button size="small" type="text" v-if="messageImage" class="re-chose">重新上传</el-button>
                </el-upload>
                <i
                  class="el-icon-circle-close close"
                  v-if="messageImage"
                  @click.stop="handleDelMessageImage"
                ></i>
              </div>
            </section>
            <div class="message-content" v-if="form.welComeMediaType == 'LINK'">
              <el-select
                :popper-append-to-body="false"
                v-model="form.welcomeMediaContent"
                clearable
                placeholder="请选择"
                style="width:100%"
                popper-class="selectinfo"
                @change="handleChoseLink"
                class="label-warp"
              >
                <div
                  class="display-flex align-items-center label-input"
                  slot="prefix"
                  v-if="form.welcomeMediaContent"
                >
                  <img
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
                      <p>{{item.description}}</p>
                    </div>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-form-item>
    </div>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";

import inputEdit from "@/components/inputEdit";
import { number } from "echarts/lib/export";

export default {
  components: {
    inputEdit,
  },
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        welcomeContent: "",
        welcomeMediaContent: "",
        welComeMediaType: "IMG",
      },
      // 设置欢迎语
      messageImage: "",
      mediaId: "",
      mediaUuid: "",
      insertName: true,
      welcomecontentT: {},
      memberNick: "客户昵称",
      rules: {
        welcomeContent: [
          { required: true, message: "请输入欢迎语内容", trigger: "blur" },
        ],
        welcomeMediaContent: [
          {
            required: true,
            message: "请添加内容",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        this.form.welComeMediaType = newVal.welComeMediaType
          ? newVal.welComeMediaType
          : "IMG";
        this.form.welcomeContent = newVal.welcomeContent
          ? newVal.welcomeContent
          : "";
        if (newVal.welComeMediaType == "LINK") {
          this.form.welcomeMediaContent = Number(newVal.welcomeMediaContent);
          this.welcomecontentT = this.articleListSelect.find((item) => {
            return item.uuid === this.form.welcomeMediaContent;
          });
        } else {
          this.messageImage = newVal.welcomeMediaContent
            ? newVal.welcomeMediaContent
            : "";
          this.form.welcomeMediaContent = newVal.welcomeMediaContent
            ? newVal.welcomeMediaContent
            : "";
        }
      },
      immediate: true,
    },
    "form.welcomeContent": {
      handler(newVal, oldVal) {
        if (newVal) {
          if (newVal.indexOf('<span class="nickName">客户昵称</span>') > -1) {
            this.insertName = false;
          } else {
            this.insertName = true;
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      articleListSelect: (state) => state.media.articleListSelect,
    }),
  },
  mounted() {
    // this.initData();
  },
  methods: {
    initData() {
      this.$store
        .dispatch("automatic/automaticDefaultDetail")
        .then(() => {})
        .catch((err) => {});
    },
    changeWelComeMediaType() {
      this.form.welcomeMediaContent = "";
    },
    beforeAvatarUpload(file) {
      console.log(file, "file");
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
    insertionMemberName(memberNick) {
      this.insertName = false;
      this.form.welcomeContent =
        this.form.welcomeContent +
        `<span class="nickName">${memberNick}</span>&#8203;`;
    },
    handleConfirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form.welcomeMediaContent, "9999");
          if (!this.form.welcomeMediaContent && !this.form.welcomeContent) {
            this.$message({
              type: "error",
              message: "欢迎语文本或图片链接不能为空",
            });
            return;
          }
          if (
            this.form.welcomeMediaContent &&
            this.form.welcomeMediaContent.toString().indexOf("file/") > 0
          ) {
            this.form.welcomeMediaContent = this.form.welcomeMediaContent.split(
              "file/"
            )[1];
          }
          const payload = this.form;
          this.$store
            .dispatch("contactWay/contactWayEditDefaultWelcome", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "新建成功",
              });
              this.handleCancel();
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
      this.form.welcomeMediaContent = res.id;
    },
    handleSetMessageFile(res, file) {
      console.log(file);
      this.messageFile = URL.createObjectURL(file.raw);
      this.form.welcomeMediaContent = res.id;
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
    handleDelMessageImage() {
      this.messageImage = "";
      this.form.welcomeMediaContent = null;
    },
    handleChoseLink(val) {
      this.welcomecontentT = this.articleListSelect.find((item) => {
        return item.uuid === val;
      });
      if (this.welcomecontentT && this.welcomecontentT.uuid) {
        this.form.welcomeMediaContent = this.welcomecontentT.uuid;
      }
    },
    // 取消配置默认自动回复
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.set-welcome-message {
  .warning {
    color: #faad14;
  }
  div.tip {
    width: 50%;
    margin-left: 40px;
    font-size: 14px;
    background: #fff7f0;
    border-radius: 3px;
    padding: 14px 6px 14px 13px;
    margin-right: 16px;
    margin-bottom: 24px;
    color: #b5692d;
    word-break: break-all;
  }
  .msg-textarea-box {
    background: #fbfbfb;
    border-radius: 2px;
    border: 1px solid #eee;
    font-size: 14px;
    line-height: 20px;
    -webkit-box-flex: 1;
    flex: 1;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 165px;
      height: 165px;
      line-height: 178px;
      text-align: center;
    }
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
      padding: 10px 15px;
    }
  }
}
</style>

<style lang="scss">
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
  }
  .avatar {
    width: 165px;
    height: 165px;
    display: block;
  }
  .label-warp {
    .el-input__prefix {
      width: 94%;
    }
    .label-input {
      background-color: #fff;
      color: #606266;
      font-size: 13px;
      height: 30px;
      outline: 0;
      padding: 0px 15px;
      margin-top: 1px;
      width: 100%;
      .input-title {
        margin-left: 5px;
        font-size: 12px;
        line-height: 14px;
        text-align: left;
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
  img.option-img {
    width: 40px;
    height: 40px;
  }
  .option-content {
    margin-left: 10px;
    color: #8492a6;
    font-size: 13px;
    line-height: 14px;
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
</style>

