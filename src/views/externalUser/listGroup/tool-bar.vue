<template>
  <div>
    <div class="tool-bar-container">
      <div class="left">
        <el-button type="primary" @click="actionExport" v-if="hasExport">导出Excel</el-button>
        <el-button type="primary" @click="actionImport" v-if="hasImport">导入Excel</el-button>
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
    flex: 1;
  }
  .right {
    flex: 1;
    text-align: right;
  }
}
</style>