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
            @click="handleBatch(action='accessed')"
          >批量通过</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['audit']['audit_batchAuditPermissionConfirmation']"
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
          :default-sort="{order:'ascending',prop:'auditState'}"
          @selection-change="handleSelectionChange"
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection" :selectable="selectable"></el-table-column>
          <el-table-column align="left" label="角色名称" prop="roleName"></el-table-column>
          <el-table-column align="left" label="提交人">
            <template v-slot="scoped">
              <div>{{scoped.row.submitOperator.name}}</div>
            </template>
          </el-table-column>
          <el-table-column align="left" label="提交时间" prop="createdAt"></el-table-column>

          <el-table-column align="left" label="获取权限类型与内容">
            <template v-slot="{row}">
              <div v-if="row.toPermissions.length">
                <div
                  class="font-no-wrap"
                  v-for="item in grouping(row.toPermissions)"
                  :key="item.module"
                >
                  <span class="font-es font-weight-700">{{permissionEnum[item.module]}}：</span>
                  <span v-html="format(item.permissions)"></span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="left" label="状态">
            <template v-slot="{row}">
              <div>
                <span v-if="row.auditState==='TO_BE_REVIEWED'" class="color-primary">审核中</span>
                <span v-else-if="row.auditState==='AUDIT_FAILED'" class="color-danger">已拒绝</span>
                <span v-else class="color-success">已通过</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="left">
            <template v-slot="{row}">
              <div>
                <el-t-button type="text" @click="handleAudit(row.uuid)">审核</el-t-button>
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
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar
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
      page: state => state.sensitive.auditPermissionPage,

      permissionEnum: state => state.enum.roleDetail,
      auditSetting: state => state.sensitive.auditSetting,
      currentUserUuid: state => state.user.uuid
    })
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {
    this.$bus.$on('handleRefresh', () => {
      this.initDataList(this.query)
    })

    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
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
    //重置
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
     * 批量审批
     */
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

      console.log(payload)
      this.batchAudit(payload)
    },
    batchAudit(payload) {
      this.$store
        .dispatch('audit/batchAuditPermissionConfirmation', payload)
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
    handleAudit(uuid) {
      this.$refs['formDialog'].event = 'AuditTemplate'
      this.$refs['formDialog'].eventType = 'audit'
      this.$refs['formDialog'].transfer = { uuid }
      this.$refs['formDialog'].dialogVisible = true
    },
    grouping(list) {
      if (Object.keys(list).length) {
        return list.reduce((groups, item) => {
          let groupFound = groups.find(
            foundItem => item.module === foundItem.module
          )
          if (groupFound) {
            groupFound.permissions.push(item)
          } else {
            let newGroup = {
              module: item.module,
              permissions: [item]
            }

            groups.push(newGroup)
          }

          return groups
        }, [])
      } else {
        return []
      }
    },
    format(arr) {
      let temp = []
      temp = arr.map(item => {
        return item.title
      })
      return temp.join('、')
    },
    selectable(row, index) {
      let flag = false
      row.auditUsers.forEach(item => {
        item.userList.forEach(user => {
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
      return row.auditState === 'TO_BE_REVIEWED'&&!flag
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
