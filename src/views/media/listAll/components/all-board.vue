<template>
  <div>
    <board-header
    :hasAdd="false"
      @selectAll="handleSelectAll"
      @batchTransfer="handleBatchTransfer"
      @batchDelete="handleBatchDelete"
      @addMedia="handleAddMedia"
    ></board-header>
    <div class="btn-container">
      <el-table
        v-loading="loading"
        :data="listAll"
        ref="mediaGroupTable"
        style="width: 100%"
        lazy
        highlight-current-row
        :show-header="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="创建人">
          <template v-slot="scope">
            <div>{{scope.row.creator.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-t-button type="text" @click.stop="handleEdit(scope.$index)">编辑</el-t-button>
            <el-t-button type="text" @click.stop="handleDelete(scope.$index)">删除</el-t-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardHeader from './board-header'
export default {
  components: { BoardHeader },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.media.loading,
      permissionMap: state => state.permission.permissionMap,
      listAll: state => state.media.articleListAll
    })
  },
  methods: {
    handleEdit(index) {
      const payload = this.listAll[index]
      this.$emit('handleEditArticle', payload)
    },
    handleDelete(index) {
      const payload = this.listAll[index]
      this.$emit('handleDeleteArticle', payload)
    },
    handleSelectAll() {
      this.$refs['mediaGroupTable'].toggleAllSelection()
    },
    handleSelectionChange(val) {
      console.log(
        val.map(item => {
          return item.uuid
        })
      )
    },
    handleBatchTransfer() {},
    handleBatchDelete() {},
    handleAddMedia() {}
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