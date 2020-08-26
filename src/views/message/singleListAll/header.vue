<!--
 * @Author: your name
 * @Date: 2020-06-28 13:56:22
 * @LastEditTime: 2020-08-26 15:03:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="搜索聊天内容：">
      <el-input v-model.trim="query.content" placeholder="请输入搜索聊天内容"></el-input>
    </el-form-item>

    <el-form-item label="聊天时间：">
      <el-date-picker
        :append-to-body="false"
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH:mm:ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
        :default-time="['00:00:00', '23:59:59']"
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
      query: {
        content: "",
        startTime: "",
        endTime: "",
      },
      value: "",
    };
  },
  computed: {
    ...mapState({
      roleList: (state) => state.role.roleList,
      departmentListSelect: (state) => state.department.listSelect,
    }),
  },
  methods: {
    handleSelectedTime(val) {
      if (val) {
        this.query.startTime = this.value[0];
        this.query.endTime = this.value[1];
      } else {
        this.query.startTime = "";
        this.query.endTime = "";
      }
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
      this.value = this.$options.data().value;
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