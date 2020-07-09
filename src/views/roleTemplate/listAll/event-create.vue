<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>
    <el-form-item label="code" prop="code">
      <el-input v-model.trim="form.code"></el-input>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model.trim="form.remark"></el-input>
    </el-form-item>


    <!-- <el-form-item> -->

    <!-- </el-form-item> -->
    <div class="text-align-center">
              <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  inject: ['reload'],

  data() {
    return {
      form: {
        name: '',
        code: '',
        remark: '',
        // uuid: ''
        // org: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色code', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {

  },
  computed: {
    ...mapState({})
  },
  mounted() {},
  methods: {
    handleClick(e) {
      console.log(e)
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('roleTemplate/add', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
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
        .dispatch('role/getRoleList')
        .then(() => {
          this.reload()
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

<style>
</style>