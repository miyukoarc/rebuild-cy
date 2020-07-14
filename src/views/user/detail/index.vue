<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <el-row>
        <el-col :span="24">
          <div class="box-card left-top-info">
            <div class="info-name">
              <img :src="userDetail.avatar" />
              <div>
                <div>{{ userDetail.name }}</div>
                <span>共{{ idList.length }}位客户</span>
              </div>
              <el-tag effect="plain" size="small" v-if="userDetail.role">
                {{
                userDetail.role.name
                }}
              </el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="content-spacing">
      <div slot="header">
        <div>
          <span class="font-exs">联系客户统计</span>
        </div>
        <br />
        <div class="mt-20">
          <el-radio-group v-model="date">
            <el-radio-button label="1">昨天</el-radio-button>
            <el-radio-button label="7">七天内</el-radio-button>
            <el-radio-button label="30">近30天</el-radio-button>
          </el-radio-group>
          <el-date-picker
            style="float:right;"
            v-model="value"
            type="daterange"
            :value-format="'yyyy-MM-dd HH-mm-ss'"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChange"
          ></el-date-picker>
        </div>
      </div>

      <div class="out-container">
        <div class="board-container" style="margin-right:20px;">
          <div class="unit" v-for="(value, key) in externalUser" :key="key">
            <div class="number">{{ value ? value : "0" }}</div>
            <div class="key">{{ reflect[key] }}</div>
          </div>
        </div>
        <div class="board-container">
          <div class="unit" v-for="(value, key) in message" :key="key">
            <div class="number">{{ value ? value : "0" }}</div>
            <div class="key">{{ reflect[key] }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="content-spacing">
      <el-table
        v-loading="loading"
        :data="idList"
        style="width: 100%"
        row-key="uuid"
        stripe
        lazy
        highlight-current-row
         header-row-class-name="el-table-header"
      >
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column label="全部客户" align="left">
          <template v-slot="scope">
            <div class="avatar_name">
              <img :src="scope.row.externalUser.avatar" width="40" height="40" />
              <div>{{ scope.row.externalUser.name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="left">
          <template v-slot="scope">
            <div>
              <div v-if="Object.keys(scope.row.tags).length">
                <el-tag
                  type="primary"
                  size="mini"
                  style="margin-right:5px;"
                  v-for="item in scope.row.tags"
                  :key="item.tagId"
                >{{ item.tagName }}</el-tag>
              </div>
              <div v-else>
                <span>--</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" prop="createtime" align="left"></el-table-column>
        <el-table-column label="上次对话时间" prop="updatedAt" align="left"></el-table-column>
        <el-table-column label="添加渠道" align="left">
          <template v-slot="scope">
            <div>{{ scope.row.source ? source : "--" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template v-slot="scope">
            <el-t-button
              type="primary"
              :popAuth="true"
              :auth="permissionMap['externalUser']['externalUser_detail']"
              size="mini"
              @click.stop="handleDetail(scope.$index)"
            >详情</el-t-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 统计面板 -->
    <!-- <el-card class="content-spacing"> -->
    <!-- </el-card> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return {
      value: [],
      date: 1,
      form: {
        end: "",
        sta: "",
        userid: []
      },
      externalUser: {},
      message: {},
      reflect: {
        chat_cnt: "聊天总数(条)",
        message_cnt: "发送消息总数(条)",
        reply_percentage: "已回复聊天占比",
        avg_reply_time: "平均首次回复时长",
        negative_feedback_cnt: "拉黑/删除某人(人)",
        new_apply_cnt: "主动添加客户数(人)",
        new_contact_cnt: "新增客户数(人)"
      }
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        console.log(newVal.params.uuid);
        const uuid = newVal.params.uuid;
        this.$once("hook:created", () => {
          this.initData(uuid);
        });
      },
      immediate: true
    },
    date: {
      handler(newVal, oldVal) {
        this.changeDate(newVal);
        this.initBoard(this.form);
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      userDetail: state => state.user.userDetail,
      customerStatistics: state => state.externalUser.customerStatistics,
      loading: state => state.externalUser.loading,
      idList: state => state.externalUser.idList,
      permissionMap: state => state.permission.permissionMap
    })
  },
  created() {
    // this.initBoard(this.form)
  },
  mounted() {
    this.form.userid.push(this.$route.params.uuid);
  },
  methods: {
    initData(payload) {
      this.$store
        .dispatch("user/getDetail", payload)
        .then(() => {})
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });

      this.$store
        .dispatch("externalUser/getListExUserByUserId", { uuid: payload })
        .then(() => {})
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    initBoard(payload) {
      this.$store
        .dispatch("externalUser/getCustomerStatistics", payload)
        .then(() => {
          const {
            new_contact_cnt,
            new_apply_cnt,
            negative_feedback_cnt
          } = this.customerStatistics;
          this.externalUser = {
            new_contact_cnt,
            new_apply_cnt,
            negative_feedback_cnt
          };
          const {
            chat_cnt,
            message_cnt,
            reply_percentage,
            avg_reply_time
          } = this.customerStatistics;
          this.message = {
            chat_cnt,
            message_cnt,
            reply_percentage,
            avg_reply_time
          };
        })
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    handleChange() {
      console.log(this.value);
    },
    changeDate(val) {
      this.form.sta = dayjs()
        .subtract(val, "day")
        .format("YYYY-MM-DD HH:mm:ss");
      this.form.end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    handleDetail(index) {
      const uuid = this.idList[index].externalUser.uuid;
      this.$router.push({
        path: "/externalUser/detail/" + uuid
      });
    },
    formatTime() {},
    changeTime() {}
  }
};
</script>

<style lang="scss" scoped>
.avatar_name {
  display: flex;
  align-items: center;
  div {
    margin-left: 8px;
  }
}

.out-container {
  display: flex;
  justify-content: space-between;
}
.left-top-info {
  .info-name {
    display: flex;

    img {
      width: 64px;
      height: 64px;
    }
    > div {
      line-height: 22px;
      font-size: 18px;
      margin: 0 10px;
      span {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
.board-container {
  border-radius: 4px;
  padding: 20px 0;
  background: #ecf5ff;
  border: 1px solid #8cc5ff;
  flex: 1;
  display: flex;
  justify-content: space-around;

  .unit {
    display: flex;
    flex-direction: column;
  }
}

.number {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.type {
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>
