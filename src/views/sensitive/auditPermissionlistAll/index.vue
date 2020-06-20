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
        :data="auditPermissionlist"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column>
        <el-table-column width="85" align="center" label="提交人">
          <template v-slot="scoped">
            <div>{{scoped.row.submitOperator.name}}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="获取权限">
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

        <el-table-column align="center" label="内容" prop="text"></el-table-column>
        <el-table-column align="center" label="提交时间" prop="createdAt"></el-table-column>
        <el-table-column label="审核状态" align="center">
          <template v-slot="scoped">
            <div>{{auditStateEnum[`${scoped.row.auditState}`]}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
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
              <!-- <span >{{auditStateEnum[`${scoped.row.auditState}`]}}</span> -->
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
import { mapState, mapGetters } from 'vuex'
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
        pageSize: 20
      },
      searchFormLabel: [
        {
          model: 'handlerId',
          label: '审批人:',
          type: 'select',
          opts: []
        },
        {
          model: 'auditConfirmation',
          label: '审批状态:',
          type: 'select',
          opts: []
        },
        {
          model: 'submitterId',
          label: '提交人:',
          type: 'select',
          opts: []
        }
      ],
      searchForm: {
        auditConfirmation: '',
        auditType: '',
        handlerId: '',
        submitterId: '',
        page: 0,
      },
      selects: []
    }
  },
  computed: {
    ...mapState({
      auditStateEnum: state => state.enum.auditState,
      loading: state => state.sensitive.loading,
      auditPermissionlist: state => state.sensitive.auditPermissionlist,
      page: state => state.sensitive.page,
      userListAll: state => state.user.userListAll
    })
  },
  created() {
    this.initData()
  }, 
  mounted() {
    this.pageConfig.total = this.page.total
    this.pageConfig.pageNumber = this.page.pageNumber - 1
    // console.log(this.auditPermissionlist)
    this.$bus.$on('changeSelect', payload => {
      if (payload.auditConfirmation) {
        this.searchForm['auditConfirmation'] = payload.auditConfirmation
      }
      


      //   alert('1')
      if (payload.handlerId) {
        this.searchForm['handlerId'] = payload.handlerId
      }
      if (payload.submitterId) {
        this.searchForm['submitterId'] = payload.submitterId
      }

      this.initData(this.searchForm)
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeSelect')
  },
  methods: {
    initData(payload) {
        
      this.$store
        .dispatch('sensitive/getAuditPermissionlist', {
          ...payload,
          auditType: 'PERMISSION'
        })
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
            .dispatch('audit/auditPermissionConfirmation', payload)
            .then(res => {
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

      this.$confirm('是否拒绝当前审批', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('audit/auditPermissionConfirmation', payload)
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功',
                onClose: () => {
                  console.log(111)
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
      const payload = {
        page: key-1
      }
      this.initData(payload)
    },
    handleBatchConfrim() {
      const uuids = this.selects
      const payload = {
        auditConfirmation: 'APPROVED',
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
    //
    handleChangeFirst(val) {
      const searchQuery = this.searchForm
      const payload = {
        ...searchQuery,
        handlerId: val
      }
      this.initData(payload)
      console.log(val)
    },

    handleChangeSecond(val) {
      console.log(val)
      const searchQuery = this.searchForm
      const payload = {
        ...searchQuery,
        auditConfirmation: val
      }
      this.initData(payload)
    },
    //submitterId
    handleChangeThird(val) {
      const searchQuery = this.searchForm
      const payload = {
        ...searchQuery,
        submitterId: val
      }
      this.initData(payload)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/styles/common.scss';
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>