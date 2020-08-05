<template>
  <div>
    <board-header
      ref="boardHeader"
      @selectAll="handleSelectAll"
      @batchTransfer="handleBatchTransfer"
      @batchDelete="handleBatchDelete"
      @addMedia="handleAddMedia"
      @toggleLayout="handleToggleLayout"
    ></board-header>
    <div class="btn-container">
      <keep-alive>
        <el-table
          v-if="mode==='list'"
          :data="listAll"
          ref="mediaGroupTable"
          style="width: 100%"
          lazy
          highlight-current-row
          :show-header="true"
          header-row-class-name="el-table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" prop="fileName"></el-table-column>
          <el-table-column label="创建人">
            <template v-slot="{row}">
              <div>{{row.creator.name}}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="内容" prop="content">
          </el-table-column>-->
          <el-table-column label="创建时间" prop="createdAt"></el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template v-slot="{row}">

                <span v-if="row.auditStateForOperation==='UNDER_REVCIEW'" class="color-primary">审核中</span>
                
              <!-- <el-t-button type="text" @click.stop="handleEdit(scope.$index)">编辑</el-t-button> -->
              <el-t-button v-else type="text" @click.stop="handleDelete(row.uuid)">删除</el-t-button>
            </template>
          </el-table-column>
        </el-table>
        <card-grid
          v-else
          ref="cardGrid"
          v-model="selects"
          :options="listAll"
          @handleDelete="handleDelete"
        ></card-grid>
      </keep-alive>
    </div>

    <dialog-transfer
      ref="dialogTransfer"
      :options="groupListAll"
      v-model="groupUuid"
      @handleTransfer="handleTransfer"
    ></dialog-transfer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardHeader from './board-header'
import CardGrid from '@/components/CardGrid'
import DialogTransfer from './dialog-transfer'
export default {
  components: { BoardHeader, CardGrid, DialogTransfer },
  data() {
    return {
      selects: [],
      groupUuid: 0,
      mode: 'list',
    }
  },
  watch: {
    //取消头部全选
    selects: {
      handler(newVal, oldVal) {
        if (newVal.length !== this.listAll.length) {
          this.$nextTick(() => {
            this.$refs['boardHeader'].checked = false
          })
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      permissionMap: (state) => state.permission.permissionMap,
      listAll: (state) => state.media.fileListAll,
      loading: (state) => state.media.loading,
      mediaType: (state) => state.enum.mediaType,
      groupListAll: (state) => state.media.mediaGroupListAll,
    }),
  },
  methods: {
    handleAddMedia() {
      this.$emit('handleCreateFile')
    },
    handleView(url) {
      this.originImage = url
      this.dialogVisible = true
    },
    onLoad(e) {
      const img = e.target
      let width = 0
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40
      }
      this.width = width + 'px'
    },

    handleEdit(val) {},
    handleDelete(val) {
      let arr = []
      if (typeof val === 'number' || typeof val === 'string') {
        arr.push(val)
      } else {
        arr = val
      }
      this.$emit('handleDelete', arr)
    },
    handleSelectionChange(val) {
      this.selects = val.map((item) => {
        return item.uuid
      })
    },

    handleTransfer() {
      const mediaUuid = this.selects
      const groupUuid = this.groupUuid
      this.$emit('handleTransfer', { mediaUuid, groupUuid })
    },

    /**
     * board-header
     */
    handleSelectAll(bool) {
      if (this.mode === 'list') {
        this.$refs['mediaGroupTable'].toggleAllSelection()
      } else {
        this.$refs['cardGrid'].handleCheckAll()
      }
    },
    handleBatchTransfer() {
      console.log('移动分组')
      if (this.selects.length) {
        this.$refs['dialogTransfer'].dialogVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '请至少勾选一项！',
        })
      }
    },
    handleBatchDelete() {
      if (this.selects.length) {
        const mediaUuids = this.selects //array
        this.$emit('handleDelete', mediaUuids)
      } else {
        this.$message({
          type: 'warning',
          message: '请至少选择一项！',
        })
      }
    },
    handleToggleLayout(val) {
      this.mode = val
    },

    closeDialog() {
      this.$refs['dialogTransfer'].dialogVisible = false
    },
    selectable(row, index) {
      return row.auditStateForOperation !== 'UNDER_REVCIEW'
    },
  },
}
</script>

<style lang="scss" scoped>
</style>