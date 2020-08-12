<template>
  <el-form ref="searchForm" inline label-width="120px" class="batchSendTask">
    <el-form-item label="群发状态：">
      <el-select v-model="query.state" placeholder="请选择" :popper-append-to-body="false">
        <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="群发类型：">
      <el-select v-model="query.sendType" placeholder="请选择" :popper-append-to-body="false">
        <el-option
          v-for="item in sendType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建员工：">
      <el-select
        v-model="query.senderUuid"
        placeholder="请选择"
        filterable
        :popper-append-to-body="false"
      >
        <el-option
          v-for="item in userListSelect"
          :key="item.value"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="发送时间">
      <el-date-picker
        :append-to-body="false"
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        @change="handleChangeData"
      ></el-date-picker>
    </el-form-item>

    <div>
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: [],
      sendType: [
        {
          label: "WX",
          value: "WX",
        },
        {
          label: "MY",
          value: "My",
        },
      ],
      state: [
        {
          value: "PENDING",
          label: "挂起",
        },
        {
          value: "SENDING",
          label: "发送中",
        },
        {
          value: "SUSPEND",
          label: "中止",
        },
        {
          value: "FINISHED",
          label: "已完成",
        },
      ],
      query: {
        state: "",
        sendType: "",
        senderUuid: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,
      userListSelect: (state) => state.user.listSelect,
    }),
  },
  methods: {
    initFilter() {
      this.$store
        .dispatch("user/getUserListSelect")
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    handleChangeData(val) {
      this.query.startTime = this.value[0];
      this.query.endTime = this.value[1];
    },
    handleChangeFirst(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeThird(val) {
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.query = this.$options.data().query;
    },
  },
};
</script>

<style lang="scss" scoped>
.batchSendTask {
  .el-date-range-picker {
    width: auto;
  }
}
</style>