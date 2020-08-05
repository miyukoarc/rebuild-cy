<template>
  <section class="list-group-detail app-container">
    <div class="display-flex">
      <div class="top-left container-card">
        <div class="group-chat-info flex-between-alinecenter">
          <div class="group-list flex-between-alinecenter">
            <div class="group-list-left flex-column-center-alinecenter">
              <svg-icon icon-class="groupChat" class="font-el" />
              <div class="font-exs">群聊</div>
            </div>

            <div class="group-item-info">
              <div>{{ groupDetail.name?groupDetail.name:'--' }}</div>
              <div class="group-item-content display-flex align-items-center">
                <span>群主：</span>
                <!-- <img :src="defaultAvatar" alt /> -->
                <strong>{{ groupDetail.owner? groupDetail.owner.name :'' }}</strong>
                <i>|</i>
                <span v-if="groupDetail.member_list">共 {{ groupDetail.member_list.length }} 位成员</span>
              </div>
            </div>
          </div>
          <el-button type="primary" size="mini" disabled>聊天记录</el-button>
        </div>
        <div class="data-box display-flex">
          <div class="data-item flex-1">
            <p class="bold" v-if="groupDetail.member_list">{{ groupDetail.member_list.length }}</p>
            <p class="name">总人数</p>
          </div>
          <div class="data-item flex-1">
            <p class="bold">0</p>
            <p class="name">昨日新增</p>
          </div>
          <div class="data-item flex-1">
            <p class="bold">0</p>
            <p class="name">昨日退群</p>
          </div>
        </div>
      </div>
      <el-card class="top-right" style="width:392px">
        <div class="head">
          <div class="head-warp">
            <div class="head-title flex-between-alinecenter">
              <span>群公告</span>
              <span class="text-blue">
                <!-- <span class="icon-warp">
                  <i class="el-icon-refresh"  /> 更新
                </span>-->
              </span>
            </div>
          </div>
        </div>
        <div class="notice-content" v-if="groupDetail.notice">{{groupDetail.notice}}</div>
        <div class="no-group" v-else>
          <div class="no-group-view">
            <img src="~@/assets/icon/no-group-message.png" alt />
            <p>暂无群公告</p>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 列表组件 -->
    <el-card class="box-card content-spacing box_vh">
      <div class="common-table">
        <el-table
          v-loading="loading"
          :data="groupDetail.member_list"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="成员" align="left">
            <template v-slot="scope">
              <div style="display:flex;align-items:center;">
                <el-image
                  style="width:30px;height:30px;margin-right:10px;"
                  lazy
                  :src="scope.row.avatar"
                ></el-image>
                <span>{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="入群时间" prop="joinTime" align="left"></el-table-column>
          <el-table-column label="入群方式" prop="joinScene" align="left"></el-table-column>
          <el-table-column label="操作" align="left">
            <template v-slot="scope">
              <el-t-button
                type="primary"
                size="mini"
                :auth="permissionMap['user']['user_detail']"
                :popAuth="true"
                @click.stop="handleDetail(scope.row)"
              >详情</el-t-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      groupDetail: (state) => state.externalUser.groupDetail,
      loading: (state) => state.externalUser.loading,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const payload = newVal.params.uuid;
        console.log(payload);
        this.$once("hook:created", () => {
          this.initDetail(payload);
        });
      },
      immediate: true,
    },
  },
  methods: {
    initDetail(payload) {
      this.$store
        .dispatch("externalUser/getGroupDetail", payload)
        .then(() => {})
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
    },
    handleDetail(row) {
      if (row.type == 1) {
        const uuid = row.uuid;
        this.$router.push({
          path: "/user/detail/" + uuid,
        });
      }
      if (row.type == 2) {
        const uuid = row.uuid;
        this.$router.push({
          path: "/externalUser/detail/" + uuid,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  padding: 20px;
}
.list-group-detail {
  .el-card {
    .el-card__body {
      flex: 1;
      width: 100% !important;
    }
  }

  .top-left {
    margin-right: 15px;
    display: flex;
    flex: 1;
    flex-direction: column;
    .data-box {
      margin-top: 20px;
      background: #fbfdff;
      border: 1px solid #cfe8ff;
      .data-item {
        padding: 31px 0;
        position: relative;
        .bold {
          font-size: 24px;
          line-height: 34px;
          text-align: center;
          color: #000;
          opacity: 0.85;
        }
        .name {
          font-size: 13px;
          line-height: 18px;
          text-align: center;
          color: rgba(0, 0, 0, 0.85);
          opacity: 0.65;
        }
      }
      .data-item::after {
        content: "";
        width: 1px;
        height: 38px;
        background: #e9e9e9;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 0;
      }
    }
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
  }
  .top-right {
    .head {
      min-height: 48px;
      margin-bottom: -1px;
      padding: 0 24px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      background: transparent;
      border-bottom: 1px solid #e8e8e8;
      border-radius: 2px 2px 0 0;
      zoom: 1;
      .head-warp {
        .head-title {
          font-size: 18px;
          .text-blue {
            font-size: 13px;
            color: #1890ff;
            cursor: pointer;
            .icon-warp {
              margin-right: 3px;
            }
          }
        }
      }
    }
    .notice-content {
      font-size: 14px;
      line-height: 28px;
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
}
.list-group-detail .el-card__body {
  width: 100%;
}
</style>
