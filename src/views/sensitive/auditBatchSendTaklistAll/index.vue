<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`">
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['audit']['audit_batchAuditTagConfirmation']"
            @click="handleBatch(action='access')"
          >批量通过</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['audit']['audit_batchAuditTagConfirmation']"
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
              <div>{{row.submitOperator.name}}</div>
            </template>
          </el-table-column>

          <el-table-column
            align="left"
            label="提交时间"
            prop="createdAt"
            sortable
            :sort-orders="['descending', 'ascending']"
          ></el-table-column>

          <el-table-column align="left" label="群发内容">
            <template v-slot="{row}">
              <span class="font-no-wrap">{{row.textContent}}</span>
            </template>
          </el-table-column>

          <el-table-column align="left" label="客户标签">
            <template v-slot="{row}">
                <div>
                    <el-row>
                        <el-col :span="8">
                            <span class="color-primary font-exs" v-if="row.matchFormat">{{matchFormat[row.matchFormat]}}</span>
                            <span v-else>--</span>
                        </el-col>
                        <el-col :span="16">
                            <tags-drawer v-if="row.toTags&&Object.keys(row.toTags).length" :tags="grouping(row.toTags)"></tags-drawer>
                        </el-col>
                    </el-row>
                </div>
            </template>
          </el-table-column>

          <el-table-column
            align="leeft"
            label="状态"
            sortable
            prop="auditState"
            width="80"
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

          <el-table-column label="操作" width="80" align="right">
            <template v-slot="{row}">
              <div>
                <el-t-button type="text" @click="handleAudit(row.uuid)">审核</el-t-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          background
          class="pager"
          layout="total,prev, pager, next,jumper"
          :total="pageConfig.total"
          :current-page.sync="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @current-change="changePage"
        />-->
        <customer-pagination :pageConfig="pageConfig" @current-change="changePage"></customer-pagination>
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import TagsDrawer from '@/components/TagsDrawer'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    CustomerPagination,
    TagsDrawer
  },
  data() {
    return {
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
        auditType: 'BATCH_SEND_TASK',
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
      auditState: (state) => state.emnu.auditState,
      mediaType: (state) => state.enum.mediaType,
      matchFormat: state => state.enum.matchFormat,
      permissionMap: (state) => state.permission.permissionMap,

      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.auditBatchSendTaskListAll,
      page: (state) => state.sensitive.auditBatchSendTaskPage,
    }),
  },
  created() {
    this.initDataList(this.query)
  },
  methods: {
    doExport(val) {
      console.log(val)
    },

    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('sensitive/getAuditBatchSendTaklistAll', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    handleAudit(uuid) {
      this.$refs['formDialog'].event = 'AuditTemplate'
      this.$refs['formDialog'].eventType = 'audit'
      this.$refs['formDialog'].transfer = { uuid }
      this.$refs['formDialog'].dialogVisible = true
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
      this.initDataList(this.query)
    },
    handleRefresh() {
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val) {
      this.selects = val.map((item) => {
        return item.uuid
      })
    },
    handleBatch(action) {
      let uuids = this.selects
      let payload = null
      if (action === 'reject') {
        uuids = this.selects
        payload = {
          auditConfirmation: 'AUDIT_FAILED',
          uuids
        }
      } else {
        uuids = this.selects
        payload = {
          auditConfirmation: 'APPROVED',
          uuids
        }
      }

      this.batchAudit(payload)
    },
    batchAudit(payload) {
      this.$store
        .dispatch('audit/batchAuditBatchTaskConfirmation', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1000,
            onClose: () => {
              this.initDataList(this.query)
            }
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },

    /**
     * 单挑审批
     */
    handleAccess(val) {
      const payload = {
        auditConfirmation: 'APPROVED',
        uuids: [val.uuid],
      }

      this.$confirm('是否通过当前审批', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('audit/batchAuditBatchTaskConfirmation', payload)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.initDataList(this.query)
            })
            .catch((err) => {
              console.error(err)
              this.$message({
                type: 'danger',
                message: '操作失败',
              })
            })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleReject(val) {
      const payload = {
        auditConfirmation: 'AUDIT_FAILED',
        uuids: [val.uuid],
      }

      this.$confirm('是否拒绝当前审批', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('audit/batchAuditBatchTaskConfirmation', payload)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.initDataList(this.query)
            })
            .catch((err) => {
              this.$message({
                type: 'danger',
                message: '操作失败',
              })
            })
        })
        .catch((err) => {})
    },
    /**
     * 批量审批
     */
    handleBatchConfrim() {
      const uuids = this.selects
      const payload = {
        auditConfirmation: 'APPROVED',
        uuids,
      }
      console.log(payload)
      if (this.selects.length) {
        this.$store
          .dispatch('audit/batchAuditBatchTaskConfirmation', payload)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.initDataList(this.query)
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '操作失败',
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项',
        })
      }
    },
    handleBatchReject() {
      const uuids = this.selects
      const payload = {
        auditConfirmation: 'AUDIT_FAILED',
        uuids,
      }
      if (this.selects.length) {
        this.$store
          .dispatch('audit/batchAuditBatchTaskConfirmation', payload)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.initDataList(this.query)
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '操作失败',
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项',
        })
      }
    },

    grouping(list) {
      if (Object.keys(list).length) {
        return list.reduce((groups, item) => {
          let groupFound = groups.find(
            (foundItem) => item.groupId === foundItem.groupId
          )
          if (groupFound) {
            groupFound.tags.push(item)
          } else {
            let newGroup = {
              groupId: item.groupId,
              groupName: item.groupName,
              tags: [item],
            }

            groups.push(newGroup)
          }

          return groups
        }, [])
      } else {
        return []
      }
    },
    /**
     * 排序
     */
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
  },
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}

// .app-container {
//   border-top: 1px solid #e9e9e9;
//   background: white;
//   .roles-table {
//     margin-top: 30px;
//   }
//   .permission-tree {
//     margin-bottom: 30px;
//   }
// }
// header .el-header button {
//   margin-right: 5px;
// }
</style>
