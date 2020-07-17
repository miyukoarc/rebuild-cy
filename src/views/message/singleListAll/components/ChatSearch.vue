<!--
 * @Author: your name
 * @Date: 2020-06-28 13:56:22
 * @LastEditTime: 2020-07-15 16:00:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item>
      <el-input v-model.trim="query.keyword" size="mini" placeholder="请输入搜索聊天内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        size="mini"
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-t-button type="primary" size="mini" @click="handleReport">导出</el-t-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "chatSearch",
  data() {
    return {
      query: {
        userName: ""
      },
      value: ""
    };
  },
  computed: {
    ...mapState({})
  },
  methods: {
    handleSelectedTime(val) {
      console.log(val);
      this.query.startTime = this.value[0];
      this.query.endTime = this.value[1];
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      console.log(val);
      this.$emit("handleSearch", this.query);
    },
    handleChangeThird(val) {
      console.log(val);
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleReport() {}
  }
};
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>