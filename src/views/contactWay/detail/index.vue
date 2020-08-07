<!--
 * @Author: your name
 * @Date: 2020-06-11 11:15:45
 * @LastEditTime: 2020-08-06 17:46:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\contactWay\detail.vue
-->
<template>
  <section class="contact-way-detail app-container">
    <el-card class="contact-way-detail-warp">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        class="demo-ruleForm"
      >
        <div class="contact-way-detail-info">
          <h5>基本信息</h5>
          <div class="info-warp">
            <el-form-item label="二维码名称:" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width:400px"
                placeholder="名称不会展示给用户，用于企业记录渠道名称或使用场景"
              />
            </el-form-item>
            <el-form-item label="客服人员:" prop="member">
              <el-select v-model="ruleForm.member" multiple placeholder="请选择">
                <el-option
                  v-for="item in userListAll"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                ></el-option>
              </el-select>
              <span class="tip">同一个二维码可以选择多位成员同时使用</span>
            </el-form-item>
            <el-form-item label="标签：" prop="delivery">
              <el-collapse-transition>
                <div class="tag-warp">
                  <div v-for="(tagGroup,index) in tagData" :key="index" class="tag-list-warp">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :span="5">
                        <span class="lg-42">{{ tagGroup.groupName }}</span>
                      </el-col>
                      <el-col :span="19">
                        <div class="tag-list display-flex align-items-center flex-wrap">
                          <el-checkbox-group
                            v-model="checkboxGroup"
                            size="small"
                            @change="handleCheckedTagsChange(tagGroup,index)"
                          >
                            <el-checkbox-button
                              v-for="(tag,idx) in tagGroup.tagList"
                              :key="idx"
                              :label="tag.uuid"
                              border
                              style="margin-bottom:5px;margin-right:5px"
                            >{{ tag.tagName }}</el-checkbox-button>
                          </el-checkbox-group>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="is-show" @click="isShow = !isShow">
                    <span>{{ isShow?'收起':'展开' }}</span>
                    <i
                      class="el-icon--right"
                      :class="isShow? 'el-icon-arrow-up':'el-icon-arrow-down '"
                    />
                  </div>
                </div>
              </el-collapse-transition>
            </el-form-item>
          </div>
        </div>

        <div class="set-welcome-message">
          <h5>设置欢迎语</h5>
          <div class="info-warp">
            <div class="tip">
              <i class="el-icon-warning warning"></i>
              <span>
                因企业微信限制，若使用成员已在
                <b>「企业微信后台」</b> 配置了欢迎语，这里的欢迎语将不会生效
              </span>
            </div>
            <el-form-item label="设置欢迎语:">
              <el-radio-group v-model="ruleForm.welComeType">
                <el-radio :label="'MYWEL'">渠道欢迎语</el-radio>
                <el-radio :label="'DEFAULTWEL'">默认欢迎语</el-radio>
                <el-radio :label="'DISWEL'">不发送欢迎语</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="欢迎语1:" v-show="ruleForm.welComeType == 'MYWEL'">
              <div class="msg-textarea-box full-w">
                <div class="insert-btn">
                  <el-button
                    type="text"
                    class="clickable no-select"
                    :disabled="!insertName"
                    @click="insertionMemberName(memberNick)"
                  >[插入客户昵称]</el-button>
                </div>
                <inputEdit ref="chatInput" v-model="ruleForm.welcomeContent" style="height:200px" />
                <!-- <el-input
                  contenteditable="true"
                  type="textarea"
                  :rows="6"
                  maxlength="1000"
                  show-word-limit
                  placeholder="请输入内容"
                  v-model="ruleForm.welcomeContent"
                ></el-input>-->
              </div>
            </el-form-item>
            <el-form-item label="欢迎语2:" v-show="ruleForm.welComeType == 'MYWEL'">
              <div class="msg-textarea-box full-w">
                <div class="message-box-content">
                  <el-radio-group v-model="ruleForm.welComeMediaType">
                    <el-radio :label="'IMG'">图片</el-radio>
                    <el-radio :label="'LINK'">链接</el-radio>
                  </el-radio-group>
                  <section
                    class="message-content display-flex"
                    v-show="ruleForm.welComeMediaType == 'IMG'"
                  >
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
                        <el-button
                          size="small"
                          type="text"
                          v-if="messageImage"
                          class="re-chose"
                        >重新上传</el-button>
                      </el-upload>
                      <i
                        class="el-icon-circle-close close"
                        v-if="messageImage"
                        @click.stop="handleDelMessageImage"
                      ></i>
                    </div>
                  </section>
                  <div class="message-content" v-show="ruleForm.welComeMediaType == 'LINK'">
                    <el-select
                      :popper-append-to-body="false"
                      v-model="ruleForm.link"
                      clearable
                      placeholder="请选择"
                      style="width:80%"
                      popper-class="selectinfo"
                      @change="handleChoseLink"
                      class="label-warp"
                    >
                      <div
                        class="display-flex align-items-center label-input"
                        slot="prefix"
                        v-if="ruleForm.link"
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
            <el-form-item
              label=" "
              v-show="ruleForm.welComeType == 'DEFAULTWEL'"
              class="default-wel"
            >
              <span>将发送成员已设置的欢迎语，若所选成员未设置欢迎语，则不会发送欢迎语</span>
            </el-form-item>
          </div>
        </div>

        <div class="contact-way-detail-feature-set">
          <h5>功能设置</h5>
          <div class="info-warp">
            <el-form-item label="自动通过好友:" prop="autoAddFriend">
              <el-switch v-model="ruleForm.autoAddFriend" />
              <el-tooltip
                class="add-friend-tip"
                effect="light"
                content="开启后，客户添加该企业微信时，无需好友验证，将会自动添加成功"
                placement="right-start"
              >
                <i class="el-icon-question" />
              </el-tooltip>
            </el-form-item>
            <!-- <el-form-item label="开启时间:" prop="openTime">
              <el-radio-group v-model="ruleForm.openTime">
                <el-radio label="1">全天开启</el-radio>
                <el-radio label="2">选择时间段</el-radio>
              </el-radio-group>
            </el-form-item>-->
            <!-- <el-form-item label=" " v-show="ruleForm.openTime == '2'">
              <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{start: '07:30',step: '00:15',end: '18:30'}"
              ></el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{start: '07:30',step: '00:15',end: '23:59',minTime: startTime}"
              ></el-time-select>
              <div>在非开启「自动通过好友」时间段添加的好友，需要客服手动通过好友验证后才可添加</div>
            </el-form-item>-->
            <el-form-item label="二维码预览：" prop="qrCode">
              <div class="qr-code display-flex">
                <div class="qr-code-warp">
                  <img :src="qrCode" alt class="img" />
                  <img v-if="imageUrl" :src="imageUrl" alt class="img-p" />
                </div>

                <el-upload
                  class="avatar-uploader"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <div v-else class="upload-img flex-column-center-alinecenter">
                    <i class="el-icon-plus avatar-uploader-icon" />
                    <span>更换头像</span>
                  </div>
                </el-upload>
              </div>
              <div>* 此二维码只是样式预览效果，请勿直接使用</div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import qrCode from "@/assets/0.png";
