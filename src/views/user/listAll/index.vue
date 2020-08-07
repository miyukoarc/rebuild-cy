<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header ref="listHeader" @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :usersNumber="userPage.total" @handleExport="doExport" @handleUpdate="handleUpdate">
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['user']['user_update']"
            @click="actionRole"
          >批量分配角色</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['department']['department_allocation']"
            @click="actionDepartment"
          >批量分配部门</el-t-button>
        </div>
      </tool-bar>
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
          @selection-change="handleSelectionChange"
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="员工姓名" align="left"></el-table-column>

          <el-table-column label="部门" align="left">
            <template v-slot="scoped">
              <div
                v-if="scoped.row.departments[0]"
              >{{scoped.row.departments[scoped.row.departments.length - 1 ].name}}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>

          <el-table-column label="角色" align="left">
            <template v-slot="scoped">
              <div v-if="scoped.row.role">{{scoped.row.role.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="isMessageUser" label="会话存档授权" align="left">
            <template v-slot="scoped">
              <div
                :class="scoped.row.isMessageUser?'color-success':'color-danger'"
              >{{scoped.row.isMessageUser?'已授权':'未授权'}}</div>
            </template>
          </el-table-column>

          <el-table-column label="允许登陆" align="left">
            <template v-slot="scoped">
              <div
                :class="scoped.row.visible?'color-success':'color-danger'"
              >{{scoped.row.visible?'已授权':'未授权'}}</div>
            </template>
          </el-table-column>

          <el-table-column label="通讯录授权" prop="isFollowUser">
            <template v-slot="scoped">
              <div
                :class="scoped.row.isFollowUser?'color-success':'color-danger'"
              >{{scoped.row.isFollowUser?'已授权':'未授权'}}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="left" width="240">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                :auth="permissionMap['user']['user_update']"
                @click.stop="handleDistributeRole(scope.$index)"
              >分配角色</el-t-button>

              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                :auth="permissionMap['department']['department_allocation']"
                @click.stop="handleDistributeDepartment(scope.$index)"
              >分配部门</el-t-button>

              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                :auth="permissionMap['user']['user_detail']"
                @click.stop="handleDetail(scope.$index)"
              >详情</el-t-button>
            </template>
          </el-table-column>
        </el-table>

         <customer-pagination :pageConfig="pageConfig" @current-change="changePage" @size-change="changeSize"></customer-pagination>
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
    CustomerPagination
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 1,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        userName: '',
        departmentsUuid: '',
        roleUuid: '',

        isFollowUser: null,
        isMessageUser: null,
        visible: null,
      },

      checkedUserList: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.user.loading,
      userList: (state) => state.user.userList,
      userPage: (state) => state.user.userPage,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.$store.dispatch('role/getRoleListSelect')
    this.$store.dispatch('department/getDepartmentListSelect')

    this.initDataList(this.query)
  },
  mounted() {
    this.$bus.$on('handleRefresh', () => {
      this.initDataList(this.query)
    })
  },
  beforeDestroy() {
    this.$bus.$off('handleRefresh')
  },
  methods: {
    handleSelectionChange(val) {
      this.checkedUserList = val
    },
    doExport(val) {
      if (this.checkedUserList.length == 0) {
        console.log('请求接口导出全部')
      } else {
        let header = [
          '员工姓名',
          '部门',
          '角色',
          '会话存档授权',
          '允许登陆',
          '通讯录授权',
        ]
        let data = []

        this.checkedUserList.map((obj) => {
          data.push([
            obj.name,
            obj.departments[obj.departments.length - 1].name,
            obj.role.name,
            obj.isMessageUser ? '已授权' : '未授权',
            obj.visible ? '允许' : '禁止',
            obj.isFollowUser ? '已授权' : '未授权',
          ])
        })

        import('@/vendor/Export2Excel').then((excel) => {
          excel.export_json_to_excel({
            header, //表头 必填
            data, //具体数据 必填
            filename: 'excel-list', //非必填
            autoWidth: true, //非必填
            bookType: 'xlsx', //非必填
          })
        })
      }
    },
    handleUpdate() {
      this.initDataList(this.query)
    },

    // 分配角色
    handleDistributeRole(index) {
      const payload = this.userList[index]
      this.$store.commit('user/SAVE_CURRENTROW', payload)
      this.$refs['formDialog'].event = 'DistributeRoleTemplate'
      this.$refs['formDialog'].eventType = 'distributeRole'
      this.$refs['formDialog'].dialogVisible = true
    },

    // 分配部门
    handleDistributeDepartment(index) {
      const payload = this.userList[index]
      this.$store.commit('user/SAVE_CURRENTROW', payload)
      this.$refs['formDialog'].event = 'DistributeTemplate'
      this.$refs['formDialog'].eventType = 'distribute'
      this.$refs['formDialog'].dialogVisible = true
    },

    // 批量分配角色
    actionRole() {
      if (this.checkedUserList.length) {
        this.$store.commit('user/SAVE_CURRENTROWS', this.checkedUserList)
        this.$refs['formDialog'].event = 'DistributeRoleTemplate'
        this.$refs['formDialog'].eventType = 'distributeRole'
        this.$refs['formDialog'].dialogVisible = true
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项',
        })
      }
    },

    // 批量分配部门
    actionDepartment() {
      if (!this.$refs.listHeader.query.departmentsUuid) {
        this.$message({
          type: 'error',
          message: '请先选择部门',
        })
      } else if (this.checkedUserList.length) {
        this.$store.commit('user/SAVE_CURRENTROWS', this.checkedUserList)
        this.$refs['formDialog'].event = 'DistributeTemplate'
        this.$refs['formDialog'].eventType = 'distribute'
        this.$refs['formDialog'].dialogVisible = true
      } else {
        this.$message({
          type: 'error',
          message: '请选择至少一项',
        })
      }
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    initDataList(payload) {
      this.$store
        .dispatch('user/getUserList', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.userPage.pageNumber + 1
          this.pageConfig.total = this.userPage.total
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    handleDetail(val) {
      const uuid = this.userList[val].uuid
      this.$router.push({
        path: '/user/detail/' + uuid,
        // query: { uuid: payload }
      })
    },
    handleSearch(val) {
      const {
        userName,
        departmentsUuid,
        roleUuid,
        isFollowUser,
        isMessageUser,
        visible,
      } = val
      this.query.userName = userName ? userName : userName
      this.query.departmentsUuid = departmentsUuid
        ? departmentsUuid
        : departmentsUuid
      this.query.roleUuid = roleUuid ? roleUuid : roleUuid

      this.query.isFollowUser = isFollowUser ? isFollowUser : isFollowUser
      this.query.isMessageUser = isMessageUser ? isMessageUser : isMessageUser
      this.query.visible = visible ? visible : visible
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRefresh() {
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key
      this.initDataList(this.query)
    },
    changeSize(val){
        this.query.size = val
        this.initDataList(this.query)
    }
  },
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
