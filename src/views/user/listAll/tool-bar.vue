<template>
  <div>
    <div class="tool-bar-container">
      <div class="left">
        <span class="font-s">共{{usersNumber}}位员工</span>
        <el-button type="text" @click="actionUpdate" v-if="hasUpdate">更新数据</el-button>
        <el-button type="primary" @click="actionExport" v-if="hasExport">导出Excel</el-button>
        <el-button type="primary" @click="actionImport" v-if="hasImport">导入Excel</el-button>
        <el-button type="primary" @click="actionDepartment" v-if="hasDepartment">批量分配部门</el-button>
        <el-button type="primary" @click="actionRole" v-if="hasRole">批量分配角色</el-button>
        <span class="font-s color-info">{{msg}}</span>
      </div>

      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    usersNumber: {
      type: Number
    },
    msg: {
      type: String
    },
    hasExport: {
      type: Boolean,
      default: true
    },
    hasImport: {
      type: Boolean,
      default: false
    },
    hasUpdate: {
      type: Boolean,
      default: true
    },
    hasDepartment: {
      type: Boolean,
      default: true
    },
    hasRole: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    actionExport() {
      this.$emit("handleExport", "导出");
    },
    actionImport() {
      this.$emit("handleImport", "导入");
    },
    actionUpdate() {
      this.$emit("handleUpdate", "更新");
    },
    actionDepartment() {
      this.$emit("actionDepartment", "分配部门");
    },
    actionRole() {
      this.$emit("actionRole", "分配角色");
    }
  }
};
</script>

<style lang="scss" scoped>
.tool-bar-container {
  display: flex;
  justify-content: space-between;

  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    text-align: right;
  }
}
</style>