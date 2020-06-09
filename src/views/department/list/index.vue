<template>
  <el-container class="app-container">
    <el-header height="auto" style="padding:0">
      <list-header></list-header>
    </el-header>

    <el-container>
      <el-table
        v-loading="loading"
        :data="departmentList"
        style="width: 100%"
        row-key="uuid"
        border
        lazy
        stripe
        default-expand-all
        class="fill"
        @row-click="handleDetail"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <form-dialog ref="formDialog"></form-dialog>
  </el-container>
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
      departmentList: state => state.department.departmentList,
      loading: state => state.department.loading
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
      this.$store.commit('department/SAVE_DETAIL', value)
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
        .dispatch('department/getDepartmentList')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    handleEdit(val) {
      this.$store.commit('department/SAVE_DETAIL', val)
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
            .dispatch('department/deleteDepartment', payload)
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
