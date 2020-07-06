<template>
  <div>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <!-- 客户基本信息 -->
          <el-card class="left-top-info">
            <div
              class="info-name display-flex align-items-center"
              v-if="externalUserDetail.externalUserDetail"
            >
              <el-image
                style="width:64px;height:64px;border-radius: 100%;"
                :src="
                  externalUserDetail.externalUserDetail.externalUserAvatar
                    ? externalUserDetail.externalUserDetail.externalUserAvatar
                    : defaultAvatar
                "
                alt
              />
              <div style="margin-left:10px;">
                <div v-if="externalUserDetail.externalUserDetail" style="margin-bottom: 10px;">
                  {{
                  externalUserDetail.externalUserDetail.externalUserName
                  }}
                </div>
                <span
                  class="tips"
                >{{externalUserDetail.externalUserDetail.wxType == 'WX'? "@微信":'@企业微信'}}</span>
              </div>
            </div>
            <!-- 企业标签 -->
            <div class="tag-container">
              <h4>
                企业标签
                <span class="side-title">
                  <span>最新更新{{ externalUserDetail.updatedAt }}</span>
                  <el-button type="text" @click="handleEditTags">编辑</el-button>
                </span>
              </h4>
              <div
                class="tag-line"
                v-if="(externalUserDetail.externalUserDetailCorpTagsList.corpTags) !== null"
              >
                <span
                  v-for="(companyTags,key,index) in externalUserDetail.externalUserDetailCorpTagsList.corpTags"
                  :key="index"
                  style="display: inline-block;"
                >
                  <span class="group-name">{{key}}：</span>
                  <el-tag
                    type="primary"
                    size="mini"
                    style="margin-right:5px;margin-bottom:5px"
                    v-for="item in companyTags"
                    :key="item.tagId"
                  >{{ item.tagName }}</el-tag>
                </span>
              </div>
              <span v-else class="no-tag-tip">暂无企业标签</span>
            </div>
            <!-- 客户资料 -->
            <div class="info-container">
              <h4>客户资料</h4>
              <div>
                <el-row>
                  <el-col :span="8" v-for="(value, key) in externalUserDetailInfo" :key="key">
                    <div
                      style="display:flex;justify-content:space-between;"
                      @mouseenter="mouseEnter(value,key)"
                    >
                      <span class="label">{{ key }}</span>
                      <el-input
                        @click.native.stop
                        size="mini"
                        :placeholder="value"
                        v-if="currentInput ===key"
                        v-model="inputValue"
                      ></el-input>
                      <span class="value" v-else>{{ value ? value : "--" }}</span>

                      <span
                        class="edit-info"
                        v-if="(key == currentIndex) || currentInput===key"
                        @click.stop="editInfo(value,key)"
                      >{{(currentInput===key)?'保存':'编辑'}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
          <!-- 所属客服 -->
          <el-card class="content-spacing">
            <h4 style="font-size:14px;">所属客服</h4>
            <el-table
              v-loading="loading"
              :data="externalUserDetail.externalUserDetailUsersList"
              style="width: 100%"
              stripe
              lazy
              highlight-current-row
            >
              <el-table-column label="所属员工" align="left">
                <template v-slot="scope">
                  <div class="display-flex align-items-center">
                    <el-image style="width:24px;height:24px;" :src="scope.row.avatar" lazy alt />
                    <span class="ml">{{scope.row.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="对客户的描述" align="left">
                <template v-slot="scope">
                  <div>{{ scope.row.description || "--" }}</div>
                </template>
              </el-table-column>
              <el-table-column label="个人标签" align="left">
                <template v-slot="scope">
                  <div>
                    <div v-if="scope.row.individualTags != null">
                      <el-tag
                        size="mini"
                        type="primary"
                        v-for="item in scope.row.individualTags"
                        :key="item.tagId"
                      >{{ item.tagName }}</el-tag>
                    </div>
                    <span v-else>--</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="最近联系时间" align="left">
                <template v-slot="scope">
                  <div>{{ scope.row.lastMsgTime ? scope.row.lastMsgTime: "--" }}</div>
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
        <!-- 所在群聊 -->
        <el-col :span="8">
          <el-card class="group-chart">
            <h4 class="font-es">所在群聊</h4>

            <div v-if="limitedListGroup.length>0">
              <transition-group name="fade">
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
                    <div class="group-item-info">
                      <p
                        style="margin:0px;"
                      >{{ item.name }} {{item.lastGroupChatTime?item.lastGroupChatTime:''}}</p>
                      <div class="group-item-content display-flex align-items-center">
                        <span>群主：</span>
                        <!-- <img :src="defaultAvatar" alt /> -->
                        <strong>{{ item.owner?item.owner:'--' }}</strong>
                        <i>|</i>
                        <span>共 {{ item.number }} 位成员</span>
                      </div>
                    </div>
                  </div>
                  <span class="check-chatting-detail" @click="handleGroupRouter(item)">查看</span>
                </div>
              </transition-group>
              <div class="open-all" @click="unlimited">
                <span
                  v-if="limited"
                >展开全部 {{ externalUserDetail.externalUserDetailGroupChatsList.length }}个群聊</span>
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
          <!-- 客户动态 -->
          <el-card class="content-spacing">
            <div class="flex-between-alinecenter">
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
              <div v-if="externalUserTrendsListAll.length>0">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item,index) in externalUserTrendsListAll"
                    :key="index"
                    :timestamp="`发布于${item.updatedAt}`"
                    placement="top"
                  >
                    <el-card>
                      <div>{{ item.remark }}</div>
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
                <el-pagination
                  background
                  class="pager"
                  layout="total,prev, pager, next,jumper"
                  :total="pageConfig.total"
                  :current-page.sync="pageConfig.pageNumber"
                  :page-size="pageConfig.pageSize"
                  @current-change="changePage"
                />
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
      // 客户资料
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
      currentIndex: "",
      currentInput: false,
      inputValue: "",
      inputKey: "",
      externalUserDetailInfo: {
        mobile: null,
        qq: "莱昂纳德",
        wxType: "WX",
        年龄: "白色aaa",
        微博: "这是微博",
        生日: "这是生日",
        邮箱: "这是邮箱"
      },
      // 群
      limited: true,
      // 客户动态
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },

      query: {
        page: 0,
        size: 10,
        uuid: "",
        startTime: "",
        endTime: ""
      }
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
      page: state => state.externalUserTrends.externalUserTrendsListAllPage,
      externalUserTrendsListAll: state =>
        state.externalUserTrends.externalUserTrendsListAll,
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
        return this.externalUserDetail.externalUserDetailGroupChatsList.slice(
          0,
          1
        );
      } else {
        return this.externalUserDetail.externalUserDetailGroupChatsList;
      }
    }
  },
  created() {
    const uuid = this.$route.params.uuid;
    this.query.uuid = uuid;
    // this.initGroupList(payload);
    this.initDetail(this.$route.params.uuid);

    this.initExternalUserTrendsListAll(this.query);
  },
  mounted() {
    // window.addEventListener('scroll',this.handleScroll);
  },
  methods: {
    // 初始化详情数据
    initDetail(payload) {
      this.$store
        .dispatch("externalUser/getExternalUserDetail", 19)
        .then(() => {})
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    // 初始化客户动态数据
    initExternalUserTrendsListAll(payload) {
      this.$store
        .dispatch("externalUserTrends/getExternalUserTrendsListAll", payload)
        .then(() => {
          this.pageConfig.pageNumber = this.page.pageNumber + 1;
          this.pageConfig.total = this.page.total;
        })
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    // 客户动态翻页
    changePage(key) {
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key - 1;
      this.initExternalUserTrendsListAll(this.query);
    },

    // initGroupList(payload) {
    //   this.$store
    //     .dispatch("externalUser/getListGroup", payload)
    //     .then(() => {})
    //     .catch(err => {
    //       console.error(err);
    //       this.$message({
    //         type: "error",
    //         message: err || "初始化失败"
    //       });
    //     });
    // },

    // 用户信息模块 -- 标签
    handleEditTags(payload) {
      this.$refs["formDialog"].event = "EditTagsTemplate";
      this.$refs["formDialog"].eventType = "editTags";
      this.$refs["formDialog"].dialogVisible = true;
      this.$store.commit(
        "externalUser/SAVE_EDITTAGSUUID",
        this.externalUserDetail.externalUserDetailCorpTagsList.corpTags
      );
    },
    // 聊天
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
    // 群
    handleGroupRouter(item) {
      // console.log(item)
      this.$router.push({
        path: "/externalUser/groupDetail",
        query: {
          chatId: item.chatId
        }
      });
    },
    mouseEnter(value, key) {
      this.currentIndex = key;
    },
    editInfo(value, key, index) {
      if (this.currentIndex == this.currentInput) {
        this.currentInput = "";
      } else {
        this.currentInput = key;
      }
    },
    // 群 展开
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
              this.query.page = 0;
              this.initExternalUserTrendsListAll(this.query);
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
    },
    handleScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeitht =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //是否滚动到底部的判断
      if (scrollTop + windowHeitht == scrollHeight) {
        if (this.pageno <= this.totalnum) {
          console.log("8888");
          // $("#address_manager_alert").show();
          // this.getSpecialData();
        } else {
          return;
        }
      }
    },
    load() {
      console.log(
        "3333",
        this.page,
        Math.ceil(this.page.total / this.page.pageSize)
      );
      let a = Math.ceil(this.page.total / this.page.pageSize);
      this.query.page++;
      if (this.query.page >= a) {
      }
      if (this.query.page < a) {
        console.log("0009999");
        this.initExternalUserTrendsListAll(this.query, "push");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pager {
  padding: 20px 0;
  text-align: center;
}
.group-chart {
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
}

.tips {
  font-size: 13px;
  line-height: 22px;
  color: #a4ecd1;
}
.tag-container {
  font-size: 14px;
  margin-top: 20px;
  .tag-line {
    font-size: 12px;
    .group-name {
      line-height: 20px;
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
}

.info-container {
  margin-top: 20px;
  font-size: 14px;
  .el-input {
    width: 60%;
  }
  .edit-info {
    margin-right: 20px;
    line-height: 28px;
    cursor: pointer;
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
  // .member-status-content-h {
  //   max-height: 600px;
  //   overflow-y: auto;
  // }
}
</style>
