<template>
  <div>
    <board-header
      :hasAdd="false"
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
          v-loading="loading"
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
          <el-table-column label="创建人">
            <template v-slot="scope">
              <div>{{scope.row.creator.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="资源类型">
            <template v-slot="{row}">
              <div>{{mediaType[row.type]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template v-slot="{row}">
              <div>{{row.title||'--'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="描述">
            <template v-slot="{row}">
              <div>{{row.description||'--'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createdAt"></el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template v-slot="{row}">
              <span class="color-primary" v-if="row.auditStateForOperation==='UNDER_REVCIEW'">审核中</span>
              <el-t-button
                        v-permission="'media,media_deleteMediaIsAudit'"
        :popAuth="true"
        :auth="'media,media_deleteMediaIsAudit'"
                v-else
                type="text"
                @click.stop.native="handleDelete(row.uuid)"
              >删除</el-t-button>
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
      checked: false,
      mode: 'list',
      selects: [],
      groupUuid: 0,
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
      loading: (state) => state.media.loading,
      permissionMap: (state) => state.permission.permissionMap,
      listAll: (state) => state.media.mediaList,
      mediaType: (state) => state.enum.mediaType,
      groupListAll: (state) => state.media.mediaGroupListAll,
    }),
  },
  mounted() {
      this.$bus.$on('handleInit',()=>{
          this.selects = this.$options.data().selects
      })

      this.$once('hook:beforeDestroy',()=>{
          this.$bus.$off('handleInit')
      })
  },
  methods: {
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
    handleAddMedia() {},
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
.header-container {
  display: flex;
  justify-content: space-between;
}
</style>