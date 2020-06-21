<template>
  <div class="app-container">
    <!-- <el-header height="auto" style="padding:0"> -->
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <!-- </el-header> -->
    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`"></tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="userList"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="员工姓名" align="left"></el-table-column>
          <el-table-column label="部门" align="left">
            <template v-slot="scoped">
              <div>{{scoped.row.departments[0].name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="left">
            <template v-slot="scoped">
              <div>{{scoped.row.role.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="授权状态" align="left">
            <template v-slot="scoped">
              <div>{{scoped.row.status}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button>
              <el-button
                type="primary"
                size="mini"
                @click.stop="handleDistribute(scope.$index)"
              >分配部门</el-button>
              <!-- <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button> -->
              <!-- <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button> -->
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
        userName: '',
        departmentsUuid: '',
        roleUuid: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      roleList: state => state.role.roleList,
      departmentList: state => state.department.departmentList,

      loading: state => state.user.loading,
      userList: state => state.user.userList,
      userPage: state => state.user.userPage
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {
    this.$bus.$on('showFormDialog', target => {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].dialogVisible = true
    })
  },
  beforeDestroy() {
    this.$bus.$off('showFormDialog')
  },
  methods: {
    doExport(val) {
      console.log(val)
    },

    handleDistribute(index) {
      const payload = this.userList[index]
      this.$store.commit('user/SAVE_CURRENTROW', payload)
      this.$refs['formDialog'].event = 'DistributeTemplate'
      this.$refs['formDialog'].eventType = 'distribute'
      this.$refs['formDialog'].dialogVisible = true
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    initFilter() {
      this.$store
        .dispatch('role/getRoleList')
        .then(() => {
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })

      this.$store
        .dispatch('department/getDepartmentListSelect')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    initDataList(payload) {
      this.$store
        .dispatch('user/getUserList', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.userPage.pageNumber + 1
          this.pageConfig.total = this.userPage.total
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
      const { userName, departmentsUuid, roleUuid } = val
      this.query.userName = userName ? userName : userName
      this.query.departmentsUuid = departmentsUuid
        ? departmentsUuid
        : departmentsUuid
      this.query.roleUuid = roleUuid ? roleUuid : roleUuid
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
