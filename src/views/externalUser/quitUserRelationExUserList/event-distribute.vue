<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" >
      <el-form-item label="分配人员:" prop="departmentsUuid">
        <el-select v-model="form.departmentsUuid">
          <el-option
            v-for="item in userListSelect"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      {{user.uuid}}
      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfrim('form')">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        departmentsUuid: ''
      },
      rules:{
        departmentsUuid:[
          {
            required:true,
            message:'请选择分配人员',
            trigger:['change','blur']
          }
        ]
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      // departments: state => state.department.departments,
      userListSelect: state => state.user.listSelect,
      quitUserCurrentRow: state => state.externalUser.quitUserCurrentRow,
    })
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleCancel() {
      this.$refs['form'].resetFields()
      this.closeDialog()
    },
    handleConfrim() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let payload = {
            external_userid:this.quitUserCurrentRow.externalUserId,
            handover_userid:this.quitUserCurrentRow.userId,
            takeover_userid:this.form.departmentsUuid
          }
          this.$store
            .dispatch('externalUser/redistributionExUser', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.$bus.$emit('handleRefresh')
            })
            .catch(err => {
              
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
            this.$refs['form'].resetFields()
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    refresh() {
      this.$store.dispatch('externalUser/getQuitUserRelationExUserList').then(()=>{
          this.reload()
      }).catch(err => {
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