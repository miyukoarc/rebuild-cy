<template>
  <div>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="left-top-info">
            <div
              class="info-name display-flex align-items-center"
              v-if="externalUserDetail.externalUser"
            >
              <el-image
                style="width:64px;height:64px;"
                :src="
                  externalUserDetail.externalUser.avatar
                    ? externalUserDetail.externalUser.avatar
                    : defaultAvatar
                "
                alt
              />
              <div style="margin-left:10px;">
                <div v-if="externalUserDetail.externalUser">
                  {{
                  externalUserDetail.externalUser.remark ||
                  externalUserDetail.externalUser.name
                  }}
                </div>
                <span class="tips">企业微信</span>
              </div>
            </div>

            <div class="tag-container">
              <h4>
                企业标签
                <span class="side-title">
                  <span>最新更新{{ externalUserDetail.updatedAt }}</span>
                  <el-button type="text" @click="handleEditTags">编辑</el-button>
                </span>
              </h4>
              <div class="tag-line">
                <div v-if="companyTags.length">
                  <el-tag
                    type="primary"
                    size="mini"
                    style="margin-right:5px;margin-bottom:5px"
                    v-for="item in companyTags"
                    :key="item.tagId"
                  >{{ item.tagName }}</el-tag>
                </div>
                <span v-else class="no-tag-tip">暂无企业标签</span>
              </div>
            </div>

            <div class="info-container">
              <h4>客户资料</h4>
              <div>
                <el-row>
                  <el-col :span="8" v-for="(value, key) in userInfo" :key="key">
                    <div style="display:flex;justify-content:space-between;">
                      <span class="label">{{ reflect[key] }}</span>
                      <div class="value">{{ value ? value : "--" }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>

          <el-card class="content-spacing">
            <h4 style="font-size:14px;">所属客服</h4>
            <el-table
              v-loading="loading"
              :data="user"
              style="width: 100%"
              stripe
              lazy
              highlight-current-row
            >
              <el-table-column label="所属员工" align="left" prop="name"></el-table-column>
              <el-table-column label="对客户的描述" align="left">
                <template v-slot="scope">
                  <div>{{ scope.row.description || "--" }}</div>
                </template>
              </el-table-column>
              <el-table-column label="个人标签" align="left">
                <template v-slot="scope">
                  <div>
                    <div v-if="scope.row.tags.length">
                      <el-tag
                        size="mini"
                        type="primary"
                        v-for="item in scope.row.tags"
                        :key="item.tagId"
                      >{{ item.tagName }}</el-tag>
                    </div>
                    <span v-else>--</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="最近联系时间" align="left">
                <template v-slot="scope">
                  <div>{{ scope.row.lastMsgTime.length ? "--" : "--" }}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="left">
                <template v-slot="scope">
                  <div>
                    <el-t-button size="mini" type="primary" @click="handleDetail(scope.$index)">聊天记录</el-t-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="group-chart">
            <h4 class="font-es">所在群聊</h4>
            <div v-if="listGroup.length>0">
              <div
                v-for="(item,index) in limitedListGroup"
                :key="index"
                class="has-group flex-between-alinecenter"
              >
                <div class="group-list flex-between-alinecenter">
                  <div class="group-list-left flex-column-center-alinecenter">
                    <svg-icon icon-class="groupChat" class="svg-icon" />
                    <p style="margin:0px;">群聊</p>
                  </div>
                  <!-- <img src="~@/assets/icon/no-group-icon.png" alt /> -->
                  <div class="group-item-info">
                    <p style="margin:0px;">{{ item.title }}</p>
                    <div class="group-item-content display-flex align-items-center">
                      <span>群主：</span>
                      <img :src="defaultAvatar" alt />
                      <strong>{{ item.name }}</strong>
                      <i>|</i>
                      <span>共 {{ item.countNum }} 位成员</span>
                    </div>
                  </div>
                </div>
                <span class="check-chatting-detail" @click="handleGroupRouter(item)">查看</span>
              </div>
              <div class="open-all" @click="unlimited">
                <span v-if="limited">展开全部 {{ listGroup.length }}个群聊</span>
                <span v-else>收起</span>
              </div>
            </div>

            <div v-else class="no-group">
              <div class="no-group-view">
                <img src="~@/assets/icon/no-group-icon.png" alt />
                <p>该客户不在任何群聊内</p>
              </div>
            </div>
          </el-card>

          <el-card class="content-spacing">
            <div style="display:flex;justify-content:space-between;align-content:center;">
              <h4 class="font-es">客户动态</h4>
              <el-t-button
                @click="handleCreate"
                type="primary"
                style="margin:auto 0;"
                :popAuth="true"
                size="mini"
                :auth="permissionMap['externalUserTrends']['externalUserTrends_add']"
              >添加动态</el-t-button>
            </div>
            <div class="member-status-content margin-top-20">
              <div v-if="externalUserTrends.length>0">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item,index) in externalUserTrends"
                    :key="index"
                    :timestamp="`发布于${item.updatedAt}`"
                    placement="top"
                  >
                    <el-card>
                      <div>{{ item.remark }}</div>
                      <!-- <h4>{{ item.remark }}</h4> -->
                      <p style="margin:0px;text-align:right;">
                        <el-t-button
                          :popAuth="true"
                          :auth="permissionMap['externalUserTrends']['externalUserTrends_update']"
                          type="text"
                          v-show="item.editable"
                          class="ml-10"
                          @click="handleEditTrend(item)"
                        >编辑</el-t-button>
                        <el-t-button
                          :popAuth="true"
                          :auth="permissionMap['externalUserTrends']['externalUserTrends_delete']"
                          type="text"
                          v-show="item.editable"
                          class="ml-10"
                          @click="handleDeleteTrend(item)"
                        >删除</el-t-button>
                      </p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div v-else class="no-member-status">暂无动态</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <form-dialog ref="formDialog"></form-dialog>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/2.jpg";
