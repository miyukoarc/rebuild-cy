<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}条记录`" :hasRefresh="true" @handleRefresh="handleRequest">
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            v-permission="'audit,audit_batchAuditTagConfirmation'"
            :auth="'audit,audit_batchAuditTagConfirmation'"
            @click="handleBatch(action='access')"
          >批量通过</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            v-permission="'audit,audit_batchAuditTagConfirmation'"
            :auth="'audit,audit_batchAuditTagConfirmation'"
            @click="handleBatch(action='reject')"
          >批量拒绝</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="listAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          :default-sort="sortConfig"
          @selection-change="handleSelectionChange"
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection" :selectable="selectable"></el-table-column>
          <el-table-column width="85" align="left" label="提交人">
            <template v-slot="{row}">
              <div v-if="row.mediaOperationType==='UPDATE_ARTICLE'">{{row.approvedOperator.name}}</div>
              <div v-else>{{row.submitOperator.name}}</div>
            </template>
          </el-table-column>

          <el-table-column
            align="left"
            label="提交时间"
            prop="createdAt"
            sortable
            :sort-orders="['descending', 'ascending']"
          ></el-table-column>

          <el-table-column align="left" label="素材类型">
            <template v-slot="{row}">
              <span v-if="row.auditAddMedia">{{mediaType[row.auditAddMedia[0].type]}}</span>
              <span v-else>{{mediaType[row.toMedis[0].type]}}</span>
            </template>
          </el-table-column>

          <el-table-column align="left" label="缩略图/内容">
            <template v-slot="{row}">
              <div class="thumb-container" v-if="row.auditAddMedia">
                <div
                  class="thumb"
                  v-if="row.auditAddMedia[0].type==='IMAGE'"
                  @click="handleView(type='IMAGE',row.auditAddMedia)"
                >
                  <el-image fit="contain" :src="`/api/public/file/${row.auditAddMedia[0].localId}`"></el-image>
                </div>
                <div
                  class="thumb"
                  v-if="row.auditAddMedia[0].type==='VIDEO'"
                  @click="handleView(type='VIDEO',row.auditAddMedia)"
                >
                  <video-cover :url="row.auditAddMedia[0].localId"></video-cover>
                </div>
                <div
                  class="font-no-wrap"
                  v-if="row.auditAddMedia[0].type==='TEXT'"
                >{{row.auditAddMedia[0].textContents}}</div>
                <div v-if="row.auditAddMedia[0].type==='ARTICLE'">《{{row.auditAddMedia[0].title}}》</div>
                <div v-if="row.auditAddMedia[0].type==='FILE'">{{row.auditAddMedia[0].fileName}}</div>
              </div>

              <div class="thumb-container" v-else>
                <div
                  class="thumb"
                  v-if="row.toMedis[0].type==='IMAGE'"
                  @click="handleView(type='IMAGE',row.toMedis)"
                >
                  <el-image fit="contain" :src="`/api/public/file/${row.toMedis[0].localId}`"></el-image>
                </div>
                <div
                  class="thumb"
                  v-if="row.toMedis[0].type==='VIDEO'"
                  @click="handleView(type='VIDEO',row.toMedis)"
                >
                  <video-cover :url="row.toMedis[0].localId"></video-cover>
                </div>
                <div
                  class="font-no-wrap"
                  v-if="row.toMedis[0].type==='TEXT'"
                >{{row.toMedis[0].content}}</div>
                <div v-if="row.toMedis[0].type==='ARTICLE'">《{{row.toMedis[0].title}}》</div>
                <div v-if="row.toMedis[0].type==='FILE'">{{row.toMedis[0].fileName}}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="left" label="新增/删除">
            <template v-slot="{row}">
              <div>
                <span class="color-primary" v-if="row.mediaOperationType==='UPDATE_ARTICLE'">修改</span>
                <span class="color-success" v-if="row.mediaOperationType==='ADD_MEDIA'">新增</span>
                <span class="color-danger" v-if="row.mediaOperationType==='DELETE_MEDIA'">删除</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="leeft"
            label="状态"
            sortable
            prop="auditState"
            :sort-method="sortMethod"
            :sort-orders="['ascending','descending',null]"
          >
            <template v-slot="{row}">
              <div>
                <span v-if="row.auditState==='TO_BE_REVIEWED'" class="color-primary">审核中</span>
                <span v-else-if="row.auditState==='AUDIT_FAILED'" class="color-danger">已拒绝</span>
                <span v-else class="color-success">已通过</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="80">
            <template v-slot="{row}">
              <div>
                <el-t-button type="text" @click.stop.native="handleAudit(row.uuid)">
                  <span v-if="row.auditState==='TO_BE_REVIEWED'">审核</span>

                  <span v-else>详细</span>
                </el-t-button>
                
              </div>
            </template>
          </el-table-column>
        </el-table>

        <customer-pagination
          :pageConfig="pageConfig"
          @current-change="changePage"
          @size-change="changeSize"
        ></customer-pagination>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" :width="width" center destroy-on-close>
      <el-image v-if="viewMode==='IMAGE'" :src="`/api/public/file/${imageUrl}`" @load="onLoad"></el-image>
      <video
        v-if="viewMode==='VIDEO'"
        ref="videoPlay"
        width="600"
        height="400"
        controls
        :src="`/api/public/file/${videoUrl}`"
        @canplay="onCanplay"
      ></video>
    </el-dialog>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from '@/components/ToolBar'
import VideoCover from '@/components/VideoCover'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'riskManagement_auditMediaListAll',
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    VideoCover,
    CustomerPagination,
  },
  data() {
    return {
      width: '',
      viewMode: '', //IMAGE//VIDEO
      imageUrl: '',
      videoUrl: '',
      dialogVisible: false,
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },
      sortConfig: { prop: 'auditState', order: 'ascending' },

      query: {
        page: 0,
        size: 10,
        auditConfirmation: '',
        auditType: 'MEDIA',
        handlerId: '',
        submitterId: '',
      },

      selects: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      auditStateEnum: (state) => state.enum.auditState,
      //   tagListAll: state => state.tag.tagListAll,
      permissionMap: (state) => state.permission.permissionMap,
      auditState: (state) => state.emnu.auditState,
      mediaType: (state) => state.enum.mediaType,

      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.auditMediaList,
      page: (state) => state.sensitive.auditMediaPage,
      currentUserUuid: (state) => state.user.uuid,
    }),
  },
  created() {
    this.initDataList(this.query)
    // this.initFilter()
  },
  mounted() {
    //刷新eventBUs
    this.$bus.$on('handleRefresh', () => {
      this.initDataList(this.query)
    })
    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
  },
  methods: {
    doExport(val) {},
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch((err) => {
            console.error(err)
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('sensitive/auditMediaListAll', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
        })
        .catch((err) => {
            console.error(err)
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    handleRequest(){
        this.initDataList(this.query)
    },
    handleSearch(val) {
      const { auditConfirmation, handlerId, submitterId } = val
      this.query.auditConfirmation = auditConfirmation
        ? auditConfirmation
        : this.query.auditConfirmation
      this.query.handlerId = handlerId ? handlerId : this.query.handlerId
      this.query.submitterId = submitterId
        ? submitterId
        : this.query.submitterId
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRefresh() {
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    changePage(key) {
      console.log(key)
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val) {
      this.selects = val.map((item) => {
        return item.uuid
      })
    },
    handleView(type, str) {
      const mediaId = str[0].localId

      if (type === 'IMAGE') {
        this.imageUrl = mediaId
      } else {
        this.videoUrl = mediaId
      }
      this.viewMode = type

      this.dialogVisible = true
    },
    parse(str) {
      return JSON.parse(str)
    },
    handleAudit(uuid) {
      this.$refs['formDialog'].event = 'AuditTemplate'
      this.$refs['formDialog'].eventType = 'audit'
      this.$refs['formDialog'].transfer = { uuid }
      this.$refs['formDialog'].dialogVisible = true
    },
    onLoad(e) {
      const img = e.target
      let width = 0
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40
      }
      this.width = width + 'px'
    },
    onCanplay(e) {
      this.width = 640 + 'px'
    },
    selectable(row, index) {
      let flag = false
      row.auditUsers.forEach((item) => {
        item.userList.forEach((user) => {
          if (user.uuid === this.currentUserUuid) {
            //   console.log(user.auditState)
            if (
              user.auditState === 'APPROVED' ||
              user.auditState === 'AUDIT_FAILED'
            ) {
              flag = true
            }
          }
        })
      })
      return row.auditState === 'TO_BE_REVIEWED' && !flag
    },
    handleBatch(action) {
      if (this.selects.length) {
        let uuids = this.selects
        let payload = null
        if (action === 'reject') {
          uuids = this.selects
          payload = {
            auditConfirmation: 'AUDIT_FAILED',
            uuids,
          }
        } else {
          uuids = this.selects
          payload = {
            auditConfirmation: 'APPROVED',
            uuids,
          }
        }

        this.batchAudit(payload)
      } else {
        this.$message({
          type: 'warning',
          message: '请至少选择一项',
        })
      }
    },
    batchAudit(payload) {
      this.$store
        .dispatch('audit/batchAuditMediaConfirmation', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1000,
            onClose: () => {
              this.initDataList(this.query)
            },
          })
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
    sortMethod(a, b) {
      if (a.auditState === 'TO_BE_REVIEWED') {
        return -1
      }
      if (b.auditState === 'TO_BE_REVIEWED') {
        return 1
      }
      if (a.auditState === b.auditState) {
        return 0
      }
    },
    changeSize(val) {
      this.query.size = val
      this.initDataList(this.query)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
}
.thumb {
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>
