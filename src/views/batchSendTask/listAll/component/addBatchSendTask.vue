<template>
  <div>
    <section class="contact-way-detail app-container">
      <div class="contact-way-detail-warp">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
          <div>
            <h5>基本信息</h5>
            <el-form-item label="选择群发类型：">
              <el-radio-group v-model="form.sendType">
                <el-radio :label="'WX'">
                  企业微信群发
                  <el-tooltip placement="right">
                    <div slot="content">添加成为用户后，将自动打上预设标签</div>
                    <i class="el-icon-question tip"></i>
                  </el-tooltip>
                </el-radio>
                <el-radio :label="'MY'">
                  超盈群发
                  <el-tooltip placement="right">
                    <div slot="content">添加成为用户后，将自动打上预设标签</div>
                    <i class="el-icon-question tip"></i>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label=" ">
              <span>同一个企业每个自然月内仅可针对一个客户/客户群发4条消息，超过限制的用户将会被忽略。</span>
            </el-form-item>
            <el-form-item label="选择群发账号：" prop="userUuid">
              <el-select v-model="form.userUuid" placeholder="请选择" @change="changeUser">
                <el-option
                  v-for="item in userListAll"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid"
                ></el-option>
              </el-select>
            </el-form-item>

            <div class="run-way-list-all-header">
              <el-form-item label="客户标签：">
                <div class="tag-border">
                  <el-select v-model="query.tagIds" @change="initDataList" size="mini" multiple>
                    <el-option-group
                      v-for="item in tagListSelect"
                      :key="item.groupId"
                      :label="item.groupName"
                    >
                      <el-option
                        v-for="child in item.tagList"
                        :key="child.uuid"
                        :label="child.tagName"
                        :value="child.uuid"
                      ></el-option>
                    </el-option-group>
                  </el-select>
                  <span class="tag-warp">
                    <el-radio-group v-model="query.flag" @change="initDataList">
                      <el-radio :label="true">包含任一</el-radio>
                      <el-radio :label="false">完全匹配</el-radio>
                    </el-radio-group>
                    <el-tooltip placement="right">
                      <div slot="content">
                        包含任一：有任意一个选择的标签的用户;
                        <br />完全匹配：必须拥有全部选择的标签的用户。
                      </div>
                      <i class="el-icon-question tip"></i>
                    </el-tooltip>
                  </span>
                </div>
              </el-form-item>
            </div>

            <h5>编辑群发消息</h5>

            <div class="set-welcome-message">
              <el-form-item label="文字消息：">
                <div class="msg-textarea-box full-w">
                  <div class="insert-btn">
                    <el-button
                      type="text"
                      class="clickable no-select"
                      :disabled="!insertName"
                      @click="insertionMemberName(memberNick)"
                    >[插入客户昵称]</el-button>
                  </div>
                  <inputEdit ref="chatInput" v-model="form.text" style="height:200px" />
                </div>
              </el-form-item>
            </div>

            <div class="set-welcome-message">
              <el-form-item label="图片/文章/链接:">
                <div class="msg-textarea-box full-w">
                  <div class="message-box-content">
                    <el-radio-group v-model="form.tempMediaType">
                      <el-radio :label="'IMAGE'">图片</el-radio>
                      <el-radio :label="'VIDEO'">视频</el-radio>
                      <el-radio :label="'FILE'">文件</el-radio>
                      <el-radio :label="'ARTICLE'">文章</el-radio>
                    </el-radio-group>

                    <!-- 上传图片 -->
                    <section
                      class="message-content display-flex"
                      v-show="form.tempMediaType == 'IMAGE'"
                    >
                      <div class="img-warp">
                        <el-upload
                          class="avatar-uploader"
                          action="/api/upload"
                          :show-file-list="false"
                          :on-success="handleSetMessageImage"
                          :before-upload="beforeUploadImage"
                        >
                          <img v-if="messageImage" :src="messageImage" class="avatar" />
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
                    <section
                      class="message-content display-flex"
                      v-show="form.tempMediaType == 'VIDEO'"
                    >
                      <div class="img-warp">
                        <el-upload
                          class="avatar-uploader"
                          action="/api/upload"
                          :show-file-list="false"
                          :on-success="handleSetMessageVideo"
                          :before-upload="beforeUploadVideo"
                        >
                          <video
                            v-if="messageVideo"
                            controls="controls"
                            :src="messageVideo"
                            class="avatar"
                          ></video>
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <i
                          class="el-icon-circle-close close"
                          v-if="messageVideo"
                          @click.stop="handleDelMessageVideo"
                        ></i>
                      </div>
                    </section>

                    <!-- 上传文件 -->
                    <section
                      class="message-content display-flex"
                      v-show="form.tempMediaType == 'FILE'"
                    >
                      <div class="img-warp">
                        <el-upload
                          class="avatar-uploader"
                          action="/api/upload"
                          :on-success="handleSetMessageFile"
                          :before-upload="beforeUploadFile"
                          :before-remove="beforeRemoveFile"
                          :on-remove="removeFile"
                        >
                          <el-button size="small" type="primary" v-show="!messageFile">点击上传</el-button>
                          <!-- <i
                            class="el-icon-circle-close close"
                            v-if="messageFile"
                            @click.stop="handleDelMessageFile"
                          ></i>-->
                        </el-upload>
                      </div>
                    </section>

                    <div class="message-content" v-show="form.tempMediaType == 'ARTICLE'">
                      <el-select
                        :popper-append-to-body="false"
                        v-model="form.mediaUuid"
                        clearable
                        placeholder="请选择"
                        style="width:80%"
                        popper-class="selectinfo"
                        @change="handleChoseLink"
                        @clear="handleClear"
                        class="label-warp"
                      >
                        <div
                          class="display-flex align-items-center label-input"
                          slot="prefix"
                          v-if="form.mediaUuid"
                        >
                          <img
                            style="width:20px;height:20px"
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
            </div>

            <el-form-item label="群发时间：">
              <el-radio v-model="isSendImmediately" :label="true">立即发送</el-radio>
              <el-radio v-model="isSendImmediately" :label="false">定时发送</el-radio>
              <el-date-picker
                v-model="form.sendTime"
                :disabled="isSendImmediately"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import inputEdit from "@/components/inputEdit";
