<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="规则名称" prop="rule" maxlength="15" show-word-limit>
      <el-input v-model.trim="form.rule" placeholder="请输入规则名称"></el-input>
    </el-form-item>

    <el-form-item label="关键词" prop="keyWord">
      <el-input v-model.trim="form.keyword">
        <el-select v-model="form.keyType" slot="prepend" placeholder="请选择" style="width:100px">
          <el-option label="包含" value="CONTAIN"></el-option>
          <el-option label="完全匹配" value="COMPLETE"></el-option>
          <!-- <el-option label="用户电话" value="3"></el-option> -->
        </el-select>
      </el-input>
    </el-form-item>

    <!-- <el-form-item label="回复内容">
      

     
    </el-form-item>-->

    <el-form-item label="文字消息">
      <!-- <div class="set-welcome-message"> -->
      <div class="full-w">
        <el-input
          v-model="form.reply"
          type="textarea"
          :rows="6"
          maxlength="500"
          show-word-limit
          placeholder="请输入文字消息"
        ></el-input>
        <!-- <div class="insert-btn">
          <el-button
            type="text"
            class="clickable no-select"
            :disabled="!insertName"
            @click="insertionMemberName(memberNick)"
          >[插入客户昵称]</el-button>
        </div>-->
        <!-- <inputEdit ref="chatInput" v-model="form.reply" style="height:200px" /> -->
      </div>
      <!-- </div> -->
    </el-form-item>

    <el-form-item label="图片/文章/链接">
      <div class="msg-textarea-box full-w">
        <div class="message-box-content">
          <el-radio-group v-model="form.autoReplyType">
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
                <!-- <img v-if="messageImage" :src="messageImage" class="avatar" /> -->
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
                <el-button size="small" type="primary" v-show="!messageFile">点击上传</el-button>
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

    <el-form-item label="配置标签">
      <el-radio-group v-model="form.autoReplyTagType">
        <el-radio label="CONTAIN">包含其一</el-radio>
        <el-radio label="COMPLETE">完全匹配</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label=" ">
      <tag-multi-select v-model="form.tagIdList" @select-change="handleChange"></tag-multi-select>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
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
      fileList: [],
      type: "",
      // userSelects: [],
      // tagSelects: [],
      // inputVisible: false,
      // inputValue: "",

      // 回复内容
      form: {
        autoReplyTagType: "CONTAIN",
        autoReplyType: "CONTENT",
        fileName: "",
        keyType: "CONTAIN",
        keyword: "",
        mediaId: "",
        reply: "",
        rule: "",
        tagIdList: [0],
        // rule: "",
        // keyword: "",
        // tagType: "INSET",
        // text: "",
        // tempMediaType: "",
        // mediaUuid: "",
      },

      insertName: true,
      messageImage: "",
      messageVideo: "",
      messageFile: "",
      mediaId: "",
      welcomecontentT: {},

      memberNick: "客户昵称",
      // toUserTags: [],
      // toRoles: [],
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
  watch: {
    // "form.reply": {
    //   handler(newVal, oldVal) {
    //     if (newVal.indexOf('<span class="nickName">客户昵称</span>') > -1) {
    //       this.insertName = false;
    //     } else {
    //       this.insertName = true;
    //     }
    //   },
    //   immediate: true,
    // },
    // "form.informType": {
    //   handler(newVal, oldVal) {
    //     if (newVal == "ROLE") {
    //       this.$set(this.form, "toRole", []);
    //       this.$delete(this.form, "toUser");
    //     }
    //     if (newVal == "USER") {
    //       this.$set(this.form, "toUser", []);
    //       this.$delete(this.form, "toRole");
    //     }
    //   },
    //   immediate: true,
    // },
    // toUser: {
    //   handler(newValue, oldVal) {
    //     this.toUserTags = this.userListSelect.filter(item => {
    //       return newValue.some(key => {
    //         return item.userId === key
    //       })
    //     })
    //   },
    //   deep: true
    // },
    // toUserTags: {
    //   handler(newValue, oldVal) {},
    //   deep: true,
    // },
  },
  computed: {
    ...mapState({
      articleListSelect: (state) => state.media.articleListSelect,
    }),
    toUser() {
      return this.form.toUser;
    },
  },
  mounted() {
    this.initFilter();
  },
  methods: {
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

      // this.$store
      //   .dispatch("role/getRoleListSelect")
      //   .then(() => {})
      //   .catch((err) => {
      //     this.$message({
      //       type: "error",
      //       message: err || "初始化失败",
      //     });
      //   });

      // this.$store
      //   .dispatch("department/getDepartmentListAll")
      //   .then(() => {})
      //   .catch((err) => {
      //     this.$message({
      //       type: "error",
      //       message: err || "初始化失败",
      //     });
      //   });

      // this.$store
      //   .dispatch("tag/getListSelect")
      //   .then(() => {})
      //   .catch((err) => {
      //     this.$message({
      //       type: "error",
      //       message: err || "初始化失败",
      //     });
      //   });
    },
    handleConfirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.autoReplyType != "FILE") {
            this.form.fileName = "";
          }
          const payload = this.form;
          this.$store
            .dispatch("automatic/add", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "新建成功",
              });
              this.handleCancel();
              this.initDataList();
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
    // 插入 客户名称
    insertionMemberName(memberNick) {
      this.insertName = false;
      this.form.reply =
        this.form.reply + `<span class="nickName">${memberNick}</span>&#8203;`;
    },
    // 回复内容 上传
    handleSetMessageImage(res, file) {
      this.messageImage = URL.createObjectURL(file.raw);
      this.form.mediaId = res.id;
    },
    // handleSetMessageVideo(res, file) {
    //   this.messageVideo = URL.createObjectURL(file.raw);
    //   this.form.mediaId = res.id;
    // },
    handleSetMessageFile(res, file) {
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
    // 关闭弹框
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    // 标签绑定事件
    handleChange() {},
    // 刷新
    initDataList() {
      this.$store
        .dispatch("automatic/getListAll")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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

