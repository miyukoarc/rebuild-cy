<template>
  <div class="header-container">
    <div class="left-region">
      <el-checkbox v-model="checked" @change="handleSelectAll">全选</el-checkbox>
      <el-button type="text">
          <i class="el-icon-s-unfold"></i>
      </el-button>
      <el-button type="text">
          <i class="el-icon-menu"></i>
      </el-button>
    </div>
    <div class="right-region">
      <el-t-button v-if="hasBatch" size="mini" type="primary" @click="handleBatchTransfer">移至分组</el-t-button>
      <el-t-button v-if="hasBatch" size="mini" type="primary" @click="handleBatchDelete">批量删除</el-t-button>
      <el-t-button v-if="hasAdd" size="mini" type="primary" @click="handleAddMedia">添加素材</el-t-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasAdd: {
      type: Boolean,
      default: true
    },
    hasBatch: {
      type: Boolean,
      default: true
    }
  },
  data(){
      return {
          checked: false
      }
  },
  methods: {
    handleSelectAll(){
        this.$emit('selectAll')
    },
    handleBatchTransfer() {
        this.$emit('batchTransfer')
    },
    handleBatchDelete() {
        this.$emit('batchDelete')
    },
    handleAddMedia() {
        this.$emit('addMedia')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  .left-region {
  }
  .right-region {
  }
}
</style>