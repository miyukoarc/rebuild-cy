<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <search-header></search-header>

    </el-card>

    <el-card class="content-spacing">
      <el-t-button size="small" type="primary" @click="handleBatchConfrim">批量通过</el-t-button>
      <el-t-button size="small" type="danger" @click="handleBatchReject">批量拒绝</el-t-button>
    </el-card>
    <el-card class="content-spacing">
      <el-table
        ref="commonTable"
        v-loading="loading"
        stripe
        lazy
        highlight-current-row
        :data="auditTaglist"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column> -->
        <el-table-column width="85" align="center" label="提交人">
          <template v-slot="scoped">
            <div>{{scoped.row.submitOperator.name}}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="提交时间" prop="createdAt"></el-table-column>

        <el-table-column align="center" label="添加/删除的标签内容">
          <template v-slot="scoped">
            <div>{{scoped.row.tagContent}}</div>

          </template>
        </el-table-column>



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
        :current-page.sync="pageConfig.page"
        :page-size="pageConfig.pageSize"
        @current-change="changePage"
      />
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchHeader from './header.vue'
export default {
  components: {
    SearchHeader
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        page: 0,
        pageSize: 10
      },
      query: {
        auditType: 'TAG',
        auditConfirmation: '',
        handlerId: '',
        page: 0,
        size: 10,
        submitterId: ''
      },
      selects: []
    }
  },
  computed: {
    ...mapState({
      auditStateEnum: state => state.enum.auditState,
      loading: state => state.sensitive.loading,
      auditTaglist: state => state.sensitive.auditTaglist,
      auditTagPage: state => state.sensitive.auditTagPage,
      userListAll: state => state.user.userListAll
    })
  },
  created() {
    this.initData(this.query)
  },
  mounted() {
    this.$bus.$on('changeSelect', payload => {
      const { auditConfirmation, handlerId, submitterId } = payload
      this.query.auditConfirmation = auditConfirmation
        ? auditConfirmation
        : this.query.auditConfirmation
      this.query.handlerId = handlerId ? handlerId : this.query.handlerId
      this.query.submitterId = submitterId
        ? submitterId
        : this.query.submitterId

      this.initData(this.query)
    })

    this.$bus.$on('handleSearch', payload => {
      console.log('handleSearch')
      this.initData(this.query)
    })

    this.$bus.$on('handleRefresh', payload => {
      console.log('handleRefresh')
      this.query = this.$options.data().query
      this.initData(this.query)
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeSelect')
    this.$bus.$off('handleSearch')
    this.$bus.$off('handleRefresh')
  },
  methods: {
    initData(payload) {
      this.pageConfig.pageNumber = this.auditTagPage.pageNumber + 1
      this.pageConfig.total = this.auditTagPage.total
      this.$store
        .dispatch('sensitive/getAuditTaglist', payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'danger',
            message: '初始化失败'
          })
        })

      this.$store
        .dispatch('user/getAllUserList')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'danger',
            message: '初始化失败'
          })
        })
    },
    handleSelectionChange(val) {
      this.selects = val.map(item => {
        return item.uuid
      })
    },
    selectChange() {},
    search() {},
    resetForm() {},
    handleAccess(val) {
      const payload = {
        auditConfirmation: 'APPROVED',
        uuid: val.uuid
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
                message: '操作成功',
                onClose: () => {
                  this.initData(this.query)
                }
              })
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
    handleReject(val) {
      const payload = {
        auditConfirmation: 'AUDIT_FAILED',
        uuid: val.uuid
      }

      //   console.log(payload)

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
                message: '操作成功',
                onClose: () => {
                  //   console.log(111)
                  this.initData()
                }
              })
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
    changePage(key) {
      console.log(key)
      //   const payload = {
      //     pageNumber: key
      //   }
      this.query.page = key - 1
      this.initData(this.query)
    },
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
          .dispatch('audit/batchAuditPermissionConfirmation', payload)
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
    sortBy(a,b){
        console.log(a,b)
        if(a.auditState==='TO_BE_REVIEWED'){
            return -1
        }
        if(b.auditState==='TO_BE_REVIEWED'){
            return 1
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>