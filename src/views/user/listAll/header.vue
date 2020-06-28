<!--
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-28 15:20:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\user\listAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="员工姓名：">
      <el-input v-model.trim="query.userName" clearable></el-input>
    </el-form-item>
    <el-form-item label="所在部门：">
      <el-select v-model="query.departmentsUuid" clearable @change="handleChangeSecond">
        <el-option
          v-for="item in departmentListSelect"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="员工角色：">
      <el-select v-model="query.roleUuid" clearable @change="handleChangeThird">
        <el-option v-for="item in roleList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
      </el-select>
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
      options: [
        {
          label: "待审核",
          value: "TO_BE_REVIEWED"
        },
        {
          label: "审核通过",
          value: "APPROVED"
        },
        {
          label: "审核不通过",
          value: "AUDIT_FAILED"
        }
      ],
      query: {
        userName: "",
        departmentsUuid: "",
        roleUuid: ""
      }
    };
  },
  computed: {
    ...mapState({
      roleList: state => state.role.roleList,
      departmentListSelect: state => state.department.listSelect
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

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>