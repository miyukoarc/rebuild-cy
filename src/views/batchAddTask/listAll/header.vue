<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="任务状态：">
      <el-select v-model="query.status" clearable :popper-append-to-body="false">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建人：">
      <el-select v-model="query.creatorUuid" clearable filterable :popper-append-to-body="false">
        <el-option
          v-for="item in userListSelect"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间：">
      <el-date-picker
        :append-to-body="false"
        v-model="datePicker"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleChangeSecond"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>

    <div>
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" clearable @click="handleSearch">搜索</el-t-button>
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
      statusList: [
        {
          value: "NOTSTARTED",
          label: "未开始",
        },
        {
          value: "INTERRUPT",
          label: "中断",
        },
        {
          value: "PROCESSING",
          label: "进行中",
        },
        {
          value: "CANCELED",
          label: "已取消",
        },
        {
          value: "FINISHED",
          label: "已完成",
        },
      ],
      datePicker: [],
      query: {
        status: "",
        creatorUuid: "",
        starttime: "",
        endtime: "",
      },
    };
  },
  computed: {
    ...mapState({
      userListSelect: (state) => state.user.listSelect,
    }),
  },
  methods: {
    handleChangeFirst(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      if (val) {
        this.query.starttime = val[0];
        this.query.endtime = val[1];
      } else {
        this.query.starttime = "";
        this.query.endtime = "";
      }
      //   this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.datePicker = this.$options.data().datePicker;
      this.query = this.$options.data().query;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>