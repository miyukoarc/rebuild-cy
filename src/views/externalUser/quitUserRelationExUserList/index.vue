<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport">
        <div slot="right">
          <el-t-button
            type="primary"
            @click="handleDistribute"
            :popAuth="true"
            :auth="permissionMap['externalUser']['externalUser_redistributionExUser']"
          >分配客户资源</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="quitUserRelationExUserList"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="离职员工" align="left">
            <template v-slot="scope">
              <div class="user-card">
                <el-image
                  :src="scope.row.avatar"
                  lazy
                  style="width:30px;height:30px;margin-right:10px"
                ></el-image>
                <div class="client-info">
                  <span class="remark">{{scope.row.name}}</span>
                  <div>{{scope.row.role.name}}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="公司" align="left">
            <template v-slot="scope">
              <div v-for="(item,index) in scope.row.departments" :key="index">
                <p>{{item.name}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="待分配人数" prop="externalUserNum" align="left"></el-table-column>
          <el-table-column label="待分配群数" prop="groupNum" align="left"></el-table-column>
          <el-table-column label="离职时间" align="left" prop="updatedAt"></el-table-column>

          <el-table-column label="状态" align="left">
            <template v-slot="scope">
              <el-tag
                :type="scope.row.userStatus === 'ALLOCATE'?'success':'info'"
              >{{quitUserRelationExUserListUserStatus[scope.row.userStatus]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                :auth="permissionMap['externalUser']['externalUser_redistributionExUser']"
                @click.stop="handleDistributeSingle(scope.row)"
              >分配</el-t-button>
              <el-divider direction="vertical"></el-divider>

              <el-t-button
                :popAuth="true"
                :auth="permissionMap['externalUser']['externalUser_quitUserRelationExUserList']"
                type="text"
                size="mini"
                @click.stop="handleDetail(scope.row)"
              >详情</el-t-button>
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
import ToolBar from './tool-bar'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'runWayListAll',
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
        status: '',
        name: '',
        startTime: '',
        endTime: '',
      },
      // 选择勾选
      selectedAllData: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.externalUser.loading,
      quitUserRelationExUserListUserStatus: (state) =>
        state.enum.quitUserRelationExUserListUserStatus,
      quitUserRelationExUserList: (state) =>
        state.externalUser.quitUserRelationExUserList,
      quitListPage: (state) => state.externalUser.quitListPage,
      permissionMap: (state) => state.permission.permissionMap,
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
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('externalUser/getQuitUserRelationExUserList', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.quitListPage.pageNumber + 1
          this.pageConfig.total = this.quitListPage.total
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },
    handleSearch(val) {
      const { name, status, startTime, endTime } = val
      this.query.name = name ? name : this.query.name
      this.query.status = status ? status : this.query.status
      this.query.startTime = startTime ? startTime : this.query.startTime
      this.query.endTime = endTime ? endTime : this.query.endTime
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    handleDetail(row) {
      console.log(row, 'row')
      const uuid = row.uuid
      this.$router.push({
        path: '/user/detail/' + uuid,
        // query: { uuid: payload }
      })
    },
    handleDistribute() {
      if (this.selectedAllData.length) {
        this.$refs['formDialog'].event = 'DistributeTemplate'
        this.$refs['formDialog'].eventType = 'distribute'
        this.$refs['formDialog'].dialogVisible = true
        this.$refs['formDialog'].selectedAllData = this.selectedAllData
      } else {
        this.$message({
          type: 'warning',
          message: '请至少选择一个客户',
        })
      }
    },
    handleDistributeSingle(row) {
      this.$refs.multipleTable.clearSelection()
      this.handleSelectionChange([row])
      this.selectedAllData.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
      const payload = {}
      this.$refs['formDialog'].event = 'DistributeTemplate'
      this.$refs['formDialog'].eventType = 'distribute'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = payload
      this.$store.commit('externalUser/SAVE_QUITUSERCURRENTROW', row)
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val) {
      this.selectedAllData = val
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
.success {
  color: #67c23a;
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
