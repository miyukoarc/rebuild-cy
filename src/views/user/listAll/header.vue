<!--
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-12 19:29:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\user\listAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline>
    <el-form-item label="员工姓名：">
      <el-input v-model.trim="query.userName" clearable placeholder="员工姓名"></el-input>
    </el-form-item>
    <el-form-item label="所在部门：">
      <el-select-tree
        v-model="query.departmentsUuid"
        clearable
        :defaultExpandAll="true"
        :checkStrictly="true"
        :data="departmentList"
        :props="{
          value:'uuid',
          label:'name',
          children:'children'
        }"
      ></el-select-tree>
    </el-form-item>

    <el-form-item label="员工角色：">
      <el-select v-model="query.roleUuid" clearable filterable :popper-append-to-body="false">
        <el-option v-for="item in roleList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="会话存档授权状态：">
      <el-select v-model="query.isMessageUser" clearable :popper-append-to-body="false">
        <el-option
          v-for="item in isMessageUserList"
          :key="item.isMessageUser"
          :label="item.name"
          :value="item.isMessageUser"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="允许登陆授权：">
      <el-select v-model="query.visible" clearable :popper-append-to-body="false">
        <el-option
          v-for="item in visibleList"
          :key="item.visible"
          :label="item.name"
          :value="item.visible"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="通讯录授权：">
      <el-select v-model="query.isFollowUser" clearable :popper-append-to-body="false">
        <el-option
          v-for="item in isFollowUserList"
          :key="item.isFollowUser"
          :label="item.name"
          :value="item.isFollowUser"
        ></el-option>
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
          value: "TO_BE_REVIEWED",
        },
        {
          label: "审核通过",
          value: "APPROVED",
        },
        {
          label: "审核不通过",
          value: "AUDIT_FAILED",
        },
      ],
      query: {
        userName: "",
        departmentsUuid: "",
        roleUuid: "",
        isFollowUser: null,
        isMessageUser: null,
        visible: null,
      },
      isFollowUserList: [
        { isFollowUser: 1, name: "已授权" },
        { isFollowUser: 0, name: "未授权" },
      ],
      isMessageUserList: [
        { isMessageUser: 1, name: "已授权" },
        { isMessageUser: 0, name: "未授权" },
      ],
      visibleList: [
        { visible: 1, name: "已授权" },
        { visible: 0, name: "未授权" },
      ],
    };
  },
  computed: {
    ...mapState({
      roleList: (state) => state.role.roleListSelect,
      departmentList: (state) => state.department.listSelect,
    }),
  },
  methods: {
    handleChangeFirst(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeThird(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeForth(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeFifth(val) {
      this.$emit("handleSearch", this.query);
    },
    handleChangeSixth(val) {
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      console.log(this.$options);
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