import { getExternalUserListAll } from "@/api/externalUser";
export default {
  inject: ["reload"],
  components: { inputEdit },
  data() {
    return {
      isSendImmediately: true,
      rules: {
        userUuid: [
          { required: true, message: "请选择群发账号", trigger: "change" }
        ]
      },
      query: {
        flag: true,
        tagIds: [],
        size: 500,
        userId: ""
      },
      form: {
        batchTaskNumber: 0,
        externalUserUuids: [],
        mediaUuid: null,
        sendType: "MY",
        tagNames: "",
        tagUuids: [],
        tempMediaKey: "",
        tempMediaType: "IMAGE",
        text: "",
        userUuid: "",

        sendTime: ""
      },

      insertName: true,
      messageImage: "",
      messageVideo: "",
      messageFile: "",

      mediaId: "",
      welcomecontentT: {},
      memberNick: "客户昵称"
    };
  },
  created() {
    this.$store
      .dispatch("media/getArticleListSelect")
      .then(() => {})
      .catch(err => {
        this.$message({
          type: "error",
          message: "初始化失败"
        });
      });

    this.$store
      .dispatch("tag/getListSelect")
      .then(() => {})
      .catch(err => {
        this.$message({
          type: "error",
          message: err
        });
      });

    this.$store
      .dispatch("user/getUserListSelect")
      .then(() => {})
      .catch(err => {
        this.$message({
          type: "error",
          message: err
        });
      });

    // this.$store
    //   .dispatch("media")
    //   .then(() => {})
    //   .catch(err => {
    //     this.$message({
    //       type: "error",
    //       message: err
    //     });
    //   });
  },
  watch: {
    "form.text": {
      handler(newVal, oldVal) {
        if (newVal.indexOf('<span class="nickName">客户昵称</span>') > -1) {
          this.insertName = false;
        } else {
          this.insertName = true;
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      tagListSelect: state => state.tag.tagListSelect,
      userListAll: state => state.user.listSelect,
      articleListSelect: state => state.media.articleListSelect
    })
  },
  methods: {
    changeUser(userUuid) {
      for (let index = 0; index < this.userListAll.length; index++) {
        if (this.userListAll[index].uuid == userUuid) {
          this.query.userId = this.userListAll[index].userId;
          break;
        }
      }
      this.initDataList();
    },
    initDataList() {
      let query = {
        ...this.query,
        tagIds: this.query.tagIds.toString()
      };
      this.form.batchTaskNumber = 0;
      this.form.externalUserUuids = [];

      getExternalUserListAll(query).then(res => {
        this.form.batchTaskNumber = res.total;
        res.items.map(obj => {
          this.form.externalUserUuids.push(obj.externalUuid);
        });
      });
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    refresh() {
      this.$store
        .dispatch("batchSendTask/getBatchSendTaskListAll")
        .then(() => {
          this.reload();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("batchSendTask/addBatchSendTask", this.form)
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleCancel();
              this.refresh();
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "操作失败"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请检查输入"
          });
        }
      });
    },
    handleSetMessageImage(res, file) {
      this.messageImage = URL.createObjectURL(file.raw);
      this.form.tempMediaKey = res.id;
    },
    handleSetMessageVideo(res, file) {
      this.messageVideo = URL.createObjectURL(file.raw);
      this.form.tempMediaKey = res.id;
    },
    handleSetMessageFile(res, file) {
      this.messageFile = URL.createObjectURL(file.raw);
      this.form.tempMediaKey = res.id;
    },
    beforeUploadImage(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeUploadVideo(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isMP4) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过 50MB!");
      }
      return isMP4 && isLt50M;
    },
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
    removeFile(file) {
      this.messageFile = "";
      this.form.tempMediaKey = null;
    },
    handleDelMessageImage() {
      this.messageImage = "";
      this.form.tempMediaKey = null;
    },
    handleDelMessageVideo() {
      this.messageVideo = "";
      this.form.tempMediaKey = null;
    },
    handleDelMessageFile() {
      this.messageFile = "";
      this.form.tempMediaKey = null;
    },
    handleChoseLink(val) {
      this.welcomecontentT = this.articleListSelect.find(item => {
        return item.uuid === val;
      });
      if (this.welcomecontentT && this.welcomecontentT.uuid) {
        this.form.mediaUuid = this.welcomecontentT.uuid;
      }
    },
    handleClear() {
      this.form.mediaUuid = "";
      this.welcomecontentT = {};
    },
    insertionMemberName(memberNick) {
      this.insertName = false;
      this.form.text =
        this.form.text + `<span class="nickName">${memberNick}</span>&#8203;`;
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-way-detail {
  .contact-way-detail-warp {
    h5 {
      line-height: 40px;
      border-bottom: 1px solid #ececec;
      margin-bottom: 20px;
    }
    .tag-warp {
      position: relative;
      max-width: 100%;
      min-height: 50px;
      background: #fbfbfb;
      border-radius: 4px;
      border: 1px solid #eee;
      padding: 14px 18px;
      .is-show {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      .tag-list-warp {
        .lg-42 {
          line-height: 32px;
        }
      }
    }
  }
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
      width: 48%;
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
  }
}

.run-way-list-all-header {
  .tag-border {
    border: 1px solid #dcdfe6;
    padding: 1px 5px;
    border-radius: 4px;
  }
  .tag-warp {
    margin-left: 10px;
    border: none !important;
    padding: 0 !important;
    i.tip {
      margin-left: 5px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .handle-warp .el-form-item {
    margin-bottom: 0px;
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

<style lang='scss'>
.default-wel {
  .el-form-item__content {
    line-height: 16px;
  }
}
img.option-img {
  width: 46px;
  height: 46px;
}
.option-content {
  margin-left: 10px;
  color: #8492a6;
  font-size: 13px;
  line-height: 14px;
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
      font-size: 13px;
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
.contact-way-detail {
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
}
</style>