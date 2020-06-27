<template>
  <el-form :model="form" ref="form" >


    <el-form-item label="自定义动态" >
      <el-input type="textarea" maxlength="100"
  show-word-limit v-model.trim="form.remark"></el-input>
    </el-form-item>


    <!-- <el-form-item label="上级">
      <el-checkbox v-model="hasParent">是否为子部门</el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-select v-model="form.parent" placeholder="请选择">
        <el-option
          :disabled="!hasParent"
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <div class="text-align-center">
      <el-t-button  size="small" @click="handleCancel">取消</el-t-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  data() {
    return {
      hasParent: false,
      form: {
        remark: '',
        externalUserId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currDepartmentTemplate: {
      handler(newVal, oldVal) {
        if (newVal) {
          //   console.log(newVal)
          this.initData()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
              externalUserDetail: state => state.externalUser.externalUserDetail,
        // currentRole: state => state.role.currentRole,
        // currentDepartment: state => state.department.currentDepartment
    })
  },
  mounted(){
      this.form.externalUserId = this.externalUserDetail?.externalUser?.externalUserId
  },
  updated() {
    //   console.log('updated')
    //   this.initData()
  },
  methods: {
    initData() {
      const parent = this.currentDepartment.parent
      this.form.name = this.currentDepartment.name


      if (Object.keys(parent).length) {
        this.hasParent = true
        this.$set(this.form, 'parent', parent.uuid)

      }
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('role/updateRole', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              console.log(err)
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
      console.log('刷新')
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