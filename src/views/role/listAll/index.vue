<template>
  <div class="app-container">
    <!-- <el-header height="auto" style="padding:0"> -->
    <!-- <el-card class="content-spacing">
      <list-header></list-header>
    </el-card>-->

    <!-- </el-header> -->

    <el-card class="content-spacing">
      <tool-bar :hasExport="false" :hasImport="false">
        <div slot="right">
          <el-t-button :popAuth="true" :auth="permissionMap['role']['role_add']" type="small" @click="handleCreate">新建角色</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="roleList"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column prop="name" label="角色名称" align="left"></el-table-column>
          <el-table-column label="操作" align="left" >
            <template slot-scope="scope">
              <el-t-button size="mini" @click="handlePermission" :popAuth="true" :auth="permissionMap['role']['role_role']">权限</el-t-button>
              <el-t-button type="primary" size="mini"  @click="handleEdit(scope.row)" :popAuth="true" :auth="permissionMap['role']['role_update']">编辑</el-t-button>

              <el-t-button type="danger" size="mini" @click="handleDelete(scope.row)" :popAuth="true" :auth="permissionMap['role']['role_delete']">删除</el-t-button>
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
    return {}
  },
  watch: {},
  computed: {
    ...mapState({
      roleList: state => state.role.roleList,
      departmentList: state => state.department.departmentList,
      loading: state => state.role.loading,

      permissionMap: state => state.permission.permissionMap
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleClick(val, e) {
      e.stopPropagation()
      this.handleDelete(val.uuid)
      alert('点击')
    },

    handleCreate() {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
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
        .dispatch('role/getRoleList')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    handleEdit(val) {
        const {name,code,uuid} = val
        const payload = {name,code,uuid}
        // const payload = this.roleList[index]
      this.$store.commit('role/SAVE_DETAIL', payload)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = payload
    },
    handleDelete(index) {
      console.log(index)
      const uuid = this.roleList[index].uuid
      const payload = { uuid }
      this.$confirm('是否删除当前角色', 'Warning', {
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
          
        })
    },
    handlePermission(){},
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
