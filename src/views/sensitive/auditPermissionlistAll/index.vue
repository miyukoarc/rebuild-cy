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
            :auth="permissionMap['audit']['audit_batchAuditPermissionConfirmation']"
            @click="handleBatchConfrim"
          >批量通过</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['audit']['audit_batchAuditPermissionConfirmation']"
            @click="handleBatchReject"
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
          :default-sort="{order:'ascending',prop:'auditState'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column>
          <el-table-column width="85" align="center" label="提交人">
            <template v-slot="scoped">
              <div>{{scoped.row.submitOperator.name}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="提交时间" prop="createdAt"></el-table-column>

          <el-table-column align="center" label="获取权限类型与内容">
            <template v-slot="scoped">
              <div v-if="scoped.row.toPermissions">
                <!-- {{scoped.row.toPermissions}} -->
                <span
                  v-for="item in scoped.row.toPermissions"
                  :key="item.uuid"
                >{{item.title}}&nbsp;&nbsp;</span>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column align="center" label="内容" prop="text"></el-table-column> -->
          <!-- <el-table-column label="审核状态" align="center">
            <template v-slot="scoped">
              <div>{{auditStateEnum[`${scoped.row.auditState}`]}}</div>
            </template>
          </el-table-column> -->

          <el-table-column label="操作" align="center" sortable :sort-method="sortBy">
            <template v-slot="scoped">
              <div>
                <span
                  v-if="scoped.row.auditState!=='TO_BE_REVIEWED'"
                  :class="scoped.row.auditState==='APPROVED'?'color-success':'color-danger'"
                >{{auditStateEnum[`${scoped.row.auditState}`]}}</span>
                <div v-else>
                  <el-t-button size="mini" type="primary" @click="handleAccess(scoped.row)">通过</el-t-button>
                  <el-t-button size="mini" type="danger" @click="handleReject(scoped.row)">拒绝</el-t-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="pager"
          layout="total,prev, pager, next,jumper"
          :total="pageConfig.total"
          :current-page.sync="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @current-change="changePage"
        />
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
// import mHeadedr from "./header";
import UserDetail from './detail.vue'
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ListHeader,
    UserDetail,
    FormDialog,
    ToolBar
    // mHeadedr
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },

      query: {
        page: 0,
        size: 10,
        auditConfirmation: '',
        auditType: 'PERMISSION',
        handlerId: '',
        submitterId: ''
      },

      selects: []
    }
  },
  watch: {},
  computed: {
    ...mapState({
      auditStateEnum: state => state.enum.auditState,
      //   tagListAll: state => state.tag.tagListAll,
      permissionMap: state => state.permission.permissionMap,

      loading: state => state.sensitive.loading,
      listAll: state => state.sensitive.auditPermissionlist,
      page: state => state.sensitive.auditPermissionPage
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  methods: {
    doExport(val) {
      console.log(val)
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('sensitive/getAuditPermissionlistAll', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    handleDetail(val) {
      const payload = this.userList[val].uuid
      this.$router.push({
        path: '/user/detail',
        query: { uuid: payload }
      })
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
      console.log(val, 'handleSearch')
      this.initDataList(this.query)
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val) {
      this.selects = val.map(item => {
        return item.uuid
      })
    },

    /**
     * 单挑审批
     */
    handleAccess(val) {
      const payload = {
        auditConfirmation: 'APPROVED',
        uuids: [val.uuid]
      }

      this.$confirm('是否通过当前审批', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('audit/batchAuditTagConfirmation', payload)
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList(this.query)
            })
            .catch(err => {
              console.error(err)
              this.$message({
                type: 'danger',
                message: '操作失败'
              })
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleReject(val) {
      const payload = {
        auditConfirmation: 'AUDIT_FAILED',
        uuids: [val.uuid]
      }

      this.$confirm('是否拒绝当前审批', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('audit/batchAuditTagConfirmation', payload)
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList(this.query)
            })
            .catch(err => {
              console.log(err)
              this.$message({
                type: 'danger',
                message: '操作失败'
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 批量审批
     */
    handleBatchConfrim() {
      const uuids = this.selects
      const payload = {
        auditConfirmation: 'APPROVED',
        uuids
      }
      console.log(payload)
      if (this.selects.length) {
        this.$store
          .dispatch('audit/batchAuditTagConfirmation', payload)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功',
              onClose: () => {
                this.initData()
              }
            })
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项'
        })
      }
    },
    handleBatchReject() {
      const uuids = this.selects
      const payload = {
        auditConfirmation: 'AUDIT_FAILED',
        uuids
      }
      if (this.selects.length) {
        this.$store
          .dispatch('audit/batchAuditTagConfirmation', payload)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功',
              onClose: () => {
                this.initData()
              }
            })
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项'
        })
      }
    },
    /**
     * 排序
     */
    sortBy(a, b) {
      //   console.log(a, b)
      if (a.auditState === 'TO_BE_REVIEWED') {
        return -1
      }
      if (b.auditState === 'TO_BE_REVIEWED') {
        return 1
      }
    }
  }
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
