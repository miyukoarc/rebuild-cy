<!--
 * @Author: your name
 * @Date: 2020-08-03 10:13:30
 * @LastEditTime: 2020-08-10 15:24:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\automatic\listAll\event-detail.vue
--> 
<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="规则名称" prop="rule" maxlength="15" show-word-limit>
      <el-input v-model.trim="form.rule" placeholder="请输入规则名称"></el-input>
    </el-form-item>

    <el-form-item label="关键词" prop="keyword">
      <el-input v-model.trim="form.keyword">
        <el-select v-model="form.keyType" slot="prepend" placeholder="请选择" style="width:100px">
          <el-option label="包含" value="CONTAIN"></el-option>
          <el-option label="完全匹配" value="COMPLETE"></el-option>
        </el-select>
      </el-input>
    </el-form-item>

    <el-form-item label="文字消息" prop="reply">
      <div class="full-w">
        <el-input v-model="form.reply" type="textarea" :rows="6" placeholder="请输入文字消息"></el-input>
      </div>
    </el-form-item>

    <el-form-item label="图片/文章/链接">
      <div class="msg-textarea-box full-w">
        <div class="message-box-content">
          <el-radio-group v-model="form.autoReplyType" @change="changeAutoReplyType">
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

          <!-- 上传文件 -->
          <section class="message-content display-flex" v-if="form.autoReplyType == 'FILE'">
            <!-- <div class="img-warp"> -->
            <el-upload
              action="/api/upload"
              :on-success="handleSetMessageFile"
              :on-remove="handleRemove"
              :before-upload="beforeUploadFile"
              :before-remove="beforeRemoveFile"
              multiple
              :limit="1"
              :show-file-list="true"
              :file-list="fileList"
            >
              <el-button size="small" type="primary" v-show="fileList.length<=0">点击上传</el-button>
            </el-upload>
            <!-- </div> -->
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
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
      // 回复内容
      form: {
        autoReplyTagType: "CONTAIN",
        autoReplyType: "CONTENT",
        keyType: "CONTAIN",
        fileName: "",
        keyword: "",
        mediaId: "",
        reply: "",
        rule: "",
        tagIdList: [],
        uuid: "",
      },

      insertName: true,
      messageImage: "",
      messageVideo: "",
      messageFile: "",
      welcomecontentT: {},

      memberNick: "客户昵称",
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
        reply:[{ required: true, message: "请输入规则名称", trigger: "blur" }],
      },
      // 标签
      selectTags: [],
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        console.log(newVal, "3333");
        this.form.autoReplyTagType = newVal.autoReplyTagType;
        this.form.autoReplyType = newVal.autoReplyType;
        this.form.keyType = newVal.keyType;
        this.form.fileName = newVal.fileName;
        this.form.keyword = newVal.keyWord;

        this.form.reply = newVal.replyWord;
        this.form.rule = newVal.ruleWord;
        this.form.uuid = newVal.uuid;
        let tagLists = [];
        if (newVal.autoReplyType == "IMAGE") {
          this.messageImage = newVal.mediaUrl;
        }
        if (newVal.autoReplyType == "FILE") {
          this.fileList = [];
          if (newVal.mediaUrl) {
            this.fileList.push({ name: newVal.fileName, url: newVal.mediaUrl });
          }
        }
        if (newVal.autoReplyType == "ARTICLE") {
          this.form.mediaId = Number(newVal.mediaId);
          this.handleChoseLink(this.form.mediaId);
        } else {
          this.form.mediaId = newVal.mediaId;
        }
        if (
          JSON.stringify(newVal.autoReplyTags) != "{}" &&
          Object.values(newVal.autoReplyTags).length > 0
        ) {
          newVal.autoReplyTags.map((item) => {
            item.tags.map((tag) => {
              tagLists.push(tag.uuid);
            });
          });
        }

        this.form.tagIdList = tagLists;
      },
      // immediate: true,
    },
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
      const payload = this.form;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.autoReplyType != "FILE") {
            this.form.fileName = "";
          }
          console.log(this.form, "8888");
          this.$store
            .dispatch("automatic/automaticUpdate", payload)
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
    changeAutoReplyType(val) {
      this.form.mediaId = "";
    },
    // 回复内容 上传
    handleSetMessageImage(res, file) {
      this.messageImage = URL.createObjectURL(file.raw);
      this.form.mediaId = res.id;
    },
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
    beforeUploadFile(file) {
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过 50MB!");
      }
      return isLt50M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    beforeRemoveFile(file, fileList) {
      console.log("1111", this.fileList, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClear() {
      this.form.mediaId = "";
      this.welcomecontentT = {};
    },
    removeFile(file) {},
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
    min-width: 165px;
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

