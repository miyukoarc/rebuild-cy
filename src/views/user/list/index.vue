<template>
  <div class="app-container">
    <!-- <el-header height="auto" style="padding:0"> -->
    <el-card class="content-spacing">
      <list-header></list-header>
    </el-card>

    <!-- </el-header> -->

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
          @row-click="handleDetail"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="员工姓名" align="center"></el-table-column>
          <el-table-column label="部门" align="center">
            <template v-slot="scoped">
              <div>{{scoped.row.departments[0].name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="center">
            <template v-slot="scoped">
              <div>{{scoped.row.role.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="授权状态" align="center">
            <template v-slot="scoped">
              <div>{{scoped.row.status}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ListHeader,
    UserDetail,
    FormDialog
    // mHeadedr
  },
  data() {
    return {}
  },
  watch: {},
  computed: {
    ...mapState({
      roleList: state => state.role.roleList,
      departmentList: state => state.department.departmentList,
      loading: state => state.role.loading,
      userList: state => state.user.userList
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList()
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
    handleClick(val, e) {
      e.stopPropagation()
      this.handleDelete(val.uuid)
      alert('点击')
    },

    handleRowClick(value) {
      this.$store.commit('role/SAVE_DETAIL', value)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    },
    sortChange(val) {
      this.initDataList()
    },
    pageChange() {
      this.initDataList()
    },
    initDataList() {
      this.$store
        .dispatch('user/getUserList')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    handleEdit(val) {
      this.$store.commit('role/SAVE_DETAIL', val)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleDelete(val) {
      console.log(val)
      const payload = { uuid: val.uuid }
      this.$confirm('是否删除当前部门', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('role/deleteRole', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDetail() {}
  }
}
</script>

<style lang="scss">
.app-container {
  border-top: 1px solid #e9e9e9;
  background: white;
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
header .el-header button {
  margin-right: 5px;
}
</style>
