<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="分组名称" prop="groupName">
      <el-input v-model.trim="form.groupName" maxlength="20" show-word-limit></el-input>
    </el-form-item>

    <el-form-item label="可见范围">
      <el-radio v-model="section" label="department">到部门</el-radio>
      <el-radio v-model="section" label="user">到员工</el-radio>
    </el-form-item>
    <multi-tree-select v-model="selects" :section="section" :multiple="true"></multi-tree-select>

    <!-- <complex-select :section="section" v-model="selects" :options="departmentList"></complex-select> -->

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import ComplexSelect from '@/components/ComplexSelect'
import MultiTreeSelect from '@/components/MultiTreeSelect'
export default {
  inject: ['reload'],
  components: { ComplexSelect, MultiTreeSelect },
  data() {
    return {
      section: 'department',
      selects: [],
      form: {
        groupName: '',
      },
      rules: {
        groupName: [
          { required: true, message: '请输入组名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      listSelect: (state) => state.department.listSelect,
      auditSetting: (state) => state.sensitive.auditSetting,
    }),
  },
  created() {

  },
  methods: {
    handleConfirm() {
      if (this.section === 'department') {
        this.$set(
          this.form,
          'departmentUuids',
          this.selects.map((item) => {
            return item.uuid
          })
        )
      } else {
        this.$set(
          this.form,
          'userUuids',
          this.selects.map((item) => {
            return item.uuid
          })
        )
      }
      const payload = this.form

      if (this.selects.length) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('media/addGroup', payload)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '操作成功',
                })
                this.handleCancel()
                this.handleRefresh()
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: '操作失败',
                })
              })
          } else {
            this.$message({
              type: 'error',
              message: '请检查输入',
            })
          }
        })
      } else {
        this.$confirm('请设置可见范围！', '', { type: 'error' })
          .then(() => {})
          .catch(() => {})
      }
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
    },
  },
}
</script>

<style></style>
