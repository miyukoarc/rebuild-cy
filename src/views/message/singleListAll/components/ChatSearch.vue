<!--
 * @Author: your name
 * @Date: 2020-06-28 13:56:22
 * @LastEditTime: 2020-08-14 17:58:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item>
      <el-input
        v-model.trim="query.content"
        clearable
        size="mini"
        @clear="handleSearch"
        placeholder="请输入搜索聊天内容"
        style="width:180px"
      >
        <i slot="prefix" class="el-input__icon el-icon-search search-icon" @click="handleSearch"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        size="mini"
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH:mm:ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        @change="handleSelectedTime"
        style="width:260px"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <!-- <el-t-button type="primary" size="mini" @click="handleReport">导出</el-t-button> -->
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
        content: "",
        startTime: "",
        endTime: "",
      },
      value: "",
    };
  },
  computed: {
    ...mapState({}),
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
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleReport() {
      this.$emit("handleReport", this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
.search-icon {
  cursor: pointer;
}
</style>