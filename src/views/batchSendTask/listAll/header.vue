<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="群发状态：">
      <el-select v-model="query.value1" placeholder="请选择" disabled>
        <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="群发类型：">
      <el-select v-model="query.value2" placeholder="请选择" disabled>
        <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建员工：">
      <el-select v-model="query.value3" placeholder="请选择" disabled>
        <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="发送时间">
      <el-date-picker
      disabled
        v-model="query.value4"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
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
      state: [
        { value: 1, label: "a" },
        { value: 2, label: "b" },
        { value: 3, label: "c" }
      ],
      query: {
        value1: "",
        value2: "",
        value3: "",
        value4: ""
      }
    };
  },
  computed: {
    ...mapState({
      tagListAll: state => state.tag.tagListAll,
      userListAll: state => state.user.userListAll
    })
  },
  methods: {
    handleChangeFirst(val) {
      console.log(val);
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
    handleRefresh() {
      this.$emit("handleRefresh");
      this.query = this.$options.data().query;
    }
  }
};
</script>

<style>
</style>