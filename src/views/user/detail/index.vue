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
            :picker-options="pickerOptions"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChange"
            :default-time="['00:00:00', '23:59:59']"
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
        <el-table-column label="上次对话时间" align="left">
          <template v-slot="scope">
            <div>{{ scope.row.lastMsgTime ? scope.row.lastMsgTime  : "--" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="添加渠道" align="left">
          <template v-slot="scope">
            <div>{{ scope.row.source ? source : "--" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template v-slot="scope">
            <el-t-button
              type="text"
              :popAuth="true"
              v-permission="'externalUser,externalUser_detail'"
              :auth="'externalUser,externalUser_detail'"
              size="mini"
              v-if="scope.row.lastMsgTime"
              @click.stop.native="handleGroupChat(scope.row)"
            >聊天记录</el-t-button>
            <span v-else class="color-info">聊天记录</span>
            <el-t-button
              type="text"
              :popAuth="true"
              v-permission="'externalUser,externalUser_detail'"
              :auth="'externalUser,externalUser_detail'"
              size="mini"
              @click.stop.native="handleDetail(scope.$index)"
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
  // name: "user_detail",
  data() {
    return {
      value: [],
      date: 1,
      form: {
        end: "",
        sta: "",
        userid: [],
      },
      externalUser: {},
      message: {},
      reflect: {
        chat_cnt: "聊天总数(条)",
        message_cnt: "发送消息总数(条)",
        reply_percentage: "已回复聊天占比(%)",
        avg_reply_time: "平均首次回复时长(分)",
        negative_feedback_cnt: "拉黑/删除某人(人)",
        new_apply_cnt: "主动添加客户数(人)",
        new_contact_cnt: "新增客户数(人)",
      },
      pickerOptions: {
        onPick: ({ minDate, maxDate }) => {
          //当第一时间选中才设置禁用
          console.log("3333111", minDate, maxDate);
          if (minDate && maxDate) {
            // this.value = [
            //   dayjs(minDate).format("YYYY-MM-DD 00:00:00"),
            //   dayjs(maxDate).format("YYYY-MM-DD 23:59:59"),
            // ];
            this.form.end = dayjs(maxDate).format("YYYY-MM-DD 23:59:59");
            this.form.sta = dayjs(minDate).format("YYYY-MM-DD 00:00:00");
            console.log("afadfasdfafsdf", this.form);
            this.initBoard(this.form);
          }
          console.log(this.value, "this.value");
        },
        disabledDate: (time) => {
          return (
            time.getTime() > Date.now() - 24 * 60 * 60 * 1000 ||
            time.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000
          );
        },
      },
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const uuid = newVal.params.uuid;
        this.$once("hook:created", () => {
          this.initData(uuid);
        });
      },
      immediate: true,
    },
    date: {
      handler(newVal, oldVal) {
        this.changeDate(newVal);
        this.initBoard(this.form);
      },
      immediate: true,
    },
    "form.userid.length": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.initBoard(this.form);
        }
      },
    },
  },
  computed: {
    ...mapState({
      userDetail: (state) => state.user.userDetail,
      customerStatistics: (state) => state.externalUser.customerStatistics,
      loading: (state) => state.externalUser.loading,
      idList: (state) => state.externalUser.idList,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    // this.initBoard(this.form)
  },
  mounted() {},
  methods: {
    initData(payload) {
      this.$store
        .dispatch("user/getDetail", payload)
        .then((res) => {
          const { userId } = res;
          this.form.userid.push(userId);
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });

      this.$store
        .dispatch("externalUser/getListExUserByUserId", { uuid: payload })
        .then(() => {})
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
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
            negative_feedback_cnt,
          } = this.customerStatistics;
          this.externalUser = {
            new_contact_cnt,
            new_apply_cnt,
            negative_feedback_cnt,
          };
          let {
            chat_cnt,
            message_cnt,
            reply_percentage,
            avg_reply_time,
          } = this.customerStatistics;
          reply_percentage = this.isDot(reply_percentage);
          this.message = {
            chat_cnt,
            message_cnt,
            reply_percentage,
            avg_reply_time,
          };
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
    },
    handleChange() {
      console.log("66666");
      if (this.value) {
        this.form.sta = this.value[0];
        this.form.end = this.value[1];
      } else {
        this.form.sta = dayjs()
          .subtract(this.date, "day")
          .format("YYYY-MM-DD 00:00:00");
        this.form.end = dayjs()
          .subtract(1, "day")
          .format("YYYY-MM-DD 23:59:59");
      }
      console.log(this.form.sta, this.form.end, "66666");
      this.initBoard(this.form);
    },
    changeDate(val) {
      console.log(val, "3333333");
      this.form.sta = dayjs()
        .subtract(val, "day")
        .format("YYYY-MM-DD 00:00:00");
      this.form.end = dayjs().subtract(1, "day").format("YYYY-MM-DD 23:59:59");
      console.log(this.form.sta, this.form.end, "66666");
    },
    handleGroupChat(row) {
      console.log(row, "row", this.userDetail);
      let userId = row.externalUser.externalUserId;
      const query = {
        uuid: this.userDetail.uuid,
        userId,
        type: "user",
      };
      this.$router.push({
        path: "/message/singleListAll",
        query,
      });
    },
    handleDetail(index) {
      const uuid = this.idList[index].externalUser.uuid;
      this.$router.push({
        path: "/externalUser/detail/" + uuid,
      });
    },
    isDot(num) {
      console.log(num, typeof num);
      if (num) {
        let result = num.toString().indexOf(".");
        if (result != -1) {
          return num.toFixed(2);
        } else {
          return num;
        }
      }else{
        return 0
      }
    },
  },
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
