<!--
 * @Author: your name
 * @Date: 2020-06-11 11:15:45
 * @LastEditTime: 2020-07-05 17:37:01
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
                            <el-checkbox
                              v-for="(tag,idx) in tagGroup.tagList"
                              :key="idx"
                              :label="tag.uuid"
                              border
                            >{{ tag.tagName }}</el-checkbox>
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
            <el-form-item label="二维码预览：" prop="qrCode">
              <div class="qr-code display-flex">
                <div class="qr-code-warp">
                  <img :src="qrCode" alt class="img" />
                  <img v-if="imageUrl" :src="imageUrl" alt class="img-p" />
                </div>

                <el-upload
                  class="avatar-uploader"
                  action="/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <div v-else class="upload-img flex-column-center-alinecenter">
                    <i class="el-icon-plus avatar-uploader-icon" />
                    <p>更换头像</p>
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
// import{ listTagAll }from'@/api/tag/list'
// import{
//   contactWayAdd,
//   contactWayDetail,
//   contactWayUpdate
// }from'@/api/contactWay/index'
// import{ userlistAll }from'@/api/user/index'
import qrCode from "@/assets/0.png";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ContactWayDetail",
  data() {
    return {
      qrCode: qrCode,
      isShow: false,
      checkboxGroup: [],
      addNewGroupformData: [],
      ruleForm: {
        name: "",
        member: [],
        options: [],
        autoAddFriend: true,
        openTime: "1"
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        member: [
          { required: true, message: "请选择客服人员", trigger: "change" }
        ]
      },
      imageUrl: "",
      uuid: "",
      way: "",
      configId: "",
      imgId: ""
    };
  },
  computed: {
    ...mapState({
      tagListSelect: state => state.tag.tagListSelect,
      userListAll: state => state.user.listSelect
    }),
    tagData() {
      if (!this.isShow) {
        return this.tagListSelect.filter((item, index) => {
          return index < 3;
        });
      } else {
        return this.tagListSelect;
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.way) {
      this.way = this.$route.query.way;
      if (this.$route.query.way == "add") {
      } else if (this.$route.query.way == "edit") {
        this.uuid = this.$route.query.uuid;
        this.getContactWayDetail(this.uuid);
      }
    }
  },
  methods: {
    getContactWayDetail(uuid) {
      this.$store
        .dispatch("contactWay/getContactWayDetail", uuid)
        .then(res => {
          this.configId = res.configId;
          this.qrCode = res.qrCode;
          this.ruleForm.name = res.remark;
          this.ruleForm.autoAddFriend = res.skipVerify;
          res.serviceUsers.map(item => {
            this.ruleForm.member.push(item.userId);
          });
          res.servicesTags.map(item => {
            this.checkboxGroup.push(item.uuid);
          });
        })
        .catch(err => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // if (this.way == "add") {
          let params = {
            remark: this.ruleForm.name,
            scene: 2,
            skipVerify: this.ruleForm.autoAddFriend,
            tags: this.checkboxGroup,
            type: this.ruleForm.member.length > 1 ? 2 : 1,
            user: this.ruleForm.member
          };
          if (this.imgId != "") {
            params.imgId = this.imgId;
          }
          this.$store
            .dispatch("contactWay/contactWayAdd", params)
            .then(() => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              // this.$router.push({
              //   path: `/contactWay/listAll`
              // });
            })
            .catch(err => {});
          // } else {
          // const params = {
          //   configId: this.configId,
          //   remark: this.ruleForm.name,
          //   scene: 2,
          //   skipVerify: this.ruleForm.autoAddFriend,
          //   tags: this.checkboxGroup,
          //   type: this.ruleForm.member.length > 1 ? 2 : 1,
          //   user: this.ruleForm.member
          // };
          // if (this.imgId != "") {
          //   params.imgId = this.imgId;
          // }

          // await contactWayUpdate(params)
          //   .then(() => {
          //     this.$message({
          //       message: "保存成功",
          //       type: "success"
          //     });
          //   })
          //   .catch(err => {});
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCheckedTagsChange(tag, index) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgId = res.id;
    },
    beforeAvatarUpload(file) {
      console.log(file, "file");
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
}
</style>
<style lang='scss'>
.contact-way-detail {
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
  .contact-way-detail-feature-set {
    .avatar-uploader {
      position: absolute;
      left: 185px;
      bottom: 0px;
      .upload-img {
        text-align: center;
        vertical-align: middle;
        p {
          font-size: 14px;
          line-height: 30px;
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
        font-size: 24px;
        color: #8c939d;
        width: 66px;
        line-height: 36px;
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
