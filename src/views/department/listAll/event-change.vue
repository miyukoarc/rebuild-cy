<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="名称">
      <el-input v-model.trim="name" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="变更类型：" prop="type">
      <el-select v-model="form.type">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="角色模板：" prop="roleUuidSet">
      <el-select v-model="form.roleUuidSet" multiple filterable>
        <el-option
          v-for="item in roleListSelect"
          :key="item.value"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      name: '',
      form: {
        type: '',
        // roleUuidSet: [],
        deptUuid: 0,
      },
      types: [
        // { value: 'HEAD', label: '总公司' },
        { value: 'BRANCH', label: '分公司' },
        { value: 'BUSINESS', label: '营业部' },
        // { value: 'DEPT', label: '普通部门' },
      ],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        type: [{ required: true, message: '请选择变更类型', trigger: 'blur' }],
        roleUuidSet: [
          { required: true, message: '请选择角色模板', trigger: 'blur' },
        ],
      },
    //   alterRoleTemplates: [],
    }
  },
  watch: {
    'form.type': {
      handler(newVal, oldval) {
        // if (newVal) {
        //   if (newVal == 'BRANCH') {
        //     this.alterRoleTemplates = this.roleTemplates.filter((item) => {
        //       return item.code.includes('BRANCH')
        //     })
        //   }

        //   if (newVal == 'BUSINESS') {
        //     this.alterRoleTemplates = this.roleTemplates.filter((item) => {
        //       return item.code.includes('BUSINESS')
        //     })
        //   }
        // }
        //   console.log(newVal)
      },
      immediate: true,
    },
    transfer: {
      handler(newVal, oldVal) {
        const { name, uuid } = newVal
        this.name = name
        this.form.deptUuid = uuid
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      currentDepartment: (state) => state.department.currentDepartment,
      listSelect: (state) => state.department.listSelect,
      departmentList: (state) => state.department.departmentList,
      roleListSelect: state => state.role.roleListSelect,
    //   roleTemplates: (state) => state.roleTemplate.listAll,
    }),
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$store
        .dispatch('role/getRoleListSelect')
        .then(() => {})
        .catch((err) => {
          console.error(err)
        })
    },
    handleConfirm() {
      const payload = this.form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          //   console.log(payload)
          this.$store
            .dispatch('department/alterType', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.form = this.$options.data().form
              this.handleCancel()
              this.$bus.$emit('handleRefresh')
            })
            .catch((err) => {
              console.error(err)
              this.$message({
                type: 'error',
                message: err,
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入',
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      const payload = this.$route.params.org
      this.$store
        .dispatch('department/getDepartmentListAll', payload)
        .then(() => {
          //   this.reload()
        })
        .catch((err) => {
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