import { mapState, mapMutations, mapActions } from "vuex";

import inputEdit from "@/components/inputEdit";

export default {
  name: "ContactWayDetail",
  components: {
    inputEdit,
  },
  data() {
    return {
      // way: "", // 编辑 新增
      // 基本信息
      uuid: "", // 回显标签
      isShow: false,
      checkboxGroup: [],
      addNewGroupformData: [],
      ruleForm: {
        name: "",
        member: [],
        options: [],
        autoAddFriend: true,
        openTime: "1",
        welComeType: "MYWEL",
        welcomeContent: "",
        welComeMediaType: "IMG",
        link: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        member: [
          { required: true, message: "请选择客服人员", trigger: "change" },
        ],
      },
      // 设置欢迎语
      messageImage: "",
      mediaId: "",
      mediaUuid: "",
      insertName: true,
      welcomecontentT: {},
      memberNick: "客户昵称",
      // 功能设置
      qrCode: qrCode,
      imageUrl: "",
      imgId: "",
      configId: "",
      startTime: "",
      endTime: "",
    };
  },
  watch: {
    "ruleForm.welcomeContent": {
      handler(newVal, oldVal) {
        if (newVal.indexOf('<span class="nickName">客户昵称</span>') > -1) {
          this.insertName = false;
        } else {
          this.insertName = true;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      tagListSelect: (state) => state.tag.tagListSelect,
      userListAll: (state) => state.user.listSelect,
      articleListSelect: (state) => state.media.articleListSelect,
    }),
    tagData() {
      if (!this.isShow) {
        return this.tagListSelect.filter((item, index) => {
          return index < 3;
        });
      } else {
        return this.tagListSelect;
      }
    },
  },
  created() {
    this.initFilter();
    if (this.$route.query.uuid) {
      if (!this.$route.query.uuid) {
      } else {
        this.uuid = this.$route.query.uuid;
        this.getContactWayDetail(this.uuid);
      }
    }
  },
  methods: {
    getContactWayDetail(uuid) {
      this.$store
        .dispatch("contactWay/getContactWayDetail", uuid)
        .then((res) => {
          this.configId = res.configId;
          this.qrCode = res.qrCode;
          this.ruleForm.name = res.remark;
          this.ruleForm.autoAddFriend = res.skipVerify;
          this.ruleForm.welComeType = res.welComeType;
          this.ruleForm.welcomeContent = res.welcomeContent;
          this.ruleForm.welComeMediaType = res.welComeMediaType;
          if (res.welComeMediaType == "IMG") {
            this.messageImage = res.welcomeMediaContent;
          }
          if (res.welComeMediaType == "LINK") {
            this.ruleForm.link = Number(res.welcomeMediaContent);
            this.welcomecontentT = this.articleListSelect.find((item) => {
              return item.uuid === this.ruleForm.link;
            });
          }
          res.serviceUsers.map((item) => {
            this.ruleForm.member.push(item.userId);
          });
          res.servicesTags.map((item) => {
            this.checkboxGroup.push(item.uuid);
          });
        })
        .catch((err) => {});
    },
    /**
     * 初始化筛选信息
     */
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

      this.$store
        .dispatch("tag/getListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });

      this.$store
        .dispatch("user/getUserListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
      // this.$store
      //   .dispatch('user/getAllUserList')
      //   .then(() => {})
      //   .catch(err => {
      //     this.$message({
      //       type: 'error',
      //       message: '初始化失败'
      //     })
      //   })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            remark: this.ruleForm.name,
            scene: 2,
            skipVerify: this.ruleForm.autoAddFriend,
            tags: this.checkboxGroup,
            type: this.ruleForm.member.length > 1 ? 2 : 1,
            user: this.ruleForm.member,
            welComeMediaType: this.ruleForm.welComeMediaType,
            welComeType: this.ruleForm.welComeType,
            welcomeContent: this.ruleForm.welcomeContent,
          };
          if (this.ruleForm.welComeType != "MYWEL") {
            params.welcomeContent = "";
            params.welComeMediaType = "IMG";
          } else {
            // if (!this.insertName) {
            //   // let welcomeContent = this.ruleForm.welcomeContent.replace(
            //   //   this.memberNick,
            //   //   `#${this.memberNick}#`
            //   // );
            //   // console.log(welcomeContent, "3333");
            //   params.welcomeContent = this.ruleForm.welcomeContent;
            //   console.log(params, "888");
            // }
            if (this.ruleForm.welComeMediaType == "IMG" && this.mediaId != "") {
              params.welcomeMediaContent = this.mediaId;
            }
            if (
              this.ruleForm.welComeMediaType == "LINK" &&
              this.mediaUuid != ""
            ) {
              params.welcomeMediaContent = this.mediaUuid;
            }
          }
          if (!this.$route.query.uuid) {
            if (this.imgId != "") {
              params.imgId = this.imgId;
            }
            this.$store
              .dispatch("contactWay/contactWayAdd", params)
              .then(() => {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$router.push({
                  path: `/contactWay/listAll`,
                });
              })
              .catch((err) => {});
          } else {
            params.configId = this.configId;
            if (this.imgId != "") {
              params.imgId = this.imgId;
            }
            this.$store
              .dispatch("contactWay/contactWayUpdate", params)
              .then(() => {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$router.push({
                  path: `/contactWay/listAll`,
                });
              })
              .catch((err) => {});
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelMessageImage() {
      this.messageImage = "";
    },
    handleCheckedTagsChange(tag, index) {},
    handleSetMessageImage(res, file) {
      this.messageImage = URL.createObjectURL(file.raw);
      this.mediaId = res.id;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgId = res.id;
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
      this.ruleForm.welcomeContent =
        this.ruleForm.welcomeContent +
        `<span class="nickName">${memberNick}</span>&#8203;`;
      // this.ruleForm.welcomeContent = this.ruleForm.welcomeContent + val;
      // this.welcomecontentT = "#" + val + "#";
      // let start = this.ruleForm.welcomeContent.indexOf("ddd");
      // this.ruleForm.welcomeContent.substring(start, start + "ddd".length);
      // console.log(
      //   this.ruleForm.welcomeContent,
      //   "000",
      //   start,
      //   this.ruleForm.welcomeContent.substring(start, start + "ddd".length)
      // );
    },
    handleChoseLink(val) {
      this.welcomecontentT = this.articleListSelect.find((item) => {
        return item.uuid === val;
      });
      this.mediaUuid = this.welcomecontentT.uuid;
    },
  },
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
    .contact-way-detail-info {
      margin-bottom: 20px;
      .info-warp {
        .tip {
          font-size: 14px;
          margin-left: 15px;
          color: #bbb;
        }
        .tag-warp {
          position: relative;
          max-width: 60%;
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
            .el-tag + .el-tag {
              // margin-left: 10px;
            }
            .button-new-tag {
              margin-right: 10px;
              height: 32px;
              line-height: 30px;
              padding-top: 0;
              padding-bottom: 0;
            }
            .input-new-tag {
              width: 100px;
              margin-left: 10px;
              vertical-align: bottom;
            }
            .tag-list {
              .add-tag {
                margin-right: 10px;
              }
            }
            .deit-tag {
              font-size: 16px;
            }
          }
        }
      }
    }
    .contact-way-detail-feature-set {
      .qr-code {
        position: relative;
        .qr-code-warp {
          position: relative;
          .img {
            width: 165px;
            height: 165px;
            background-color: black;
          }
          .img-p {
            width: 48px;
            height: 48px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -24px;
            margin-left: -24px;
          }
        }
      }
    }
    .add-friend-tip {
      margin-left: 5px;
      i {
        color: #fff;
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
        padding: 6px 15px;
      }
    }
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
  .el-checkbox-button__inner {
    border: 1px solid #dcdfe6;
  }
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 0px;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
  .el-checkbox-button--small .el-checkbox-button__inner {
    padding: 6px 15px;
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