import FormDialog from "./dialog";
import { mapState } from "vuex";
export default {
  components: { FormDialog },
  inject: ["reload"],
  data() {
    return {
      userInfo: {},
      user: [],
      companyTags: [],

      reflect: {
        source: "来源",
        qq: "QQ",
        remarkMobile: "电话",
        age: "年龄",
        birthday: "生日",
        microBlog: "微博",
        address: "地址",
        email: "邮箱",
        createtime: "时间"
      },

      limited: true
    };
  },
  watch: {
    // $route: {
    //   handler(newVal, oldVal) {
    //     const str = `${newVal.params.uuid}`;
    //     this.$once("hook:created", () => {
    //       this.initDetail(str);
    //     });
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapState({
      loading: state => state.externalUser.loading,
      listGroup: state => state.externalUser.listGroup,
      externalUserDetail: state => state.externalUser.externalUserDetail,
      permissionMap: state => state.permission.permissionMap
    }),
    externalUserTrends() {
      return this.externalUserDetail?.externalUserTrends?.items;
    },
    defaultAvatar() {
      return defaultAvatar;
    },
    limitedListGroup() {
      if (this.limited) {
        return this.listGroup.slice(0, 1);
      } else {
        return this.listGroup;
      }
    }
  },
  created() {
    console.log(this.$route,'999');
    const externalUuid = this.$route.params.uuid;
    const payload = {
      externalUuid
    };
    this.initGroupList(payload);
    this.initDetail(this.$route.params.uuid);
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    initDetail(payload) {
      this.$store
        .dispatch("externalUser/getDetail", payload)
        .then(() => {
          // let {
          //   source,
          //   qq,
          //   remarkMobile,
          //   age,
          //   birthday,
          //   microBlog,
          //   address,
          //   email,
          //   createtime,
          //   tags,
          //   user,
          //   description,
          //   lastMsgTime,
          //   externalUser
          // } = this.externalUserDetail;
          // const tagTypeUser = [];
          // const tagTypeCompany = [];
          // if (Object.keys(tags).length) {
          //   tags.forEach(item => {
          //     if (item.type === 1) {
          //       tagTypeCompany.push(item);
          //     }
          //     if (item.type === 2) {
          //       tagTypeUser.push(item);
          //     }
          //   });
          //   this.companyTags = tagTypeCompany;
          // }
          // lastMsgTime = lastMsgTime.items;
          // user = {
          //   ...user,
          //   tags: tagTypeUser,
          //   description,
          //   lastMsgTime,
          //   externalUser
          // };
          // console.log(user, "user");
          // this.user.push(user);
          // this.userInfo = {
          //   source,
          //   age,
          //   address,
          //   qq,
          //   birthday,
          //   email,
          //   remarkMobile,
          //   microBlog,
          //   createtime
          // };
        })
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    initGroupList(payload) {
      this.$store
        .dispatch("externalUser/getListGroup", payload)
        .then(() => {})
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    // 用户信息模块 -- 标签 
    handleEditTags(payload) {
      this.$refs['formDialog'].event = 'EditTagsTemplate'
      this.$refs['formDialog'].eventType = 'editTags'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = payload
    },
    handleDetail(index) {
      const userId = this.user[index].userId;
      const externalUserId = this.user[index].externalUser.externalUserId;
      const query = {
        userId,
        externalUserId
      };
      this.$router.push({
        path: "/message/singleListAll",
        query
      });
    },
    handleGroupRouter(item) {
      // console.log(item)
      this.$router.push({
        path: "/externalUser/groupDetail",
        query: {
          chatId: item.chatId
        }
      });
    },
    unlimited() {
      const current = this.limited;
      this.limited = !current;
    },
    handleCreate() {
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].eventType = "create";
    },
    handleEditTrend(item) {
      console.log(item);
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].transfer = item;
    },
    handleDeleteTrend(item) {
      const payload = {
        uuid: item.uuid
      };

      this.$confirm("是否删除当前动态", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$store
            .dispatch("externalUser/deleteExTrends", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.reload();
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(err => {
          ;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.open-all {
  height: 18px;
  font-size: 12px;
  line-height: 22px;
  color: #1890ff;
  margin: 0 10px;
  cursor: pointer;
}
.no-group {
  margin-top: 15px;
  overflow: hidden;
  img {
    width: 92px;
    height: 68px;
    margin-bottom: 10px;
    margin-left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  p {
    font-size: 12px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
}
.tips {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.45);
}
.tag-container {
  font-size: 14px;
  margin-top: 20px;
  .tag-line {
    font-size: 12px;
  }
}
.side-title {
  font-size: 14px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.no-tag-tip {
  font-size: 12px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.45);
}
.info-container {
  margin-top: 20px;
  font-size: 14px;
}
.label {
  min-width: 80px;
  display: inline-block;
  height: 28px;
  line-height: 28px;
}
.value {
  flex: 1;
  text-align: left;
  height: 28px;
  line-height: 28px;
}
.group-chart {
  h5 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ececec;
  }
  .has-group {
    margin: 15px 10px;
    padding: 10px;
    background: #fbfbfb;
    border: 1px solid #eee;
    border-radius: 1px;
    margin-bottom: 10px;
    .group-list {
      .group-list-left {
        width: 43px;
        height: 43px;
        text-align: center;
        background-color: #1890ff;
        margin-right: 10px;
        color: #fff;
        .svg-icon {
          font-size: 20px;
        }
        > p {
          font-size: 12px;
          line-height: 14px;
        }
      }
      // p {
      //   color: #222;
      //   font-size: 14px;
      //   line-height: 22px;
      // }
      > img {
        width: 43px;
        height: 43px;
        margin-right: 10px;
      }
      .group-item-info {
        font-size: 12px;
        line-height: 20px;
        > p {
          height: 20px;
        }
        span,
        i {
          color: #999;
          opacity: 0.85;
        }
        .group-item-content {
          > i {
            margin: 0 5px;
          }
          > img {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        }
      }
    }
    .check-chatting-detail {
      font-size: 13px;
      line-height: 22px;
      color: #1890ff;
      opacity: 0.85;
      cursor: pointer;
    }
  }
  .open-all {
    height: 18px;
    font-size: 12px;
    line-height: 22px;
    color: #1890ff;
    margin: 0 10px;
  }
  .no-group {
    margin-top: 15px;
    overflow: hidden;
    img {
      width: 92px;
      height: 68px;
      margin-bottom: 10px;
      margin-left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    p {
      font-size: 12px;
      line-height: 17px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
    }
  }
}
.member-status-content {
  .no-member-status {
    font-size: 12px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
}
</style>
