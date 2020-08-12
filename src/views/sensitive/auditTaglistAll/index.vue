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
          <el-table-column align="left" label="提交人">
            <template v-slot="scoped">
              <div>{{scoped.row.submitOperator.name}}</div>
            </template>
          </el-table-column>

          <el-table-column align="left" label="提交时间" prop="createdAt" sortable></el-table-column>

          <el-table-column align="left" label="添加/删除的标签内容">
            <template v-slot="{row}">
              <div class="tag-container">
                <div style="width:60px;">{{tagOperationType[row.tagOperationType]}}</div>&emsp;&emsp;
                <div v-if="row.tagOperationType==='DELETE_TAG_GROUP'">
                  <span class="font-exs color-info">{{row.tagChangeContent[0].groupName}}</span>
                </div>

                <div v-if="row.tagOperationType==='ADD_TAG'">
                  <span class="font-exs color-info">{{row.tagChangeContent[0].groupName}}</span>
                </div>

                <div v-if="row.tagOperationType==='UPDATE_TAG'">
                  <div v-if="row.tagChangeContent.length===0">
                    <span class="font-exs color-info">删除</span>
                    <el-tag
                      v-for="tag in row.tagBeforeChangeContent"
                      :key="tag.tagId"
                    >{{tag.tagName}}</el-tag>
                  </div>
                  <div v-else>
                    <div>
                      <span class="font-exs color-info">修改前</span>
                      <el-tag size="mini"
                        v-for="tag in row.tagBeforeChangeContent"
                        :key="tag.tagId"
                      >{{tag.tagName}}</el-tag>
                    </div>
                    <div>
                      <span class="font-exs color-info">修改后</span>
                      <el-tag size="mini" v-for="tag in row.tagChangeContent" :key="tag.tagId">{{tag.tagName}}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="left"
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
                <el-t-button type="text" @click="handleAudit(row.uuid)">详细</el-t-button>
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

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from '@/components/ToolBar'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    CustomerPagination,
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        auditConfirmation: '',
        auditType: 'TAG',
        handlerId: '',
        submitterId: '',
      },

      sortConfig: { prop: 'auditState', order: 'ascending' },

      selects: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      auditStateEnum: (state) => state.enum.auditState,
      //   tagListAll: state => state.tag.tagListAll,
      permissionMap: (state) => state.permission.permissionMap,

      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.auditTaglist,
      page: (state) => state.sensitive.auditTagPage,
      tagOperationType: (state) => state.enum.tagOperationType,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {
    this.$bus.$on('handleRefresh', () => {
      this.initDataList(this.query)
    })
    this.$once('beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
  },
  methods: {
    doExport(val) {
      
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch((err) => {
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
        .dispatch('sensitive/getAuditTaglistAll', payload)
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
    handleDetail(val) {
      const payload = this.userList[val].uuid
      this.$router.push({
        path: '/user/detail',
        query: { uuid: payload },
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
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRefresh() {
      //重置
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
    /**
     * 批量审批
     */
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
        .dispatch('audit/batchAuditTagConfirmation', payload)
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

    handleAudit(uuid) {
      this.$refs['formDialog'].event = 'AuditTemplate'
      this.$refs['formDialog'].eventType = 'audit'
      this.$refs['formDialog'].transfer = { uuid }
      this.$refs['formDialog'].dialogVisible = true
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
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}

.content-spacing .tag-container {
  display: flex;
  align-items: center;
}
</style>
