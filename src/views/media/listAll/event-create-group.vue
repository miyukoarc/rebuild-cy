<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="分组名称" prop="groupName">
      <el-input v-model.trim="form.groupName" maxlength="20" show-word-limit></el-input>
    </el-form-item>

    <el-form-item label="可见范围">
      <el-radio v-model="section" label="department">到部门</el-radio>
      <el-radio v-model="section" label="user">到员工</el-radio>
    </el-form-item>

    <complex-select :section="section" v-model="selects" :options="departmentList"></complex-select>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>

      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import ComplexSelect from '@/components/ComplexSelect'
export default {
  inject: ['reload'],
  components: { ComplexSelect },
  data() {
    return {
      section: 'department',
      selects: [],
      form: {
        groupName: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入组名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      listSelect: state => state.department.listSelect,
      departmentList: state => state.department.departmentList,
      auditSetting: state => state.sensitive.auditSetting
    })
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
    handleConfirm() {
      if (this.section === 'department') {
        this.$set(
          this.form,
          'departmentUuids',
          this.selects.map(item => {
            return item.uuid
          })
        )
      } else {
        this.$set(
          this.form,
          'userUuids',
          this.selects.map(item => {
            return item.uuid
          })
        )
      }
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('media/addGroup', payload)
            .then(() => {
              const message = this.auditSetting['tag'] ? '已提交审核' : '已完成'
              this.$message({
                type: 'success',
                message: message
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      this.$store
        .dispatch('media/getMediaGroupListAll')
        .then(() => {
          //   this.reload();
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }
  }
}
</script>

<style></style>
