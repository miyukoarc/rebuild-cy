<template>
  <div>
    <div class="tool-bar-container">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="middle-left">
        <el-button type="primary" @click="actionExport" v-if="hasExport">导出Excel</el-button>
        <el-button type="primary" @click="actionImport" v-if="hasImport">导入Excel</el-button>
        <el-button type="text" @click="handleRefresh" v-if="hasRefresh">更新数据</el-button>
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
    hasRefresh: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    actionExport() {
      this.$emit('handleExport', '导出')
    },
    actionImport() {
      this.$emit('handleImport', '导入')
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-container {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    margin: 0 20px 0 0;
  }

  .middle-left {
    flex: 1;
  }
  .right {
    flex: 1;
    text-align: right;
  }
}
</style>