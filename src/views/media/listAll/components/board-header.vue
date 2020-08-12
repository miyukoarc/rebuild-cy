<template>
  <div class="header-container">
    <div class="left-region">
      <el-button style="margin-left:10px;" type="text" @click="handleToggleLayout(mode='list')">
        <i :class="[mode==='grid'?'color-info':'color-primary','el-icon-s-unfold']"></i>
      </el-button>
      <el-button type="text" @click="handleToggleLayout(mode='grid')">
        <i :class="[mode==='list'?'color-info':'color-primary',,'el-icon-menu']"></i>
      </el-button>
      <el-checkbox
        style="margin-left:20px;"
        v-if="mode==='grid'"
        v-model="checked"
        @change="handleSelectAll"
      >全选</el-checkbox>
    </div>
    <div class="right-region">
      <el-t-button
        v-permission="'media,media_moveMedieToGroup'"
        :popAuth="true"
        :auth="'media,media_moveMedieToGroup'"
        v-if="hasBatch"
        size="mini"
        type="primary"
        @click="handleBatchTransfer"
      >移至分组</el-t-button>
      <el-t-button
        v-permission="'media,media_deleteMediaIsAudit'"
        :popAuth="true"
        :auth="'media,media_deleteMediaIsAudit'"
        v-if="hasBatch"
        size="mini"
        type="primary"
        @click="handleBatchDelete"
      >批量删除</el-t-button>
      <el-t-button
        v-permission="'media,media_addMediaIsAudit'"
        :popAuth="true"
        :auth="'media,media_addMediaIsAudit'"
        v-if="hasAdd"
        size="mini"
        type="primary"
        @click="handleAddMedia"
      >添加素材</el-t-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasAdd: {
      type: Boolean,
      default: true,
    },
    hasBatch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: false,
      mode: 'list', //list//grid
    }
  },
  methods: {
    handleSelectAll() {
      this.$emit('selectAll', this.checked)
    },
    handleBatchTransfer() {
      this.$emit('batchTransfer')
    },
    handleBatchDelete() {
      this.$emit('batchDelete')
    },
    handleAddMedia() {
      this.$emit('addMedia')
    },
    handleToggleLayout(mode) {
      this.mode = mode
      // console.log(mode)
      this.$emit('toggleLayout', mode)
    },
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
}
</style>