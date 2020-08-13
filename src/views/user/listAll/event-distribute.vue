<template>
  <div>
    <el-form ref="form" label-width="120px" label-position="left" inline>
      <el-form-item label="部门：" prop="name">
        <el-select-tree
          v-model="depUuid"
          placeholder="请选择部门"
          :defaultExpandAll="true"
          :checkStrictly="true"
          :data="departmentList"
          :props="departmentProps"
        ></el-select-tree>
      </el-form-item>

      <el-form-item label="角色：" prop="name">
        <el-select v-model="roleUuid">
          <el-option
            v-for="item in roleList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-t-button size="small" type="primary" @click="handleConfrim">确定</el-t-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findTree } from '@/utils/common'
export default {
  data() {
    return {
      depUuid: '',
      roleUuid: '',
      departmentProps: {
        value: 'uuid',
        label: 'name',
        children: 'children',
      },
      form: {
        userId: '',
      },
      forms: [],
      isBatchUpdate: false,
      //   departmentList: [],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.currentRowUserList,
      users: (state) => state.user.currentRowUsers,
      departmentList: (state) => state.department.listSelect,
      roleList: (state) => state.role.roleListSelect,
    }),
  },
  watch: {
    depUuid: {
      handler(newVal, oldVal) {
        const arr = this.departmentList
        const item = findTree(arr, newVal)
        const tenantId = item.tenantId
        this.initFilter({ tenantId })
      },
    },
    user: {
      handler(newVal, oldVal) {
        if (Object.keys(newVal) != 0) {
          this.depUuid = newVal.departments[0].uuid
          this.isBatchUpdate = false

          this.form.userId = newVal.userId
          const { tenantId } = newVal

          const uuid = this.depUuid
          this.initFilter({ tenantId })
        }
      },
      immediate: true,
    },
    users: {
      handler(newVal, oldVal) {
        if (newVal.length > 0) {
          this.depUuid = newVal[0].departments[0].uuid
          this.isBatchUpdate = true

          newVal.map((obj, index) => {
            this.forms[index] = {
              userId: obj.userId,
            }
          })
        }
      },
      immediate: true,
    },
  },
  created() {
    this.initDataList()
      .then(() => {
        // const { tenantId } = this.departmentList[0]
        // console.log(tenantId)
        // this.initFilter({ tenantId })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleChangeDept(val) {
      console.log(val)
    },
    initDataList() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('department/getDepartmentListSelect')
          .then((res) => {
            // this.departmentList = res
            resolve()
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },
    initFilter(payload) {
      this.$store
        .dispatch('role/getRoleListSelect', payload)
        .then(() => {
          this.roleUuid = this.roleList[0].uuid
        })
        .catch((err) => {
          console.error(err)
        })
    },
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleCancel() {
      this.closeDialog()
    },
    handleConfrim() {
      /*
      if (!this.isBatchUpdate) {
        const payload = { ...this.form, depUuid: this.depUuid }
        this.$store
          .dispatch('department/allocation', payload)
          .then((res) => {
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.$bus.$emit('handleRefresh')
            this.closeDialog()
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: err,
            })
          })
      } else {
        let promiseList = []
        this.forms.map((payload, index) => {
          promiseList[index] = this.$store.dispatch('department/allocation', {
            ...payload,
            depUuid: this.depUuid,
          })
        })

        Promise.all(promiseList)
          .then((res) => {
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.$bus.$emit('handleRefresh')
            this.closeDialog()
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: err,
            })
            this.$bus.$emit('handleRefresh')
            this.closeDialog()
          })
      }*/

      const departmentUuid = this.depUuid
      const roleUuid = this.roleUuid
      const uuid = this.user.uuid
      const payload = { departmentUuid, roleUuid, uuid }

      this.$store
        .dispatch('user/postUserUpdate', payload)
        .then(() => {
          this.$bus.$emit('handleRefresh')
          this.handleCancel()

          this.$message({
            type: 'success',
            message: '操作成功'
          })
          
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
  },
}
</script>

<style>
</style>