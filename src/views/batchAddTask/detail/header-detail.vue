<template>
  <el-form ref="searchForm" inline>
    <el-form-item label="任务状态：">
      <el-select v-model="query.status" clearable @change="handleChangeFirst">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户名：">
      <el-input v-model="query.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="手机号：">
      <el-input v-model="query.mobile" clearable></el-input>
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
          label: "未开始"
        },
        {
          value: "INTERRUPT",
          label: "中断"
        },
        {
          value: "PROCESSING",
          label: "进行中"
        },
        {
          value: "CANCELED",
          label: "已取消"
        },
        {
          value: "FINISHED",
          label: "已完成"
        }
      ],
      query: {
        status: "",
        name: "",
        mobile: ""
      }
    };
  },
  computed: {
    ...mapState({})
  },
  methods: {
    handleChangeFirst(val) {
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.query = this.$options.data().query;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>