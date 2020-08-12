<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <tool-bar :hasExport="true" :hasImport="false" @handleExport="doExport">
        <div slot="left">
          <span class="font-l">{{corpInfo.name}}</span>
          <!-- :popAuth="true"
          :auth="permissionMap['role']['role_add']"-->
          <el-t-button size="small" type="text" :enable="true" @click="handleChange">切换企业</el-t-button>
        </div>
        <div slot="right">
          <el-t-button
            v-permission="'role,role_add'"
            :popAuth="true"
            :auth="'role,role_add'"
            size="small"
            type="primary"
            @click="handleCreate"
          >新建角色</el-t-button>
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
          header-row-class-name="el-table-header"
        >
          <el-table-column prop="name" label="角色名称" align="left"></el-table-column>
          <el-table-column label="备注" align="left">
            <template v-slot="{row}">{{row.remark?row.remark:'--'}}</template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                @click.stop.native="handlePermission(scope.row)"
                :popAuth="true"
                :auth="'role,role_update'"
                v-permission="'role,role_update'"
              >配置权限</el-t-button>
              <el-t-button
                type="text"
                size="mini"
                @click.stop.native="handleEdit(scope.row)"
                :popAuth="true"
                v-permission="'role,role_update'"
                :auth="'role,role_update'"
              >编辑</el-t-button>

              <el-t-button
                type="text"
                size="mini"
                @click.stop.native="handleDelete(scope.row)"
                :popAuth="true"
                v-permission="'role,role_delete'"
                :auth="'role,role_delete'"
              >删除</el-t-button>
              <!-- <i class="el-icon-circle-close color-info" v-else></i> -->
            </template>
          </el-table-column>
        </el-table>
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
    ToolBar,
    // mHeadedr
  },
  data() {
    return {
      corp: '',
    }
  },
  watch: {},
  computed: {
    ...mapState({
      roleList: (state) => state.role.roleList,
      departmentList: (state) => state.department.departmentList,
      loading: (state) => state.role.loading,
      corpInfo: (state) => state.auth.corpInfo,
      permissionMap: (state) => state.permission.permissionMap,
      listSelect: state => state.department.listSelect
    }),
  },
  activated() {
    this.initDataList()
  },
  mounted(){
    //   this.$bus.$on('handleRefresh',()=>{
    //       this.ini
    //   })
  },
  methods: {
    doExport() {},
    handleCreate() {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].dialogVisible = true
    },
    initDataList() {
      this.$store
        .dispatch('role/getRoleList')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },

    handleChange() {
      this.$refs['formDialog'].event = 'ChangeTemplate'
      this.$refs['formDialog'].eventType = 'change'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleEdit(val) {
      const { name, code, uuid, remark } = val
      const payload = { name, code, uuid, remark }
      // const payload = this.roleList[index]
      this.$store.commit('role/SAVE_DETAIL', payload)
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = payload
    },
    handleDelete(val) {
      const { uuid } = val
      const payload = { uuid }
      this.$confirm('是否删除当前角色', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('role/deleteRole', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.initDataList()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
              })
            })
        })
        .catch((err) => {})
    },
    handlePermission(val) {
      const { uuid, code } = val
      //   const roleCode = code
      this.$router.push({
        path: '/role/detail/' + uuid,
        query: { code },
      })
    },
  },
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
