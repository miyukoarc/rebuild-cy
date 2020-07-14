<template>
  <div>
    <board-header
      @selectAll="handleSelectAll"
      @batchTransfer="handleBatchTransfer"
      @batchDelete="handleBatchDelete"
      @addMedia="handleAddMedia"
    ></board-header>
    <div class="btn-container">
      <!-- <el-t-button size="mini" :auth="permissionMap['media']['media_add']">上传素材</el-t-button> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardHeader from './board-header'
export default {
  components: {
    BoardHeader
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      permissionMap: state => state.permission.permissionMap
    })
  },
  methods: {
    handleSelectAll() {},
    handleBatchTransfer() {},
    handleBatchDelete() {},
    handleAddMedia() {}
  }
}
</script>

<style lang="scss" scoped>
</style>