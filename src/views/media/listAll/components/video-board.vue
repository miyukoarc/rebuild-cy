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
          row-key="uuid"
          @selection-change="handleSelectionChange"
        >
          <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
          <el-table-column label="预览图">
            <template v-slot="{row}">
              <el-image
                fit="cover"
                v-if="coverImage"
                style="width:36px;height:36px;cursor:pointer;"
                :src="coverImage"
                @click="handleView(row.localId)"
              ></el-image>
              <video
                v-else
                width="0"
                height="0"
                ref="videoZoom"
                :src="`/api/public/file/${row.localId}`"
              ></video>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template v-slot="{row}">
              <div>{{row.creator.name}}</div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" prop="createdAt"></el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template v-slot="scope">
              <span
                v-if="scope.row.auditStateForOperation==='UNDER_REVCIEW'"
                class="color-primary"
              >审核中</span>
              <el-t-button
                v-permission="'media,media_deleteMediaIsAudit'"
                :popAuth="true"
                :auth="'media,media_deleteMediaIsAudit'"
                v-else
                type="text"
                @click.stop.native="handleDelete(scope.row.uuid)"
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
    <el-dialog :visible.sync="dialogVisible" width="640px">
      <video
        ref="videoPlay"
        width="600"
        height="400"
        controls
        :src="`/api/public/file/${originUrl}`"
        @canplay="onLoad"
      ></video>
    </el-dialog>

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
      coverImage: '',
      originUrl: '',
      width: '',
      dialogVisible: false,
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
      loading: (state) => state.media.loading,
      permissionMap: (state) => state.permission.permissionMap,
      listAll: (state) => state.media.videoListAll,
      mediaType: (state) => state.enum.mediaType,
      groupListAll: (state) => state.media.mediaGroupListAll,
    }),
  },
  mounted() {
    this.$nextTick(() => {
      const video = this.$refs['videoZoom']
      console.log(video)
      if (video) {
        video.currentTime = 1
        const canvas = document.createElement('canvas')
        canvas.width = 36
        canvas.height = 36
        // 等待video获取到第一帧后
        video.oncanplay = () => {
          // 利用canvas对象方法绘图
          canvas
            .getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height)
          // 转换成base64形式
          const img = canvas.toDataURL('image/jpeg') // 这个就是图片的base64
          this.coverImage = img
        }
      }
    })

    this.$bus.$on('handleInit', () => {
      this.selects = this.$options.data().selects
    })

    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleInit')
    })
  },
  methods: {
    handleAddMedia() {
      this.$emit('handleCreateVideo')
    },
    handleView(url) {
      this.originUrl = url
      this.dialogVisible = true
    },
    onLoad(e) {
      const img = e.target
      //   console.log(img.width)
      //   console.log(this.$refs['videoPlay'].videoWidth)
      let width = 0
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        // width = img.width + 40
        width = this.$refs['videoPlay'].videoWidth + 40
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